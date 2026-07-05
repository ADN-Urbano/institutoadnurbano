import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, studentIdFromSession, sessionCookieOptions } from "@/lib/session";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

/**
 * Diagnóstico TEMPORAL de la sesión del alumno. No expone secretos.
 *
 * - (sin params)        → informa: cookie presente / firma válida / alumno hallado.
 * - ?action=set-200     → responde 200 poniendo una cookie de prueba (adn_test).
 * - ?action=set-redirect→ responde 307 (a este mismo endpoint) poniendo adn_test.
 *
 * Los dos "set-" replican cómo pone la cookie el login (mismas opciones) para
 * comprobar por curl si el navegador/edge conserva el Set-Cookie, y en especial
 * si funciona sobre una respuesta de REDIRECT (como hace /api/auth/verify).
 */
export async function GET(req: Request) {
  const action = new URL(req.url).searchParams.get("action");

  if (action === "set-200") {
    const res = NextResponse.json({ set: "200", note: "cookie adn_test puesta en 200" });
    res.cookies.set("adn_test", "1", sessionCookieOptions);
    return res;
  }
  if (action === "set-redirect") {
    const res = NextResponse.redirect(new URL("/api/auth/debug", req.url));
    res.cookies.set("adn_test", "1", sessionCookieOptions);
    return res;
  }

  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value ?? null;
  const hasCookie = Boolean(raw);
  const hasTestCookie = Boolean(store.get("adn_test")?.value);
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
    hasTestCookie,
    unsignOk,
    studentId,
    studentFound,
    error,
    secretLen: (process.env.PAYLOAD_SECRET ?? "").length,
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? null,
    nodeEnv: process.env.NODE_ENV ?? null,
  });
}
