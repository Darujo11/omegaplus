/**
 * Portfólio técnico — conteúdo da rota /portfolio.
 * Fonte única: a página só compõe layout a partir daqui.
 */

export type Stat = { value: string; label: string };

export type Specialty = { n: string; title: string; desc: string; slug: string };

export type ServiceLine = { title: string; summary: string; items: string[] };

export type LandfillService = { eyebrow: string; title: string; items: string[]; standard?: boolean };

export type Photo = { src: string; title: string; caption: string };

export type WorkStage = "Antes" | "Depois" | "Obra" | "Instalado";

export type WorkPhoto = Photo & {
  stage: WorkStage;
  /** Ocupa duas linhas (retrato) ou duas colunas (panorâmica) no grid. */
  span?: "tall" | "wide";
};

export type InstitutionKind = "public" | "private";

export type InstitutionLogo = { name: string; src: string; note: string; width: number; height: number };

export type Institution = { name: string; note: string; kind: InstitutionKind };

export type Development = { name: string; size?: string };

export type ClientSubgroup = {
  heading?: string;
  developments: Development[];
  label?: string;
  projects: string[];
};

export type Client = {
  kind: InstitutionKind;
  tag: string;
  name: string;
  location: string;
  /** Tabela simples de empreendimentos (cards compactos). */
  developments?: Development[];
  interventions: string[];
  /** Blocos por município (cards expandidos, largura total). */
  subgroups?: ClientSubgroup[];
  approvedIn?: string[];
  note?: string;
  wide?: boolean;
};

export const HERO_STATS: Stat[] = [
  { value: "+10", label: "Profissionais diretos e indiretos, conforme o serviço" },
  { value: "11", label: "Especialidades de engenharia" },
  { value: "+100 km", label: "De redes, terraplenagem e pavimentação" },
  { value: "+6.900", label: "Unidades habitacionais atendidas" },
  { value: "14", label: "Empreendimentos aprovados em concessionárias" },
  { value: "3", label: "Escritórios de apoio além da sede" },
];

export const PORTFOLIO_SECTIONS = [
  { id: "especialidades", label: "Especialidades" },
  { id: "linhas-de-servico", label: "Linhas de serviço" },
  { id: "aterros-sanitarios", label: "Aterros sanitários" },
  { id: "obras", label: "Obras" },
  { id: "equipe-tecnica", label: "Equipe técnica" },
  { id: "instituicoes", label: "Órgãos e instituições" },
  { id: "clientes", label: "Clientes" },
] as const;

/** Slugs casam com AREAS em lib/site-data.ts → cada célula leva à página da área. */
export const SPECIALTIES: Specialty[] = [
  { n: "01", title: "Civil, Arquitetura e Urbanismo", desc: "Infraestrutura urbana, urbanização, edificações e orçamentos.", slug: "engenharia-civil" },
  { n: "02", title: "Projetos Estruturais", desc: "Concreto armado, estruturas metálicas e reservatórios.", slug: "projetos-estruturais" },
  { n: "03", title: "Hidrossanitária", desc: "Instalações prediais, redes de água, esgoto e drenagem.", slug: "hidrossanitaria" },
  { n: "04", title: "Sanitária e Ambiental", desc: "ETE, ETA, resíduos sólidos e licenciamento ambiental.", slug: "sanitaria-ambiental" },
  { n: "05", title: "Segurança do Trabalho", desc: "Análise de risco e segurança contra incêndio e pânico.", slug: "seguranca-do-trabalho" },
  { n: "06", title: "Geotecnia e Barragens", desc: "Investigação do subsolo, estabilidade de taludes e instrumentação.", slug: "geotecnia-barragens" },
  { n: "07", title: "Engenharia Mecânica", desc: "Sistemas de bombeamento e equipamentos de estações.", slug: "engenharia-mecanica" },
  { n: "08", title: "Cartografia e Topografia", desc: "GNSS/RTK, estação total, aerolevantamento com VANT.", slug: "cartografia-topografia" },
  { n: "09", title: "Avaliações e Perícias", desc: "Laudos judiciais, vistorias cautelares e avaliação de imóveis.", slug: "avaliacoes-pericias" },
  { n: "10", title: "Engenharia Elétrica", desc: "Instalações elétricas prediais e industriais.", slug: "engenharia-eletrica" },
  { n: "11", title: "Modelagem e Tecnologia", desc: "Modelagem hidrológica e hidráulica, mapeamento de áreas inundáveis.", slug: "modelagem-tecnologia" },
];

