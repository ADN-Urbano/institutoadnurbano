"use client";

/**
 * "¿Necesitas más información?": botón de descarga del PDF (placeholder) +
 * formulario presentacional. Sin backend: el `<form>` no tiene action y el
 * envío se cablea en Fase 2 (leads).
 */
export default function InfoContact({ programPdfLabel }: { programPdfLabel: string }) {
  const inputClass =
    "w-full rounded-xl border border-rule bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-turquoise";

  return (
    <section className="mb-20 bg-bg-soft rounded-[28px] p-10 max-sm:p-7">
      <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 max-sm:text-[32px]">
        ¿Necesitas más información?
      </h2>

      <a
        href="#"
        className="inline-flex items-center justify-center bg-turquoise-soft text-turquoise-dark px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[var(--shadow-sm)] mb-8"
      >
        {programPdfLabel} →
      </a>

      <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
        ·· Escríbenos
      </div>

      {/* Formulario presentacional: sin action ni envío (Fase 2). */}
      <form className="grid grid-cols-1 gap-4 lg:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <label className="flex flex-col gap-2 text-[13px] font-semibold text-ink-soft">
          Nombre y apellidos
          <input type="text" className={inputClass} placeholder="Tu nombre" />
        </label>
        <label className="flex flex-col gap-2 text-[13px] font-semibold text-ink-soft">
          Email
          <input type="email" className={inputClass} placeholder="tu@email.com" />
        </label>
        <label className="flex flex-col gap-2 text-[13px] font-semibold text-ink-soft">
          Cargo
          <select className={inputClass} defaultValue="">
            <option value="" disabled>
              Selecciona tu cargo
            </option>
            <option>Alcalde / Alcaldesa</option>
            <option>Concejal/a de gobierno</option>
            <option>Concejal/a de la oposición</option>
            <option>Candidato/a</option>
            <option>Técnico/a municipal</option>
            <option>Otro</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-[13px] font-semibold text-ink-soft">
          Teléfono
          <input type="tel" className={inputClass} placeholder="Tu teléfono" />
        </label>
        <label className="flex flex-col gap-2 text-[13px] font-semibold text-ink-soft">
          Municipio
          <input type="text" className={inputClass} placeholder="Tu municipio" />
        </label>
        <label className="flex flex-col gap-2 text-[13px] font-semibold text-ink-soft">
          País
          <input type="text" className={inputClass} placeholder="Tu país" />
        </label>
        <label className="flex flex-col gap-2 text-[13px] font-semibold text-ink-soft lg:col-span-2">
          Mensaje
          <textarea rows={4} className={inputClass} placeholder="¿En qué podemos ayudarte?" />
        </label>
        <button
          type="submit"
          className="lg:col-span-2 justify-self-start bg-ink text-white px-7 py-4 rounded-xl text-sm font-bold transition-all hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)]"
        >
          Enviar mensaje →
        </button>
      </form>
    </section>
  );
}
