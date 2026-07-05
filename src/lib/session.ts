import { createHmac, timingSafeEqual, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { getPayloadClient } from "@/lib/payload";

/**
 * Sesión propia del alumno (independiente de la auth de Payload, que se usa
 * solo para /admin). Login por enlace mágico: el token y la cookie son valores
 * firmados con HMAC usando PAYLOAD_SECRET. Sin dependencias externas.
 */

export const SESSION_COOKIE = "adn_session";
const MAGIC_TTL_MS = 15 * 60 * 1000; // 15 min
const SESSION_TTL_S = 60 * 60 * 24 * 30; // 30 días

function secret(): string {
  return process.env.PAYLOAD_SECRET || "dev-secret";
}

function sign(value: string): string {
  const mac = createHmac("sha256", secret()).update(value).digest("base64url");
  return `${Buffer.from(value).toString("base64url")}.${mac}`;
}

function unsign(signed: string): string | null {
  const [data, mac] = signed.split(".");
  if (!data || !mac) return null;
  const value = Buffer.from(data, "base64url").toString();
  const expected = createHmac("sha256", secret()).update(value).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return value;
}

export function newNonce(): string {
  return randomBytes(16).toString("hex");
}

/** Token del enlace mágico: studentId:nonce:expiry, firmado. De un solo uso (nonce). */
export function createMagicToken(studentId: string, nonce: string): string {
  const expiry = Date.now() + MAGIC_TTL_MS;
  return sign(`${studentId}:${nonce}:${expiry}`);
}

export function verifyMagicToken(token: string): { studentId: string; nonce: string } | null {
  const value = unsign(token);
  if (!value) return null;
  const [studentId, nonce, expiryStr] = value.split(":");
  if (!studentId || !nonce || !expiryStr) return null;
  if (Date.now() > Number(expiryStr)) return null;
  return { studentId, nonce };
}

/**
 * Inspecciona un token de enlace mágico SIN consumirlo (no rota el nonce).
 * Solo para diagnóstico: distingue firma inválida vs caducado vs datos.
 */
export function inspectMagicToken(token: string): {
  signatureOk: boolean;
  expired: boolean;
  studentId: string | null;
  nonce: string | null;
  ageMin: number | null;
} {
  const value = unsign(token);
  if (!value) return { signatureOk: false, expired: false, studentId: null, nonce: null, ageMin: null };
  const [studentId, nonce, expiryStr] = value.split(":");
  const expiry = Number(expiryStr);
  const expired = Number.isFinite(expiry) ? Date.now() > expiry : true;
  const ageMin = Number.isFinite(expiry) ? Math.round((MAGIC_TTL_MS - (expiry - Date.now())) / 60000) : null;
  return { signatureOk: true, expired, studentId: studentId ?? null, nonce: nonce ?? null, ageMin };
}

export function sessionCookieValue(studentId: string): string {
  return sign(`s:${studentId}`);
}

export function studentIdFromSession(cookieValue: string): string | null {
  const value = unsign(cookieValue);
  if (!value || !value.startsWith("s:")) return null;
  return value.slice(2);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_S,
};

/** Devuelve el alumno autenticado (o null) leyendo la cookie de sesión. */
export async function getCurrentStudent() {
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  const studentId = studentIdFromSession(cookie);
  if (!studentId) return null;
  try {
    const payload = await getPayloadClient();
    const student = await payload.findByID({ collection: "students", id: studentId, depth: 0 });
    return student ?? null;
  } catch {
    return null;
  }
}