/** Duas colunas do acordeão, na ordem de leitura do layout. */
export const SERVICE_LINES: [ServiceLine[], ServiceLine[]] = [
  [
    {
      title: "Esgotamento sanitário",
      summary: "Redes, elevatórias, sifões e reúso",
      items: [
        "Redes coletoras de esgoto sanitário para bairros, cidades, indústrias e condomínios",
        "Estações elevatórias de esgoto e sifões invertidos",
        "Implantação de redes por método não destrutivo onde não é possível demolir o pavimento",
        "Sistemas de reúso de águas residuárias tratadas para fins não potáveis",
        "Licenciamento ambiental",
      ],
    },
    {
      title: "Abastecimento de água",
      summary: "Adução, reservação, distribuição e eficiência",
      items: [
        "Redes de distribuição e de adução — básico ou executivo, com dimensionamento",
        "Poços de captação e bombeamento",
        "Reservatórios e sistemas de bombeamento e elevação",
        "Vídeo inspeção de adutoras e sistemas de bombeamento",
        "Balanço hídrico voltado à eficiência do sistema",
        "Licenciamento ambiental",
      ],
    },
    {
      title: "Drenagem urbana e estudos hidrológicos",
      summary: "Micro e macrodrenagem, manchas de inundação",
      items: [
        "Redes de drenagem — básico ou executivo, com dimensionamento de sarjetas, caixas coletoras e galerias",
        "Contenção de taludes de rios e córregos",
        "Bacias de retenção e amortecimento de chuvas",
        "Modelagem hidrológica e hidráulica aplicada ao mapeamento de áreas inundáveis, com cotas de inundação da bacia",
        "Reúso de águas de chuva para fins não potáveis",
        "Aerofotogrametria com drones de cursos hídricos e áreas degradadas",
        "Licenciamento ambiental",
      ],
    },
    {
      title: "Estações de tratamento de esgoto (ETE)",
      summary: "Compactas, metálicas e em concreto armado",
      items: [
        "Estações compactas, metálicas e em concreto armado, inclusive com pátios e estacionamentos sobre a estrutura",
        "Reator UASB ou híbrido, lodo ativado e lagoas de estabilização",
        "Tratamento primário, secundário e terciário, incluindo tratamento de lodo",
        "Dimensionamento de equipamentos: desarenador, calha Parshall, grades e decantadores",
        "Gestão, manutenção, diagnóstico do tratamento e relatórios para órgãos ambientais",
        "Licenciamento ambiental",
      ],
    },
    {
      title: "Estações de tratamento de água (ETA)",
      summary: "Simplificado, convencional e avançado",
      items: [
        "Sistemas de tratamento simplificado, convencional e avançado — básico ou executivo",
        "Avaliação física e química com coleta de amostras (convênios e laboratórios)",
        "Licenciamento ambiental",
      ],
    },
  ],
  [
    {
      title: "Resíduos sólidos urbanos",
      summary: "Tratamento, coleta seletiva e aterros",
      items: [
        "Tratamento de RSU e tecnologias de tratamento",
        "Análise e gerenciamento do sistema de coleta seletiva",
        "Trituração, compactação e compostagem",
        "Logística reversa; resíduos de construção civil, pilhas e baterias, pneus e resíduos hospitalares",
        "Critérios de projeto em reciclagem",
        "Licenciamento ambiental",
      ],
    },
    {
      title: "Construção civil e infraestrutura",
      summary: "Projetos, orçamentos e gerenciamento",
      items: [
        "Infraestrutura urbana em loteamentos, condomínios e áreas industriais",
        "Estruturas metálicas, concreto armado, reservatórios e instalações prediais",
        "Contenção, limpeza e revestimento de margens de córregos e rios",
        "Projetos de urbanização e cadastramento de instalações industriais e civis",
        "Orçamento executivo com base nas tabelas EMOP, FGV e SINAPI",
        "Consultoria em fiscalização, gerenciamento, licitações e editais",
      ],
    },
    {
      title: "Engenharia pericial, judicial e avaliações",
      summary: "Laudos para o Judiciário e assistência técnica",
      items: [
        "Perícias judiciais em engenharia civil, ambiental, sanitária, elétrica e de segurança do trabalho",
        "Assistência técnica jurídica com laudo pericial de engenharia",
        "Laudo de vistoria cautelar de vizinhança",
        "Autovistoria de edificações, prédios e condomínios",
        "Avaliação de imóveis urbanos e rurais; georreferenciamento para desmembramentos, inventários e legalizações",
        "Inspeção com drones de fachadas e áreas de difícil acesso",
      ],
    },
    {
      title: "Segurança do trabalho",
      summary: "Riscos de processo e legalização no CBMERJ",
      items: [
        "Processos de segurança industrial",
        "Análise quantitativa e qualitativa de risco",
        "Projeto de segurança contra incêndio e pânico",
        "Legalização no CBMERJ — Laudo de Exigências e Certificado de Aprovação",
        "Avaliação de risco de explosão e gestão de inflamáveis, gases e poeiras (ATEX)",
      ],
    },
    {
      title: "Topografia, cartografia e inspeção",
      summary: "Levantamentos de precisão e geoprocessamento",
      items: [
        "Levantamentos planialtimétricos e cadastrais com GNSS/RTK e estação total",
        "Aerolevantamento com VANT PPK/RTK",
        "As-built, georreferenciamento e geoprocessamento",
        "Vídeo inspeção robotizada de redes de esgoto e galerias",
      ],
    },
  ],
];

