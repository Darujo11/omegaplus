import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Map, ChevronRight } from "lucide-react";
import { AREAS } from "@/lib/site-data";

type Area = (typeof AREAS)[number];

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

  // Entrada em CSS puro (.hero-rise), sem Framer Motion: o hero é a primeira
  // dobra, e esconder seus links até o JS hidratar atrasava o LCP em segundos.
  return (
    <nav
      aria-label={`Áreas de atuação${isRight ? " (continuação)" : ""}`}
      className={`hero-area-nav ${isRight ? "hero-rise-right" : "hero-rise-left"}`}
    >
      {items.map((area, i) => (
        <div
          key={area.slug}
          className="hero-rise"
          style={{ "--hero-rise-delay": `${150 + i * 50}ms` } as CSSProperties}
        >
          <Link href={`/areas-de-atuacao/${area.slug}`} className="hero-area-link">
            <Badge area={area} />
            <span className="hero-area-name">{area.title}</span>
            <ChevronRight size={15} className="hero-area-chevron" aria-hidden />
          </Link>
        </div>
      ))}
    </nav>
  );
}
