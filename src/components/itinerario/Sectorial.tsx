import { sectorial } from "@/data/catalogo";

/** Itinerario · Área 6: ocho módulos sectoriales (sin programa que los agrupe). */
export default function Sectorial() {
  return (
    <section className="mb-24 max-sm:mb-16">
      <div className="flex items-end justify-between gap-4 mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <div>
          <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-2">
            ·· Área {sectorial.n}
          </div>
          <h2 className="font-display font-extrabold text-[38px] leading-[0.95] tracking-[-0.02em] uppercase max-lg:text-[30px]">
            {sectorial.title}
          </h2>
          <p className="text-[15px] text-ink-muted mt-1.5">{sectorial.subtitle}</p>
        </div>
        <span className="font-mono text-[10px] font-medium bg-yellow-soft text-[#9a7b15] px-3 py-1.5 rounded-full tracking-[0.04em] uppercase whitespace-nowrap shrink-0">
          Próximamente
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 max-sm:gap-3">
        {sectorial.modulos.map((mod) => (
          <div key={mod.title} className="bg-white border border-rule rounded-2xl p-6 max-sm:p-5">
            <h3 className="font-heading font-bold text-[16px] leading-tight mb-3">{mod.title}</h3>
            <ul className="flex flex-col gap-1.5">
              {mod.items.map((it) => (
                <li key={it} className="text-[13px] leading-[1.4] text-ink-muted">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