export const LANDFILL_SERVICES: LandfillService[] = [
  {
    eyebrow: "Serviço 01",
    title: "Topografia e geodésia",
    items: [
      "Medição mensal de marcos de concreto (GNSS ou estação total)",
      "Controle de estabilidade e recalques do maciço",
      "As-built, planialtimetria e volumetria de resíduos",
      "Ortomosaicos, MDT/MDS e geoprocessamento",
    ],
  },
  {
    eyebrow: "Serviço 02",
    title: "Geologia e geotecnia",
    items: [
      "Sondagens SPT, rotativa, mista e a trado",
      "Ensaios de permeabilidade, compactação e cisalhamento",
      "Análise de estabilidade de taludes (fator de segurança)",
      "Piezômetros, inclinômetros e extensômetros",
    ],
  },
  {
    eyebrow: "Serviço 03",
    title: "Hidrogeologia e monitoramento",
    items: [
      "Águas subterrâneas e superficiais (poços a montante e a jusante)",
      "Geofísica: eletrorresistividade e sísmica",
      "Controle quali-quantitativo de lixiviado e biogás",
      "Qualidade do ar e pressão sonora no entorno",
    ],
  },
  {
    eyebrow: "Serviço 04",
    title: "Licenciamento no INEA-RJ",
    items: [
      "EIA/RIMA, EIV e RAP",
      "Licenças Prévia, de Instalação e de Operação",
      "Outorgas de uso de recursos hídricos",
      "PGRS, PRAD e relatórios de condicionantes",
    ],
  },
  {
    eyebrow: "Serviço 05",
    title: "Engenharia e projetos",
    items: [
      "Impermeabilização com geomembranas",
      "Captação e tratamento de chorume",
      "Drenagem pluvial e de biogás (queima ou aproveitamento)",
      "Encerramento e remediação de aterros e lixões",
    ],
  },
  {
    eyebrow: "Padrão INEA",
    title: "Frequência de monitoramento",
    standard: true,
    items: [
      "Medições mensais dos marcos e do avanço",
      "4 voos de VANT por ano",
      "Relatório anual consolidado sobre movimentação ou inércia dos pontos",
      "Georreferenciamento em SIRGAS 2000 / UTM",
    ],
  },
];

