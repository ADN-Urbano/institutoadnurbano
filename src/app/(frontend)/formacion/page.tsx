import type { Metadata } from "next";
import LandingHero from "@/components/formacion/LandingHero";
import WhyAdn from "@/components/formacion/WhyAdn";
import Method from "@/components/formacion/Method";
import Webinar from "@/components/formacion/Webinar";
import Programs from "@/components/formacion/Programs";
import NextStep from "@/components/formacion/NextStep";

export const metadata: Metadata = {
  title: "Instituto ADN Local · Formación para líderes locales",
  description:
    "Programas especializados en liderazgo político, estrategia municipal y gestión pública para alcaldes, concejales, candidatos y responsables municipales.",
};

export default function FormacionPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <LandingHero />
      <WhyAdn />
      <Method />
      <Webinar />
      <Programs />
      <NextStep />
    </main>
  );
}
