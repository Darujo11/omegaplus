# MEMORY EXECUTIVO — Omega CSA Engenharia

Versão resumida para leitura rápida.  
Referência técnica completa: `MEMORY.md`.

## Visão geral

- **Projeto:** site institucional da Omega CSA Engenharia
- **Objetivo:** posicionamento digital, SEO local e captação de leads
- **Modelo:** páginas institucionais + formulário de contato com envio por email
- **Status atual:** base pronta para produção, com pendências de conteúdo final

## Arquitetura (resumo)

- **Frontend:** Next.js (App Router) + React + TypeScript strict
- **UI:** Tailwind v4 + design tokens em `globals.css` + estilos inline onde necessário
- **Componentes globais:** `Header`, `Footer`, `AnimatedSection`
- **Dados institucionais:** centralizados em `lib/site-data.ts`
- **Backend leve:** rota `POST /api/contato` para envio de email via Resend

## Stack e bibliotecas principais

- `next` `16.2.7`
- `react` / `react-dom` `19.2.4`
- `typescript` `^5`
- `tailwindcss` `^4`
- `framer-motion` `^12.40.0`
- `lucide-react` `^1.17.0`
- `resend` `^6.12.4`
- `eslint` `^9` + `eslint-config-next`
- `prettier` + `prettier-plugin-tailwindcss`

## Rotas principais

- `/` Início
- `/sobre` A empresa
- `/areas-de-atuacao` + `/areas-de-atuacao/[slug]`
- `/servicos`
- `/portfolio`
- `/clientes`
- `/contato`
- `/api/contato` (API)

## Fluxo de lead (contato)

1. Usuário envia formulário em `/contato`.
2. Frontend chama `POST /api/contato`.
3. API valida dados obrigatórios e email.
4. Resend envia mensagem ao email configurado.
5. Frontend mostra sucesso ou erro.

## Ambiente e deploy

- **Deploy alvo:** Vercel
- **Variáveis obrigatórias:**
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL`
- **Comandos de validação:**
  - `npm run lint`
  - `npm run build`

## Pendências para fechar produção

1. Substituir placeholders por fotos finais de portfólio.
2. Revisar e validar copy institucional final.
3. Configurar domínio de envio no Resend.
4. Publicar no Vercel com variáveis de ambiente.

## Regras de manutenção

- Atualizar `lib/site-data.ts` ao alterar conteúdo institucional.
- Manter consistência visual via tokens globais.
- Atualizar `MEMORY.md` sempre que houver mudança estrutural (arquitetura, contratos, stack, rotas).
