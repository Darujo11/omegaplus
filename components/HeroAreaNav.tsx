"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Map, ChevronRight } from "lucide-react";
import { AREAS } from "@/lib/site-data";

type Area = (typeof AREAS)[number];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

function Badge({ area }: { area: Area }) {
  return (
    <span className="hero-area-badge" aria-hidden>
      {area.image ? (
        <Image
          src={area.image}
          alt=""
          width={38}
          height={38}
          style={{ width: "38px", height: "38px", objectFit: "contain" }}
        />
      ) : (
        <span className="hero-area-badge-fallback">
          <Map size={20} strokeWidth={1.8} />
        </span>
      )}
    </span>
  );
}

export default function HeroAreaNav({
  items,
  side = "left",
}: {
  items: readonly Area[];
  side?: "left" | "right";
}) {
  const isRight = side === "right";

  const itemVariants = {
    hidden: { opacity: 0, x: isRight ? 16 : -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <motion.nav
      aria-label={`Áreas de atuação${isRight ? " (continuação)" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hero-area-nav"
    >
      {items.map((area) => (
        <motion.div key={area.slug} variants={itemVariants}>
          <Link href={`/areas-de-atuacao/${area.slug}`} className="hero-area-link">
            <Badge area={area} />
            <span className="hero-area-name">{area.title}</span>
            <ChevronRight size={15} className="hero-area-chevron" aria-hidden />
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
}
