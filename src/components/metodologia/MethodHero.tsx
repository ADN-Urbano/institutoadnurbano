import { methodHero } from "@/data/formacion";
import AccentTitle from "@/components/ui/AccentTitle";

/** Metodología · hero ("Todo lo que necesitas saber…") + el modelo ("Aprende paso a paso"). */
export default function MethodHero() {
  return (
    <section className="mb-24 max-sm:mb-16">
      <div className="max-w-[820px] mb-16 max-sm:mb-12">
        <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
          {methodHero.eyebrow}
        </div>
        <h1 className="font-display font-extrabold text-[68px] leading-[0.95] tracking-[-0.025em] uppercase mb-5 max-lg:text-[52px] max-sm:text-[38px]">
          <AccentTitle title={methodHero.title} accent={methodHero.accent} />
        </h1>
        <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[640px] max-sm:text-base">
          {methodHero.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] items-start border-t border-rule pt-16 max-sm:pt-12">
        <div>
          <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-3">
            {methodHero.modelEyebrow}
          </div>
          <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase max-lg:text-[32px]">
            <AccentTitle title={methodHero.modelTitle} accent={methodHero.modelAccent} />
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {methodHero.modelParagraphs.map((p, i) => (
            <p key={i} className="text-[16px] leading-[1.6] text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
