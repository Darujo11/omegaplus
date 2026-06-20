"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Fecha menu mobile e libera scroll do body antes da pintura da nova pagina
  useLayoutEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  // Trava scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
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
            padding: "0 clamp(16px, 4vw, 24px)",
            height: "clamp(60px, 12vw, 76px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <Image
              src="/logo max.png"
              alt="Omega CSA Engenharia"
              width={220}
              height={102}
              priority
              style={{
                height: "clamp(34px, 6vw, 46px)",
                width: "auto",
                mixBlendMode: "screen",
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
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
          <motion.a
            href={`https://wa.me/${SITE.social.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-desktop"
            whileHover={{ opacity: 0.85 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.12 }}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
              color: "#fff",
            }}
          >
            WhatsApp
          </motion.a>

          {/* Mobile toggle */}
          <motion.button
            className="menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.88 }}
            transition={{ duration: 0.1 }}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            style={{
              background: "none",
              border: "none",
              color: "#e8edf5",
              cursor: "pointer",
              padding: "12px",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "44px",
              minHeight: "44px",
              borderRadius: "8px",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "block", lineHeight: 0 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: "block", lineHeight: 0 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu — drawer abaixo do header */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: "hidden",
                background: "rgba(8, 14, 26, 0.99)",
                backdropFilter: "blur(16px)",
                borderTop: "1px solid rgba(26, 45, 74, 0.6)",
              }}
            >
              <nav
                style={{
                  padding: "8px clamp(16px, 4vw, 24px) 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                {NAV_LINKS.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setMobileOpen(false);
                          document.body.style.overflow = "";
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          minHeight: "48px",
                          padding: "0 16px",
                          borderRadius: "10px",
                          fontSize: "16px",
                          fontWeight: active ? "600" : "500",
                          textDecoration: "none",
                          color: active ? "#e8edf5" : "#8a9ab0",
                          background: active ? "rgba(26, 127, 193, 0.12)" : "transparent",
                          borderLeft: active ? "2px solid #1a7fc1" : "2px solid transparent",
                          transition: "background 0.15s, color 0.15s",
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Divisor */}
                <div style={{ height: "1px", background: "rgba(26, 45, 74, 0.5)", margin: "10px 0 8px" }} />

                {/* WhatsApp CTA */}
                <motion.a
                  href={`https://wa.me/${SITE.social.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.04 + 0.1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "48px",
                    padding: "0 20px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    textDecoration: "none",
                    background: "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
                    color: "#fff",
                  }}
                >
                  Falar no WhatsApp
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Overlay — fecha ao tocar fora do menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(0, 0, 0, 0.5)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
