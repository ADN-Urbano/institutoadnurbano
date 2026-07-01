import { redirect } from "next/navigation";

/** Webinar PAUSADO (temporal): visionado desactivado → redirige a /programas. */
export default function WebinarVerPage() {
  redirect("/programas");
}
