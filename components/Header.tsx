"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site-data";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(8, 14, 26, 0.95)"
          : "linear-gradient(180deg, rgba(8,14,26,0.8) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(26, 45, 74, 0.6)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              src="/favicon/web-app-manifest-512x512.png"
              alt="Omega CSA Engenharia"
              width={42}
              height={42}
              priority
              style={{ width: "42px", height: "42px", borderRadius: "6px" }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#e8edf5",
                  letterSpacing: "0.02em",
                  lineHeight: "1.1",
                }}
              >
                OMEGA CSA
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "9px",
                  fontWeight: "500",
                  color: "#5a9e2f",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                ENGENHARIA
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "7px 11px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "color 0.18s ease, background 0.18s ease, border-color 0.18s ease",
                  color: active ? "#e8edf5" : "#6b7d96",
                  background: active ? "rgba(26, 127, 193, 0.12)" : "transparent",
                  border: active ? "1px solid rgba(26, 127, 193, 0.22)" : "1px solid transparent",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#c8d4e0";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#6b7d96";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Desktop */}
        <a
          href={`https://wa.me/${SITE.social.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
            color: "#fff",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          WhatsApp
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#e8edf5",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(8, 14, 26, 0.98)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(26, 45, 74, 0.6)",
            padding: "16px 24px 24px",
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "500",
                  textDecoration: "none",
                  color: active ? "#1a7fc1" : "#8a9ab0",
                  background: active ? "rgba(26, 127, 193, 0.1)" : "transparent",
                  marginBottom: "4px",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={`https://wa.me/${SITE.social.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: "12px",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              textDecoration: "none",
              background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
              color: "#fff",
              textAlign: "center",
            }}
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
