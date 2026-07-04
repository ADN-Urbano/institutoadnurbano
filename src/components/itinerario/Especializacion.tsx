import type { Area } from "@/data/catalogo";
import { CheckIcon } from "@/components/ui/icons";

/** Itinerario · bloque de un área-especialización (áreas 2-5). */
export default function Especializacion({ area }: { area: Area }) {
  return (
    <section className="mb-16 max-sm:mb-12">
      <div className="flex items-end justify-between gap-4 mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <div>
          <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-2">
            ·· Área {area.n}
          </div>
          <h2 className="font-display font-extrabold text-[38px] leading-[0.95] tracking-[-0.02em] uppercase max-lg:text-[30px]">
            {area.title}
          </h2>
          <p className="text-[15px] text-ink-muted mt-1.5">{area.subtitle}</p>
        </div>
        <span className="font-mono text-[10px] font-medium bg-yellow-soft text-[#9a7b15] px-3 py-1.5 rounded-full tracking-[0.04em] uppercase whitespace-nowrap shrink-0">
          Próximamente
        </span>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${area.grupos.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {area.grupos.map((g, i) => (
          <div key={g.title ?? i} className="bg-white border border-rule rounded-2xl p-7 max-sm:p-6">
            {g.title && (
              <h3 className="font-heading font-bold text-[17px] leading-tight mb-4 text-turquoise-dark">
                {g.title}
              </h3>
            )}
            <ul className="flex flex-col gap-2.5">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-[15px] leading-[1.45] text-ink-soft">
                  <CheckIcon className="w-[18px] h-[18px] text-turquoise shrink-0 mt-0.5" />
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
