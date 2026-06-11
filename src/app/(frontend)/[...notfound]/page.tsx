import { notFound } from "next/navigation";

/** Captura cualquier URL no coincidente y muestra nuestro 404 on-brand. */
export default function CatchAll() {
  notFound();
}
