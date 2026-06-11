import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Layers,
  Droplets,
  Leaf,
  ShieldCheck,
  Mountain,
  Settings,
  Map,
  Search,
  Zap,
  Cpu,
  ChevronRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { AREAS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description:
    "Conheça as 11 especialidades de engenharia da Omega CSA Engenharia: civil, estrutural, hidrossanitária, sanitária/ambiental, geotecnia, elétrica e muito mais.",
};

const iconMap: Record<string, React.ReactNode> = {
  building: <Building2 size={24} />,
  layers: <Layers size={24} />,
  droplets: <Droplets size={24} />,
  leaf: <Leaf size={24} />,
  shield: <ShieldCheck size={24} />,
  mountain: <Mountain size={24} />,
  settings: <Settings size={24} />,
  map: <Map size={24} />,
  search: <Search size={24} />,
  zap: <Zap size={24} />,
  cpu: <Cpu size={24} />,
};

export default function AreasDeAtuacaoPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "clamp(100px, 18vh, 140px)",
          paddingBottom: "64px",
          paddingLeft: "clamp(16px, 4vw, 24px)",
          paddingRight: "clamp(16px, 4vw, 24px)",
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
            Especialidades
          </p>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
              marginBottom: "24px",
            }}
          >
            Áreas de atuação.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7d96",
              lineHeight: "1.7",
              maxWidth: "600px",
            }}
          >
            Atuamos em 11 especialidades de engenharia — do projeto à entrega, com rigor técnico e profissionais habilitados no CREA-RJ.
          </p>
        </AnimatedSection>
      </section>

      {/* Areas grid */}
      <section style={{ padding: "0 clamp(16px, 4vw, 24px) clamp(64px, 9vw, 96px)", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          {AREAS.map((area, i) => (
            <AnimatedSection key={area.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/areas-de-atuacao/${area.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <div
                  className="card-hover"
                  style={{
                    padding: "32px",
                    borderRadius: "16px",
                    background: "#0d1526",
                    border: "1px solid #1a2d4a",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    cursor: "pointer",
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
                      flexShrink: 0,
                    }}
                  >
                    {iconMap[area.icon]}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontSize: "17px",
                        fontWeight: "700",
                        color: "#e8edf5",
                        letterSpacing: "-0.3px",
                        lineHeight: "1.3",
                        marginBottom: "10px",
                      }}
                    >
                      {area.title}
                    </h2>
                    <p style={{ fontSize: "13px", color: "#6b7d96", lineHeight: "1.6" }}>
                      {area.shortDesc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#3d9fd8",
                    }}
                  >
                    Ver serviços <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
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
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-1px",
              marginBottom: "16px",
            }}
          >
            Precisa de um especialista?
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7d96", marginBottom: "36px" }}>
            Entre em contato e descubra como podemos ajudar no seu projeto.
          </p>
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
            Solicitar orçamento <ChevronRight size={16} />
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
