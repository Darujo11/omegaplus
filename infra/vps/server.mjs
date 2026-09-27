#!/usr/bin/env node
/**
 * Webhook de deploy do omegacsa.com.br (repo Darujo11/omegaplus).
 *
 * Recebe `push` do GitHub, confere a assinatura HMAC, e roda
 * `git pull --ff-only` + `deploy.sh` (em /var/www/omegaplus-webhook). Nada mais.
 *
 * Roda como o usuário `deploy` (grupo docker), sob systemd. A configuração
 * vem toda de /etc/default/webhook-omegaplus — ver infra/vps/instalar.sh.
 *
 * Decisões que parecem detalhe e não são:
 *
 * - Responde 202 ANTES de deployar. O GitHub desiste da entrega em 10s; um
 *   deploy leva minutos. Segurar a conexão faria toda entrega aparecer como
 *   falha no painel do GitHub mesmo quando o deploy deu certo.
 * - Deploys são serializados, e a fila tem tamanho 1. Três pushes seguidos
 *   não viram três deploys concorrentes disputando o mesmo repositório;
 *   viram o deploy atual mais UM, que já vai pegar o HEAD mais novo.
 * - O corpo é lido com teto de tamanho. Sem isso, qualquer um que alcance a
 *   porta derruba o processo mandando um POST infinito — e a assinatura só
 *   pode ser conferida DEPOIS de ler o corpo inteiro, então o teto tem que
 *   vir antes da autenticação.
 */

import http from "http";
import crypto from "crypto";
import { spawn } from "child_process";
import { appendFileSync, existsSync } from "fs";

const PORTA = Number(process.env.WEBHOOK_PORT || 0);
const SEGREDO = process.env.WEBHOOK_SECRET || "";
const REPO = process.env.WEBHOOK_REPO || "Darujo11/omegaplus";
const BRANCH = process.env.WEBHOOK_BRANCH || "main";
const DIR_REPO = process.env.WEBHOOK_REPO_DIR || "/var/www/omegaplus";
const SCRIPT = process.env.WEBHOOK_DEPLOY_SCRIPT || "/var/www/omegaplus-webhook/deploy.sh";
const ARQUIVO_LOG = process.env.WEBHOOK_LOG || "/var/log/deploy-omegaplus.log";

// Identidade própria: quem checar a saúde deste serviço tem que conseguir
// distinguir ele de qualquer outro processo que responda 200 nesta porta.
const IDENTIDADE = "omegaplus-webhook";

const LIMITE_CORPO = 1024 * 1024; // 1 MB — payload de push do GitHub não chega perto

if (!SEGREDO) {
  console.error("WEBHOOK_SECRET não definido. Abortando.");
  process.exit(1);
}
if (!PORTA) {
  console.error("WEBHOOK_PORT não definido. Abortando.");
  process.exit(1);
}

function log(...partes) {
  const linha = `[${new Date().toISOString()}] ${partes.join(" ")}`;
  console.log(linha); // journal
  try {
    appendFileSync(ARQUIVO_LOG, linha + "\n");
  } catch (erro) {
    console.error("não consegui escrever em", ARQUIVO_LOG, erro.message);
  }
}

/**
 * Comparação em tempo constante.
 *
 * `crypto.timingSafeEqual` LANÇA quando os buffers têm tamanhos diferentes —
 * e esse lançamento é, ele próprio, um vazamento de tempo. Por isso os dois
 * lados passam por um HMAC antes: digests têm sempre 32 bytes, venha o que
 * vier no header.
 */
function assinaturaConfere(corpo, cabecalho) {
  if (typeof cabecalho !== "string" || !cabecalho.startsWith("sha256=")) return false;
  const esperada = "sha256=" + crypto.createHmac("sha256", SEGREDO).update(corpo).digest("hex");
  const chaveDeRuido = crypto.randomBytes(32);
  const a = crypto.createHmac("sha256", chaveDeRuido).update(cabecalho).digest();
  const b = crypto.createHmac("sha256", chaveDeRuido).update(esperada).digest();
  return crypto.timingSafeEqual(a, b);
}

let deployando = false;
let temPendente = false;

