# MEMORY / SDD — Omega CSA Engenharia

Documento técnico de referência do projeto (`Spec-Driven Development`), com arquitetura, stack, bibliotecas, contratos e decisões de implementação.

## 1) Escopo do sistema

Site institucional da **Omega CSA Engenharia**, orientado a:

- presença digital e posicionamento de marca;
- SEO local (Campos dos Goytacazes e região);
- apresentação de serviços e áreas de atuação;
- captação de leads via formulário de contato.

## 2) Stack e versões reais

## Core

- **Framework:** Next.js `16.2.7` (App Router)
- **Runtime UI:** React `19.2.4`
- **Linguagem:** TypeScript strict
- **Estilo:** Tailwind CSS v4 + estilos inline com design tokens
- **Animações:** Framer Motion `12.40.0`
- **Ícones:** Lucide React `1.17.0`
- **Email transacional:** Resend `6.12.4`

## Tooling

- **Lint:** ESLint `9` + `eslint-config-next`
- **Format:** Prettier `3.8.3` + `prettier-plugin-tailwindcss`
- **Build CSS:** `@tailwindcss/postcss`

## Scripts oficiais

- `npm run dev` — desenvolvimento local
- `npm run build` — build de produção
- `npm run start` — start da build
- `npm run lint` — validação de lint

## 3) Arquitetura de alto nível

Arquitetura baseada em **App Router** com renderização estática/servidor para páginas institucionais e uma API route para contato.

### Camadas

1. **Apresentação (UI):**
   - páginas em `app/**/page.tsx`;
   - layout global em `app/layout.tsx`;
   - componentes compartilhados em `components/*`.

2. **Conteúdo e domínio (dados estáticos):**
   - centralizado em `lib/site-data.ts` (`SITE`, `STATS`, `AREAS`, `SERVICES`, `NAV_LINKS`).

3. **Integração externa (email):**
   - endpoint `app/api/contato/route.ts`;
   - provedor Resend via SDK.

## 4) Estrutura de rotas

### Rotas de página

- `/` — homepage institucional
- `/sobre` — apresentação da empresa
- `/servicos` — serviços técnicos
- `/portfolio` — vitrine de projetos
- `/clientes` — clientes e atestados
- `/contato` — formulário e canais de contato
- `/areas-de-atuacao` — listagem de áreas
- `/areas-de-atuacao/[slug]` — detalhe dinâmico por área

### Rota de API

- `POST /api/contato` — recebe dados do formulário e envia email

## 5) Componentização

### Componentes globais

- `components/Header.tsx` — navegação principal e contexto de rotas
- `components/Footer.tsx` — informações institucionais + links
- `components/AnimatedSection.tsx` — wrapper padrão para animações de entrada (`whileInView`)

### Componente cliente de formulário

- `app/contato/ContactForm.tsx` (`"use client"`)
  - estado local (`idle | sending | success | error`);
  - submissão via `fetch("/api/contato")`;
  - feedback de sucesso/erro para UX de conversão.

## 6) Fluxo de dados e responsabilidades

### Fluxo de conteúdo

`lib/site-data.ts` -> páginas/componentes -> renderização UI

Regras:

- manter todos os dados institucionais centralizados;
- evitar duplicação textual em múltiplas páginas;
- tratar `site-data` como fonte única de verdade para conteúdo estruturado.

### Fluxo de contato (lead)

1. Usuário preenche formulário em `/contato`.
2. Frontend envia `POST /api/contato` (JSON).
3. API valida campos obrigatórios e regex de email.
4. API chama `resend.emails.send`.
5. Frontend exibe estado de sucesso ou erro.

## 7) Contrato da API de contato

## Request (`POST /api/contato`)

Payload esperado:

- `name: string` (obrigatório)
- `email: string` (obrigatório, formato válido)
- `phone?: string` (opcional)
- `subject: string` (obrigatório)
- `message: string` (obrigatório)

## Responses

- `200 { ok: true }` — envio concluído
- `400 { error: "Campos obrigatórios ausentes" }`
- `400 { error: "E-mail inválido" }`
- `500 { error: "Erro interno" }`

## Dependências de ambiente

- `RESEND_API_KEY` — chave da API Resend
- `CONTACT_EMAIL` — inbox de destino (fallback no código: `omega@omegacsa.com.br`)

## 8) Design system e diretrizes visuais

Base visual em `app/globals.css`.

### Tokens principais

- Fundo: `--background: #080e1a`
- Superfície: `--surface: #0d1526`
- Borda: `--border: #1a2d4a`
- Primária: `--blue-primary: #1a7fc1`
- Acento: `--green-accent: #5a9e2f`
- Texto: `--foreground: #e8edf5`

### Tipografia

- Família principal: **IBM Plex Sans**
- Família técnica: **IBM Plex Mono**
- Carregamento via `next/font/google` em `app/layout.tsx`
- Escala fluida com tokens (`--text-xs` ... `--text-5xl`)

## 9) Convenções técnicas

- TypeScript strict obrigatório.
- Preferir componentes pequenos e focados.
- Evitar hardcode de conteúdo institucional fora de `lib/site-data.ts`.
- Manter padrão de animação usando `AnimatedSection`.
- Preservar consistência visual por tokens (evitar valores soltos sem justificativa).

## 10) Segurança e confiabilidade (nível atual)

- Validação básica de entrada na API (`required` + regex email).
- Sem persistência de banco de dados (risco de integridade de dados reduzido).
- Não versionar `.env.local` (já coberto no `.gitignore`).
- Logs de erro no servidor para diagnóstico (`console.error` no handler).

## 11) Deploy e operação

## Plataforma-alvo

- Vercel (deploy contínuo a partir do GitHub).

## Checklist mínimo de produção

1. Configurar `RESEND_API_KEY` no ambiente.
2. Configurar `CONTACT_EMAIL` de destino.
3. Validar domínio de envio no Resend para remover remetente de sandbox.
4. Trocar imagens placeholder do portfólio por materiais finais.
5. Rodar `npm run lint` e `npm run build` antes de publicar.

## 12) Pendências funcionais mapeadas

- Curadoria e validação final do conteúdo institucional.
- Substituição de placeholders por fotos finais.
- Revisão de copy comercial por página.
- Fortalecer anti-spam do formulário (ex.: honeypot/rate-limit) em etapa futura.

## 13) Riscos e observações

- O projeto foi inicializado com Next `16.2.7`; mudanças de API/convenção entre versões podem impactar manutenção futura.
- Tailwind v4 + abordagem híbrida com inline styles é decisão intencional para preservar controle visual com tokens.

## 14) Fonte da verdade deste documento

Este arquivo é a memória técnica consolidada do projeto.  
Ao alterar arquitetura, bibliotecas, rotas, contratos ou padrões de design, atualizar este documento no mesmo ciclo da mudança.
