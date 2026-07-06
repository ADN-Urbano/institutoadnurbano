import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

/** Cierra la sesión del alumno y vuelve al inicio. */
export async function GET(req: Request) {
  // Blindaje anti-prefetch: un GET de prefetch (Next.js <Link> o el navegador)
  // NO debe mutar estado. Si la petición es un prefetch, redirige sin borrar la
  // cookie; solo cerramos sesión en una navegación REAL. (Un <Link> sin
  // prefetch={false} apuntando aquí llegaba a cerrar la sesión sola al entrar.)
  const purpose = (req.headers.get("sec-purpose") ?? req.headers.get("purpose") ?? "").toLowerCase();
  const isPrefetch = purpose.includes("prefetch") || req.headers.get("next-router-prefetch") === "1";
  const res = NextResponse.redirect(new URL("/", req.url));
  if (isPrefetch) return res;
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return res;
}
