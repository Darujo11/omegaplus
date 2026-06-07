import type { Metadata } from "next";
import Link from "next/link";
import { Building, FileCheck, Award, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Clientes e Atestados",
  description:
    "Empresas, órgãos públicos, condomínios e instituições atendidas pela Omega CSA Engenharia. Atestados de capacidade técnica e experiência comprovada.",
};

const clientTypes = [
  { label: "Órgãos Públicos Municipais", icon: <Building size={20} /> },
  { label: "Órgãos Estaduais e Federais", icon: <Building size={20} /> },
  { label: "Empresas Privadas", icon: <Building size={20} /> },
  { label: "Condomínios Residenciais e Comerciais", icon: <Building size={20} /> },
  { label: "Construtoras e Incorporadoras", icon: <Building size={20} /> },
  { label: "Indústrias", icon: <Building size={20} /> },
  { label: "Escritórios de Advocacia", icon: <Building size={20} /> },
  { label: "Seguradoras", icon: <Building size={20} /> },
];

const atestados = [
  {
    id: 1,
    title: "Sistema de Abastecimento de Água",
    contratante: "Município — Norte Fluminense, RJ",
    objeto: "Projeto executivo e supervisão de sistema de captação, adução, tratamento e distribuição de água.",
    area: "Recursos Hídricos",
  },
  {
    id: 2,
    title: "Plano de Drenagem Urbana",
    contratante: "Prefeitura Municipal — RJ",
    objeto: "Estudos hidrológicos, modelagem hidráulica e projetos de microdrenagem e macrodrenagem.",
    area: "Engenharia Sanitária e Ambiental",
  },
  {
    id: 3,
    title: "Gerenciamento de Obras de Infraestrutura",
    contratante: "Órgão Público — Norte Fluminense, RJ",
    objeto: "Fiscalização, supervisão e controle de qualidade de obras de pavimentação e infraestrutura urbana.",
    area: "Gestão de Obras",
  },
  {
    id: 4,
    title: "Laudos Estruturais — Edificações Comerciais",
    contratante: "Empresas privadas — Campos dos Goytacazes, RJ",
    objeto: "Inspeção técnica, avaliação de patologias e laudos para financiamento e seguro.",
    area: "Laudos e Perícias",
  },
  {
    id: 5,
    title: "Estação de Tratamento de Esgoto",
    contratante: "Município — Interior do RJ",
    objeto: "Projeto executivo e acompanhamento de ETE compacta para localidade rural.",
    area: "Engenharia Sanitária e Ambiental",
  },
  {
    id: 6,
    title: "Projetos Hidrossanitários — Condomínio Residencial",
    contratante: "Construtora — Campos dos Goytacazes, RJ",
    objeto: "Projetos completos de instalações hidráulicas, sanitárias e combate a incêndio.",
    area: "Engenharia Hidrossanitária",
  },
];

export default function ClientesPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "140px",
          paddingBottom: "64px",
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
            Quem atendemos
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
            Clientes e atestados.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7d96",
              lineHeight: "1.7",
              maxWidth: "66ch",
            }}
          >
            Atendemos empresas privadas, órgãos públicos, condomínios e instituições — com experiência comprovada em projetos de diferentes portes e complexidades.
          </p>
        </AnimatedSection>
      </section>

      {/* Who we serve */}
      <section
        style={{
          padding: "0 24px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection style={{ marginBottom: "36px" }}>
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
            Perfil de clientes
          </p>
          <h2
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.8px",
            }}
          >
            Quem confia na Omega CSA
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "12px",
          }}
        >
          {clientTypes.map((type, i) => (
            <AnimatedSection key={type.label} delay={(i % 4) * 0.07}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "18px 20px",
                  borderRadius: "12px",
                  background: "#0d1526",
                  border: "1px solid #1a2d4a",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "9px",
                    background: "rgba(26, 127, 193, 0.08)",
                    border: "1px solid rgba(26, 127, 193, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1a7fc1",
                    flexShrink: 0,
                  }}
                >
                  {type.icon}
                </div>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#8a9ab0" }}>
                  {type.label}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Atestados */}
      <section
        style={{
          padding: "80px 24px",
          background: "#0d1526",
          borderTop: "1px solid #1a2d4a",
          borderBottom: "1px solid #1a2d4a",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimatedSection style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <FileCheck size={20} style={{ color: "#5a9e2f" }} />
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#1a7fc1",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Capacidade técnica
              </p>
            </div>
            <h2
              style={{
                fontSize: "var(--text-xl)",
                fontWeight: "700",
                color: "#e8edf5",
                letterSpacing: "-0.8px",
                marginBottom: "14px",
              }}
            >
              Atestados de experiência
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7d96", maxWidth: "60ch" }}>
              Seleção de atestados de capacidade técnica emitidos por contratantes. Documentação completa disponível sob solicitação.
            </p>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "20px",
            }}
          >
            {atestados.map((item, i) => (
              <AnimatedSection key={item.id} delay={(i % 3) * 0.08}>
                <div
                  style={{
                    padding: "28px",
                    borderRadius: "14px",
                    background: "#080e1a",
                    border: "1px solid #1a2d4a",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                    <Award size={18} style={{ color: "#5a9e2f", flexShrink: 0, marginTop: "2px" }} />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#1a7fc1",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        textAlign: "right",
                      }}
                    >
                      {item.area}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#e8edf5",
                      letterSpacing: "-0.3px",
                      lineHeight: "1.3",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#3d9fd8", fontWeight: "500" }}>
                    {item.contratante}
                  </p>
                  <p style={{ fontSize: "13px", color: "#6b7d96", lineHeight: "1.6", flex: 1 }}>
                    {item.objeto}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} style={{ marginTop: "40px" }}>
            <div
              style={{
                padding: "20px 24px",
                borderRadius: "12px",
                background: "rgba(26, 127, 193, 0.05)",
                border: "1px solid rgba(26, 127, 193, 0.15)",
                fontSize: "13px",
                color: "#6b7d96",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "#3d9fd8" }}>Nota:</strong> Os atestados acima são uma seleção representativa. A documentação completa, com cópia dos atestados originais e Certidão de Acervo Técnico (CAT) do CREA, está disponível mediante solicitação formal.
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
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
            Seu nome pode estar aqui.
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7d96", marginBottom: "36px" }}>
            Entre em contato e descubra como a Omega CSA pode atender o seu projeto.
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
              Fale conosco <ArrowRight size={16} />
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
