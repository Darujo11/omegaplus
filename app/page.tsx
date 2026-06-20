import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedStats from "@/components/AnimatedStats";
import AreasSection from "@/components/AreasSection";
import PortfolioPreviewSection from "@/components/PortfolioPreviewSection";
import HeroAreaNav from "@/components/HeroAreaNav";
import { SITE, AREAS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Omega CSA Engenharia — Campos dos Goytacazes, RJ",
};

const tickerItems = AREAS.map((a) => a.title);

const LOGOS = [
  "/aprovadosporquemusa/1.jpg",
  "/aprovadosporquemusa/realiza.jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura.jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(2).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(3).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(4).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(5).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(6).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(7).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(9).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(10).jpg",
  "/aprovadosporquemusa/Foto de Fabio Ventura(11).jpg",
  "/aprovadosporquemusa/prefeitura carapebus.jpg",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Video background — objeto de engenharia se formando, ancorado à direita */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video_hero/hero-poster.png"
          className="hero-video"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.92) saturate(1.08)",
          }}
        >
          <source src="/video_hero/videoback.mp4" type="video/mp4" />
        </video>

        {/* Tint navy — harmoniza o azul-claro do vídeo com a paleta dark da marca */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "rgba(8,14,26,0.28)",
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />

        {/* Blueprint grid on top of video */}
        <div
          className="blueprint-bg"
          aria-hidden
          style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.18 }}
        />

        {/* Primary gradient: escurece à esquerda, abre o vídeo à direita */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(90deg, rgba(8,14,26,0.90) 0%, rgba(8,14,26,0.82) 28%, rgba(8,14,26,0.38) 50%, rgba(8,14,26,0.82) 72%, rgba(8,14,26,0.90) 100%)",
          }}
        />

        {/* Top vignette — blende com o header */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "clamp(140px, 20vw, 220px)",
            zIndex: 3,
            background: "linear-gradient(to bottom, rgba(8,14,26,0.58) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom vignette — ancora o conteúdo na página */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "clamp(180px, 22vw, 260px)",
            zIndex: 3,
            background: "linear-gradient(to top, rgba(8,14,26,0.82) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Radial blue glow — reforça a identidade de marca no lado esquerdo */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(320px, 70vw, 800px)",
            height: "clamp(240px, 55vw, 600px)",
            background: "radial-gradient(ellipse at center, rgba(26,127,193,0.1) 0%, transparent 68%)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Decorative Ω watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-16px",
            bottom: "6%",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(180px, 26vw, 360px)",
            fontWeight: "700",
            color: "rgba(26,127,193,0.04)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
            letterSpacing: "-0.05em",
            zIndex: 3,
          }}
        >
          Ω
        </div>

        {/* Coordinates — canto inferior direito sobre o vídeo */}
        <div
          aria-hidden
          className="hero-coords"
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
            fontFamily: "var(--font-code)",
            fontSize: "10px",
            color: "rgba(61,159,216,0.38)",
            letterSpacing: "0.09em",
            lineHeight: "1.9",
            textAlign: "right",
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          21°45′S 41°19′W
          <br />
          CAMPOS — RJ
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            maxWidth: "1240px",
            width: "100%",
            margin: "0 auto",
            padding: "clamp(74px,9vh,86px) clamp(16px,4vw,32px) clamp(30px,5vh,44px)",
          }}
        >
          {/* Eyebrow + H1 compacto (SEO) — centralizado no topo */}
          <AnimatedSection delay={0.05}>
            <div style={{ textAlign: "center", marginBottom: "clamp(20px,4vh,40px)" }}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "#3d9fd8",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  opacity: 0.85,
                }}
              >
                Explore nossas soluções
              </span>
              <h1
                className="display-heading"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "700",
                  color: "#e8edf5",
                  lineHeight: "1.1",
                  letterSpacing: "-0.035em",
                  margin: 0,
                }}
              >
                Áreas de atuação em engenharia
              </h1>
            </div>
          </AnimatedSection>

          {/* Duas colunas de áreas flanqueando o objeto central */}
          <div className="hero-areas-split">
            <HeroAreaNav items={AREAS.slice(0, 6)} side="left" />
            <HeroAreaNav items={AREAS.slice(6)} side="right" />
          </div>

          {/* CTA principal — centralizada embaixo */}
          <AnimatedSection delay={0.7}>
            <div
              className="hero-actions"
              style={{ gap: "14px", marginTop: "clamp(22px,4vh,38px)", justifyContent: "center" }}
            >
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
                  boxShadow: "0 8px 32px rgba(26,127,193,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  letterSpacing: "0.01em",
                }}
              >
                Solicitar Orçamento <ArrowRight size={15} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STATS ── */}
      <AnimatedStats />

      {/* ── APROVADO POR QUEM USA ── */}
      <section
        style={{
          padding: "88px 0",
          background: "#060c18",
          borderBottom: "1px solid #1a2d4a",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <AnimatedSection>
          <div style={{ textAlign: "center", padding: "0 clamp(16px, 4vw, 24px)", marginBottom: "56px" }}>
            <div
              className="accent-line"
              style={{ margin: "0 auto 20px" }}
            />
            <h2
              className="display-heading"
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: "700",
                color: "#e8edf5",
                letterSpacing: "-0.04em",
                marginBottom: "10px",
              }}
            >
              Aprovado por quem usa
            </h2>
            <p
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "11px",
                color: "#3d5070",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Clientes e parceiros que confiam na Omega
            </p>
          </div>
        </AnimatedSection>

        {/* Marquee */}
        <div style={{ position: "relative" }}>
          {/* Left fade */}
          <div
            aria-hidden
            className="marquee-fade-l"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              background: "linear-gradient(90deg, #060c18, transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {/* Right fade */}
          <div
            aria-hidden
            className="marquee-fade-r"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              background: "linear-gradient(270deg, #060c18, transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <div className="marquee-track logo-card-track">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="logo-card"
                style={{
                  width: "clamp(150px, 38vw, 210px)",
                  height: "clamp(72px, 18vw, 100px)",
                  flexShrink: 0,
                  marginRight: "20px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  background: "rgba(255,255,255,0.94)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  opacity: 0.82,
                }}
              >
                <Image
                  src={logo}
                  alt="Cliente Omega Engenharia"
                  fill
                  sizes="210px"
                  style={{ objectFit: "contain", padding: "16px 22px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS PREVIEW ── */}
      <AreasSection />

      {/* ── PORTFOLIO PREVIEW ── */}
      <PortfolioPreviewSection />

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
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "clamp(28px, 5vw, 64px)",
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
                  href={`tel:${SITE.phoneTel}`}
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
