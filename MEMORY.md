# MEMORY — Omega CSA Engenharia Site

## Estado atual (2026-06-06)

**Fase**: Init completo. Pronto para desenvolvimento de features e conteúdo real.

## Decisões cravadas

- Inline styles para todos os design tokens — Tailwind v4 + Turbopack não resolve classes arbitrárias (`bg-[#1a7fc1]`, etc.)
- Dark-first com azul #1a7fc1 da logo como primary
- `AnimatedSection` encapsula todo scroll-fade (Framer Motion) — não usar motion diretamente nas páginas
- Dados da empresa e serviços centralizados em `lib/site-data.ts`
- Formulário de contato → POST `/api/contato` → Resend

## Pendente

- [ ] Fotos reais dos projetos (portfólio tem placeholders Ω)
- [ ] Configurar domínio Resend (`omegacsa.com.br`) para emails branded
- [ ] Deploy Vercel + configurar RESEND_API_KEY e CONTACT_EMAIL como env vars
- [ ] Textos do portfólio validados com o cliente (Max)
- [ ] Conteúdo real da página Sobre (história, equipe, ano de fundação)

## Gotchas

- `create-next-app@16` instalou Next.js 16.2.7 — APIs e convenções podem diferir das versões 14/15 conhecidas
- 2 CVEs moderate no PostCSS interno do Next — fix quebraria (downgrade para v9). Não corrigir.
