export type PortfolioHighlight = {
  label: string;
  details: { key: string; value: string }[];
};

export type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  highlight: PortfolioHighlight | null;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    title: "Urbanização — Praças, Quadras e Áreas de Interesse Social",
    category: "Urbanismo",
    image: "/projetos/urbanizacao.webp",
    description:
      "Projetos de urbanização com documentação fotográfica de antes e depois, demonstrando intervenções em praças, quadras esportivas e áreas de interesse social para melhoria da qualidade de vida da população.",
    highlight: null,
  },
  {
    id: 2,
    title: "Unidades Escolares",
    category: "Engenharia Civil",
    image: "/projetos/unidades-escolares.webp",
    description:
      "Projetos de reforma e revitalização de unidades escolares com documentação técnica e fotográfica das intervenções realizadas, atendendo às normas de acessibilidade e segurança.",
    highlight: null,
  },
  {
    id: 3,
    title: "Sistema de Abastecimento de Água",
    category: "Recursos Hídricos",
    image: "/projetos/abastecimento-agua.webp",
    description:
      "Projetos e implantação de sistemas de abastecimento de água: redes de distribuição e adução, poços de captação, reservatórios, ETA e sistemas de bombeamento com documentação técnica completa.",
    highlight: null,
  },
  {
    id: 4,
    title: "Estações de Tratamento de Esgoto",
    category: "Saneamento",
    image: "/projetos/ete-esgoto.webp",
    description:
      "Projetos e implantação de ETEs compactas e convencionais — sistemas UASB, lodo ativado e lagoas de estabilização. Gerenciamento, operação e relatórios para órgãos ambientais.",
    highlight: null,
  },
  {
    id: 5,
    title: "Estradas Rurais de Agricultura",
    category: "Infraestrutura",
    image: "/projetos/estradas-rurais.webp",
    description:
      "Projetos de recuperação e melhoria de estradas rurais com pavimentação, drenagem longitudinal e transversal. Registro fotográfico de antes e depois com infraestrutura para escoamento da produção agrícola.",
    highlight: null,
  },
  {
    id: 6,
    title: "Pavimentação e Infraestrutura Urbana",
    category: "Infraestrutura",
    image: "/projetos/pavimentacao.webp",
    description:
      "Projetos de pavimentação e infraestrutura urbana em múltiplos municípios, incluindo intervenções na Estrada da Praia de Carapebus e demais vias urbanas. Documentação fotográfica de antes e depois.",
    highlight: null,
  },
  {
    id: 7,
    title: "Micro e Macro Drenagem — Controle de Alagamentos e Cheias",
    category: "Drenagem",
    image: "/projetos/drenagem.webp",
    description:
      "Projetos de intervenção em sistemas de micro e macrodrenagem urbana: galerias, bocas de lobo, bacias de retenção, contenção de taludes e mapeamento de áreas inundáveis. Antes e depois documentados.",
    highlight: null,
  },
  {
    id: 8,
    title: "Revitalização ETE — São João da Barra",
    category: "Saneamento",
    image: "/projetos/projetos.webp",
    description:
      "Projeto arquitetônico e de processo para revitalização da Estação de Tratamento de Esgoto de São João da Barra. Implantação do Sistema REUSO DE ÁGUA STAR — Tratamento de Água para Reuso.",
    highlight: {
      label: "Projeto Destaque",
      details: [
        { key: "Sistema", value: "REUSO DE ÁGUA STAR" },
        { key: "ART", value: "2020250366269" },
        { key: "Emissão", value: "11/11/2025" },
      ],
    },
  },
];

export const PORTFOLIO_CATEGORIES = [
  "Todos",
  "Urbanismo",
  "Engenharia Civil",
  "Recursos Hídricos",
  "Saneamento",
  "Infraestrutura",
  "Drenagem",
] as const;

/** Projetos exibidos na home (preview antes do portfólio completo). */
export const FEATURED_PORTFOLIO_IDS = [8, 1, 7] as const;

export function getFeaturedPortfolio(): PortfolioProject[] {
  return FEATURED_PORTFOLIO_IDS.map(
    (id) => PORTFOLIO_PROJECTS.find((p) => p.id === id)!,
  );
}
