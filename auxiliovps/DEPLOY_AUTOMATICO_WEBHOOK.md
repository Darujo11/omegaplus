# Roteiro: Deploy Automatico via Webhook (GitHub -> VPS)

Este guia documenta o passo a passo que fizemos para diagnosticar e corrigir o deploy automatico do app `torredeoracao`.

## 1) Contexto do ambiente

- App publico: `http://sentinela.vidanovaguarus.com.br/`
- VPS: `167.88.42.134`
- Endpoint do webhook de deploy: `http://167.88.42.134:9000/deploy`
- Servico systemd do webhook: `webhook-torredeoracao.service`
- Script de deploy: `/var/www/deploy-torredeoracao.sh`
- Aplicacao no servidor: `/var/www/torredeoracao`
- Servico Docker Swarm: `torredeoracao_web`

---

## 2) Diagnostico inicial

### 2.1 Testar se endpoint responde

```bash
curl -i http://127.0.0.1:9000/deploy
curl -i http://167.88.42.134:9000/deploy
```

**O que faz**
- `curl -i`: faz requisicao HTTP e mostra headers + body.
- Primeiro comando testa localmente na VPS (`127.0.0.1`).
- Segundo testa via IP publico.

### 2.2 Verificar processo na porta 9000

```bash
sudo ss -ltnp | grep :9000 || true
```

**O que faz**
- `ss -ltnp`: lista portas TCP em escuta e qual processo esta usando.
- `grep :9000`: filtra apenas porta 9000.
- `|| true`: evita quebrar o script se nao houver resultado.

### 2.3 Verificar servico e logs do systemd

```bash
sudo systemctl status webhook-torredeoracao.service --no-pager -l
sudo journalctl -u webhook-torredeoracao.service -n 200 --no-pager
```

**O que faz**
- `systemctl status`: mostra se o servico esta ativo, PID, ultimos logs.
- `journalctl -u ...`: mostra historico de logs do servico.

### 2.4 Inspecionar codigo do webhook e unit file

```bash
sudo sed -n '1,260p' /var/www/webhook-torredeoracao/server.js
sudo systemctl cat webhook-torredeoracao.service
```

**O que faz**
- `sed -n '1,260p'`: mostra linhas do arquivo sem editar.
- `systemctl cat`: mostra a configuracao efetiva do servico.

---

## 3) Causa raiz encontrada

No log de deploy:

- `npm ci` falhava com `EUSAGE`.
- Mensagem principal: `package.json` e `package-lock.json` fora de sincronia.
- Faltavam entradas do `esbuild@0.28.0` no lockfile.

Com isso, o webhook era disparado corretamente, mas o script de deploy falhava no passo de instalacao de dependencias.

---

## 4) Comandos de analise do erro real

```bash
sudo tail -n 200 /var/log/deploy-torredeoracao.log
sudo sed -n '1,260p' /var/www/deploy-torredeoracao.sh
sudo ls -lah /var/www/deploy-torredeoracao.sh
sudo bash -x /var/www/deploy-torredeoracao.sh
echo "EXIT_CODE=$?"
```

**O que faz**
- `tail -n 200`: mostra ultimas 200 linhas do log do deploy.
- `bash -x`: executa script em modo debug (mostra cada comando).
- `EXIT_CODE`: mostra codigo de saida do ultimo comando.

---

## 5) Correcao aplicada no script de deploy

Ajustamos para usar fallback:

- Primeiro tenta `npm ci --include=dev` (instalacao reproduzivel).
- Se falhar por lock fora de sync, cai para `npm install --include=dev`.

Comando usado:

```bash
sudo cp /var/www/deploy-torredeoracao.sh /var/www/deploy-torredeoracao.sh.bak
sudo sed -i 's/npm ci --include=dev/npm ci --include=dev || npm install --include=dev/' /var/www/deploy-torredeoracao.sh
sudo chmod +x /var/www/deploy-torredeoracao.sh
```

**O que faz**
- cria backup do script.
- altera a linha de instalacao de dependencias.
- garante permissao de execucao.

---

## 6) Teste manual do deploy completo

```bash
cd /var/www/torredeoracao
git fetch origin
git reset --hard origin/main
git clean -fd

npm install --include=dev
npm run build

docker build --pull -t torredeoracao:latest .
docker service update --force --image torredeoracao:latest torredeoracao_web
docker service ps torredeoracao_web --no-trunc
```

**O que faz**
- sincroniza o codigo local com o `main` remoto.
- instala dependencias e builda o frontend.
- gera imagem Docker atualizada.
- força update do servico Swarm para subir nova versao.
- verifica estado das tasks.

> Nota: no teste manual, se nao existir `Dockerfile`, o `docker build` falha.
> No script oficial, esse caso ja e tratado (ele cria `Dockerfile` e `nginx.conf` se faltarem).

---

## 7) Endurecimento de seguranca do webhook

### 7.1 Criar arquivo de ambiente

