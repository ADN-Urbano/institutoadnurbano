import type { Metadata } from "next";
import SobreHero from "@/components/sobre/SobreHero";
import QueHacemos from "@/components/sobre/QueHacemos";
import Equipo from "@/components/sobre/Equipo";
import AdnUrbano from "@/components/sobre/AdnUrbano";
import SobreCta from "@/components/sobre/SobreCta";

export const metadata: Metadata = {
  title: "Sobre nosotros · Instituto ADN Local",
  description:
    "ADN Local es la escuela de los líderes locales. Nace de ADN Urbano, consultora de transformación urbana, para llevar años de experiencia de campo a la formación de cargos públicos.",
};

export default function SobreNosotrosPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <SobreHero />
      <QueHacemos />
      <Equipo />
      <AdnUrbano />
      <SobreCta />
    </main>
  );
}
