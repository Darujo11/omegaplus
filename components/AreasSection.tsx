"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  Building2, Layers, Droplets, Leaf, ShieldCheck,
  Mountain, Settings, Map, Search, Zap, Cpu, ChevronRight,
} from "lucide-react";
import { AREAS } from "@/lib/site-data";

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

/* ── Animated corner number (00 → actual index) ── */
function AnimatedIndex({ n, inView, delay }: { n: number; inView: boolean; delay: number }) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => String(Math.round(v)).padStart(2, "0"));

  useEffect(() => {
    if (!inView) return;
    return animate(count, n, { duration: 0.7, delay, ease: "easeOut" }).stop;
  }, [inView, count, n, delay]);

  return <motion.span style={{ fontVariantNumeric: "tabular-nums" }}>{display}</motion.span>;
}

/* ── Blueprint corner brackets (technical drawing marks) ── */
function CornerBrackets({ inView, delay }: { inView: boolean; delay: number }) {
  const transition = { duration: 0.4, ease: "easeOut" as const };
  return (
    <>
      {/* Top-left */}
      <svg
        style={{ position: "absolute", top: 10, left: 10, pointerEvents: "none", zIndex: 2 }}
        width="14" height="14" viewBox="0 0 14 14" fill="none"
      >
        <motion.path
          d="M 13 1 L 1 1 L 1 13"
          stroke="#1a7fc1"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ ...transition, delay: delay + 0.05 }}
        />
      </svg>
      {/* Bottom-right */}
      <svg
        style={{ position: "absolute", bottom: 10, right: 10, pointerEvents: "none", zIndex: 2 }}
        width="14" height="14" viewBox="0 0 14 14" fill="none"
      >
        <motion.path
          d="M 1 13 L 13 13 L 13 1"
          stroke="#1a7fc1"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={{ ...transition, delay: delay + 0.15 }}
        />
      </svg>
    </>
  );
}

/* ── Individual card ── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

type Area = (typeof AREAS)[number];

function AreaCard({ area, index }: { area: Area; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const staggerDelay = index * 0.1;

  return (
    <motion.div ref={ref} variants={cardVariants} style={{ height: "100%" }}>
      <Link href={`/areas-de-atuacao/${area.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <motion.div
          className="card-hover"
          whileHover={{ y: -3, transition: { duration: 0.18, ease: "easeOut" } }}
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
          {/* ── Scan line sweep (plotter / CAD render) ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              inView
                ? {
                    scaleX: [0, 1, 1],
                    opacity: [0, 0.55, 0],
                  }
                : {}
            }
            transition={
              inView
                ? {
                    duration: 0.85,
                    delay: staggerDelay + 0.12,
                    times: [0, 0.65, 1],
                    ease: "linear",
                  }
                : {}
            }
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, #1a7fc1 35%, #3d9fd8 65%, transparent 100%)",
              transformOrigin: "left",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />

          {/* ── Blueprint corner brackets ── */}
          <CornerBrackets inView={inView} delay={staggerDelay} />

          {/* ── Animated corner index ── */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: staggerDelay + 0.35, duration: 0.3 }}
            style={{
              position: "absolute",
              top: "16px",
              right: "18px",
              fontFamily: "var(--font-code)",
              fontSize: "10px",
              color: "rgba(26, 127, 193, 0.35)",
              letterSpacing: "0.06em",
              zIndex: 4,
            }}
          >
            <AnimatedIndex n={index + 1} inView={inView} delay={staggerDelay + 0.3} />
          </motion.span>

          {/* ── Icon box ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: staggerDelay + 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
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
              position: "relative",
              zIndex: 1,
            }}
          >
            {iconMap[area.icon]}
          </motion.div>

          {/* ── Title ── */}
          <motion.h3
            className="display-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: staggerDelay + 0.28, ease: "easeOut" }}
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#e8edf5",
              marginBottom: "10px",
              letterSpacing: "-0.02em",
              lineHeight: "1.3",
              position: "relative",
              zIndex: 1,
            }}
          >
            {area.title}
          </motion.h3>

          {/* ── Description ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: staggerDelay + 0.4 }}
            style={{
              fontSize: "13px",
              color: "#6b7d96",
              lineHeight: "1.65",
              position: "relative",
              zIndex: 1,
            }}
          >
            {area.shortDesc}
          </motion.p>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ── Container variants (orchestrates stagger across all cards) ── */
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/* ── Main export ── */
export default function AreasSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const featuredAreas = AREAS.slice(0, 4);

  return (
    <section style={{ padding: "clamp(60px, 8vw, 96px) clamp(16px, 4vw, 24px)", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
      <div className="section-watermark">01</div>

      {/* ── Section header ── */}
      <div ref={headerRef} style={{ marginBottom: "56px" }}>

        {/* Accent line draws itself left → right */}
        <div style={{ position: "relative", height: "2px", width: "48px", background: "#1a2d4a", marginBottom: "16px" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #1a7fc1, #3d9fd8)",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -14 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.span>

        {/* Heading */}
        <div style={{ overflow: "hidden", marginBottom: "16px" }}>
          <motion.h2
            className="display-heading"
            initial={{ y: "102%" }}
            animate={headerInView ? { y: "0%" } : {}}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
              margin: 0,
            }}
          >
            Soluções técnicas
            <br />
            para cada desafio
          </motion.h2>
        </div>

        {/* Body + technical detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.42 }}
          style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}
        >
          <p style={{ fontSize: "16px", color: "#6b7d96", maxWidth: "52ch", lineHeight: "1.7", margin: 0 }}>
            Atuamos em 11 especialidades — da concepção ao acompanhamento técnico final.
          </p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.62 }}
            style={{
              fontFamily: "var(--font-code)",
              fontSize: "10px",
              color: "rgba(26,127,193,0.32)",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            11 ESPEC. · CREA-RJ
          </motion.span>
        </motion.div>
      </div>

      {/* ── Stagger grid ── */}
      <motion.div
        ref={gridRef}
        variants={gridVariants}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
          gap: "16px",
        }}
      >
        {featuredAreas.map((area, i) => (
          <AreaCard key={area.slug} area={area} index={i} />
        ))}
      </motion.div>

      {/* ── CTA link ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={gridInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        style={{ marginTop: "36px" }}
      >
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
      </motion.div>
    </section>
  );
}