export const LANDFILL_PHOTOS: Photo[] = [
  { src: "/portfolio/aterro-topografia-gnss.webp", title: "Topografia GNSS/RTK", caption: "Medição de marcos e avanço do maciço" },
  { src: "/portfolio/aterro-aerolevantamento.webp", title: "Aerolevantamento", caption: "VANT com posicionamento PPK/RTK" },
  { src: "/portfolio/aterro-geotecnia.webp", title: "Geotecnia do maciço", caption: "Estabilidade de taludes e recalques" },
  { src: "/portfolio/aterro-monitoramento.webp", title: "Monitoramento ambiental", caption: "Águas, lixiviado e biogás" },
];

export const WORK_PHOTOS: WorkPhoto[] = [
  { src: "/portfolio/obra-reservatorio-elevado.webp", title: "Sistema de abastecimento de água", caption: "Reservatório elevado", stage: "Instalado", span: "tall" },
  { src: "/portfolio/obra-urbanizacao-quadras.webp", title: "Urbanização", caption: "Reforma de praças e quadras", stage: "Depois" },
  { src: "/portfolio/obra-urbanizacao-social.webp", title: "Urbanização", caption: "Áreas de interesse social", stage: "Depois" },
  { src: "/portfolio/obra-escola-antes.webp", title: "Unidade escolar", caption: "Condição anterior", stage: "Antes" },
  { src: "/portfolio/obra-escola-depois.webp", title: "Unidade escolar", caption: "Após a intervenção", stage: "Depois" },
  { src: "/portfolio/obra-ete-aerea.webp", title: "Estação de tratamento de esgoto", caption: "Vista aérea", stage: "Instalado" },
  { src: "/portfolio/obra-estrada-rural.webp", title: "Estradas rurais", caption: "Acesso a áreas de agricultura", stage: "Depois" },
  { src: "/portfolio/obra-pavimentacao.webp", title: "Pavimentação e infraestrutura urbana", caption: "Vias urbanas", stage: "Depois" },
  { src: "/portfolio/obra-macrodrenagem.webp", title: "Micro e macrodrenagem", caption: "Execução de galerias", stage: "Obra", span: "tall" },
  { src: "/portfolio/obra-drenagem-cheia.webp", title: "Drenagem contra alagamentos e cheias", caption: "Condição anterior à intervenção", stage: "Antes", span: "wide" },
];

export const FEATURED_PROJECT = {
  title: "Revitalização da ETE de São João da Barra",
  lead:
    "Projeto arquitetônico da edificação de apoio da estação, com salas de reunião, copa e administração, e implantação de sistema de tratamento de água para reúso com quatro reservatórios de 15.000 L.",
  sheet: [
    { key: "Objeto", value: "Projeto arquitetônico para revitalizar a ETE de São João da Barra/RJ" },
    { key: "Pranchas", value: "Planta baixa do térreo e vistas 3D" },
    { key: "Responsável", value: "Eng. Maxuel Bernardes Donato — CREA-RJ 2009101529" },
    { key: "ART", value: "2020250366269" },
    { key: "Revisão", value: "Rev. 00 — 11/11/2025 — emissão para aprovação" },
  ],
  images: [
    { src: "/portfolio/ete-sjb-vista-3d.webp", title: "Vista 3D", caption: "Edificação de apoio" },
    { src: "/portfolio/ete-sjb-reuso.webp", title: "Sistema de reúso", caption: "4 × 15.000 L" },
  ] satisfies Photo[],
};

export const TEAM = {
  lead: {
    role: "Responsável técnico",
    name: "Maxuel Bernardes Donato",
    registry: "CREA-RJ 2009101529",
    titles: [
      "Engenheiro civil",
      "Engenheiro de segurança do trabalho",
      "Esp. engenharia sanitária e ambiental",
      "Esp. avaliações e perícias",
      "Esp. geotecnia",
      "Esp. cartografia",
    ],
    academic: [
      "MSc em Engenharia Ambiental (profissional) — Recursos Hídricos",
      "Doutorando em Modelagem e Tecnologia em Recursos Hídricos",
    ],
  },
  director: { name: "Lecyana R. Silva Donato", role: "Diretora-chefe" },
  headcount: "+10",
  disciplines: [
    "Eng. civil",
    "Eng. sanitária",
    "Eng. ambiental",
    "Eng. química",
    "Eng. cartográfica",
    "Eng. mecânica",
    "Eng. elétrica",
    "Eng. de segurança do trabalho",
    "Arquitetura e urbanismo",
    "Geologia",
    "Geotecnia",
    "Hidrogeologia",
    "Técnicos de campo e desenho",
  ],
  headquarters: "Campos dos Goytacazes/RJ",
  supportOffices: ["Carapebus/RJ", "Nova Iguaçu/RJ", "São Francisco de Itabapoana/RJ"],
};

