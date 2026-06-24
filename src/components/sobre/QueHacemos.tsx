import SectionHead from "@/components/ui/SectionHead";
import { queHacemos } from "@/data/sobre-nosotros";

/** Qué hacemos: 3 pilares (Formamos · Acompañamos · Conectamos). */
export default function QueHacemos() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow={queHacemos.eyebrow}
        title={
          <>
            {queHacemos.title} <span className="text-turquoise">{queHacemos.accent}</span>
          </>
        }
        subtitle={queHacemos.desc}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {queHacemos.pillars.map((p) => (
          <div key={p.title} className="bg-bg-soft rounded-[20px] p-8 max-sm:p-7">
            <h3 className="font-display font-extrabold text-[26px] tracking-[-0.01em] uppercase mb-3 text-turquoise-dark">
              {p.title}
            </h3>
            <p className="text-sm leading-[1.6] text-ink-soft">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
