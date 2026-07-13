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

/**
 * Bienvenida tras la compra. Si la edición aún no ha empezado (`startsAt` en el
 * futuro), envía un email de "plaza reservada · empieza el <fecha>" en vez del
 * de acceso inmediato (el contenido y la comunidad se abren en la fecha de inicio).
 */
export async function sendWelcome(
  email: string,
  link: string,
  courseTitle: string,
  startsAt?: string | null,
): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const startsMs = startsAt ? new Date(startsAt).getTime() : NaN;
  const future = !Number.isNaN(startsMs) && startsMs > Date.now();
  const fecha = !Number.isNaN(startsMs)
    ? new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Madrid",
      }).format(new Date(startsMs))
    : null;

  const html = future
    ? shell(
        "¡Plaza reservada!",
        `Tu inscripción en <strong>${courseTitle}</strong> está confirmada. El programa <strong>empieza el ${fecha}</strong>: ese día se abre el contenido en tu campus y te avisaremos por email. Mientras tanto, puedes entrar a tu área para ver tu plaza.`,
        { href: link, label: "Ver mi plaza →" },
        "Gracias por confiar en ADN Local. Si tienes cualquier duda, responde a este email.",
      )
    : shell(
        "¡Bienvenido/a a tu formación!",
        `Tu inscripción en <strong>${courseTitle}</strong> está confirmada. Entra a tu área del alumno para empezar. El enlace caduca en 15 minutos; después podrás volver a entrar desde <a href="https://www.adnlocal.es/acceder">adnlocal.es/acceder</a> con tu email.`,
        { href: link, label: "Acceder al programa →" },
        "Gracias por confiar en ADN Local.",
      );

  const subject = future
    ? `Plaza reservada · ${courseTitle}`
    : `Acceso a ${courseTitle} · ADN Local`;
  const { error } = await resend.emails.send({ from: FROM, to: email, subject, html });
  if (error) {
    console.error("[email] fallo al enviar bienvenida:", error);
    return false;
  }
  return true;
}

/* ----------------------------------------------------------------------------
 * Emails de captación (leads). Drip SIN cron: la secuencia del webinar se
 * programa al registrar usando `scheduledAt` de Resend (offsets desde "ahora").
 * COPY: borradores pendientes de aprobación por el cliente.
 * -------------------------------------------------------------------------- */

const WEBINAR_VER_PATH = "/webinar/ver";

export function serverUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SERVER_URL || "https://www.adnlocal.es").trim().replace(/\/+$/, "");
  return /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
}

/** ISO de (ahora + horas) para programar un email con Resend (`scheduledAt`). */
function inHours(h: number): string {
  return new Date(Date.now() + h * 60 * 60 * 1000).toISOString();
}

/**
 * Secuencia del webinar (4 emails) programada de golpe al registrar:
 *  1. inmediato      → acceso a "ver el webinar"
 *  2. +24 h          → valor + recordatorio
 *  3. +48 h          → oferta (-40%) + deadline
 *  4. +66 h          → últimas horas (la oferta caduca a las 72 h)
 * Degradación suave: sin RESEND_API_KEY no envía nada (devuelve false).
 * COPY borrador — pendiente de aprobación del cliente.
 */
export async function sendWebinarSequence(email: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;
  const watch = `${serverUrl()}${WEBINAR_VER_PATH}`;

  const steps: { subject: string; html: string; scheduledAt?: string }[] = [
    {
      subject: "Tu acceso al webinar gratuito · ADN Local",
      html: shell(
        "Ya puedes ver el webinar",
        "Gracias por registrarte. Tienes acceso inmediato a la grabación: ¿cómo transformar tu municipio con una estrategia local que funciona? Tu oferta exclusiva caduca en 72 horas.",
        { href: watch, label: "Ver el webinar →" },
        "Si no te has registrado, puedes ignorar este email.",
      ),
    },
    {
      subject: "Lo que más nos preguntan tras el webinar",
      scheduledAt: inHours(24),
      html: shell(
        "¿Ya lo viste?",
        "Si aún no has visto el webinar, este es un buen momento. Dentro te contamos el método que aplican los municipios que mejor están haciendo las cosas, paso a paso.",
        { href: watch, label: "Retomar el webinar →" },
        "Tu oferta exclusiva sigue activa, pero no por mucho tiempo.",
      ),
    },
    {
      subject: "Tu -40% exclusivo del webinar (caduca pronto)",
      scheduledAt: inHours(48),
      html: shell(
        "Tu oferta del webinar",
        "Como asistente del webinar, tienes un -40% sobre el precio del programa. Es un bonus exclusivo y limitado: la oferta caduca a las 72 horas desde tu registro.",
        { href: watch, label: "Aprovechar mi -40% →" },
        "El descuento se aplica desde la página del webinar antes del deadline.",
      ),
    },
    {
      subject: "Últimas horas de tu oferta -40%",
      scheduledAt: inHours(66),
      html: shell(
        "Tu oferta termina hoy",
        "Tu -40% exclusivo del webinar está a punto de caducar. Si quieres dar el paso con el programa completo, este es el momento.",
        { href: watch, label: "Reservar mi plaza con -40% →" },
        "Cuando caduque, el precio vuelve a su tarifa habitual.",
      ),
    },
  ];

  let ok = true;
  for (const step of steps) {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: step.subject,
      html: step.html,
      ...(step.scheduledAt ? { scheduledAt: step.scheduledAt } : {}),
    });
    if (error) {
      console.error("[email] fallo al programar paso de la secuencia del webinar:", error);
      ok = false;
    }
  }
  return ok;
}

