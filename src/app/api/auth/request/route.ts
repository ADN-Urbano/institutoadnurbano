import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { createMagicToken, newNonce } from "@/lib/session";
import { sendMagicLink } from "@/lib/email";

/** Solicita un enlace mágico de acceso para un email de alumno. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const email = body.email?.toLowerCase().trim();
  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });
  }

  // Respuesta genérica: no revelamos si el email existe.
  const generic = { ok: true, message: "Si tu email tiene acceso, te enviaremos un enlace para entrar." };

  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "students",
    where: { email: { equals: email } },
    limit: 1,
  });
  const student = res.docs[0];
  if (!student) return NextResponse.json(generic);

  const nonce = newNonce();
  await payload.update({ collection: "students", id: student.id, data: { loginNonce: nonce } });

  // Normaliza la base: quita espacios/barras y garantiza protocolo (una env con
  // espacios al final rompía el enlace: "…adnlocal.es%20%20/api/auth/verify").
  const rawBase = (process.env.NEXT_PUBLIC_SERVER_URL ?? "").trim().replace(/\/+$/, "");
  const base = rawBase
    ? /^https?:\/\//.test(rawBase)
      ? rawBase
      : `https://${rawBase}`
    : new URL(req.url).origin;
  const link = `${base}/api/auth/verify?token=${encodeURIComponent(createMagicToken(String(student.id), nonce))}`;

  const sent = await sendMagicLink(email, link);

  // Sin Resend (típico en local): devolvemos el enlace para poder probar.
  if (!sent && process.env.NODE_ENV !== "production") {
    console.log("[magic-link DEV]", link);
    return NextResponse.json({ ...generic, devLink: link });
  }
  return NextResponse.json(generic);
}
