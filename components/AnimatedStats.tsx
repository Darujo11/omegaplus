"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { type: "counter" as const, value: 15, suffix: "+", label: "Anos de experiência" },
  { type: "counter" as const, value: 200, suffix: "+", label: "Projetos entregues" },
  { type: "counter" as const, value: 100, suffix: "%", label: "Compromisso técnico" },
  { type: "text" as const, display: "RJ", label: "Norte Fluminense" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, count, to]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function AnimatedStats() {
  return (
    <section
      style={{
        background: "#060c18",
        borderTop: "1px solid #1a2d4a",
        borderBottom: "1px solid #1a2d4a",
        padding: "52px clamp(16px, 4vw, 24px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 45%), 1fr))",
          gap: "clamp(20px, 4vw, 40px)",
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "clamp(1.875rem, 2.5vw, 2.75rem)",
                fontWeight: "600",
                color: "#e8edf5",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: "10px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {stat.type === "counter" ? (
                <Counter to={stat.value} suffix={stat.suffix} />
              ) : (
                stat.display
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "10px",
                color: "#3d5070",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
