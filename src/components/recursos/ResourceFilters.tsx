"use client";

import { useState } from "react";
import Link from "next/link";
import { materias, formatos, poblaciones } from "@/data/recursos";

const chipBase = "px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all";
const chipOn = "bg-turquoise text-white border-turquoise";
const chipOff = "bg-white text-ink-soft border-rule hover:border-turquoise hover:text-turquoise";

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[11px] font-medium text-ink-soft tracking-[0.04em] uppercase mr-2 max-sm:mr-0">
    {children}
  </span>
);

/**
 * Filtros del archivo. El formato es real (navega por ?formato= y filtra en
 * servidor). Materia y población son visuales en esta fase (Fase 2: filtrado
 * completo + búsqueda).
 */
export default function ResourceFilters({ activeFormato }: { activeFormato: string }) {
  const [materia, setMateria] = useState(0);
  const [poblacion, setPoblacion] = useState(-1);

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap mb-4 px-5 py-4 bg-bg-soft rounded-[16px] max-sm:px-4">
        <Label>Materia</Label>
        {materias.map((m, i) => (
          <button
            key={m}
            onClick={() => setMateria(i)}
            className={`${chipBase} ${i === materia ? chipOn : chipOff}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-8 px-5 py-4 bg-bg-soft rounded-[16px] max-sm:px-4">
        <Label>Formato</Label>
        {formatos.map((f) => (
          <Link
            key={f.slug}
            href={f.slug ? `/recursos?formato=${f.slug}` : "/recursos"}
            scroll={false}
            className={`${chipBase} ${f.slug === activeFormato ? chipOn : chipOff}`}
          >
            {f.label}
          </Link>
        ))}
        <span className="w-px h-5 bg-rule mx-2 max-sm:hidden" />
        <Label>Población</Label>
        {poblaciones.map((p, i) => (
          <button
            key={p}
            onClick={() => setPoblacion(i === poblacion ? -1 : i)}
            className={`${chipBase} ${i === poblacion ? chipOn : chipOff}`}
          >
            {p}
          </button>
        ))}
      </div>
    </>
  );
}
