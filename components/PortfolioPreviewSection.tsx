import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getFeaturedPortfolio, PORTFOLIO_PROJECTS, type PortfolioProject } from "@/lib/portfolio-data";

function PreviewCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <AnimatedSection delay={index * 0.08}>
      <Link
        href="/portfolio"
        className="card-hover"
        style={{
          display: "block",
          textDecoration: "none",
          borderRadius: "16px",
          background: "#0d1526",
          border: project.highlight
            ? "1px solid rgba(26, 127, 193, 0.4)"
            : "1px solid #1a2d4a",
          overflow: "hidden",
          height: "100%",
          boxShadow: project.highlight
            ? "0 0 0 1px rgba(26, 127, 193, 0.1), 0 8px 32px rgba(26, 127, 193, 0.1)"
            : "none",
        }}
      >
        <div
          style={{
            height: "clamp(160px, 28vw, 200px)",
            position: "relative",
            overflow: "hidden",
            borderBottom: "1px solid #1a2d4a",
            background: "#0a1628",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            style={{ objectFit: "cover" }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(8,14,26,0) 55%, rgba(13,21,38,0.55) 100%)",
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

        <div style={{ padding: "22px 24px 24px" }}>
          <span
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "10px",
              fontWeight: "500",
              color: "#1a7fc1",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
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
              margin: "0 0 8px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "#6b7d96",
              lineHeight: "1.65",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>
        </div>
      </Link>
    </AnimatedSection>
  );
}

export default function PortfolioPreviewSection() {
  const featured = getFeaturedPortfolio();

  return (
    <section
      style={{
        padding: "clamp(60px, 8vw, 96px) clamp(16px, 4vw, 24px)",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div className="section-watermark">02</div>

      <AnimatedSection>
        <div style={{ marginBottom: "48px" }}>
          <div className="accent-line" style={{ marginBottom: "16px" }} />
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
            Portfólio
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
            Projetos que entregamos
            <br />
            com excelência técnica
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7d96", maxWidth: "52ch", lineHeight: "1.7", margin: 0 }}>
            Uma amostra dos {PORTFOLIO_PROJECTS.length} projetos documentados — urbanismo, saneamento, drenagem e infraestrutura no Norte Fluminense.
          </p>
        </div>
      </AnimatedSection>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
          gap: "16px",
        }}
      >
        {featured.map((project, i) => (
          <PreviewCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <AnimatedSection delay={0.2}>
        <div style={{ marginTop: "36px" }}>
          <Link
            href="/portfolio"
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
            Ver portfólio completo <ChevronRight size={14} />
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
