import { nextStep } from "@/data/formacion";
import LeadForm from "@/components/marketing/LeadForm";

/** CTA final: bloque turquesa con título + alta a la newsletter ("No te pierdas nada"). */
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
        <div className="font-mono text-[11px] font-medium text-white/70 tracking-[0.08em] uppercase mb-3">
          Suscríbete a la newsletter
        </div>
        <div className="font-display font-extrabold text-[24px] tracking-[-0.01em] uppercase mb-2.5 text-white">
          No te pierdas nada
        </div>
        <p className="text-base leading-[1.6] text-white/90 mb-5 max-w-[42ch]">
          Recibe nuevos programas y recursos para líderes locales.
        </p>
        <LeadForm
          type="newsletter"
          fields={[]}
          onDark
          submitLabel="Suscribirme →"
          successMessage="¡Listo! Te avisaremos de nuevos programas y recursos."
        />
        <p className="mt-3 text-[12px] text-white/70">No compartimos tu información.</p>
      </div>
    </section>
  );
}
