import type { Metadata } from "next";
import Method from "@/components/formacion/Method";
import ComoFunciona from "@/components/metodologia/ComoFunciona";
import NextStep from "@/components/formacion/NextStep";

export const metadata: Metadata = {
  title: "Metodología · Instituto ADN Local",
  description:
    "Cómo aprenderás: teoría a tu ritmo, casos reales en directo y todo aplicado a tu municipio, concentrado en tres semanas.",
};

export default function MetodologiaPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <Method />
      <ComoFunciona />
      <NextStep />
    </main>
  );
}
