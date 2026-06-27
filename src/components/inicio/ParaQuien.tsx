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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
