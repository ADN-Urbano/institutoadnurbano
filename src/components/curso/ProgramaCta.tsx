import LeadForm from "@/components/marketing/LeadForm";

/**
 * CTA de descarga del programa completo del curso (lead magnet `descarga-pdf`).
 * Sustituye al antiguo bloque de webinar. Capta email (+ nombre) con el
 * `courseSlug` como contexto; el email de entrega enlazará el PDF del programa
 * cuando esté disponible (de momento el cliente lo está preparando).
 */
export default function ProgramaCta({ courseSlug }: { courseSlug: string }) {
  return (
    <section
      id="programa"
      className="scroll-mt-24 relative overflow-hidden bg-turquoise text-white rounded-[24px] px-10 py-12 mb-24 grid grid-cols-1 gap-10 items-center lg:grid-cols-2 max-sm:px-7 max-sm:py-9 max-sm:mb-14"
    >
      <span
        aria-hidden
        className="absolute -top-[100px] -right-[100px] w-80 h-80 rounded-full bg-white/[0.08]"
      />
      <div className="relative z-[1]">
        <div className="font-mono text-[11px] font-medium text-white/70 tracking-[0.08em] uppercase mb-3">
          Programa completo
        </div>
        <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 max-sm:text-[30px]">
          Recibe el programa completo
        </h2>
        <p className="text-[15px] leading-[1.6] text-white/90 max-w-[46ch]">
          Déjanos tu email y te enviamos el temario detallado de este curso: módulos, sesiones en
          directo y todo lo que incluye.
        </p>
      </div>

      <div className="relative z-[1]">
        <LeadForm
          type="descarga-pdf"
          fields={["name"]}
          courseSlug={courseSlug}
          onDark
          submitLabel="Recibe el programa por email →"
          successMessage="¡Hecho! Te enviaremos el programa completo a tu email."
        />
      </div>
    </section>
  );
}
