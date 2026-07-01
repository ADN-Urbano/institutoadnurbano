import type { Metadata } from "next";
import Programs from "@/components/formacion/Programs";
import NextStep from "@/components/formacion/NextStep";

export const metadata: Metadata = {
  title: "Programas · Instituto ADN Local",
  description:
    "Todos los programas de ADN Local: cursos activos y próximas ediciones para cada etapa de tu trayectoria política.",
};

export default function ProgramasPage() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <Programs />
      <NextStep />
    </main>
  );
}