export const INSTITUTION_LOGOS: InstitutionLogo[] = [
  { name: "INEA", src: "/portfolio/logo-inea.png", note: "licenciamento ambiental", width: 163, height: 62 },
  { name: "Caixa", src: "/portfolio/logo-caixa.png", note: "aprovações na Habitação", width: 174, height: 39 },
  { name: "Sabesp", src: "/portfolio/logo-sabesp.png", note: "projeto aprovado em SP", width: 166, height: 62 },
  { name: "Águas do Brasil", src: "/portfolio/logo-aguas-do-brasil.png", note: "10 empreendimentos aprovados", width: 89, height: 62 },
  { name: "MRV", src: "/portfolio/logo-mrv.png", note: "cliente construtora", width: 174, height: 48 },
];

export const INSTITUTIONS: Institution[] = [
  { name: "Rio Águas", note: "4 empreendimentos aprovados", kind: "private" },
  { name: "CBMERJ", note: "Legalização contra incêndio e pânico", kind: "public" },
  { name: "CREA-RJ", note: "Registro e ART", kind: "public" },
  { name: "Prefeitura de São João da Barra", note: "Drenagem, esgoto e ETE", kind: "public" },
  { name: "Prefeitura de Campos dos Goytacazes", note: "Esgoto e aerolevantamento", kind: "public" },
  { name: "Prefeitura de Carapebus", note: "Drenagem, esgoto e ETE", kind: "public" },
  { name: "Grupo Realiza", note: "Infraestrutura de condomínios", kind: "private" },
  { name: "Grupo Damha · Alphaville", note: "Água e esgoto", kind: "private" },
  { name: "EMOP · SINAPI · FGV", note: "Bases de orçamento", kind: "public" },
  { name: "Entre outros", note: "Órgãos e empresas atendidos", kind: "private" },
];

const HOUSING_PROJECTS = [
  "Esgotamento sanitário",
  "Abastecimento de água",
  "Terraplenagem e patamarização",
  "Projeto e dimensionamento de pavimento",
];

const PUBLIC_SCOPE = {
  drainage: "Macro e microdrenagem",
  sewage: "Esgotamento sanitário",
  effluent: "Estação de tratamento de efluentes",
  survey: "Aerolevantamento e topografia",
  robot: "Inspeção de redes hidráulicas com robô motorizado",
};

