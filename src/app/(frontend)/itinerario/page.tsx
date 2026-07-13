import type { Metadata } from "next";
import { especializaciones } from "@/data/catalogo";
import Niveles from "@/components/itinerario/Niveles";
import EstrategiaMatriz from "@/components/itinerario/EstrategiaMatriz";
import Especializacion from "@/components/itinerario/Especializacion";
import Sectorial from "@/components/itinerario/Sectorial";
import NextStep from "@/components/formacion/NextStep";

export const metadata: Metadata = {
  title: "Itinerario formativo · ADN Local",
  description:
    "El catálogo completo de ADN Local: por competencias y momentos del mandato, para construir tu propio itinerario de gobierno local.",
};

export default function ItinerarioPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <section className="pt-4 pb-14 mb-14 border-b border-rule max-sm:pb-10 max-sm:mb-10">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
              ·· Itinerario
            </div>
            <h1 className="font-display font-extrabold text-[44px] leading-[0.95] tracking-[-0.025em] uppercase mb-5 md:text-[60px] lg:text-[64px]">
              El mapa de tu <span className="text-turquoise">formación</span>
            </h1>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[560px] max-sm:text-base">
              Construye tu propio itinerario: elige por dónde empezar y avanza a tu ritmo por las
              áreas del gobierno local. Estos son los programas disponibles hoy y todo lo que va llegando.
            </p>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden lg:aspect-[5/6] max-sm:aspect-[16/11]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/itinerario.jpg"
              alt="Gerardo en una sesión de ADN Local"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Niveles />
      <EstrategiaMatriz />
      {especializaciones.map((area) => (
        <Especializacion key={area.n} area={area} />
      ))}
      <Sectorial />
      <NextStep />
    </main>
  );
}
