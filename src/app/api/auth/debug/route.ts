import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, studentIdFromSession } from "@/lib/session";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

/**
 * Diagnóstico TEMPORAL de la sesión del alumno. No expone secretos.
 * Localiza dónde se rompe: cookie ausente / firma inválida / alumno no encontrado.
 */
export async function GET() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value ?? null;
  const hasCookie = Boolean(raw);
  let unsignOk = false;
  let studentId: string | null = null;
  let studentFound = false;
  let error: string | null = null;

  if (raw) {
    studentId = studentIdFromSession(raw);
    unsignOk = studentId !== null;
    if (studentId) {
      try {
        const payload = await getPayloadClient();
        const s = await payload.findByID({ collection: "students", id: studentId, depth: 0 });
        studentFound = Boolean(s);
      } catch (e) {
        error = e instanceof Error ? e.message : String(e);
      }
    }
  }

  return NextResponse.json({
    hasCookie,
    unsignOk,
    studentId,
    studentFound,
    error,
    secretLen: (process.env.PAYLOAD_SECRET ?? "").length,
  });
}