```bash
NEW_SECRET="$(openssl rand -hex 32)"
echo "$NEW_SECRET"

sudo tee /etc/default/webhook-torredeoracao >/dev/null <<EOF
WEBHOOK_SECRET=$NEW_SECRET
DEPLOY_PORT=9000
DEPLOY_BRANCH=main
DEPLOY_SCRIPT=/var/www/deploy-torredeoracao.sh
EOF

sudo chmod 600 /etc/default/webhook-torredeoracao
```

**O que faz**
- gera um secret forte aleatorio.
- salva variaveis de ambiente do webhook em arquivo seguro.
- restringe permissao do arquivo (`600`).

### 7.2 Atualizar `server.js`

Foi aplicado `server.js` com:

- secret vindo de `process.env.WEBHOOK_SECRET` (nao hardcoded).
- validacao de assinatura `X-Hub-Signature-256`.
- filtro por evento `push` e branch `main`.
- rota `/health`.
- logs melhores (`stdout/stderr`) da execucao de deploy.

### 7.3 Atualizar unit file systemd

```bash
sudo cp /etc/systemd/system/webhook-torredeoracao.service /etc/systemd/system/webhook-torredeoracao.service.bak.$(date +%F-%H%M%S)

sudo tee /etc/systemd/system/webhook-torredeoracao.service >/dev/null <<'EOF'
[Unit]
Description=Webhook Deploy Torre de Oracao
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/webhook-torredeoracao
EnvironmentFile=/etc/default/webhook-torredeoracao
ExecStart=/usr/bin/node /var/www/webhook-torredeoracao/server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl restart webhook-torredeoracao.service
sudo systemctl status webhook-torredeoracao.service --no-pager -l
```

**O que faz**
- injeta variaveis do arquivo `/etc/default/...` no servico.
- recarrega o systemd e reinicia o webhook.
- valida status.

---

## 8) Testes finais de validacao

### 8.1 Healthcheck

```bash
curl -i http://127.0.0.1:9000/health
```

Esperado: `HTTP/1.1 200 OK` e body `ok`.

### 8.2 Disparo assinado local

```bash
SECRET=$(sudo awk -F= '/^WEBHOOK_SECRET=/{print $2}' /etc/default/webhook-torredeoracao)
BODY='{"ref":"refs/heads/main"}'
SIG="sha256=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$SECRET" -hex | sed 's/^.* //')"

curl -i -X POST http://127.0.0.1:9000/deploy \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -H "X-GitHub-Delivery: local-test-1" \
  -H "X-Hub-Signature-256: $SIG" \
  --data "$BODY"
```

Esperado: `Deploy started`.

### 8.3 Acompanhar logs

```bash
sudo journalctl -u webhook-torredeoracao.service -f
sudo tail -f /var/log/deploy-torredeoracao.log
```

Esperado:
- log do webhook com `Deploy disparado (...)`.
- log do script com `Deploy concluido`.

### 8.4 Validar servico e aplicacao

```bash
docker service ps torredeoracao_web --no-trunc
curl -I https://sentinela.vidanovaguarus.com.br/
```

Esperado:
- task principal `Running`.
- resposta `HTTP/2 200` no dominio publico.

---

## 9) Configuracao no GitHub Webhook (obrigatorio)

No repositorio GitHub:

1. `Settings` -> `Webhooks` -> webhook de deploy.
2. URL: `http://167.88.42.134:9000/deploy`
3. Content type: `application/json`
4. Secret: mesmo valor de `WEBHOOK_SECRET` do arquivo `/etc/default/webhook-torredeoracao`
5. Evento: `Just the push event`
6. Salvar e testar em `Recent Deliveries` (Redeliver).

---

## 10) Melhorias recomendadas (proximo nivel)

1. Corrigir `package-lock.json` no ambiente de desenvolvimento e subir no GitHub, para o `npm ci` voltar a passar sem fallback.
2. Opcional: adicionar rotacao automatica de logs (`logrotate`) para `/var/log/deploy-torredeoracao.log`.
3. Opcional: restringir origem por IP (Cloudflare/GitHub) no firewall/reverse proxy.
4. Opcional: monitoramento com alerta se deploy falhar (Telegram/Discord/Slack).

---

## 11) Comandos de emergencia (resumo rapido)

```bash
# Status do webhook
sudo systemctl status webhook-torredeoracao.service --no-pager -l

# Ultimos logs do webhook
sudo journalctl -u webhook-torredeoracao.service -n 120 --no-pager

# Ultimos logs do deploy
sudo tail -n 200 /var/log/deploy-torredeoracao.log

# Reiniciar webhook
sudo systemctl restart webhook-torredeoracao.service

# Healthcheck
curl -i http://127.0.0.1:9000/health
```

---

Feito para estudo e operacao pratica. Se quiser, posso gerar uma versao 2 com diagramas (fluxo push -> webhook -> script -> docker swarm).
