import { redirect } from "next/navigation";

// El centro de recursos está oculto de momento; redirige a la página principal.
export default function RecursosPage() {
  redirect("/formacion");
}
