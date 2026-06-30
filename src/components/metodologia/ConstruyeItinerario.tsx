import Link from "next/link";
import { construyeItinerario as c } from "@/data/formacion";
import { ArrowRight } from "@/components/ui/icons";

/** Metodología · CTA final: "Construye tu propio itinerario" → /programas. */
export default function ConstruyeItinerario() {
  return (
    <section className="relative overflow-hidden bg-turquoise text-white rounded-[28px] px-12 py-16 mb-16 grid grid-cols-2 gap-12 items-center max-lg:grid-cols-1 max-lg:gap-10 max-sm:px-6 max-sm:py-10 max-sm:mb-12">
      <span
        aria-hidden
        className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-white/[0.08]"
      />
      <div className="relative z-[1]">
        <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-5 text-white max-lg:text-[40px] max-sm:text-[32px]">
          {c.title}
        </h2>
        <p className="text-base leading-[1.6] text-white/90 max-w-[46ch]">{c.desc}</p>
      </div>

      <div className="relative z-[1]">
        <div className="font-display font-extrabold text-[24px] tracking-[-0.01em] uppercase mb-2.5 text-white">
          {c.ctaIntro}
        </div>
        <p className="text-base leading-[1.6] text-white/90 mb-6 max-w-[42ch]">{c.ctaSub}</p>
        <Link
          href={c.ctaHref}
          className="group bg-ink text-white px-7 py-4 rounded-xl text-sm font-bold inline-flex items-center gap-3 transition-all hover:bg-turquoise-deep hover:-translate-y-px"
        >
          {c.ctaLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
