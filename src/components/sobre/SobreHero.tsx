import Image from "next/image";
import AccentTitle from "@/components/ui/AccentTitle";
import { hero } from "@/data/sobre-nosotros";

/** Hero de Sobre nosotros: texto (eyebrow + título) e imagen, a dos columnas. */
export default function SobreHero() {
  return (
    <section className="pt-8 pb-16 mb-16 border-b border-rule max-sm:pb-10 max-sm:mb-10">
      <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-turquoise-soft text-turquoise-dark rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
            {hero.eyebrow}
          </div>
          <h1 className="font-display font-extrabold text-[44px] leading-[0.95] tracking-[-0.025em] uppercase mb-6 md:text-[58px] lg:text-[66px]">
            <AccentTitle title={hero.title} accent={hero.accent} />
          </h1>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[560px] max-sm:text-base">
            {hero.summary}
          </p>
        </div>

        <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden lg:aspect-[5/6] max-sm:aspect-[16/11]">
          <Image
            src="/img/sobre.jpg"
            alt="Gerardo, director de ADN Local, en un foro urbano"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover object-[50%_28%]"
          />
        </div>
      </div>
    </section>
  );
}
