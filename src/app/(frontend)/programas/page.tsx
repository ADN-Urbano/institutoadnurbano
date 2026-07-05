import type { Metadata } from "next";
import Programs from "@/components/formacion/Programs";
import NextStep from "@/components/formacion/NextStep";

// Lee precios/fechas de Payload en cada visita → refleja los cambios de /admin.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programas · Instituto ADN Local",
  description:
    "Todos los programas de ADN Local: cursos activos y próximas ediciones para cada etapa de tu trayectoria política.",
};

export default function ProgramasPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <section className="pt-4 pb-14 mb-14 border-b border-rule max-sm:pb-10 max-sm:mb-10">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
              ·· Programas
            </div>
            <h1 className="font-display font-extrabold text-[44px] leading-[0.95] tracking-[-0.025em] uppercase mb-5 md:text-[60px] lg:text-[64px]">
              Formación para <span className="text-turquoise">líderes locales</span>
            </h1>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[560px] max-sm:text-base">
              Programas prácticos por competencias y por el momento de tu mandato. Empieza hoy con
              los que están abiertos o reserva plaza en las próximas ediciones.
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden lg:aspect-[5/6] max-sm:aspect-[16/11]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/programas.jpg"
              alt="Gerardo impartiendo una sesión de ADN Local"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <Programs />
      <NextStep />
    </main>
  );
}
