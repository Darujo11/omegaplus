import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
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
import { SITE, STATS, AREAS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Omega CSA Engenharia — Campos dos Goytacazes, RJ",
};

const iconMap: Record<string, React.ReactNode> = {
  building: <Building2 size={20} />,
  layers: <Layers size={20} />,
  droplets: <Droplets size={20} />,
  leaf: <Leaf size={20} />,
  shield: <ShieldCheck size={20} />,
  mountain: <Mountain size={20} />,
  settings: <Settings size={20} />,
  map: <Map size={20} />,
  search: <Search size={20} />,
  zap: <Zap size={20} />,
  cpu: <Cpu size={20} />,
};

const tickerItems = AREAS.map((a) => a.title);

export default function HomePage() {
  const featuredAreas = AREAS.slice(0, 4);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="blueprint-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "900px",
            height: "700px",
            background:
              "radial-gradient(ellipse at center, rgba(26, 127, 193, 0.1) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />

        {/* Decorative Ω watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "-40px",
            bottom: "5%",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(200px, 30vw, 380px)",
            fontWeight: "700",
            color: "rgba(26, 127, 193, 0.03)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "-0.05em",
          }}
        >
          Ω
        </div>

        {/* Coordinates — top right */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "88px",
            right: "32px",
            fontFamily: "var(--font-code)",
            fontSize: "11px",
            color: "rgba(61, 159, 216, 0.35)",
            letterSpacing: "0.08em",
            lineHeight: "1.8",
            textAlign: "right",
            pointerEvents: "none",
          }}
        >
          21°45&prime;S 41°19&prime;W
          <br />
          CAMPOS — RJ
        </div>

        {/* Content */}
        <div style={{ maxWidth: "920px", width: "100%", textAlign: "center", position: "relative" }}>
          {/* Badge */}
          <AnimatedSection delay={0}>
            <div
              className="glow-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1px solid rgba(26, 127, 193, 0.28)",
                background: "rgba(26, 127, 193, 0.07)",
                marginBottom: "36px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#1a7fc1",
                  boxShadow: "0 0 8px rgba(26, 127, 193, 0.8)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "#3d9fd8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Campos dos Goytacazes, Rio de Janeiro
              </span>
            </div>
          </AnimatedSection>

          {/* Heading */}
          <AnimatedSection delay={0.1}>
            <h1
              className="display-heading"
              style={{
                fontSize: "var(--text-5xl)",
                fontWeight: "700",
                color: "#e8edf5",
                lineHeight: "1.0",
                letterSpacing: "-0.04em",
                marginBottom: "28px",
              }}
            >
              Engenharia de{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3d9fd8 0%, #1a7fc1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                excelência,
              </span>
              <br />
              resultados que perduram.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p
              style={{
                fontSize: "17px",
                color: "#6b7d96",
                lineHeight: "1.75",
                maxWidth: "64ch",
                margin: "0 auto 48px",
              }}
            >
              Soluções integradas em engenharia para obras públicas, privadas, industriais e ambientais.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contato"
                className="btn-ghost-hover"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 32px rgba(26, 127, 193, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  letterSpacing: "0.01em",
                }}
              >
                Solicitar Orçamento <ArrowRight size={15} />
              </Link>
              <Link
                href="/areas-de-atuacao"
                className="btn-ghost-hover"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#8a9ab0",
                }}
              >
                Áreas de Atuação <ChevronRight size={15} />
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <AnimatedSection
          delay={0.5}
          style={{
            maxWidth: "900px",
            width: "100%",
            marginTop: "80px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "0",
              background: "#1a2d4a",
              border: "1px solid #1a2d4a",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: "28px 20px",
                  background: "#0d1526",
                  textAlign: "center",
                  borderRight: i < STATS.length - 1 ? "1px solid #1a2d4a" : "none",
                  position: "relative",
                }}
              >
                {/* Top accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "32px",
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #1a7fc1, transparent)",
                  }}
                />
                <div
                  className="stat-value"
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: "500",
                    color: "#3d9fd8",
                    marginBottom: "6px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "10px",
                    color: "#3d5070",
                    fontWeight: "400",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── TICKER ── */}
      <div
        style={{
          borderTop: "1px solid #1a2d4a",
          borderBottom: "1px solid #1a2d4a",
          background: "#060c18",
          overflow: "hidden",
          padding: "13px 0",
          position: "relative",
        }}
      >
        {/* Left fade */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(90deg, #060c18, transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(270deg, #060c18, transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "20px",
                paddingRight: "40px",
                fontFamily: "var(--font-code)",
                fontSize: "11px",
                fontWeight: "500",
                color: "#4e667f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {item}
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "#1a7fc1",
                  opacity: 0.6,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* ── AREAS PREVIEW ── */}
      <section style={{ padding: "96px 24px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        {/* Section watermark */}
        <div className="section-watermark">01</div>

        <AnimatedSection>
          <div style={{ marginBottom: "56px" }}>
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
              Áreas de Atuação
            </span>
            <h2
              className="display-heading"
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "700",
                color: "#e8edf5",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
                marginBottom: "16px",
              }}
            >
              Soluções técnicas
              <br />
              para cada desafio
            </h2>
            <p style={{ fontSize: "16px", color: "#6b7d96", maxWidth: "52ch", lineHeight: "1.7" }}>
              Atuamos em 11 especialidades — da concepção ao acompanhamento técnico final.
            </p>
          </div>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {featuredAreas.map((area, i) => (
            <AnimatedSection key={area.slug} delay={i * 0.08}>
              <Link
                href={`/areas-de-atuacao/${area.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <div
                  className="card-hover"
                  style={{
                    padding: "28px",
                    borderRadius: "14px",
                    background: "#0d1526",
                    border: "1px solid #1a2d4a",
                    height: "100%",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Corner number */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "18px",
                      fontFamily: "var(--font-code)",
                      fontSize: "10px",
                      color: "rgba(26, 127, 193, 0.25)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "rgba(26, 127, 193, 0.1)",
                      border: "1px solid rgba(26, 127, 193, 0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1a7fc1",
                      marginBottom: "18px",
                    }}
                  >
                    {iconMap[area.icon]}
                  </div>
                  <h3
                    className="display-heading"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#e8edf5",
                      marginBottom: "10px",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.3",
                    }}
                  >
                    {area.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#6b7d96", lineHeight: "1.65" }}>
                    {area.shortDesc}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.35} style={{ marginTop: "36px" }}>
          <Link
            href="/areas-de-atuacao"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-code)",
              fontSize: "12px",
              fontWeight: "500",
              color: "#3d9fd8",
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Ver todas as 11 áreas <ChevronRight size={14} />
          </Link>
        </AnimatedSection>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "linear-gradient(180deg, #060c18 0%, #0a1628 50%, #060c18 100%)",
          borderTop: "1px solid #1a2d4a",
          borderBottom: "1px solid #1a2d4a",
          padding: "96px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          className="blueprint-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.35 }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(26, 127, 193, 0.09) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <AnimatedSection>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "64px",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Left: copy */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "#3d9fd8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "20px",
                  opacity: 0.65,
                }}
              >
                Vamos trabalhar juntos
              </span>
              <h2
                className="display-heading"
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "700",
                  color: "#e8edf5",
                  letterSpacing: "-0.04em",
                  lineHeight: "1.05",
                  marginBottom: "20px",
                }}
              >
                Tem um projeto em mente?
              </h2>
              <p style={{ fontSize: "17px", color: "#6b7d96", lineHeight: "1.7", maxWidth: "50ch" }}>
                Entre em contato e veja como podemos transformar sua ideia em realidade com a precisão técnica que seu projeto merece.
              </p>
            </div>

            {/* Right: actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <Link
                href="/contato"
                className="btn-ghost-hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "16px 32px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "700",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 32px rgba(26, 127, 193, 0.28)",
                  letterSpacing: "0.01em",
                }}
              >
                Solicitar Orçamento <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${SITE.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "16px 32px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "600",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#8a9ab0",
                }}
              >
                Falar pelo WhatsApp
              </a>
              <div style={{ display: "flex", gap: "24px", paddingTop: "4px" }}>
                <a
                  href={`tel:${SITE.phone}`}
                  className="cta-contact-link"
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "12px",
                    color: "#3d5070",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="cta-contact-link"
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "12px",
                    color: "#3d5070",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
