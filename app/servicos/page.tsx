import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  HardHat,
  FileSearch,
  Lightbulb,
  BarChart2,
  Leaf,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SERVICES, SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Serviços Técnicos",
  description:
    "Projetos, fiscalização, laudos, consultoria, gerenciamento de obras e licenciamento ambiental — serviços técnicos especializados da Omega CSA Engenharia.",
};

const iconMap: Record<string, React.ReactNode> = {
  "file-text": <FileText size={24} />,
  "hard-hat": <HardHat size={24} />,
  "file-search": <FileSearch size={24} />,
  lightbulb: <Lightbulb size={24} />,
  "bar-chart": <BarChart2 size={24} />,
  leaf: <Leaf size={24} />,
};

export default function ServicosTecnicosPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "80px",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#1a7fc1",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            O que entregamos
          </p>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-2px",
              lineHeight: "1.1",
              marginBottom: "24px",
            }}
          >
            Serviços técnicos.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7d96",
              lineHeight: "1.7",
              maxWidth: "66ch",
            }}
          >
            Projetos, laudos, fiscalização, consultoria e gerenciamento — cada entregável desenvolvido com máximo rigor técnico e comprometimento com o resultado.
          </p>
        </AnimatedSection>
      </section>

      {/* Services grid */}
      <section
        style={{
          padding: "0 24px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.slug} delay={(i % 3) * 0.1}>
              <div
                style={{
                  padding: "36px",
                  borderRadius: "16px",
                  background: "#0d1526",
                  border: "1px solid #1a2d4a",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
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
                  }}
                >
                  {iconMap[service.icon]}
                </div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#e8edf5",
                    letterSpacing: "-0.4px",
                  }}
                >
                  {service.title}
                </h2>
                <p style={{ fontSize: "14px", color: "#6b7d96", lineHeight: "1.7", flex: 1 }}>
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Link to areas */}
      <section
        style={{
          padding: "64px 24px",
          background: "#0d1526",
          borderTop: "1px solid #1a2d4a",
          borderBottom: "1px solid #1a2d4a",
        }}
      >
        <AnimatedSection>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: "700",
                  color: "#e8edf5",
                  letterSpacing: "-0.5px",
                  marginBottom: "8px",
                }}
              >
                Procurando por uma especialidade específica?
              </h2>
              <p style={{ fontSize: "15px", color: "#6b7d96" }}>
                Veja nossas 11 áreas de atuação com todos os serviços detalhados.
              </p>
            </div>
            <Link
              href="/areas-de-atuacao"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 24px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
                background: "rgba(26, 127, 193, 0.1)",
                border: "1px solid rgba(26, 127, 193, 0.25)",
                color: "#3d9fd8",
                whiteSpace: "nowrap",
              }}
            >
              Ver áreas de atuação <ArrowRight size={15} />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Process */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#1a7fc1",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Metodologia
          </p>
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-1px",
            }}
          >
            Como trabalhamos
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            { step: "01", title: "Diagnóstico", desc: "Análise detalhada das necessidades e condicionantes do projeto." },
            { step: "02", title: "Proposta técnica", desc: "Elaboração de proposta com escopo, prazo e investimento." },
            { step: "03", title: "Desenvolvimento", desc: "Execução com equipe especializada e controle de qualidade." },
            { step: "04", title: "Entrega e suporte", desc: "Entrega documentada e suporte técnico continuado." },
          ].map((item, i) => (
            <AnimatedSection key={item.step} delay={i * 0.1}>
              <div
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  background: "#0d1526",
                  border: "1px solid #1a2d4a",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#1a7fc1",
                    letterSpacing: "2px",
                    marginBottom: "12px",
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#e8edf5",
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7d96", lineHeight: "1.6" }}>{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 80px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <h2
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-1px",
              marginBottom: "16px",
            }}
          >
            Precisa de um orçamento?
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7d96", marginBottom: "36px" }}>
            Entre em contato para conversarmos sobre o seu projeto.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contato"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                textDecoration: "none",
                background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
                color: "#fff",
              }}
            >
              Solicitar orçamento <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${SITE.social.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                textDecoration: "none",
                background: "rgba(26, 127, 193, 0.08)",
                border: "1px solid rgba(26, 127, 193, 0.25)",
                color: "#3d9fd8",
              }}
            >
              WhatsApp
            </a>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
