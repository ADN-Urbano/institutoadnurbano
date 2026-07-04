import SectionHead from "@/components/ui/SectionHead";
import { equipo } from "@/data/sobre-nosotros";

/** Quién está detrás: director (Gerardo) + nota del equipo de ADN Urbano. */
export default function Equipo() {
  const { director } = equipo;
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow={equipo.eyebrow}
        title={
          <>
            Quién te <span className="text-turquoise">{equipo.accent}</span>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-14 items-start">
        {/* Foto (placeholder) + nombre */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/gerardo.jpg"
            alt={director.name}
            className="w-full aspect-square rounded-[20px] object-cover object-top mb-4 max-lg:max-w-[260px]"
          />
          <div className="font-heading font-bold text-[19px] leading-tight">{director.name}</div>
          <div className="font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase mt-1">
            {director.role}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4 text-[16px] leading-[1.65] text-ink-soft mb-7 max-w-[62ch]">
            {director.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {director.specialties.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] text-turquoise-dark bg-turquoise-soft px-3 py-1.5 rounded-full tracking-[0.03em] uppercase"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-[15px] leading-[1.6] text-ink-soft border-l-2 border-turquoise pl-5 max-w-[62ch]">
            {equipo.teamNote}
          </p>
        </div>
      </div>
    </section>
  );
}
