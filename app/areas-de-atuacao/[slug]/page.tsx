import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { AREAS, SITE } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) return {};
  return {
    title: area.title,
    description: `${area.shortDesc} — Omega CSA Engenharia, Campos dos Goytacazes, RJ.`,
  };
}

// Foto real ilustrativa por área (quando disponível)
const areaImages: Record<string, string> = {
  hidrossanitaria: "/areas/hidrossanitaria.webp",
  "sanitaria-ambiental": "/areas/sanitaria-ambiental.webp",
  "seguranca-do-trabalho": "/areas/seguranca-trabalho.webp",
};

const iconMap: Record<string, React.ReactNode> = {
  building: <Building2 size={28} />,
  layers: <Layers size={28} />,
  droplets: <Droplets size={28} />,
  leaf: <Leaf size={28} />,
  shield: <ShieldCheck size={28} />,
  mountain: <Mountain size={28} />,
  settings: <Settings size={28} />,
  map: <Map size={28} />,
  search: <Search size={28} />,
  zap: <Zap size={28} />,
  cpu: <Cpu size={28} />,
};

export default async function AreaDetalhe({ params }: Props) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);

  if (!area) notFound();

  const currentIndex = AREAS.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? AREAS[currentIndex - 1] : null;
  const next = currentIndex < AREAS.length - 1 ? AREAS[currentIndex + 1] : null;

  const half = Math.ceil(area.services.length / 2);
  const col1 = area.services.slice(0, half);
  const col2 = area.services.slice(half);

  const areaImage = areaImages[slug];

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
          <Link
            href="/areas-de-atuacao"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: "500",
              color: "#6b7d96",
              textDecoration: "none",
              marginBottom: "32px",
            }}
          >
            <ArrowLeft size={14} /> Áreas de Atuação
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flex: "1 1 420px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background: "rgba(26, 127, 193, 0.1)",
                  border: "1px solid rgba(26, 127, 193, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a7fc1",
                  flexShrink: 0,
                }}
              >
                {iconMap[area.icon]}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#1a7fc1",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Área de Atuação
                </p>
                <h1
                  style={{
                    fontSize: "var(--text-3xl)",
                    fontWeight: "700",
                    color: "#e8edf5",
                    letterSpacing: "-1.5px",
                    lineHeight: "1.1",
                    marginBottom: "16px",
                  }}
                >
                  {area.title}
                </h1>
                <p
                  style={{
                    fontSize: "17px",
                    color: "#6b7d96",
                    lineHeight: "1.7",
                    maxWidth: "64ch",
                  }}
                >
                  {area.shortDesc}
                </p>
              </div>
            </div>

            {areaImage && (
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid rgba(26, 127, 193, 0.3)",
                  boxShadow:
                    "0 0 0 6px rgba(26, 127, 193, 0.06), 0 20px 50px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src={areaImage}
                  alt={area.title}
                  fill
                  sizes="200px"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* Services list */}
      <section
        style={{
          padding: "0 24px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection style={{ marginBottom: "40px" }}>
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
            Serviços incluídos
          </p>
          <h2
            style={{
              fontSize: "var(--text-xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.5px",
            }}
          >
            {area.services.length} serviços disponíveis nessa área
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "12px 48px",
          }}
        >
          {[col1, col2].map((col, ci) => (
            <AnimatedSection key={ci} delay={ci * 0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.map((service) => (
                  <div
                    key={service}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "14px 18px",
                      borderRadius: "10px",
                      background: "#0d1526",
                      border: "1px solid #1a2d4a",
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      style={{ color: "#5a9e2f", flexShrink: 0, marginTop: "2px" }}
                    />
                    <span style={{ fontSize: "14px", color: "#8a9ab0", lineHeight: "1.5" }}>
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "64px 24px",
          background: "#0d1526",
          borderTop: "1px solid #1a2d4a",
          borderBottom: "1px solid #1a2d4a",
        }}
      >
        <AnimatedSection>
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "var(--text-xl)",
                fontWeight: "700",
                color: "#e8edf5",
                letterSpacing: "-0.8px",
                marginBottom: "14px",
              }}
            >
              Precisa desse serviço?
            </h2>
            <p style={{ fontSize: "15px", color: "#6b7d96", marginBottom: "32px" }}>
              Entre em contato e descubra como a Omega CSA pode atender o seu projeto.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contato"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 26px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "600",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
                  color: "#fff",
                }}
              >
                Solicitar orçamento <ArrowRight size={15} />
              </Link>
              <a
                href={`https://wa.me/${SITE.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 26px",
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
          </div>
        </AnimatedSection>
      </section>

      {/* Prev / Next navigation */}
      <section style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
            gap: "16px",
          }}
        >
          {prev && (
            <AnimatedSection>
              <Link
                href={`/areas-de-atuacao/${prev.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  background: "#0d1526",
                  border: "1px solid #1a2d4a",
                  textDecoration: "none",
                }}
              >
                <ArrowLeft size={16} style={{ color: "#3d9fd8", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "11px", color: "#3d5070", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                    Anterior
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#e8edf5" }}>{prev.title}</p>
                </div>
              </Link>
            </AnimatedSection>
          )}
          {next && (
            <AnimatedSection delay={0.05}>
              <Link
                href={`/areas-de-atuacao/${next.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "12px",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  background: "#0d1526",
                  border: "1px solid #1a2d4a",
                  textDecoration: "none",
                  textAlign: "right",
                }}
              >
                <div>
                  <p style={{ fontSize: "11px", color: "#3d5070", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                    Próximo
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#e8edf5" }}>{next.title}</p>
                </div>
                <ArrowRight size={16} style={{ color: "#3d9fd8", flexShrink: 0 }} />
              </Link>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
