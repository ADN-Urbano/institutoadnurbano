import { redirect } from "next/navigation";

// La antigua landing de "Formación" se ha dividido en /programas, /itinerario y
// /metodologia. Mantiene compatibilidad con enlaces antiguos.
export default function FormacionPage() {
  redirect("/programas");
}
