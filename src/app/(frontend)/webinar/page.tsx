import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/marketing/LeadForm";

export const metadata: Metadata = {
  title: "Webinar gratuito · Instituto ADN Local",
  description:
    "Reserva tu plaza en el webinar gratuito de ADN Local: estrategia local que funciona para alcaldes, concejales, candidatos y técnicos municipales. Acceso inmediato.",
};

/**
 * Landing de registro del webinar evergreen. El formulario crea un Lead
 * (type:webinar), programa la secuencia de emails y redirige a /webinar/ver con
 * la cuenta atrás de la oferta (72 h por registrante). COPY: borrador.
 */
export default function WebinarPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_1fr] max-lg:gap-10">
        <section>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-coral-soft text-coral rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
            ·· Webinar gratuito
          </div>
          <h1 className="font-display font-extrabold text-[56px] leading-[0.92] tracking-[-0.025em] uppercase mb-6 md:text-[64px] lg:text-[80px] max-sm:text-[40px] max-w-[14ch]">
            La estrategia local que sí funciona
          </h1>
          <p className="text-[18px] leading-[1.55] text-ink-soft mb-8 max-w-[560px] max-sm:text-base">
            En menos de una hora te enseñamos el método que aplican los municipios que mejor están
            transformando su comercio, su movilidad y su espacio público. Acceso inmediato a la
            grabación tras registrarte.
          </p>
          <ul className="space-y-3 text-[15px] text-ink-soft max-w-[520px]">
            {[
              "Cómo pasar de las ideas a proyectos que se ejecutan.",
              "Los errores que más cuestan (y cómo evitarlos) en tu legislatura.",
              "Un -40% exclusivo en el programa completo solo para asistentes.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-turquoise" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <aside className="bg-bg-soft rounded-[28px] p-8 self-start max-sm:p-6">
          <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
            ·· Reserva tu plaza
          </div>
          <h2 className="font-display font-extrabold text-[28px] leading-[0.95] tracking-[-0.02em] uppercase mb-5">
            Acceso inmediato y gratuito
          </h2>
          <LeadForm
            type="webinar"
            fields={["name", "municipio", "situacion", "comoNosConociste"]}
            submitLabel="Ver el webinar →"
          />
          <p className="mt-4 text-[12px] leading-[1.5] text-ink-muted">
            Al registrarte aceptas recibir el acceso y comunicaciones del webinar por email. Puedes
            darte de baja cuando quieras. Consulta nuestra{" "}
            <Link href="/privacidad" className="underline hover:text-turquoise">
              política de privacidad
            </Link>
            .
          </p>
        </aside>
      </div>
    </main>
  );
}
