import AccentTitle from "@/components/ui/AccentTitle";
import { hero } from "@/data/sobre-nosotros";

/** Hero de la página Sobre nosotros: eyebrow + título grande con acento. */
export default function SobreHero() {
  return (
    <section className="pt-8 pb-16 mb-16 border-b border-rule max-sm:pb-10 max-sm:mb-10">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-turquoise-soft text-turquoise-dark rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
        {hero.eyebrow}
      </div>
      <h1 className="font-display font-extrabold text-[56px] leading-[0.95] tracking-[-0.025em] uppercase mb-6 md:text-[72px] lg:text-[84px] max-sm:text-[40px] max-w-[18ch]">
        <AccentTitle title={hero.title} accent={hero.accent} />
      </h1>
      <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[720px] max-sm:text-base">
        {hero.summary}
      </p>
    </section>
  );
}
