import { nextStep } from "@/data/formacion";
import { ArrowRight } from "@/components/ui/icons";

/** CTA final: bloque turquesa con título + selector de "próximo paso". */
export default function NextStep() {
  return (
    <section className="relative overflow-hidden bg-turquoise text-white rounded-[28px] px-12 py-16 mb-16 grid grid-cols-2 gap-12 items-center max-lg:grid-cols-1 max-lg:gap-10 max-sm:px-6 max-sm:py-10 max-sm:mb-12">
      <span
        aria-hidden
        className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-white/[0.08]"
      />
      <div className="relative z-[1]">
        <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-5 text-white max-lg:text-[40px] max-sm:text-[32px]">
          {nextStep.title}
        </h2>
        <p className="text-base leading-[1.6] text-white/90 max-w-[46ch]">{nextStep.desc}</p>
      </div>

      <div className="relative z-[1]">
        <div className="font-display font-extrabold text-[24px] tracking-[-0.01em] uppercase mb-5">
          {nextStep.label}
        </div>
        <div className="flex flex-col gap-3">
          {nextStep.options.map((o) => (
            <a
              key={o.href}
              href={o.href}
              className="group bg-ink text-white px-6 py-4 rounded-xl text-sm font-semibold inline-flex items-center justify-between gap-3 transition-all hover:bg-turquoise-deep hover:-translate-y-px"
            >
              {o.label}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
