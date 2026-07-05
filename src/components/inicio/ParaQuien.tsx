import { paraQuien } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";

/** Inicio · "Para quién es": 4 perfiles de cargo público. */
export default function ParaQuien() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow={paraQuien.eyebrow}
        title={
          <>
            Pensado para quienes lideran <span className="text-turquoise">lo local</span>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-8 items-stretch lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {paraQuien.profiles.map((p) => (
            <div
              key={p.title}
              className="border border-rule rounded-2xl p-6 transition-colors hover:border-turquoise"
            >
              <h3 className="font-heading font-bold text-[17px] leading-tight mb-2">{p.title}</h3>
              <p className="text-sm leading-[1.55] text-ink-muted">{p.desc}</p>
            </div>
          ))}
        </div>
        {/* Imagen lateral (acompaña los perfiles, ocupa toda la altura). */}
        <div className="relative rounded-[24px] overflow-hidden min-h-[280px] lg:min-h-0 max-lg:aspect-[16/10]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/para-quien.jpg"
            alt="Pueblo blanco andaluz"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
