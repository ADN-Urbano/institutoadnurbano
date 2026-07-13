import type { Metadata } from "next";
import MethodHero from "@/components/metodologia/MethodHero";
import Competencias from "@/components/metodologia/Competencias";
import Method from "@/components/formacion/Method";
import AsiEsAprender from "@/components/metodologia/AsiEsAprender";
import ComoFunciona from "@/components/metodologia/ComoFunciona";
import ConstruyeItinerario from "@/components/metodologia/ConstruyeItinerario";

export const metadata: Metadata = {
  title: "Metodología · ADN Local",
  description:
    "Un modelo flexible, práctico y aplicado, por competencias, para que construyas tu propio itinerario de gobierno local.",
};

export default function MetodologiaPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <MethodHero />
      <Competencias />
      <Method />
      <AsiEsAprender />
      <ComoFunciona />
      <ConstruyeItinerario />
    </main>
  );
}