function deployar(motivo) {
  if (deployando) {
    // Fila de tamanho 1 de propósito: o deploy que vier depois pega o HEAD
    // mais recente de qualquer jeito, então enfileirar cinco é enfileirar
    // quatro repetições do mesmo trabalho.
    if (!temPendente) {
      temPendente = true;
      log("deploy em andamento; um novo foi enfileirado —", motivo);
    } else {
      log("deploy em andamento e fila já cheia; ignorando —", motivo);
    }
    return;
  }

  // Confere o diretório antes do spawn. Quando o cwd não existe, o Node
  // reporta `spawn /bin/bash ENOENT` — culpando um binário que está lá e
  // mandando quem depura procurar no lugar errado.
  if (!existsSync(DIR_REPO)) {
    log(`=== não vou deployar: ${DIR_REPO} não existe ===`);
    return;
  }

  deployando = true;
  log("=== iniciando deploy:", motivo, "===");

  const comando = [
    `set -Eeuo pipefail`,
    `git -C ${DIR_REPO} fetch --prune origin`,
    `git -C ${DIR_REPO} pull --ff-only`,
    `${SCRIPT}`,
  ].join(" && ");

  const filho = spawn("/bin/bash", ["-lc", comando], {
    cwd: DIR_REPO,
    env: { ...process.env, TERM: "dumb" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const registrar = (fluxo) => (pedaco) => {
    for (const linha of pedaco.toString().split("\n")) {
      if (linha.trim()) log(`  ${fluxo}|`, linha);
    }
  };
  filho.stdout.on("data", registrar("out"));
  filho.stderr.on("data", registrar("err"));

  filho.on("close", (codigo) => {
    deployando = false;
    if (codigo === 0) log("=== deploy concluído com sucesso ===");
    else log(`=== DEPLOY FALHOU (exit ${codigo}) ===`);

    if (temPendente) {
      temPendente = false;
      deployar("push que chegou durante o deploy anterior");
    }
  });

  filho.on("error", (erro) => {
    deployando = false;
    temPendente = false;
    log("=== não consegui nem iniciar o deploy:", erro.message, "===");
  });
}

const servidor = http.createServer((req, res) => {
  const responder = (status, corpo) => {
    res.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
    res.end(corpo + "\n");
  };

  if (req.method === "GET" && req.url === "/health") {
    return responder(200, `${IDENTIDADE} ok`);
  }

  if (req.method !== "POST") {
    log(`405: ${req.method} ${req.url} de ${req.socket.remoteAddress}`);
    return responder(405, "method not allowed");
  }

  let tamanho = 0;
  const pedacos = [];
  let abortado = false;

  req.on("data", (pedaco) => {
    if (abortado) return;
    tamanho += pedaco.length;
    if (tamanho > LIMITE_CORPO) {
      abortado = true;
      log(`413: corpo passou de ${LIMITE_CORPO} bytes, vindo de ${req.socket.remoteAddress}`);
      responder(413, "payload too large");
      req.destroy();
      return;
    }
    pedacos.push(pedaco);
  });

  req.on("end", () => {
    if (abortado) return;
    const corpo = Buffer.concat(pedacos);

    if (!assinaturaConfere(corpo, req.headers["x-hub-signature-256"])) {
      log("assinatura inválida de", req.socket.remoteAddress);
      return responder(401, "invalid signature");
    }

    const evento = req.headers["x-github-event"];
    if (evento !== "ping" && evento !== "push") {
      return responder(202, `evento '${evento}' ignorado`);
    }

    // O GitHub manda o payload de DOIS jeitos, e o padrão do painel dele é o
    // segundo: `application/json` (corpo é JSON) ou
    // `application/x-www-form-urlencoded` (corpo é `payload=<json escapado>`).
    // Aceitar só um deixa a instalação dependendo de alguém ter marcado a
    // opção certa — e o sintoma é uma entrega 400 que o ping não reproduz,
    // porque o ping respondia antes de chegar aqui.
    const tipo = String(req.headers["content-type"] || "").split(";")[0].trim();
    let textoJson = corpo.toString("utf8");

    if (tipo === "application/x-www-form-urlencoded") {
      const campo = new URLSearchParams(textoJson).get("payload");
      if (!campo) {
        log(`400: corpo urlencoded sem campo 'payload' (evento ${evento})`);
        return responder(400, "corpo urlencoded sem campo 'payload'");
      }
      textoJson = campo;
    }

    let dados;
    try {
      dados = JSON.parse(textoJson);
    } catch (erro) {
      // Todo caminho de falha registra. Um 400 silencioso já custou uma
      // investigação inteira em firewall, porta e repositório enquanto a
      // resposta estava sendo devolvida ao GitHub o tempo todo.
      log(`400: corpo não é JSON (content-type '${tipo || "ausente"}'):`, erro.message);
      return responder(400, `corpo não é JSON válido para content-type '${tipo}'`);
    }

    const repoDoEvento = dados.repository ? dados.repository.full_name : null;

    // O ping confere o repositório junto. Sem isso, um webhook cadastrado no
    // repositório errado dá ping VERDE — porque ping só testa conexão e
    // segredo — e depois nunca entrega push nenhum. O sintoma é "funcionou no
    // teste e não funciona de verdade", que é o pior tipo de sintoma.
    if (repoDoEvento && repoDoEvento !== REPO) {
      log(`${evento} de repositório inesperado: '${repoDoEvento}' (espero '${REPO}')`);
      return responder(
        409,
        `este webhook serve '${REPO}', mas o evento veio de '${repoDoEvento}'`
      );
    }

    if (evento === "ping") {
      log(`ping recebido e autenticado — repositório ${repoDoEvento || "(não informado)"}`);
      return responder(200, `pong — ${REPO}`);
    }
    if (dados.ref !== `refs/heads/${BRANCH}`) {
      log("push em", dados.ref, "— só", BRANCH, "deploya");
      return responder(202, `ref '${dados.ref}' ignorada`);
    }

    // 202 primeiro: o GitHub desiste em 10s e o deploy leva minutos.
    const sha = (dados.after || "").slice(0, 12);
    responder(202, "deploy enfileirado");
    deployar(`push ${sha} em ${BRANCH}`);
  });
});

servidor.listen(PORTA, "0.0.0.0", () => {
  log(`${IDENTIDADE} ouvindo na porta ${PORTA} — repo ${REPO}, branch ${BRANCH}`);
});

for (const sinal of ["SIGTERM", "SIGINT"]) {
  process.on(sinal, () => {
    log(`recebi ${sinal}, encerrando`);
    servidor.close(() => process.exit(0));
  });
}
