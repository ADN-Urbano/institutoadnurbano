import type { Metadata } from "next";
import Itinerario from "@/components/formacion/Itinerario";
import NextStep from "@/components/formacion/NextStep";

export const metadata: Metadata = {
  title: "Itinerario formativo · Instituto ADN Local",
  description:
    "El programa completo de ADN Local: una ruta de aprendizaje por competencias para gobernar lo local, paso a paso.",
};

export default function ItinerarioPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <Itinerario />
      <NextStep />
    </main>
  );
}
