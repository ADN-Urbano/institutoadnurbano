import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import {
  verifyMagicToken,
  sessionCookieValue,
  sessionCookieOptions,
  SESSION_COOKIE,
  newNonce,
} from "@/lib/session";

/** Verifica el enlace mágico, abre sesión y redirige al área del alumno. */
export async function GET(req: Request) {
  const fail = NextResponse.redirect(new URL("/acceder?error=enlace", req.url));
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return fail;

  const parsed = verifyMagicToken(token);
  if (!parsed) return fail;

  const payload = await getPayloadClient();
  let student;
  try {
    student = await payload.findByID({ collection: "students", id: parsed.studentId });
  } catch {
    return fail;
  }
  // Enlace de un solo uso: el nonce debe coincidir con el guardado.
  if (!student || student.loginNonce !== parsed.nonce) return fail;

  // Rotamos el nonce para invalidar el enlace usado.
  await payload.update({ collection: "students", id: student.id, data: { loginNonce: newNonce() } });

  const res = NextResponse.redirect(new URL("/area", req.url));
  res.cookies.set(SESSION_COOKIE, sessionCookieValue(String(student.id)), sessionCookieOptions);
  return res;
}
