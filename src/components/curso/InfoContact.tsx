import LeadForm from "@/components/marketing/LeadForm";

/**
 * "¿Necesitas más información?": formulario de contacto (type:contacto).
 * La descarga del programa vive ahora en `ProgramaCta` (se quitó de aquí para
 * no duplicar). Campos: nombre, apellidos, país, municipio y situación.
 */
export default function InfoContact({ courseSlug }: { courseSlug?: string }) {
  return (
    <section className="mb-20 bg-bg-soft rounded-[28px] p-10 max-sm:p-7">
      <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mb-3 max-sm:text-[32px]">
        ¿Necesitas más información?
      </h2>
      <p className="text-[15px] leading-[1.6] text-ink-soft mb-8 max-w-[54ch]">
        Déjanos tus datos y te contactamos para resolver cualquier duda sobre el programa.
      </p>

      <LeadForm
        type="contacto"
        courseSlug={courseSlug}
        fields={["nombre", "apellidos", "pais", "municipio", "situacion", "message"]}
        consent
        submitLabel="Enviar →"
        successMessage="¡Gracias! Hemos recibido tus datos y te contactaremos pronto."
        className="lg:grid-cols-2"
      />
    </section>
  );
}
