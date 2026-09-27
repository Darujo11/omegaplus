# Análise de SEO Local — omegacsa.com.br

Data: 2026-09-27 · Skill: `seo-local` v2.4.0 · Versão auditada: `omegaplus-web:2fb42a33f084`

## Local SEO Score: 42/100

| Dimensão | Peso | Nota | Situação |
|---|---|---|---|
| Sinais do Google Business Profile | 25 | 8 | Mapa embutido aponta para o **endereço**, não para uma ficha GBP; sem link para a ficha, sem horário de funcionamento |
| Avaliações e reputação | 20 | 2 | Nenhuma avaliação visível no site nem `aggregateRating` no schema |
| SEO on-page local | 20 | 13 | Cidade no `<title>` de todas as páginas, NAP visível, `tel:` clicável, 11 páginas de serviço. Mas H1s sem cidade e páginas de área com pouco conteúdo |
| Consistência de NAP e citações | 15 | 9 | NAP idêntico entre página e schema. Presença em diretórios não verificável daqui |
| Schema local | 10 | 6 | `ProfessionalService` bem montado, com `areaServed` e `founder`. Faltam `geo`, `openingHoursSpecification`, `sameAs` e `hasMap` |
| Links e autoridade local | 10 | 4 | Bons sinais de confiança (CREA, clientes como MRV, Caixa, INEA e prefeituras), sem imprensa nem entidades locais |

## Tipo de negócio e segmento

- **Tipo:** híbrido. Tem escritório físico (Edifício Brasiluso, Sala 212, Centro, Campos dos Goytacazes) e atende outras cidades (Carapebus, Nova Iguaçu, São Francisco de Itabapoana e o estado do RJ).
- **Segmento:** serviços profissionais de engenharia (B2B e setor público). Nenhuma das 6 categorias da skill se aplica diretamente; a mais próxima é *Home Services*, pelo atendimento regional. Por isso usei o caminho genérico `ProfessionalService`, que é o tipo correto no schema.org.

## Google Business Profile

