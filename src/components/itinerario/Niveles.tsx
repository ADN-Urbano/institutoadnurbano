import { niveles } from "@/data/catalogo";
import SectionHead from "@/components/ui/SectionHead";

/** Itinerario · los 4 niveles del catálogo (Clave → Especialización). */
export default function Niveles() {
  return (
    <section className="mb-24 max-sm:mb-16">
      <SectionHead
        eyebrow="·· Cómo se organiza"
        title={
          <>
            Los <span className="text-turquoise">niveles</span>
          </>
        }
        subtitle="De la pieza más pequeña al recorrido completo. Puedes hacer una sola o construir tu itinerario."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 max-sm:gap-3">
        {niveles.map((n, i) => (
          <div
            key={n.name}
            className="bg-white border border-rule rounded-2xl p-6 transition-colors hover:border-turquoise"
          >
            <div className="font-mono text-[11px] font-medium text-turquoise tracking-[0.04em] mb-3">
              0{i + 1}
            </div>
            <h3 className="font-display font-extrabold text-[22px] leading-[1] tracking-[-0.01em] uppercase mb-2.5">
              {n.name}
            </h3>
            <p className="text-sm leading-[1.5] text-ink-soft">{n.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
