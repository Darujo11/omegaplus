# Omega CSA Engenharia — Site Institucional

## Stack

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG + API routes + SEO nativo |
| Linguagem | TypeScript strict | Inegociável |
| Estilo | Tailwind v4 (layout) + inline styles (tokens) | Tailwind v4 não resolve classes arbitrárias com Turbopack |
| Animações | Framer Motion | `AnimatedSection` reutilizável, scroll-triggered |
| Email | Resend | Melhor DX do mercado, free tier suficiente |
| Ícones | Lucide React | Consistente e moderno |
| Deploy | VPS Monadaserver (Docker Swarm + Traefik) | Deploy automático por webhook a cada push no `main` — ver `infra/vps/` |

## Design tokens

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#080e1a` | Fundo principal |
| `--surface` | `#0d1526` | Cards, seções secundárias |
| `--border` | `#1a2d4a` | Bordas padrão |
| `--blue-primary` | `#1a7fc1` | Azul da marca (logo) |
| `--blue-light` | `#3d9fd8` | Links, labels ativas |
| `--green-accent` | `#5a9e2f` | "ENGENHARIA" na logo, checks |
| `--foreground` | `#e8edf5` | Texto principal |
| `--foreground-muted` | `#6b7d96` | Texto secundário |

## Tipografia

**Família: IBM Plex (superfamília).** Escolhida pelo DNA de engenharia — criada pela IBM para uma empresa de tecnologia. Carregada via `next/font/google` em `app/layout.tsx`, self-hosted.

| Variável | Fonte | Uso |
|---|---|---|
| `--font-sans` | IBM Plex Sans (400/500/600/700) | Corpo + títulos (hierarquia por peso/tamanho, não por troca de família) |
| `--font-display` | IBM Plex Sans 700 | Títulos — via classe `.display-heading` (tracking `-0.035em`, `text-wrap: balance`) |
| `--font-code` | IBM Plex Mono (400/500/600) | Labels técnicos, coordenadas, stats. `.stat-value` usa `tabular-nums` + zero cortado |

**Escala modular fluida** (tokens em `globals.css`, ratio ~1.25, `clamp` min@375px→max@1280px). É a fonte única de verdade para títulos — **não usar `clamp()` ad-hoc inline**:

| Token | Tamanho | Papel |
|---|---|---|
| `--text-5xl` | 44→88px | Hero (home) |
| `--text-4xl` | 34→64px | H1 de página |
| `--text-3xl` | 28→52px | H1 de detalhe / H2 grande |
| `--text-2xl` | 24→40px | H2 |
| `--text-xl` | 20→30px | Título de card / H3 |
| `--text-lg` | 17→19px | Corpo destaque |
| `--text-base` | 16→17px | Corpo (default do `body`) |
| `--text-sm` / `--text-xs` | 14px / 12px | Captions / micro-labels |

**Medida de leitura:** parágrafos longos usam `ch` (ideal 45–75). Tokens `--measure` (65ch) / `--measure-tight` (52ch) e classes `.measure` / `.measure-tight`. Baseline do corpo: `line-height: 1.6`, `text-wrap: pretty`.

## Páginas

| Rota | Arquivo | Conteúdo |
|---|---|---|
| `/` | `app/page.tsx` | Hero + Stats + 3 serviços destacados + CTA |
| `/sobre` | `app/sobre/page.tsx` | História + Diferenciais + MVV |
| `/servicos` | `app/servicos/page.tsx` | 6 serviços + Metodologia 4 etapas + CTA |
| `/portfolio` | `app/portfolio/page.tsx` | 6 projetos (placeholder para fotos reais) |
| `/contato` | `app/contato/page.tsx` | Info de contato + Formulário (Resend) |
| `/api/contato` | `app/api/contato/route.ts` | POST — processa e envia email via Resend |

## Componentes

- `components/Header.tsx` — Nav sticky, ativo por rota, mobile hamburger
- `components/Footer.tsx` — Links, contato, copyright
- `components/AnimatedSection.tsx` — Framer Motion wrapper, scroll-triggered, use `delay` prop
- `app/contato/ContactForm.tsx` — Client component, estado idle/sending/success/error

