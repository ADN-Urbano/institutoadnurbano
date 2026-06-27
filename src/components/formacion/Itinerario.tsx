import Link from "next/link";
import { itinerario } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";

/**
 * Itinerario formativo: muestra que los cursos no son aislados, sino una ruta
 * por competencias (disponibles + próximamente). Estilo limpio basado en líneas.
 */
export default function Itinerario() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow={itinerario.eyebrow}
        title={
          <>
            Un itinerario para{" "}
            <span className="text-turquoise">gobernar lo local</span>
          </>
        }
        subtitle={itinerario.subtitle}
      />

      <div className="flex flex-col border-t border-rule">
        {itinerario.areas.map((area, i) => {
          const open = area.status === "open";
          return (
            <div
              key={area.title}
              className="grid grid-cols-[auto_1fr] gap-7 py-8 border-b border-rule max-sm:gap-4 max-sm:py-6"
            >
              <div className="font-display font-extrabold text-[44px] leading-none text-rule tabular-nums max-sm:text-[32px]">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-display font-extrabold text-[26px] leading-none tracking-[-0.01em] uppercase max-sm:text-[22px]">
                    {area.title}
                  </h3>
                  <span
                    className={`font-mono text-[10px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 tracking-[0.04em] uppercase ${
                      open ? "bg-green-soft text-[#5C6B26]" : "bg-bg-soft text-ink-muted"
                    }`}
                  >
                    {open && <span className="w-1.5 h-1.5 rounded-full bg-green" />}
                    {open ? "Disponible" : "Próximamente"}
                  </span>
                </div>

                <p className="text-[15px] leading-[1.55] text-ink-muted mb-4 max-w-[68ch]">
                  {area.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {area.items.map((item) =>
                    item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="font-mono text-[12px] text-turquoise-dark bg-turquoise-soft px-3 py-1.5 rounded-full tracking-[0.02em] transition-colors hover:bg-turquoise hover:text-white"
                      >
                        {item.label} →
                      </Link>
                    ) : (
                      <span
                        key={item.label}
                        className="font-mono text-[12px] text-ink-muted bg-bg-soft px-3 py-1.5 rounded-full tracking-[0.02em]"
                      >
                        {item.label}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
