import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Target, Eye, Shield, GraduationCap, User } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "A Empresa",
  description:
    "Conheça a Omega CSA Engenharia — empresa especializada em engenharia civil, sanitária, ambiental, geotécnica, elétrica e segurança do trabalho em Campos dos Goytacazes, RJ.",
};

const differentials = [
  "Equipe multidisciplinar com engenheiros habilitados no CREA-RJ",
  "Atendimento personalizado em todas as fases do projeto",
  "Projetos executivos com precisão e conformidade às normas ABNT",
  "Experiência comprovada em obras públicas e privadas",
  "Suporte técnico contínuo durante e após a execução",
  "Atestados de capacidade técnica e referências comerciais em todos os serviços",
];

const qualityCommitments = [
  "Atender aos requisitos e necessidades dos clientes, tendo como foco sua satisfação",
  "Atender requisitos legais",
  "Preservar o meio ambiente, gerenciando seus aspectos e impactos em nossos serviços",
  "Zelar pela integridade, segurança e saúde de seus colaboradores e da sociedade",
  "Melhoria contínua de nossos serviços e produtos",
  "Possuímos atestados de capacidade técnica e referências comerciais de nossos serviços",
];

const values = [
  {
    icon: <Target size={20} />,
    title: "Missão",
    text: "Oferecer soluções de engenharia de alta qualidade, contribuindo para o desenvolvimento sustentável das comunidades e o sucesso dos nossos clientes.",
  },
  {
    icon: <Eye size={20} />,
    title: "Visão",
    text: "Ser referência em engenharia no Norte Fluminense, reconhecida pela excelência técnica, inovação e compromisso com os resultados.",
  },
  {
    icon: <Shield size={20} />,
    title: "Valores",
    text: "Ética, rigor técnico, responsabilidade ambiental e compromisso permanente com a qualidade em cada projeto que desenvolvemos.",
  },
];

