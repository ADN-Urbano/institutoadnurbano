import Link from "next/link";
import { cta } from "@/data/sobre-nosotros";
import { ArrowRight } from "@/components/ui/icons";

/** CTA final de Sobre nosotros: bloque turquesa con doble llamada. */
export default function SobreCta() {
  return (
    <section className="relative overflow-hidden bg-turquoise text-white rounded-[28px] px-12 py-16 mb-16 text-center max-sm:px-6 max-sm:py-10 max-sm:mb-12">
      <span
        aria-hidden
        className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-white/[0.08]"
      />
      <div className="relative z-[1] max-w-[680px] mx-auto">
        <h2 className="font-display font-extrabold text-[48px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 text-white max-lg:text-[38px] max-sm:text-[30px]">
          {cta.title}
        </h2>
        <p className="text-base leading-[1.6] text-white/90 mb-8 max-sm:text-[15px]">{cta.desc}</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href={cta.primary.href}
            className="group bg-ink text-white px-6 py-4 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-all hover:-translate-y-px hover:shadow-[var(--shadow-md)]"
          >
            {cta.primary.label}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={cta.secondary.href}
            className="px-6 py-4 rounded-xl text-sm font-semibold border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            {cta.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
