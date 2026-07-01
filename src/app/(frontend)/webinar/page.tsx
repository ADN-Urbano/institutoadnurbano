import { redirect } from "next/navigation";

/**
 * Webinar PAUSADO (temporal): de momento no se ofrece webinar. Esta ruta
 * redirige a /programas para que no sea accesible. El motor de webinar
 * (landing de registro original, secuencia de emails, cuenta atrás) sigue en el
 * historial de git y en `/api/leads` para reactivarlo cuando se retome.
 */
export default function WebinarPage() {
  redirect("/programas");
}