export default function SobrePage() {
  return (
    <>
      {/* Page header */}
      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "80px",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div className="section-watermark">03</div>

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
            Quem somos
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
              maxWidth: "700px",
            }}
          >
            A empresa.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7d96",
              lineHeight: "1.75",
              maxWidth: "620px",
            }}
          >
            A <strong style={{ color: "#8a9ab0" }}>Omega Engenharia CSA Ltda.</strong> realiza projetos, planejamento, gerenciamentos, fiscalização de serviços e perícias com ênfase nas áreas de Engenharia Civil Sanitária, Ambiental, Judicial/Pericial, Avaliações e Segurança do Trabalho.
          </p>
        </AnimatedSection>
      </section>

      {/* History + Differentials */}
      <section
        style={{
          padding: "80px 24px",
          background: "#0d1526",
          borderTop: "1px solid #1a2d4a",
          borderBottom: "1px solid #1a2d4a",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "64px",
              alignItems: "start",
            }}
          >
            <AnimatedSection>
              <h2
                className="display-heading"
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: "700",
                  color: "#e8edf5",
                  letterSpacing: "-0.04em",
                  lineHeight: "1.2",
                  marginBottom: "24px",
                }}
              >
                Uma empresa construída sobre bases sólidas
              </h2>
              <p style={{ fontSize: "15px", color: "#6b7d96", lineHeight: "1.85", marginBottom: "16px" }}>
                Sediada em Campos dos Goytacazes, coração do Norte Fluminense, a Omega CSA Engenharia combina conhecimentos técnicos e científicos para projetar, construir e explorar estruturas, sistemas e processos que correspondam a objetivos específicos e satisfaçam critérios de excelência.
              </p>
              <p style={{ fontSize: "15px", color: "#6b7d96", lineHeight: "1.85" }}>
                Contamos com escritórios de apoio em <strong style={{ color: "#8a9ab0" }}>Carapebus</strong>, <strong style={{ color: "#8a9ab0" }}>Nova Iguaçu</strong> e <strong style={{ color: "#8a9ab0" }}>São Francisco de Itabapoana</strong>, ampliando nossa capacidade de atendimento em toda a região.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div
                style={{
                  padding: "32px",
                  borderRadius: "16px",
                  background: "#080e1a",
                  border: "1px solid #1a2d4a",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#1a7fc1",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "20px",
                  }}
                >
                  Diferenciais
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {differentials.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <CheckCircle2
                        size={15}
                        style={{ color: "#5a9e2f", flexShrink: 0, marginTop: "2px" }}
                      />
                      <span style={{ fontSize: "14px", color: "#8a9ab0", lineHeight: "1.55" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <AnimatedSection style={{ marginBottom: "48px" }}>
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
            Equipe técnica
          </span>
          <h2
            className="display-heading"
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.04em",
            }}
          >
            Responsabilidade técnica
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Responsável Técnico */}
          <AnimatedSection>
            <div
              style={{
                padding: "36px",
                borderRadius: "16px",
                background: "#0d1526",
                border: "1px solid #1a2d4a",
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "120px",
                  height: "120px",
                  background: "radial-gradient(circle, rgba(26, 127, 193, 0.08) 0%, transparent 70%)",
                }}
              />
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "rgba(26, 127, 193, 0.1)",
                  border: "1px solid rgba(26, 127, 193, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a7fc1",
                  marginBottom: "20px",
                }}
              >
                <GraduationCap size={24} />
              </div>

              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "10px",
                  fontWeight: "500",
                  color: "#3d9fd8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Responsável Técnico
              </span>
              <h3
                className="display-heading"
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#e8edf5",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                {SITE.team.engineer.name}
              </h3>

              {/* CREA badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  background: "rgba(90, 158, 47, 0.1)",
                  border: "1px solid rgba(90, 158, 47, 0.2)",
                  marginBottom: "24px",
                  marginTop: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "#5a9e2f",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  CREA/RJ {SITE.team.engineer.crea}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {SITE.team.engineer.titles.map((title) => (
                  <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#1a7fc1",
                        flexShrink: 0,
                        marginTop: "7px",
                        opacity: 0.7,
                      }}
                    />
                    <span style={{ fontSize: "13px", color: "#6b7d96", lineHeight: "1.5" }}>{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Diretora */}
          <AnimatedSection delay={0.1}>
            <div
              style={{
                padding: "36px",
                borderRadius: "16px",
                background: "#0d1526",
                border: "1px solid #1a2d4a",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "rgba(26, 127, 193, 0.1)",
                  border: "1px solid rgba(26, 127, 193, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a7fc1",
                  marginBottom: "20px",
                }}
              >
                <User size={24} />
              </div>

              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "10px",
                  fontWeight: "500",
                  color: "#3d9fd8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Direção
              </span>
              <h3
                className="display-heading"
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#e8edf5",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                {SITE.team.director.name}
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7d96", marginTop: "8px" }}>
                {SITE.team.director.role}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quality policy */}
      <section
        style={{
          padding: "80px 24px",
          background: "#0d1526",
          borderTop: "1px solid #1a2d4a",
          borderBottom: "1px solid #1a2d4a",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimatedSection style={{ marginBottom: "40px" }}>
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
              Política de qualidade
            </span>
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
              Sistema de gestão continuamente melhorado
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7d96", lineHeight: "1.8", maxWidth: "600px" }}>
              Através de um sistema de gestão integrado, a Omega CSA Engenharia visa:
            </p>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "12px",
            }}
          >
            {qualityCommitments.map((item, i) => (
              <AnimatedSection key={i} delay={(i % 3) * 0.07}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    padding: "20px 22px",
                    borderRadius: "12px",
                    background: "#080e1a",
                    border: "1px solid #1a2d4a",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: "rgba(90, 158, 47, 0.1)",
                      border: "1px solid rgba(90, 158, 47, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={14} style={{ color: "#5a9e2f" }} />
                  </div>
                  <span style={{ fontSize: "14px", color: "#8a9ab0", lineHeight: "1.6" }}>{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <AnimatedSection style={{ marginBottom: "48px" }}>
          <div className="accent-line" />
          <h2
            className="display-heading"
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.04em",
            }}
          >
            Propósito e valores
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {values.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div
                style={{
                  padding: "32px",
                  borderRadius: "16px",
                  background: "#0d1526",
                  border: "1px solid #1a2d4a",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(26, 127, 193, 0.1)",
                    border: "1px solid rgba(26, 127, 193, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1a7fc1",
                    marginBottom: "20px",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="display-heading"
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#e8edf5",
                    letterSpacing: "-0.02em",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#6b7d96", lineHeight: "1.7" }}>{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 80px" }}>
        <AnimatedSection>
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "48px 40px",
              borderRadius: "20px",
              background: "#0d1526",
              border: "1px solid #1a2d4a",
              textAlign: "center",
            }}
          >
            <h3
              className="display-heading"
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#e8edf5",
                letterSpacing: "-0.04em",
                marginBottom: "12px",
              }}
            >
              Pronto para trabalhar conosco?
            </h3>
            <p style={{ fontSize: "15px", color: "#6b7d96", marginBottom: "28px" }}>
              Entre em contato e veja como podemos ajudar no seu próximo projeto.
            </p>
            <Link
              href="/contato"
              className="btn-ghost-hover"
              style={{
                display: "inline-block",
                padding: "13px 28px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "700",
                textDecoration: "none",
                background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
                color: "#fff",
              }}
            >
              Entrar em contato
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
