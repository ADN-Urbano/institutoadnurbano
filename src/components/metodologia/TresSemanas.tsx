import { tresSemanas } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";

/** Metodología · Por qué tres semanas: el formato semana a semana (QUÉ/QUIÉN/CÓMO). */
export default function TresSemanas() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow={tresSemanas.eyebrow}
        title={
          <>
            Por qué <span className="text-turquoise">tres semanas</span>
          </>
        }
      />
      <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[760px] mb-10 max-sm:text-base">
        {tresSemanas.intro}
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {tresSemanas.weeks.map((w) => (
          <div
            key={w.num}
            className="bg-bg-soft rounded-2xl p-7 border-t-2 border-turquoise"
          >
            <div className="font-mono text-[11px] font-medium text-ink-muted tracking-[0.06em] uppercase mb-3">
              {w.num}
            </div>
            <h3 className="font-display font-extrabold text-[30px] leading-[0.95] tracking-[-0.02em] uppercase mb-3 max-sm:text-[26px]">
              {w.block}
            </h3>
            <p className="text-sm leading-[1.6] text-ink-soft">{w.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[15px] leading-[1.6] text-ink-muted border-l-2 border-turquoise pl-5 max-w-[760px]">
        {tresSemanas.note}
      </p>
    </section>
  );
}
