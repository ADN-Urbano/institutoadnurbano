import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  studentIdFromSession,
  sessionCookieOptions,
  inspectMagicToken,
  getCurrentStudent,
} from "@/lib/session";
import { getStudentCourses } from "@/lib/courses";
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
  const params = new URL(req.url).searchParams;
  const action = params.get("action");

  // Inspecciona un token de enlace mágico real (sin consumirlo): dice por qué
  // fallaría `verify`. Uso: cambia "/api/auth/verify?token=…" por "/api/auth/debug?token=…".
  const token = params.get("token");
  if (token) {
    const insp = inspectMagicToken(token);
    let studentFound = false;
    let storedNoncePresent = false;
    let nonceMatches = false;
    let error: string | null = null;
    if (insp.signatureOk && insp.studentId) {
      try {
        const payload = await getPayloadClient();
        const s = await payload.findByID({
          collection: "students",
          id: insp.studentId,
          depth: 0,
        });
        studentFound = Boolean(s);
        const stored = (s as { loginNonce?: string })?.loginNonce ?? null;
        storedNoncePresent = Boolean(stored);
        nonceMatches = stored != null && stored === insp.nonce;
      } catch (e) {
        error = e instanceof Error ? e.message : String(e);
      }
    }
    return NextResponse.json({
      signatureOk: insp.signatureOk,
      expired: insp.expired,
      ageMin: insp.ageMin,
      studentIdInToken: insp.studentId,
      studentFound,
      storedNoncePresent,
      nonceMatches,
      wouldSucceed: insp.signatureOk && !insp.expired && studentFound && nonceMatches,
      error,
    });
  }

  // Replica la lógica de /area/curso/[slug]: qué ve la página del curso estando
  // tú logueado. Uso (logueado): /api/auth/debug?course=<slug-del-curso>
  const course = params.get("course");
  if (course) {
    const student = await getCurrentStudent();
    if (!student) {
      return NextResponse.json({
        sessionOk: false,
        note: "getCurrentStudent() devolvió null AQUÍ → la página del curso redirige a /acceder",
      });
    }
    let enrolledSlugs: unknown = null;
    let mineFound = false;
    let error: string | null = null;
    try {
      const enrolled = await getStudentCourses(String(student.id));
      enrolledSlugs = enrolled.map((c) => ({
        slug: c.slug,
        accessState: c.accessState,
        editionId: c.editionId,
      }));
      mineFound = enrolled.some((c) => c.slug === course);
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
    return NextResponse.json({
      sessionOk: true,
      studentId: String(student.id),
      slugRequested: course,
      enrolledSlugs,
      mineFound,
      redirectTo: mineFound ? null : "/area (mine no encontrado)",
      error,
    });
  }

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
