import { Resend } from "resend";

/**
 * Envío de emails transaccionales con Resend. Si no hay RESEND_API_KEY, las
 * funciones devuelven false sin lanzar (degradación suave: en local seguimos
 * usando el devLink). El dominio del remitente debe estar verificado en Resend.
 */

const FROM = process.env.EMAIL_FROM || "ADN Local <acceso@adnlocal.es>";

let client: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

function shell(title: string, intro: string, cta: { href: string; label: string }, outro: string): string {
  return `
  <div style="background:#f5f3ee;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e7e3d9;">
      <div style="background:#1a1a1a;padding:20px 28px;">
        <span style="color:#fff;font-weight:800;font-size:18px;letter-spacing:-0.02em;">ADN Local</span>
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 12px;font-size:22px;line-height:1.2;color:#1a1a1a;">${title}</h1>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#444;">${intro}</p>
        <a href="${cta.href}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:13px 22px;border-radius:10px;font-weight:700;font-size:15px;">${cta.label}</a>
        <p style="margin:22px 0 0;font-size:13px;line-height:1.6;color:#888;">${outro}</p>
      </div>
    </div>
    <p style="max-width:480px;margin:16px auto 0;font-size:11px;color:#aaa;text-align:center;">ADN Local · adnlocal.es</p>
  </div>`;
}

/** Enlace mágico de acceso al área del alumno. */
export async function sendMagicLink(email: string, link: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;
  const html = shell(
    "Tu acceso a ADN Local",
    "Pulsa el botón para entrar a tu área del alumno. El enlace caduca en 15 minutos y solo puede usarse una vez.",
    { href: link, label: "Entrar a mi área →" },
    "Si no has solicitado este acceso, puedes ignorar este email.",
  );
  const { error } = await resend.emails.send({ from: FROM, to: email, subject: "Tu acceso a ADN Local", html });
  if (error) {
    console.error("[email] fallo al enviar magic-link:", error);
    return false;
  }
  return true;
}

/** Bienvenida tras la compra, con acceso directo al curso. */
export async function sendWelcome(email: string, link: string, courseTitle: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;
  const html = shell(
    "¡Bienvenido/a a tu formación!",
    `Tu inscripción en <strong>${courseTitle}</strong> está confirmada. Entra a tu área del alumno para empezar. El enlace caduca en 15 minutos; después podrás volver a entrar desde <a href="https://www.adnlocal.es/acceder">adnlocal.es/acceder</a> con tu email.`,
    { href: link, label: "Acceder al curso →" },
    "Gracias por confiar en ADN Local.",
  );
  const { error } = await resend.emails.send({ from: FROM, to: email, subject: `Acceso a ${courseTitle} · ADN Local`, html });
  if (error) {
    console.error("[email] fallo al enviar bienvenida:", error);
    return false;
  }
  return true;
}
