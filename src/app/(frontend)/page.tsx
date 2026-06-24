import type { Metadata } from "next";
import LandingHero from "@/components/formacion/LandingHero";
import ParaQuien from "@/components/inicio/ParaQuien";
import ProgramasTeaser from "@/components/inicio/ProgramasTeaser";
import Cita from "@/components/inicio/Cita";
import NextStep from "@/components/formacion/NextStep";

export const metadata: Metadata = {
  title: "Instituto ADN Local · Formación para líderes locales",
  description:
    "La escuela de los líderes locales: formación práctica, estrategia y acompañamiento para alcaldes, concejales, candidatos y responsables municipales.",
};

// Inicio: página de entrada limpia (marca/promesa) que reparte hacia
// /programas, /itinerario, /metodologia y /sobre-nosotros.
export default function InicioPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <LandingHero />
      <ParaQuien />
      <ProgramasTeaser />
      <Cita />
      <NextStep />
    </main>
  );
}
