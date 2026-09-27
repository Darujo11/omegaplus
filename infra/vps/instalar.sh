#!/usr/bin/env bash
# Instala/atualiza o webhook de deploy do omegaplus no Monadaserver.
#
# Roda como root, a partir de uma cópia desta pasta (infra/vps) no servidor:
#   sudo bash instalar.sh
#
# Idempotente: pode (e deve) ser rodado de novo a cada mudança. Preserva o
# WEBHOOK_SECRET e o .env da aplicação; reescreve todo o resto, para que uma
# mudança de porta ou caminho surta efeito de verdade.

set -Eeuo pipefail

APP="omegaplus"
UNIDADE="webhook-${APP}.service"
PORTA="${WEBHOOK_PORT:-9012}"
REPO="Darujo11/omegaplus"
URL_GIT="https://github.com/${REPO}.git"
DIR_REPO="/var/www/${APP}"
DIR_OPS="/var/www/${APP}-webhook"
ARQ_DEFAULT="/etc/default/webhook-${APP}"
DIR_ENV="/etc/${APP}"
ARQ_ENV="${DIR_ENV}/app.env"
ENV_LEGADO="/var/www/omega/.env.production"
LOG="/var/log/deploy-${APP}.log"
ORIGEM="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ok()   { printf '  ✓ %s\n' "$*"; }
erro() { printf '  ✗ %s\n' "$*" >&2; }
trap 'erro "falhou na linha $LINENO"; exit 1' ERR

[ "$(id -u)" = "0" ] || { erro "rode como root"; exit 1; }
id deploy >/dev/null 2>&1 || { erro "usuário deploy não existe"; exit 1; }

# ------------------------------------------------------------- porta
# Porta se confere, não se deduz. Só aceita ocupada se o dono for o nosso
# próprio serviço (reinstalação).
linha="$(ss -ltnpH "sport = :$PORTA" | head -1)"
if [ -n "$linha" ]; then
  pid_dono="$(printf '%s' "$linha" | sed -n 's/.*pid=\([0-9]*\).*/\1/p')"
  pid_nosso="$(systemctl show -p MainPID --value "$UNIDADE" 2>/dev/null || echo 0)"
  if [ "$pid_dono" != "$pid_nosso" ]; then
    erro "porta $PORTA ocupada por pid $pid_dono ($(readlink -f "/proc/$pid_dono/exe" 2>/dev/null || echo '?'))"
    exit 1
  fi
fi
ok "porta $PORTA livre (ou já é nossa)"

# ------------------------------------------------------------- repositório
if [ ! -d "$DIR_REPO/.git" ]; then
  install -d -o deploy -g deploy "$DIR_REPO"
  sudo -u deploy git clone --branch main "$URL_GIT" "$DIR_REPO"
else
  chown -R deploy:deploy "$DIR_REPO"
  sudo -u deploy git -C "$DIR_REPO" remote set-url origin "$URL_GIT"
fi
ok "repo em $DIR_REPO ($(sudo -u deploy git -C "$DIR_REPO" rev-parse --short HEAD))"

# ------------------------------------------------------------- arquivos de operação
install -d -o deploy -g deploy -m 755 "$DIR_OPS"
install -o deploy -g deploy -m 644 "$ORIGEM/server.mjs" "$DIR_OPS/server.mjs"
install -o deploy -g deploy -m 644 "$ORIGEM/stack.yml"  "$DIR_OPS/stack.yml"
install -o deploy -g deploy -m 755 "$ORIGEM/deploy.sh"  "$DIR_OPS/deploy.sh"
ok "server.mjs, stack.yml, deploy.sh em $DIR_OPS"

touch "$LOG"; chown deploy:deploy "$LOG"; chmod 640 "$LOG"

# ------------------------------------------------------------- .env da aplicação
# Segredo não passa por git nem por webhook. Na primeira instalação vem do
# .env do site anterior, que já está no servidor; depois é preservado.
install -d -o root -g deploy -m 750 "$DIR_ENV"
if [ ! -f "$ARQ_ENV" ]; then
  [ -r "$ENV_LEGADO" ] || { erro "$ARQ_ENV não existe e $ENV_LEGADO também não"; exit 1; }
  grep -E '^(RESEND_API_KEY|CONTACT_EMAIL)=' "$ENV_LEGADO" > "$ARQ_ENV"
  ok "$ARQ_ENV criado a partir de $ENV_LEGADO"
