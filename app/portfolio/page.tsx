import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Projetos executados pela Omega CSA Engenharia: urbanização, saneamento, drenagem, abastecimento de água, escolas, estradas rurais e muito mais.",
};

const projects = [
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

const categories = [
  "Todos",
  "Urbanismo",
  "Engenharia Civil",
  "Recursos Hídricos",
  "Saneamento",
  "Infraestrutura",
  "Drenagem",
];

export default function PortfolioPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "clamp(100px, 18vh, 140px)",
          paddingBottom: "80px",
          paddingLeft: "clamp(16px, 4vw, 24px)",
          paddingRight: "clamp(16px, 4vw, 24px)",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div className="section-watermark">02</div>

        <AnimatedSection>
          <div className="accent-line" />
          <span
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "11px",
              fontWeight: "500",
              color: "#1a7fc1",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "14px",
            }}
          >
            Projetos realizados
          </span>
          <h1
            className="display-heading"
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.04em",
              lineHeight: "1.05",
              marginBottom: "24px",
            }}
          >
            Nosso portfólio.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7d96",
              lineHeight: "1.7",
              maxWidth: "62ch",
            }}
          >
            Projetos executados com excelência técnica, responsabilidade e comprometimento — da concepção à entrega.
          </p>
        </AnimatedSection>

        {/* Category pills */}
        <AnimatedSection delay={0.15} style={{ marginTop: "40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {categories.map((cat, i) => (
              <span
                key={cat}
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  fontWeight: "500",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: i === 0 ? "rgba(26, 127, 193, 0.15)" : "rgba(26, 127, 193, 0.04)",
                  border: i === 0 ? "1px solid rgba(26, 127, 193, 0.35)" : "1px solid rgba(26, 127, 193, 0.1)",
                  color: i === 0 ? "#3d9fd8" : "#6b7d96",
                  cursor: "default",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Projects grid */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={(i % 3) * 0.08}>
              <div
                style={{
                  borderRadius: "16px",
                  background: "#0d1526",
                  border: project.highlight
                    ? "1px solid rgba(26, 127, 193, 0.4)"
                    : "1px solid #1a2d4a",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: project.highlight
                    ? "0 0 0 1px rgba(26, 127, 193, 0.1), 0 8px 32px rgba(26, 127, 193, 0.1)"
                    : "none",
                }}
              >
                {/* Project photo */}
                <div
                  style={{
                    height: "190px",
                    background: "#0a1628",
                    borderBottom: "1px solid #1a2d4a",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    style={{ objectFit: "cover" }}
                  />
                  {/* Bottom scrim — integra a foto com o card dark */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(8,14,26,0) 55%, rgba(13,21,38,0.55) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  {project.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 11px",
                        borderRadius: "100px",
                        background: "rgba(8, 14, 26, 0.75)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(26, 127, 193, 0.45)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      <Award size={11} style={{ color: "#3d9fd8" }} />
                      <span
                        style={{
                          fontFamily: "var(--font-code)",
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "#3d9fd8",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.highlight.label}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: "24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "10px",
                      fontWeight: "500",
                      color: "#1a7fc1",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="display-heading"
                    style={{
                      fontSize: "17px",
                      fontWeight: "700",
                      color: "#e8edf5",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.3",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7d96",
                      lineHeight: "1.65",
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Highlight details (ART, sistema, etc.) */}
                  {project.highlight && (
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "14px 16px",
                        borderRadius: "10px",
                        background: "rgba(26, 127, 193, 0.06)",
                        border: "1px solid rgba(26, 127, 193, 0.15)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      {project.highlight.details.map((d) => (
                        <div
                          key={d.key}
                          style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-code)",
                              fontSize: "10px",
                              color: "#3d5070",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            {d.key}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-code)",
                              fontSize: "11px",
                              color: "#8a9ab0",
                              fontWeight: "500",
                            }}
                          >
                            {d.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Disclaimer */}
        <AnimatedSection delay={0.3} style={{ marginTop: "40px" }}>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "10px",
              background: "rgba(26, 127, 193, 0.04)",
              border: "1px solid rgba(26, 127, 193, 0.1)",
              fontSize: "12px",
              color: "#3d5070",
              fontFamily: "var(--font-code)",
              letterSpacing: "0.04em",
              lineHeight: "1.6",
            }}
          >
            As informações deste portfólio são de propriedade da Omega Engenharia CSA Ltda. Possuímos atestados de capacidade técnica e referências comerciais de todos os serviços listados — disponíveis mediante solicitação.
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 24px",
          background: "#0d1526",
          borderTop: "1px solid #1a2d4a",
          textAlign: "center",
        }}
      >
        <AnimatedSection>
          <h2
            className="display-heading"
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.04em",
              marginBottom: "16px",
            }}
          >
            Seu projeto pode ser o próximo.
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7d96", marginBottom: "36px" }}>
            Entre em contato e veja como podemos ajudar.
          </p>
          <Link
            href="/contato"
            className="btn-ghost-hover"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "700",
              textDecoration: "none",
              background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(26, 127, 193, 0.25)",
            }}
          >
            Fale conosco <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
