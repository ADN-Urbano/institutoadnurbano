import Link from "next/link";
import Image from "next/image";
import AccentTitle from "@/components/ui/AccentTitle";
import { hero } from "@/data/formacion";

/** Hero de la landing de Formación: texto (eyebrow + título + CTAs) e imagen. */
export default function LandingHero() {
  return (
    <section className="pt-8 pb-16 mb-16 border-b border-rule max-sm:pb-10 max-sm:mb-10">
      <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-turquoise-soft text-turquoise-dark rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
            {hero.eyebrow}
          </div>
          <h1 className="font-display font-extrabold text-[44px] leading-[0.92] tracking-[-0.025em] uppercase mb-6 md:text-[60px] lg:text-[68px]">
            <AccentTitle title={hero.title} accent={hero.accent} />
          </h1>
          <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[560px] max-sm:text-base mb-8">
            {hero.summary}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/programas"
              className="inline-flex items-center justify-center bg-ink text-white px-7 py-4 rounded-xl text-sm font-bold transition-all hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)]"
            >
              Ver programas →
            </Link>
            <Link
              href="/metodologia"
              className="inline-flex items-center justify-center bg-turquoise-soft text-turquoise-dark px-7 py-4 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[var(--shadow-sm)]"
            >
              Nuestra metodología
            </Link>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden lg:aspect-[5/6] max-sm:aspect-[16/11]">
          <Image
            src="/img/portada.jpg"
            alt="Plaza de un municipio español"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
