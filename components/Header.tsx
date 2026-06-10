"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
          padding: "0 clamp(16px, 4vw, 24px)",
          height: "76px",
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
              height: "46px",
              width: "auto",
              mixBlendMode: "screen",
            }}
          />
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
        <motion.a
          href={`https://wa.me/${SITE.social.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
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
            display: "inline-block",
          }}
        >
          WhatsApp
        </motion.a>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.1 }}
          style={{
            background: "none",
            border: "none",
            color: "#e8edf5",
            cursor: "pointer",
            padding: "8px",
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
                style={{ display: "block" }}
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
                style={{ display: "block" }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              overflow: "hidden",
              background: "rgba(8, 14, 26, 0.98)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(26, 45, 74, 0.6)",
            }}
          >
            <div style={{ padding: "16px clamp(16px, 4vw, 24px) 24px" }}>
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.04, duration: 0.2 }}
                  >
                    <Link
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
                  </motion.div>
                );
              })}
              <motion.a
                href={`https://wa.me/${SITE.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.04 + 0.08 }}
                whileTap={{ scale: 0.97 }}
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
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
