import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { getCurrentStudent } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Página de confirmación tras el pago en Stripe (success_url). El alta del
 * alumno la realiza el webhook. Si ya hay sesión iniciada (compra de un curso
 * adicional), llevamos directo al área; si no, guiamos al acceso por email.
 */
export default async function GraciasPage() {
  const student = await getCurrentStudent();
  const loggedIn = Boolean(student);

  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-24 pb-32 text-center max-sm:px-5">
      <div className="inline-flex items-center gap-2 bg-green-soft text-[#5C6B26] px-4 py-1.5 rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-green" />
        Pago completado
      </div>
      <h1 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mt-2 mb-4 max-sm:text-[34px]">
        ¡Bienvenido/a<br />a tu formación!
      </h1>
      <p className="text-[16px] text-ink-muted max-w-[500px] mx-auto mb-8">
        {loggedIn
          ? "Tu inscripción se ha registrado correctamente. Ya tienes el programa disponible en tu área del alumno."
          : "Tu inscripción se ha registrado correctamente. Te enviaremos un email con tu enlace de acceso al aula. Si ya conoces el área del alumno, entra con tu email cuando quieras."}
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href={loggedIn ? "/area" : "/acceder"}
          className="inline-flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-turquoise"
        >
          {loggedIn ? "Ir a mi área" : "Acceder al aula"}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/formacion"
          className="px-5 py-3 rounded-lg text-sm font-semibold border border-rule transition-colors hover:border-turquoise hover:text-turquoise"
        >
          Ver más programas
        </Link>
      </div>
    </main>
  );
}