| Sinal | Status |
|---|---|
| Mapa do Google embutido (home e contato) | ✓ presente, com `loading="lazy"` |
| Mapa aponta para a ficha GBP (place ID / CID) | ✗ usa busca por endereço (`maps?q=Rua 21 de Abril…`) |
| Link "Ver no Google" / avaliações | ✗ ausente |
| Horário de funcionamento visível | ✗ ausente (fator #5 do pack local) |
| Categoria principal | Não verificável sem a ficha. Recomendado: **"Empresa de engenharia"** como principal; secundárias: "Engenheiro civil", "Consultor ambiental", "Serviço de topografia", "Engenheiro de estruturas" |
| Fotos e posts | Não verificável |

O `CLAUDE.md` lista o GBP como **pendência manual**. Se a ficha ainda não existe, este é o item de maior retorno de todo o relatório.

## Avaliações

Nenhum sinal no site. O limiar prático é **10 avaliações no Google**, com nota ≥ 4,5 e ao menos uma nova a cada ~3 semanas. Para B2B de engenharia, o caminho é pedir avaliação no fechamento de cada laudo, projeto ou fiscalização entregue, **sem triagem prévia de satisfação**: filtrar quem avalia é proibido pelo Google.

## Auditoria de NAP

| Campo | HTML visível | JSON-LD | Veredito |
|---|---|---|---|
| Nome | Omega CSA Engenharia | Omega CSA Engenharia | ✓ |
| Endereço | Rua 21 de Abril, 272 — Edifício Brasiluso, Sala 212 — Centro — Campos dos Goytacazes — RJ — 28010-170 | igual, mas **sem o bairro "Centro"** | ⚠ menor: incluir o bairro em `streetAddress` ou `addressLocality` não é padrão; aceitável |
| Telefone | (22) 99964-4607 · (22) 99818-0029 com `tel:` | +5522999644607 (principal) + 2 `contactPoint` | ✓ |
| E-mail | 2 endereços | 2 endereços | ✓ |

O desafio é **manter este NAP idêntico** no GBP, no Bing Places, no Apple Maps, no Facebook, no LinkedIn e em diretórios como Guia Mais, Apontador e Econodata. O CNPJ também **não aparece** no site; para B2B e licitações ele é um sinal de confiança.

## Citações (diretórios)

Não é possível verificar daqui sem ferramenta paga. Checklist recomendado, em ordem:

1. **Google Business Profile** (criar ou validar)
2. **Bing Places**: alimenta ChatGPT, Copilot e Alexa. Dá para importar do GBP em 5 minutos.
3. **Apple Business Connect** (Apple Maps / Siri)
4. **LinkedIn Company Page** e **Instagram**, ligados via `sameAs`
5. Brasil: Guia Mais, Apontador, Econodata/CNPJ.biz (preenchem sozinhos pelo CNPJ; conferir o endereço), **CREA-RJ** (consulta pública de empresa registrada)

## Schema local: correção pronta

Acrescentar em `lib/structured-data.ts` no nó `ProfessionalService`:

```jsonc
"geo": { "@type": "GeoCoordinates", "latitude": -21.75xxx, "longitude": -41.32xxx }, // 5+ casas decimais, pegar do pin no GBP
"hasMap": "https://www.google.com/maps?cid=<CID da ficha>",
"openingHoursSpecification": [{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
  "opens": "08:00", "closes": "18:00"                                  // confirmar o horário real
}],
"sameAs": ["<URL GBP>", "<LinkedIn>", "<Instagram>"],
"taxID": "<CNPJ>",
"priceRange": "$$"
```

Só entra dado real: coordenada, horário, CNPJ e perfis precisam vir da empresa. Placeholder em schema é pior do que não ter.

## Páginas de localidade e de serviço

- São 11 páginas de área de atuação, **uma por serviço**, que é o fator #1 de SEO orgânico local. A estrutura está certa.
- **Porém estão finas:** 160 a 250 palavras cada, *contando menu e rodapé*. O conteúdo próprio de cada uma fica perto de 100 palavras. Precisam de: escopo detalhado, normas aplicáveis (NBR e NRs), um projeto real do portfólio, perguntas frequentes e menção às cidades atendidas.
- **Não há páginas por cidade**, e isso está certo por enquanto: criar "Engenharia em Carapebus" com o mesmo texto trocando a cidade é página-porta (*doorway page*) e é penalizado. Só vale criar página de cidade com obra real naquela cidade.

## Top 10 ações priorizadas

| # | Prioridade | Ação |
|---|---|---|
| 1 | Crítica | Criar ou validar o **Google Business Profile** com a categoria "Empresa de engenharia", fotos reais das obras e o horário |
| 2 | Crítica | Estratégia de **avaliações**: pedir ao cliente ao entregar cada trabalho; meta de 10 avaliações em 90 dias |
| 3 | Alta | Cadastrar no **Bing Places** (importar do GBP), que alimenta o ChatGPT e o Copilot |
| 4 | Alta | Completar o schema: `geo`, `openingHoursSpecification`, `sameAs`, `hasMap`, `taxID` |
| 5 | Alta | Mostrar o **horário de funcionamento** e o **CNPJ** no rodapé |
| 6 | Alta | Aprofundar as 11 páginas de área (400 a 700 palavras de conteúdo próprio cada, com projeto real e perguntas frequentes) |
| 7 | Média | Trocar o mapa por endereço pelo **mapa da ficha GBP** (place ID) e adicionar o link "Avaliações no Google" |
| 8 | Média | Levar a cidade para os H1 onde soar natural (home: "Engenharia multidisciplinar em Campos dos Goytacazes") |
| 9 | Média | Apple Business Connect, LinkedIn e Instagram com NAP idêntico |
| 10 | Baixa | Autoridade local: ACIC (Associação Comercial e Industrial de Campos), CREA-RJ, notícias de obras públicas na imprensa local (Folha da Manhã, Terceira Via) |

## Limitações

Esta análise **não** mediu: ranking por grade geográfica (*geo-grid*: posição no pack local ponto a ponto na cidade), autoridade de domínio, perfil completo de backlinks, dados do GBP Insights, posição real no pack local, nem a existência e o estado da ficha GBP. Para isso: Local Falcon ou BrightLocal (geo-grid), Ahrefs ou Semrush (links) e o próprio painel do GBP e do Search Console.

Os dois arquivos de referência da skill (`local-seo-signals.md` e `local-schema-types.md`) não estão instalados; usei o conteúdo principal da skill.

---

## Reauditoria — 2026-09-27, após o deploy `218ccc9`

### Local SEO Score: 44/100 (+2)

| Dimensão | Antes | Agora | O que mudou |
|---|---|---|---|
| Sinais do GBP | 8 | 8 | — |
| Avaliações | 2 | 2 | — |
| SEO on-page local | 13 | 13 | — |
| NAP e citações | 9 | **10** | razão social e CNPJ visíveis no rodapé de todas as páginas: é a base para bater o cadastro com Receita, GBP, Econodata e CNPJ.biz |
| Schema local | 6 | **7** | `legalName: "OMEGA ENGENHARIA CSA LTDA - EPP"` + `taxID: "19.954.004/0001-37"` |
| Links e autoridade | 4 | 4 | — |

**NAP de referência para todos os cadastros externos** (usar exatamente assim):

> **Omega CSA Engenharia** (razão social: OMEGA ENGENHARIA CSA LTDA - EPP · CNPJ 19.954.004/0001-37)
> Rua 21 de Abril, 272 — Edifício Brasiluso, Sala 212 — Centro — Campos dos Goytacazes — RJ — CEP 28010-170
> (22) 99964-4607

O score só sobe de verdade com os itens que dependem da empresa: ficha no Google Business Profile, avaliações, horário, coordenadas e perfis sociais (`sameAs`). O código está pronto para receber esses dados em `lib/site-data.ts` e `lib/structured-data.ts`.

---

## Leva 2 — 2026-09-27, deploy `155b561`

### Local SEO Score: 46/100 (+2)

| Dimensão | Leva 1 | Agora | O que mudou |
|---|---|---|---|
| SEO on-page local | 13 | **15** | cidade no `<title>` das 11 páginas de área ("… em Campos-RJ") e H1 da home com a cidade ("Engenharia multidisciplinar em Campos dos Goytacazes"); descrições das áreas citam Campos dos Goytacazes e o RJ |
| Demais dimensões | — | — | sem mudança |

Os redirecionamentos 301 de `www` e dos domínios `autozapx.com` consolidam os sinais num único domínio: citações e links antigos que apontam para eles passam a somar para `omegacsa.com.br`.

### Status das 10 ações priorizadas

| # | Ação | Status |
|---|---|---|
| 1 | Google Business Profile | ⏳ depende da empresa |
| 2 | Estratégia de avaliações | ⏳ depende da empresa |
| 3 | Bing Places | ⏳ depende da empresa (depois do GBP) |
| 4 | Schema: `geo`, horário, `sameAs`, `hasMap`, `taxID` | ◐ `taxID` + `legalName` feitos; o resto aguarda dados reais |
| 5 | Horário e CNPJ visíveis no rodapé | ◐ CNPJ e razão social feitos; horário aguarda a empresa |
| 6 | Aprofundar as 11 páginas de área | ⏳ depende do conteúdo técnico |
| 7 | Mapa da ficha GBP (place ID) + link de avaliações | ⏳ depende do GBP |
| 8 | Cidade no H1 da home e nos títulos das áreas | ✅ feito |
| 9 | Apple Business Connect, LinkedIn, Instagram | ⏳ depende da empresa |
| 10 | Autoridade local (ACIC, CREA-RJ, imprensa) | ⏳ depende da empresa |

**O que falta receber da Omega para destravar os itens 1, 4, 5 e 7:** horário de atendimento, link da ficha no Google (ou autorização para criá-la), perfis de LinkedIn e Instagram, e a confirmação do pin do escritório no mapa (para as coordenadas).