/**
 * Descarga del programa. Si `pdfUrl` es una URL real (http/https) enlaza el PDF;
 * si no (placeholder), envía una confirmación "te lo enviaremos" sin enlace roto
 * — el cliente está preparando el PDF y se enchufa cuando esté disponible.
 */
export async function sendProgramPdf(email: string, pdfUrl: string, courseTitle?: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;
  const hasPdf = /^https?:\/\//.test(pdfUrl);
  const html = hasPdf
    ? shell(
        "Aquí tienes el programa",
        `Gracias por tu interés${courseTitle ? ` en <strong>${courseTitle}</strong>` : ""}. Descarga el programa completo en PDF desde el botón. Si tienes dudas, responde a este email y te ayudamos.`,
        { href: pdfUrl, label: "Descargar el programa →" },
        "ADN Local · formación para líderes locales.",
      )
    : shell(
        "Recibirás el programa muy pronto",
        `Gracias por tu interés${courseTitle ? ` en <strong>${courseTitle}</strong>` : ""}. Estamos ultimando el programa completo y te lo enviaremos por email en cuanto esté listo. Mientras, puedes ver todos los detalles en la web.`,
        { href: `${serverUrl()}/programas`, label: "Ver los programas →" },
        "ADN Local · formación para líderes locales.",
      );
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Tu programa · ADN Local",
    html,
  });
  if (error) {
    console.error("[email] fallo al enviar el PDF del programa:", error);
    return false;
  }
  return true;
}

/** Autoresponder al lead de contacto + aviso interno al equipo. */
export async function sendContactEmails(
  lead: { email: string; name?: string; message?: string },
): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const auto = shell(
    "Hemos recibido tu mensaje",
    `Gracias por escribirnos${lead.name ? `, ${lead.name}` : ""}. Te responderemos lo antes posible. Mientras tanto, puedes explorar nuestros programas.`,
    { href: `${serverUrl()}/formacion`, label: "Ver los programas →" },
    "ADN Local · formación para líderes locales.",
  );

  let ok = true;
  const { error: autoErr } = await resend.emails.send({
    from: FROM,
    to: lead.email,
    subject: "Hemos recibido tu mensaje · ADN Local",
    html: auto,
  });
  if (autoErr) {
    console.error("[email] fallo al enviar autoresponder de contacto:", autoErr);
    ok = false;
  }

  // Aviso interno al buzón del equipo (EMAIL_FROM).
  const internalTo = (process.env.EMAIL_FROM || FROM).replace(/^.*<([^>]+)>.*$/, "$1");
  const internal = `<p><strong>Nuevo contacto</strong></p>
    <p>Email: ${lead.email}<br/>Nombre: ${lead.name ?? "—"}</p>
    <p>Mensaje:<br/>${(lead.message ?? "—").replace(/\n/g, "<br/>")}</p>`;
  const { error: intErr } = await resend.emails.send({
    from: FROM,
    to: internalTo,
    subject: `Nuevo contacto: ${lead.email}`,
    html: internal,
  });
  if (intErr) {
    console.error("[email] fallo al enviar aviso interno de contacto:", intErr);
    ok = false;
  }
  return ok;
}

/** Confirmación de alta en la newsletter ("no te pierdas nada"). */
export async function sendNewsletterConfirm(email: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;
  const html = shell(
    "¡Bienvenido/a a la newsletter de ADN Local!",
    "Gracias por suscribirte. A partir de ahora recibirás nuevos programas, webinars y recursos para líderes locales, sin saturar tu bandeja.",
    { href: `${serverUrl()}/programas`, label: "Ver los programas →" },
    "Puedes darte de baja cuando quieras desde cualquiera de nuestros emails.",
  );
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Te has suscrito a ADN Local",
    html,
  });
  if (error) {
    console.error("[email] fallo al enviar confirmación de newsletter:", error);
    return false;
  }
  return true;
}

/** Confirmación de lista de espera ("te avisaremos cuando abra la edición"). */
export async function sendWaitlistConfirm(email: string, courseTitle?: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;
  const html = shell(
    "Estás en la lista de espera",
    `Te avisaremos por email en cuanto abra la próxima edición${courseTitle ? ` de <strong>${courseTitle}</strong>` : ""}. Serás de los primeros en conocer fechas y plazas.`,
    { href: `${serverUrl()}/formacion`, label: "Ver los programas →" },
    "ADN Local · formación para líderes locales.",
  );
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Estás en la lista de espera · ADN Local",
    html,
  });
  if (error) {
    console.error("[email] fallo al enviar confirmación de lista de espera:", error);
    return false;
  }
  return true;
}
