# Auditoria de SEO — omegacsa.com.br

Data: 2026-09-27 · Skill: `seo-audit` v2.0.1 · Escopo: site inteiro (18 URLs do sitemap), técnico + on-page + conteúdo · Versão auditada: `omegaplus-web:2fb42a33f084`

Método: HTML renderizado no servidor, obtido com curl (o Next.js entrega o JSON-LD no HTML, então a detecção de schema é confiável aqui), mais o Lighthouse 12 local em perfil mobile. A API do PageSpeed Insights estava sem cota, e o CrUX (dados de campo) não foi consultado.

## Resumo executivo

A base técnica é **muito boa**: todas as páginas indexáveis, canonical correta em todas, sitemap e robots corretos, JSON-LD bem estruturado, `lang="pt-BR"`, Open Graph, `llms.txt`, Lighthouse SEO 100 e Best Practices 100. O site não tem nenhum bloqueio de indexação.

Os problemas estão em três lugares:

1. **Home lenta no celular: LCP de 17,9 s** (meta: < 2,5 s). A causa é o H1 animado pelo Framer Motion, que nasce invisível (`opacity: 0`), e não o peso da página. Nota de performance: 58.
2. **Home com 8,2 MB**: vídeo do hero de 4,9 MB e pôster PNG de 2 MB, sem cache.
3. **Conteúdo fino nas 11 páginas de área**, que são justamente as páginas que deveriam rankear para "engenharia X em Campos dos Goytacazes".

**Ganhos rápidos:** tirar a animação do H1 do hero (1 linha), converter o pôster para AVIF/WebP e encurtar 5 títulos e 2 descrições.

## Técnico

| Item | Status | Evidência |
|---|---|---|
| robots.txt | ✓ | libera tudo, bloqueia `/api/`, aponta o sitemap, libera explicitamente GPTBot, ClaudeBot, PerplexityBot e Google-Extended |
| sitemap.xml | ✓ / ⚠ | 18 URLs, todas 200 e canônicas. `lastmod` é o horário do build em todas, então o Google aprende a ignorar |
| Canonical | ✓ | própria em todas as 18 páginas; `www` e `omega.autozapx.com` apontam a canonical para o domínio principal |
| HTTP → HTTPS | ✓ | 301 |
| www → domínio principal | ⚠ | `https://www.omegacsa.com.br/` responde **200** em vez de 301. A canonical segura, mas o ideal é redirecionar |
| Domínio antigo `omega.autozapx.com` | ⚠ | serve o site inteiro (200). Mesma situação: canonical ok, redirecionamento 301 seria melhor |
| Barra no final da URL | ✓ | `/sobre/` → 308 → `/sobre` |
| 404 | ✓ | resposta 404 real (sem *soft 404*) |
| TTFB | ✓ | ~120 ms no servidor, 0,6 a 0,9 s da rede daqui |
| HTTPS / certificado | ✓ | Let's Encrypt válido |
| HSTS e cabeçalhos de segurança | ✗ | sem `Strict-Transport-Security`, `X-Content-Type-Options` e `Referrer-Policy` (não afetam ranking, mas afetam a confiança numa auditoria) |
| Cache de arquivos estáticos | ✗ | `/video_hero/*` e `/portfolio/*` saem com `max-age=0`: o visitante baixa 7 MB de novo a cada visita |
| Verificação no Search Console | ? | nenhuma meta de verificação no HTML; pode ter sido feita por DNS. Pendência listada no `CLAUDE.md` |

### Core Web Vitals (Lighthouse mobile, laboratório)

| Página | Perf. | LCP | CLS | TBT | FCP | Peso |
|---|---|---|---|---|---|---|
| `/` | **58** | **17,9 s** | 0 | 100 ms | 4,2 s | **8,2 MB** |
| `/portfolio` | 91 | 3,1 s | 0 | 70 ms | 1,0 s | 418 KB |

**Diagnóstico do LCP da home.** O elemento do LCP é o `<h1 class="display-heading">`. Distribuição do tempo: TTFB 0,6 s, carregamento 0 s, **atraso de renderização 17,3 s**. O H1 está dentro de `AnimatedSection` (`app/page.tsx:205`), que renderiza no servidor com `opacity: 0` e só fica visível depois que o JavaScript é carregado e executado e o `whileInView` dispara. Em celular médio, o maior elemento da tela fica invisível até o bundle rodar.

**Correção:** o hero não deve usar a animação que depende de rolagem. Ou tirar o `AnimatedSection` do bloco do H1, ou fazer a entrada com CSS (`@keyframes` com `animation-fill-mode: both`, que roda sem JavaScript). O LCP deve cair para cerca de 1,5 a 2,5 s.

**Peso:** `videoback.mp4` tem 4,9 MB, e `hero-poster.png` tem 2 MB, o que é absurdo para um pôster. Recomendado: pôster em AVIF/WebP com cerca de 80 a 150 KB, e vídeo em versão mobile de 720p H.264 com ~1 a 1,5 MB (ou sem vídeo abaixo de 768 px). `omega.mp4` (1,5 MB) está em `public/` e não é usado em lugar nenhum.

## On-page

### Títulos

Bem feitos no geral: únicos, com a marca no final e cidade na home. Cinco passam de 60 caracteres e serão cortados no Google:

| Página | Tamanho | Sugestão |
|---|---|---|
| cartografia-topografia | 75 | `Topografia e Georreferenciamento em Campos-RJ \| Omega CSA` |
| geotecnia-barragens | 69 | `Geotecnia e Segurança de Barragens \| Omega CSA Engenharia` |
| engenharia-civil | 64 | `Engenharia Civil e Arquitetura em Campos-RJ \| Omega CSA` |
| modelagem-tecnologia | 59 | ok |
| sobre / contato | 32 / 30 | curtos: `Sobre a Omega CSA Engenharia — Campos dos Goytacazes, RJ` |

As páginas de área **não levam a cidade no título**, e a busca local é "topografia Campos dos Goytacazes". Colocar a cidade (ou "Campos-RJ") nos títulos das áreas é a mudança on-page de maior efeito.

### Meta descriptions

Todas únicas. Fora do tamanho ideal (150 a 160):
- `/portfolio`: **237** (cortada). `/sobre`: 172.
- `/contato`: 106 (curta; falta telefone e WhatsApp).
- Páginas de área: 124 a 137, com um sufixo repetido (`— Omega CSA Engenharia, Campos dos Goytacazes, RJ`). Funciona, mas dá para trocar por uma chamada para ação ("Solicite orçamento pelo WhatsApp").

### Títulos de seção (H1 a H4)

- Um H1 por página ✓.
- **H1 da home: "Áreas de atuação em engenharia"**. Não tem marca, cidade nem proposta. Sugestão: "Engenharia multidisciplinar em Campos dos Goytacazes".
- H1s de página com ponto final ("A empresa.", "Serviços técnicos.") funcionam como estilo editorial; sem impacto de SEO.
- O Lighthouse aponta hierarquia pulando nível (H2 → H4 nos rótulos pequenos). Ajuste de acessibilidade, com impacto mínimo em SEO.

### Imagens

- A home tem 10 imagens com `alt=""`: são os ícones de 38 px das áreas, **decorativos**, e o `alt` vazio é o correto.
- `/portfolio` tem 3 `alt=""` no `logo max.png`. Se for logo decorativo repetido, está ok.
- O `next/image` já entrega formatos modernos, `lazy` e `srcset` ✓. O problema de imagem é só o pôster do hero, que está fora do `next/image`.

### Links internos

Os 23 links da home respondem 200, sem cadeia de redirecionamento. Toda página importante fica a 1 clique da home ✓.

## Conteúdo

| Página | Palavras (com menu/rodapé) | Avaliação |
|---|---|---|
| `/portfolio` | ~1.830 | forte: projetos reais, clientes nomeados, fotos |
| home | ~436 | ok para uma home |
| `/sobre` | ~419 | ok |
| 11 áreas de atuação | **160 a 250** | **finas**: ~100 palavras de conteúdo próprio cada |
| `/contato` | ~199 | ok para contato |

**E-E-A-T** (experiência, especialidade, autoridade e confiança) é o ponto forte escondido: diretor técnico com 8 formações (MSc, doutorando), CREA, clientes como MRV, Caixa, INEA, Águas do Brasil e prefeituras. Isso está no portfólio e na página Sobre, mas **não aparece nas páginas de área**, que é onde o Google decide se a Omega entende de topografia ou de geotecnia. Cada página de área deveria ter:

1. escopo detalhado (o que está incluído e quais entregáveis, como ART, memorial e laudo);
2. normas aplicáveis (NBR 13133 para topografia, NR-10 para elétrica etc.);
3. **um projeto real do portfólio** daquela área, com foto;
4. 3 a 5 perguntas frequentes do cliente ("Quanto tempo leva um georreferenciamento no INCRA?");
5. responsável técnico e registro no CREA;
6. chamada para ação com o WhatsApp.

Meta: 400 a 700 palavras de conteúdo próprio por página. Não é para encher linguiça: é o conteúdo que o cliente pergunta ao telefone.

**Faltam:** CNPJ visível, política de privacidade (o formulário coleta dados pessoais, então a LGPD exige) e horário de atendimento.

## Plano de ação priorizado

**1. Crítico**
- Tirar a animação de opacidade do H1 do hero (`app/page.tsx:205`). O LCP vai de 17,9 s para ~2 s.
- Pôster do hero em AVIF/WebP (2 MB → ~100 KB) e vídeo mobile otimizado.

**2. Alto impacto**
- Cidade nos `<title>` e H1 das 11 páginas de área.
- Aprofundar as 11 páginas de área (ver a lista acima).
- Política de privacidade (LGPD) + CNPJ + horário no rodapé.
- Google Business Profile e Search Console (ver o relatório de SEO local).

**3. Ganhos rápidos**
- Encurtar os 3 títulos longos e as descrições de `/portfolio` e `/sobre`.
- 301 de `www` e de `omega.autozapx.com` para `omegacsa.com.br` (labels do Traefik).
- `Cache-Control: public, max-age=31536000, immutable` para `/video_hero` e `/portfolio` (renomeando o arquivo quando mudar), via `headers()` no `next.config.ts`.
- HSTS + `X-Content-Type-Options` + `Referrer-Policy` no `next.config.ts`.
- Apagar `public/video_hero/omega.mp4`, que não é usado.

**4. Longo prazo**
- Estudos de caso por obra (uma página por projeto relevante do portfólio).
- Conteúdo de perguntas frequentes técnicas por região ("regularização fundiária em Campos", "licenciamento ambiental INEA").
- `lastmod` real no sitemap (data de alteração do conteúdo, e não do build).

## O que ficou fora

Tráfego orgânico, cobertura do Search Console e palavras-chave com posição (sem acesso); backlinks (sem ferramenta paga); dados de campo de Core Web Vitals (CrUX); concorrentes. Com acesso ao Search Console dá para priorizar pelas buscas que já trazem impressões.
