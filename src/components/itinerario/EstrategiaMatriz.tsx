import Link from "next/link";
import { estrategia, type MatrizCell } from "@/data/catalogo";
import SectionHead from "@/components/ui/SectionHead";
import { ArrowUpRight } from "@/components/ui/icons";

function Cell({ cell, linea }: { cell: MatrizCell; linea: string }) {
  const available = Boolean(cell.href);
  const inner = (
    <>
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="font-mono text-[10px] font-medium text-ink-muted tracking-[0.04em] uppercase">
          {linea}
        </span>
        <span
          className={`font-mono text-[10px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 tracking-[0.04em] uppercase ${
            available ? "bg-green-soft text-[#5C6B26]" : "bg-yellow-soft text-[#9a7b15]"
          }`}
        >
          {available && <span className="w-1.5 h-1.5 rounded-full bg-green" />}
          {available ? "Disponible" : "Próximamente"}
        </span>
      </div>
      <h4 className="font-heading font-bold text-[17px] leading-tight mb-1.5">{cell.title}</h4>
      <p className="text-sm leading-[1.5] text-ink-soft">{cell.desc}</p>
      {available && (
        <span className="mt-3 inline-flex items-center gap-1.5 text-turquoise text-sm font-semibold">
          Ver el programa <ArrowUpRight className="w-4 h-4" />
        </span>
      )}
    </>
  );

  const base = "rounded-2xl p-6 flex flex-col max-sm:p-5";
  return available ? (
    <Link
      href={cell.href!}
      className={`${base} group bg-white border border-rule transition-all hover:border-turquoise hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]`}
    >
      {inner}
    </Link>
  ) : (
    <div className={`${base} bg-bg-soft border border-transparent`}>{inner}</div>
  );
}

/** Itinerario · Área 1: matriz gobierno/oposición × 4 momentos del mandato. */
export default function EstrategiaMatriz() {
  return (
    <section className="mb-24 max-sm:mb-16">
      <SectionHead
        eyebrow="·· Área 1"
        title={
          <>
            Estrategia y <span className="text-turquoise">mandato</span>
          </>
        }
        subtitle="Dos líneas paralelas —gobierno y oposición— por los cuatro momentos del mandato. 8 programas en total."
      />
      <div className="flex flex-col gap-6">
        {estrategia.momentos.map((m, i) => (
          <div key={m}>
            <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-3">
              {i + 1} · {m}
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <Cell cell={estrategia.gobierno[i]} linea="Gobierno" />
              <Cell cell={estrategia.oposicion[i]} linea="Oposición / candidatura" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
