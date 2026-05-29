"use client";

import { useState } from "react";
import { materias } from "@/data/home";

/** Fila de filtros por materia. Visual en esta fase; el filtrado real llega en Fase 2. */
export default function FiltersRow() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex items-center gap-2 flex-wrap mb-8 px-5 py-4 bg-bg-soft rounded-[16px]">
      <span className="font-mono text-[11px] font-medium text-ink-soft tracking-[0.04em] uppercase mr-2">
        Materia
      </span>
      {materias.map((m, i) => (
        <button
          key={m}
          onClick={() => setActive(i)}
          className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
            i === active
              ? "bg-turquoise text-white border-turquoise"
              : "bg-white text-ink-soft border-rule hover:border-turquoise hover:text-turquoise"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
