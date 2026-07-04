import type { Metadata } from "next";
import { especializaciones } from "@/data/catalogo";
import Niveles from "@/components/itinerario/Niveles";
import EstrategiaMatriz from "@/components/itinerario/EstrategiaMatriz";
import Especializacion from "@/components/itinerario/Especializacion";
import Sectorial from "@/components/itinerario/Sectorial";
import NextStep from "@/components/formacion/NextStep";

export const metadata: Metadata = {
  title: "Itinerario formativo · Instituto ADN Local",
  description:
    "El catálogo completo de ADN Local: por competencias y momentos del mandato. Cuatro niveles (clave, módulo, programa, especialización) para construir tu propio itinerario de gobierno local.",
};

export default function ItinerarioPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <section className="pt-4 pb-14 mb-14 border-b border-rule max-sm:pb-10 max-sm:mb-10">
        <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
          ·· Itinerario
        </div>
        <h1 className="font-display font-extrabold text-[56px] leading-[0.95] tracking-[-0.025em] uppercase mb-5 md:text-[72px] max-sm:text-[40px] max-w-[16ch]">
          El mapa de tu <span className="text-turquoise">formación</span>
        </h1>
        <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[680px] max-sm:text-base">
          Construye tu propio itinerario: elige por dónde empezar y avanza a tu ritmo por las áreas
          del gobierno local. Estos son los cursos disponibles hoy y todo lo que va llegando.
        </p>
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