export const CLIENTS: Client[] = [
  {
    kind: "private",
    tag: "Incorporadora",
    name: "Grupo Damha (Alphaville)",
    location: "Residencial Donana — Campos dos Goytacazes/RJ",
    developments: [{ name: "Condomínio residencial", size: "850 unidades" }],
    interventions: [
      "Sistema de abastecimento de água com reservatório elevado",
      "Sistema de esgotamento sanitário com estação elevatória de recalque",
    ],
  },
  {
    kind: "private",
    tag: "Construtora",
    name: "MRV",
    location: "Condomínio Residencial Mar da Flórida e outros",
    interventions: ["Terraplenagem", "Dimensionamento de pavimento"],
  },
  {
    kind: "private",
    tag: "Construtora",
    name: "Grupo Realiza Construtora",
    location: "Campos dos Goytacazes/RJ · Itaboraí/RJ · projetos aprovados em outros 7 municípios",
    wide: true,
    interventions: [],
    subgroups: [
      {
        heading: "Campos dos Goytacazes/RJ",
        developments: [
          { name: "Residencial Aeroporto", size: "850 UH" },
          { name: "Residencial Novo Horizonte", size: "1.100 UH" },
          { name: "Residencial Curumim", size: "8 blocos · 4 pav." },
        ],
        label: "Projetos",
        projects: HOUSING_PROJECTS,
      },
      {
        developments: [{ name: "Residencial Goytacazes", size: "660 UH" }],
        projects: [
          "Bacia de retenção e infiltração de águas pluviais (área sem ponto de lançamento)",
          "Estação de tratamento de esgoto — 5 L/s",
        ],
      },
      {
        heading: "Itaboraí/RJ",
        developments: [
          { name: "Condomínio Residencial Portal dos Ipês 1, 2 e 3" },
          { name: "Condomínio Residencial Vila Rica" },
          { name: "Condomínio Residencial Marambaia" },
          { name: "Total", size: "3.500 UH" },
        ],
        label: "Projetos",
        projects: HOUSING_PROJECTS,
      },
    ],
    approvedIn: [
      "Anápolis/GO",
      "Uberlândia/MG",
      "São José dos Campos/SP (Sabesp)",
      "Maricá/RJ",
      "Itaperuna/RJ",
      "Rio das Ostras/RJ",
      "Santa Cruz — Rio de Janeiro/RJ",
    ],
    note:
      "Mais de 100 km de redes de abastecimento de água e esgotamento sanitário, terraplenagem e pavimentação. Estudos hidrológicos e manchas de inundação aprovados no setor de Habitação da Caixa Econômica Federal.",
  },
  {
    kind: "private",
    tag: "Concessionária",
    name: "Grupo Águas do Brasil",
    location: "Campos dos Goytacazes/RJ",
    interventions: [
      "Projeto de terraplenagem e pavimentação — Parque Ecológico",
      "Treinamento de operação de ETE",
      "10 empreendimentos aprovados — infraestrutura de água e esgoto",
    ],
  },
  {
    kind: "private",
    tag: "Concessionária",
    name: "Rio Águas",
    location: "Infraestrutura de água e esgoto",
    interventions: ["4 empreendimentos aprovados — infraestrutura de água e esgoto"],
  },
  {
    kind: "public",
    tag: "Prefeitura",
    name: "Prefeitura de São João da Barra",
    location: "São João da Barra/RJ",
    interventions: [PUBLIC_SCOPE.drainage, PUBLIC_SCOPE.sewage, PUBLIC_SCOPE.effluent, PUBLIC_SCOPE.survey, PUBLIC_SCOPE.robot],
  },
  {
    kind: "public",
    tag: "Prefeitura",
    name: "Prefeitura de Campos dos Goytacazes",
    location: "Campos dos Goytacazes/RJ",
    interventions: [PUBLIC_SCOPE.sewage, PUBLIC_SCOPE.survey, PUBLIC_SCOPE.robot],
  },
  {
    kind: "public",
    tag: "Prefeitura",
    name: "Prefeitura de Carapebus",
    location: "Carapebus/RJ",
    wide: true,
    interventions: [
      PUBLIC_SCOPE.drainage,
      PUBLIC_SCOPE.sewage,
      PUBLIC_SCOPE.effluent,
      PUBLIC_SCOPE.survey,
      PUBLIC_SCOPE.robot,
      "Monitoramento de inundação de áreas costeiras",
    ],
  },
];

export const MISSION = {
  mission:
    "Prestar serviços de engenharia e consultoria ambiental com excelência técnica, assegurando a conformidade legal e a sustentabilidade dos empreendimentos.",
  management: [
    "Atender aos requisitos e às necessidades dos clientes",
    "Atender aos requisitos legais",
    "Gerenciar aspectos e impactos ambientais dos serviços",
    "Zelar pela segurança e saúde dos colaboradores",
    "Melhoria contínua de serviços e produtos",
  ],
  values:
    "Ética, precisão técnica, transparência, segurança, compromisso ambiental e relacionamento de confiança com clientes e órgãos reguladores.",
  differentiators: [
    { title: "Tecnologia", desc: "GNSS/RTK, estação total, VANT PPK/RTK e robô de inspeção de redes." },
    { title: "Conformidade", desc: "Produtos em SIRGAS 2000 / UTM e atendimento a condicionantes do INEA-RJ." },
    { title: "Integração", desc: "Engenheiros, geólogos e especialistas trabalhando no mesmo projeto." },
    { title: "Documentação", desc: "Relatórios técnicos completos para órgãos ambientais, concessionárias e Judiciário." },
  ],
};
