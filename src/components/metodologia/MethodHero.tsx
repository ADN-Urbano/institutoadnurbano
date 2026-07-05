import { methodHero } from "@/data/formacion";
import AccentTitle from "@/components/ui/AccentTitle";

/** Metodología · hero ("Todo lo que necesitas saber…") + el modelo ("Aprende paso a paso"). */
export default function MethodHero() {
  return (
    <section className="mb-24 max-sm:mb-16">
      <div className="grid grid-cols-1 gap-12 items-center mb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 max-sm:mb-12">
        <div>
          <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
            {methodHero.eyebrow}
          </div>
          <h1 className="font-display font-extrabold text-[42px] leading-[0.95] tracking-[-0.025em] uppercase mb-5 md:text-[54px] lg:text-[60px]">
            <AccentTitle title={methodHero.title} accent={methodHero.accent} />
          </h1>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[560px] max-sm:text-base">
            {methodHero.subtitle}
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden lg:aspect-[5/6] max-sm:aspect-[16/11]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/metodologia.jpg"
            alt="Taller de formación de ADN Local"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
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
