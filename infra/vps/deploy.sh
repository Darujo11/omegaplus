#!/usr/bin/env bash
# Deploy do omegacsa.com.br no Monadaserver (Docker Swarm + Traefik).
#
# Roda NO VPS, como `deploy`, a partir do clone em /var/www/omegaplus.
# Swarm não builda imagem: o build acontece aqui, tagueado pelo SHA do commit.
#
#   /var/www/omegaplus-webhook/deploy.sh                     # builda o HEAD e deploya
#   OMEGAPLUS_TAG=<sha-12> /var/www/omegaplus-webhook/deploy.sh   # rollback, sem rebuild
#
# Este servidor hospeda apps de outras pessoas. Nada aqui apaga, para ou limpa
# recurso que não leve o nome deste app.

set -Eeuo pipefail

STACK="omega"
SERVICO="${STACK}_web"
REDE="Monadanet"
REPO_IMAGEM="omegaplus-web"
DOMINIO="omegacsa.com.br"
DIR_REPO="${OMEGAPLUS_REPO_DIR:-/var/www/omegaplus}"
DIR_OPS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ARQUIVO_ENV="${OMEGAPLUS_ENV_FILE:-/etc/omegaplus/app.env}"
IMAGENS_A_MANTER=5

ok()    { printf '  ✓ %s\n' "$*"; }
erro()  { printf '  ✗ %s\n' "$*" >&2; }
passo() { printf '\n▸ %s\n' "$*"; }

trap 'erro "falhou na linha $LINENO"; exit 1' ERR

# ---------------------------------------------------------------- preflight
passo "Preflight"

[ "$(docker info --format '{{.Swarm.LocalNodeState}}')" = "active" ] \
  || { erro "Swarm não está ativo"; exit 1; }
docker network inspect "$REDE" >/dev/null 2>&1 \
  || { erro "rede externa '$REDE' não existe — o Traefik vive nela"; exit 1; }
ok "Swarm ativo, rede $REDE existe"

cd "$DIR_REPO"
if [ -n "$(git status --porcelain)" ]; then
  erro "árvore de trabalho suja em $DIR_REPO:"; git status --short >&2; exit 1
fi

TAG="${OMEGAPLUS_TAG:-$(git rev-parse --short=12 HEAD)}"
IMAGEM="${REPO_IMAGEM}:${TAG}"
ok "commit $TAG ($(git log -1 --format=%s "$TAG" 2>/dev/null || echo '?'))"

# O .env de produção não é "sourceado": EMAIL_FROM do legado tem '<' e espaços,
# e um `source` interpretaria isso como redirecionamento. Lemos só as chaves
# que o app usa, como texto.
ler_env() {
  sed -n "s/^$1=//p" "$ARQUIVO_ENV" | tail -1 | sed -e "s/^'\(.*\)'$/\1/" -e 's/^"\(.*\)"$/\1/'
}
[ -r "$ARQUIVO_ENV" ] || { erro "não consigo ler $ARQUIVO_ENV"; exit 1; }
RESEND_API_KEY="$(ler_env RESEND_API_KEY)"
CONTACT_EMAIL="$(ler_env CONTACT_EMAIL)"
[ -n "$RESEND_API_KEY" ] || { erro "RESEND_API_KEY vazio em $ARQUIVO_ENV"; exit 1; }
[ -n "$CONTACT_EMAIL" ]  || { erro "CONTACT_EMAIL vazio em $ARQUIVO_ENV"; exit 1; }
ok "variáveis de produção presentes (RESEND_API_KEY, CONTACT_EMAIL)"

# --------------------------------------------------------------- build
if [ -n "${OMEGAPLUS_TAG:-}" ]; then
  passo "Rollback: reusando $IMAGEM (sem rebuild)"
  docker image inspect "$IMAGEM" >/dev/null 2>&1 || {
    erro "imagem $IMAGEM não existe. Disponíveis:"
    docker image ls "$REPO_IMAGEM" --format '  {{.Tag}}  {{.CreatedSince}}' >&2
    exit 1
  }
else
  passo "Build da imagem"
  docker build --pull -t "$IMAGEM" .
fi
ok "$IMAGEM pronta"