## Dados centralizados

Tudo em `lib/site-data.ts`: SITE, STATS, SERVICES, NAV_LINKS. Atualizar aqui para propagar por todo o site.

## SEO / AI SEO

- `SITE.url` (`lib/site-data.ts`) — domínio canônico de produção, fonte única para todas as URLs absolutas
- `app/sitemap.ts` — sitemap.xml (rotas estáticas + 11 áreas de atuação)
- `app/robots.ts` — robots.txt; crawlers de IA (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) liberados explicitamente
- `lib/structured-data.ts` — JSON-LD schema.org: `ProfessionalService` (org, no layout) + `Service`/`BreadcrumbList` (páginas de área)
- `app/layout.tsx` — `metadataBase` + `alternates.canonical: "./"` (canônica automática por rota)
- `public/llms.txt` — contexto para motores de IA (ChatGPT, Claude, Perplexity)
- `app/opengraph-image.tsx` — OG image 1200×630 gerada em build (previews WhatsApp/redes)

Ações off-site pendentes (manuais): Google Business Profile, Google Search Console (verificar domínio + enviar sitemap).

## Configurações obrigatórias

- `next.config.ts` — `devIndicators: false` (sem overlay de devtools)
- TypeScript strict mode ativo
- `.env.local` no `.gitignore` ✓

## Variáveis de ambiente

```bash
RESEND_API_KEY=re_xxx    # https://resend.com/api-keys
CONTACT_EMAIL=omega@omegacsa.com.br
```

## Deploy (VPS Monadaserver — 167.88.42.134)

Push no `main` de `Darujo11/omegaplus` → webhook (porta 9012, só IPs do GitHub) → `infra/vps/deploy.sh`: build tagueado pelo SHA, smoke test isolado, `docker stack deploy` do stack `omega` (serviço `omega_web`), verificação pelo Traefik via `BUILD_ID`.

| O quê | Onde |
|---|---|
| Arquivos de infra (fonte da verdade) | `infra/vps/` — reinstalar com `sudo bash instalar.sh` no servidor (idempotente) |
| Clone no servidor | `/var/www/omegaplus` (dono `deploy`) |
| Webhook / deploy / stack | `/var/www/omegaplus-webhook/`, unit `webhook-omegaplus.service` |
| Segredos do app | `/etc/omegaplus/app.env` (640 root:deploy) — nunca por git |
| Segredo do webhook | `sudo sed -n 's/^WEBHOOK_SECRET=//p' /etc/default/webhook-omegaplus` |
| Log | `/var/log/deploy-omegaplus.log` |
| Rollback | `OMEGAPLUS_TAG=<sha-12> sudo -u deploy /var/www/omegaplus-webhook/deploy.sh` (`docker image ls omegaplus-web`) |

Legado: o site antigo (`Darujo11/omega`, `webhook-omega.service`) foi desativado em 2026-09-27; imagem preservada como `omega-omega:legado-dde501d`.

## Pendências para produção

1. **Fotos reais** — substituir os placeholders de portfólio por imagens reais dos projetos
2. **Resend configurado** — cadastrar domínio `omegacsa.com.br` no Resend para enviar de `noreply@omegacsa.com.br`

## Empresa

- **Razão social**: OMEGA ENGENHARIA CSA LTDA - EPP (`SITE.legalName`) · nome fantasia: OMEGA ENGENHARIA · marca no site: Omega CSA Engenharia
- **CNPJ**: 19.954.004/0001-37 (`SITE.cnpj`) — rodapé, JSON-LD (`legalName` + `taxID`), `llms.txt`
- **Endereço**: Centro Administrativo — Rua 21 de Abril, 272 – Edifício Brasiluso, Sala 212 – Centro, Campos dos Goytacazes – RJ, CEP 28010-170
- **Celular**: (22) 99964-4607 · (22) 99818-0029
- **Email**: omega@omegacsa.com.br · omegaengenharia.csa@gmail.com
- **WhatsApp**: (22) 99964-4607