fi
chown root:deploy "$ARQ_ENV"; chmod 640 "$ARQ_ENV"
for chave in RESEND_API_KEY CONTACT_EMAIL; do
  grep -q "^${chave}=." "$ARQ_ENV" || { erro "$chave ausente em $ARQ_ENV"; exit 1; }
done
ok "$ARQ_ENV com RESEND_API_KEY e CONTACT_EMAIL (640 root:deploy)"

# ------------------------------------------------------------- configuração do webhook
segredo=""
[ -f "$ARQ_DEFAULT" ] && segredo="$(sed -n "s/^WEBHOOK_SECRET='\{0,1\}\([^']*\)'\{0,1\}$/\1/p" "$ARQ_DEFAULT")"
[ -n "$segredo" ] || segredo="$(openssl rand -hex 32)"
umask 077
cat > "$ARQ_DEFAULT" <<EOF
# Configuração do $UNIDADE. Reescrito a cada execução de infra/vps/instalar.sh,
# exceto WEBHOOK_SECRET, que é preservado.
WEBHOOK_SECRET='$segredo'
WEBHOOK_PORT=$PORTA
WEBHOOK_REPO=$REPO
WEBHOOK_BRANCH=main
WEBHOOK_REPO_DIR=$DIR_REPO
WEBHOOK_DEPLOY_SCRIPT=$DIR_OPS/deploy.sh
WEBHOOK_LOG=$LOG
EOF
chmod 600 "$ARQ_DEFAULT"; chown root:root "$ARQ_DEFAULT"
umask 022
ok "$ARQ_DEFAULT (600, segredo preservado)"

install -o root -g root -m 644 "$ORIGEM/webhook-omegaplus.service" "/etc/systemd/system/$UNIDADE"
systemctl daemon-reload
systemctl enable "$UNIDADE" >/dev/null 2>&1
systemctl restart "$UNIDADE"

# ------------------------------------------------------------- firewall
# Só as faixas de `hooks` do GitHub. Regras marcadas com comentário próprio;
# removemos APENAS as nossas, por número, em ordem decrescente.
faixas="$(curl -fsS --max-time 10 https://api.github.com/meta \
  | python3 -c 'import sys,json; print(" ".join(json.load(sys.stdin)["hooks"]))')"
[ -n "$faixas" ] || { erro "não consegui ler as faixas de hooks do GitHub"; exit 1; }
for n in $(ufw status numbered | grep -E "# webhook-${APP}[[:space:]]*\$" | sed -n 's/^\[ *\([0-9]*\)\].*/\1/p' | sort -rn || true); do
  ufw --force delete "$n" >/dev/null
done
for faixa in $faixas; do
  ufw allow proto tcp from "$faixa" to any port "$PORTA" comment "webhook-${APP}" >/dev/null
done
ok "ufw: porta $PORTA liberada só para $(printf '%s\n' $faixas | wc -l) faixas do GitHub"

# ------------------------------------------------------------- verificação
# Pela identidade, nunca por "respondeu algo". Tenta por ~20s: o systemd marca
# active antes de o processo chamar listen().
resposta=""
for _ in $(seq 1 40); do
  resposta="$(curl -fsS --max-time 2 "http://127.0.0.1:$PORTA/health" 2>/dev/null || true)"
  case "$resposta" in *omegaplus-webhook*) break ;; esac
  systemctl is-active --quiet "$UNIDADE" || break
  sleep 0.5
done
case "$resposta" in
  *omegaplus-webhook*) ok "$UNIDADE respondendo na porta $PORTA" ;;
  *) erro "a porta $PORTA não respondeu como omegaplus-webhook: '${resposta:-<nada>}'"
     journalctl -u "$UNIDADE" -n 30 --no-pager >&2; exit 1 ;;
esac

printf '\nPronto. Segredo: sudo sed -n "s/^WEBHOOK_SECRET=//p" %s\n' "$ARQ_DEFAULT"