# A identidade deste build: o Next publica o manifest num caminho que contém o
# BUILD_ID. Só ESTA imagem responde 200 nele — qualquer outra versão dá 404.
BUILD_ID="$(docker run --rm --entrypoint cat "$IMAGEM" /app/.next/BUILD_ID)"
[ -n "$BUILD_ID" ] || { erro "imagem sem .next/BUILD_ID"; exit 1; }
CAMINHO_ID="/_next/static/${BUILD_ID}/_buildManifest.js"
ok "BUILD_ID $BUILD_ID"

# --------------------------------------------------- smoke test da imagem
# Mesmas restrições de runtime do stack (usuário node, read-only, tmpfs), sem
# publicar porta no host: a checagem roda DENTRO do container.
passo "Smoke test isolado (sem porta no host)"

CID="$(docker run -d --rm --user node --read-only \
  --tmpfs /tmp --tmpfs /app/.next/cache \
  -e NODE_ENV=production -e NEXT_TELEMETRY_DISABLED=1 \
  -e RESEND_API_KEY=smoke-test -e CONTACT_EMAIL=smoke@test.invalid \
  "$IMAGEM")"
limpar_smoke() { docker rm -f "$CID" >/dev/null 2>&1 || true; }
trap 'limpar_smoke; erro "falhou na linha $LINENO"; exit 1' ERR

buscar() { docker exec "$CID" wget -q -O - "http://127.0.0.1:3000$1" 2>/dev/null || true; }

home=""
for _ in $(seq 1 40); do
  home="$(buscar /)"
  case "$home" in *"<html"*) break ;; esac
  docker inspect -f '{{.State.Running}}' "$CID" 2>/dev/null | grep -q true || break
  sleep 0.5
done
case "$home" in
  *"<html"*"Omega"*) ok "a home serve o HTML do site" ;;
  *) erro "a home não serviu o site. Log do container:"
     docker logs "$CID" 2>&1 | tail -30 >&2; limpar_smoke; exit 1 ;;
esac

case "$(buscar "$CAMINHO_ID")" in
  *"__BUILD_MANIFEST"*) ok "manifest do build $BUILD_ID servido" ;;
  *) erro "o container não serve $CAMINHO_ID"; limpar_smoke; exit 1 ;;
esac

# Links internos saem do próprio HTML, não de uma lista escrita à mão: assim a
# checagem acompanha o site quando ele mudar. Nenhum pode dar erro nem
# redirecionar para URL absoluta (esquema/porta de dentro do container).
links="$(printf '%s' "$home" | grep -o 'href="/[^"#?]*"' | cut -d'"' -f2 \
  | grep -v '^/_next/' | sort -u || true)"
[ -n "$links" ] || { erro "nenhum link interno na home"; limpar_smoke; exit 1; }
falhou=0
for u in $links; do
  cab="$(docker exec "$CID" wget -S -O /dev/null "http://127.0.0.1:3000$u" 2>&1 || true)"
  st="$(printf '%s' "$cab" | grep -o 'HTTP/1.[01] [0-9]*' | tail -1 | cut -d' ' -f2)"
  loc="$(printf '%s' "$cab" | sed -n 's/^[[:space:]]*Location:[[:space:]]*//p' | head -1)"
  case "$loc" in *://*) erro "$u redireciona para URL absoluta: $loc"; falhou=1 ;; esac
  [ "$st" = "200" ] || { erro "$u respondeu ${st:-sem resposta}"; falhou=1; }
done
[ "$falhou" -eq 0 ] || { limpar_smoke; exit 1; }
ok "$(printf '%s\n' "$links" | wc -l) links internos da home: todos 200, sem redirect absoluto"

limpar_smoke
trap 'erro "falhou na linha $LINENO"; exit 1' ERR

# --------------------------------------------------------------- deploy
passo "Deploy do stack '$STACK'"
case "$IMAGEM" in "${REPO_IMAGEM}:"?*) ;; *) erro "tag malformada: '$IMAGEM'"; exit 1 ;; esac

export OMEGAPLUS_IMAGE="$IMAGEM" RESEND_API_KEY CONTACT_EMAIL
docker stack deploy --prune --resolve-image=never -c "$DIR_OPS/stack.yml" "$STACK"

# O conversor do Docker 20.10 descarta chave desconhecida sem avisar. Confere
# o que o Swarm APLICOU, não o que o arquivo pede.
passo "Conferindo o spec aplicado"
spec() { docker service inspect "$SERVICO" --format "$1"; }
[ "$(spec '{{.Spec.TaskTemplate.ContainerSpec.ReadOnly}}')" = "true" ] \
  || { erro "read_only não foi aplicado"; exit 1; }
