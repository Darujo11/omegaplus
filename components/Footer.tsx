"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#060c18",
        borderTop: "1px solid #1a2d4a",
        padding: "clamp(40px, 8vw, 64px) clamp(16px, 4vw, 24px) 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(24px, 5vw, 48px)",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <Image
                src="/logo max.png"
                alt="Omega CSA Engenharia"
                width={220}
                height={102}
                style={{
                  height: "56px",
                  width: "auto",
                  mixBlendMode: "screen",
                }}
              />
            </div>
            <p style={{ fontSize: "14px", color: "#6b7d96", lineHeight: "1.6", maxWidth: "260px" }}>
              {SITE.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                fontWeight: "500",
                color: "#4a6080",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Navegação
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: "14px", color: "#6b7d96", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1a7fc1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7d96")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                fontWeight: "500",
                color: "#4a6080",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Contato
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={`tel:${SITE.phone}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "14px",
                  color: "#6b7d96",
                  textDecoration: "none",
                }}
              >
                <Phone size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#1a7fc1" }} />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "14px",
                  color: "#6b7d96",
                  textDecoration: "none",
                }}
              >
                <Mail size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#1a7fc1" }} />
                {SITE.email}
              </a>
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#6b7d96" }}
              >
                <MapPin size={14} style={{ marginTop: "2px", flexShrink: 0, color: "#1a7fc1" }} />
                <span>{SITE.address.full}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid #1a2d4a",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#3d5070" }}>
            © {new Date().getFullYear()} Omega CSA Engenharia. Todos os direitos reservados.
          </p>
          <p style={{ fontSize: "13px", color: "#3d5070" }}>
            CREA-RJ · Campos dos Goytacazes, RJ
          </p>
        </div>
      </div>
    </footer>
  );
}
