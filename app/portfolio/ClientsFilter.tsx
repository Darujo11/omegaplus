"use client";

import { useState, type ReactNode } from "react";

type Filter = "all" | "private" | "public";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "private", label: "Iniciativa privada" },
  { id: "public", label: "Órgãos públicos" },
];

/**
 * Só controla visibilidade: os grupos chegam renderizados do servidor,
 * então o conteúdo está no HTML (SEO) mesmo antes da hidratação.
 */
export default function ClientsFilter({ privateGroup, publicGroup }: { privateGroup: ReactNode; publicGroup: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <>
      <div className="pf-filter" role="group" aria-label="Filtrar clientes">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className="pf-filter-btn"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="pf-client-groups">
        <div hidden={filter === "public"}>{privateGroup}</div>
        <div hidden={filter === "private"}>{publicGroup}</div>
      </div>
    </>
  );
}