montagens="$(spec '{{range .Spec.TaskTemplate.ContainerSpec.Mounts}}{{.Type}}:{{.Target}} {{end}}')"
for alvo in /tmp /app/.next/cache; do
  case "$montagens" in *"tmpfs:$alvo"*) ;; *)
    erro "tmpfs de $alvo não aplicado (montagens: '${montagens:-<nenhuma>}')"
    docker service rollback "$SERVICO" || true; exit 1 ;; esac
done
spec '{{json .Spec.Labels}}' | grep -q 'letsencryptresolver' \
  || { erro "labels do Traefik não aplicadas"; docker service rollback "$SERVICO" || true; exit 1; }
ok "read_only, tmpfs e labels do Traefik aplicados"

# Convergido = réplicas rodando NA IMAGEM PEDIDA e update fechado. "1/1" sozinho
# mente durante um start-first.
passo "Aguardando convergência"
limite=$((SECONDS + 240))
while :; do
  replicas="$(docker service ls --filter "name=${SERVICO}" --format '{{.Replicas}}')"
  imagens="$(docker service ps "$SERVICO" --filter desired-state=running --format '{{.Image}}' | sort -u | tr '\n' ' ' | sed 's/ $//')"
  estado="$(spec '{{if .UpdateStatus}}{{.UpdateStatus.State}}{{end}}')"
  if [ "${replicas%%/*}" = "${replicas##*/}" ] && [ "${replicas%%/*}" != "0" ] \
     && [ "$imagens" = "$IMAGEM" ] && { [ -z "$estado" ] || [ "$estado" = "completed" ]; }; then
    ok "$SERVICO $replicas em $IMAGEM"; break
  fi
  case "$estado" in rollback_*)
    erro "o Swarm reverteu o update (estado: $estado)"
    docker service ps "$SERVICO" --no-trunc | head -6 >&2; exit 1 ;; esac
  if [ "$SECONDS" -ge "$limite" ]; then
    erro "não convergiu em 240s (réplicas ${replicas:-?}, imagens: ${imagens:-nenhuma}, update: ${estado:-?})"
    docker service ps "$SERVICO" --no-trunc | head -6 >&2
    docker service rollback "$SERVICO" || true; exit 1
  fi
  sleep 3
done

# --------------------------------------------------------- verificação
# Pelo Traefik, no loopback, com SNI real. Sai pela IDENTIDADE: o manifest do
# BUILD_ID novo. O site anterior responde 404 nesse caminho.
passo "Verificação pela borda (Traefik)"
limite=$((SECONDS + 120))
while :; do
  r="$(curl -sk --max-time 5 --resolve "${DOMINIO}:443:127.0.0.1" "https://${DOMINIO}${CAMINHO_ID}" || true)"
  case "$r" in *"__BUILD_MANIFEST"*) break ;; esac
  [ "$SECONDS" -ge "$limite" ] && { erro "https://${DOMINIO} não serve o build $BUILD_ID após 120s"; exit 1; }
  sleep 5
done
ok "https://${DOMINIO} serve o build $BUILD_ID"

emissor="$(echo | openssl s_client -connect 127.0.0.1:443 -servername "$DOMINIO" 2>/dev/null \
  | openssl x509 -noout -issuer 2>/dev/null || true)"
case "$emissor" in
  *"Let's Encrypt"*) ok "certificado: ${emissor#issuer=}" ;;
  *) erro "AVISO: certificado não é do Let's Encrypt: '${emissor:-ilegível}'" ;;
esac

# ------------------------------------------------------------- housekeeping
# Só tags deste repositório de imagem. Nada de prune global: o disco é de todos.
passo "Mantendo as últimas $IMAGENS_A_MANTER imagens para rollback"
docker image ls "$REPO_IMAGEM" --format '{{.CreatedAt}}|{{.Repository}}:{{.Tag}}' \
  | sort -r | tail -n +$((IMAGENS_A_MANTER + 1)) | cut -d'|' -f2 | while read -r ref; do
      [ -n "$ref" ] && docker image rm "$ref" >/dev/null 2>&1 && echo "  removida $ref"
    done || true

passo "Pronto — https://${DOMINIO}/ servindo $IMAGEM"
