import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import {
  isLeadType,
  isValidEmail,
  normalizeEmail,
  offerDeadline,
  type AttributionTouch,
  type ClickIds,
  type LeadType,
} from "@/lib/leads";
import { sendCapiEvent } from "@/lib/meta-capi";
import {
  sendWebinarSequence,
  sendProgramPdf,
  sendContactEmails,
  sendWaitlistConfirm,
  sendNewsletterConfirm,
  serverUrl,
} from "@/lib/email";
import { programs } from "@/data/formacion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Captación de leads. Único endpoint para todos los lead magnets (vía `type`):
 * webinar · descarga-pdf · contacto · lista-espera · newsletter.
 *
 * - Valida email + type + anti-spam (honeypot + rate-limit suave en memoria).
 * - Crea el Lead (Local API) con la atribución recibida (first/last touch + click IDs).
 * - Idempotencia suave: mismo email+type en <24 h no duplica el email (sí actualiza last-touch).
 * - Dispara email (Resend) y CAPI server-side (Meta) según el tipo, sin bloquear la respuesta.
 *
 * Degradación suave: sin RESEND_API_KEY no se envía email; sin creds de Meta no se envía CAPI.
 * El PDF del folleto es un placeholder hasta que el cliente lo aporte.
 */

const PDF_PLACEHOLDER_URL = "/programa-adn-local.pdf"; // placeholder si el curso no tiene folleto
// Folleto del programa por curso (en /public/programas). El email enlaza el PDF real.
const PDF_BY_SLUG: Record<string, string> = {
  "hacia-un-nuevo-mandato": "/programas/hacia-un-nuevo-mandato.pdf",
  "construir-la-alternativa": "/programas/construir-la-alternativa.pdf",
};

// Rate-limit suave en memoria (best-effort; el disco de Vercel es efímero y el
// runtime puede reiniciarse). No es una defensa fuerte, solo frena el spam burdo.
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number): boolean {
  const arr = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > RATE_MAX;
}

type LeadBody = {
  email?: string;
  name?: string;
  phone?: string;
  municipio?: string;
  pais?: string;
  situacion?: string;
  comoNosConociste?: string;
  message?: string;
  type?: string;
  courseSlug?: string;
  firstTouch?: AttributionTouch;
  lastTouch?: AttributionTouch;
  clickIds?: ClickIds;
  // Honeypot: campo oculto que un bot rellenará y un humano no.
  website?: string;
};

const SITUACIONES = ["gobierno", "oposicion", "candidato", "tecnico", "otro"];

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as LeadBody;

  // Anti-spam 1: honeypot. Si está relleno, fingimos éxito sin crear nada.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Email no válido." }, { status: 400 });
  }
  const normEmail = normalizeEmail(email);

  if (!isLeadType(body.type)) {
    return NextResponse.json({ error: "Tipo de lead no válido." }, { status: 400 });
  }
  const type: LeadType = body.type;

  // Anti-spam 2: rate-limit suave por (email + type).
  const now = Date.now();
  if (rateLimited(`${normEmail}:${type}`, now)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo en un minuto." }, { status: 429 });
  }

  const situacion = SITUACIONES.includes(body.situacion ?? "") ? body.situacion : undefined;
  const deadline = type === "webinar" ? offerDeadline(now) : undefined;

  const payload = await getPayloadClient();

  // Idempotencia suave: mismo email + type (+ curso, si lo hay) en <24 h → no
  // duplicar el email; sí refrescar el last-touch. El curso forma parte de la
  // clave: pedir el programa de OTRO curso no es un duplicado (debe enviarse su
  // folleto y registrarse como lead nuevo).
  const since = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const dupSlug = body.courseSlug?.trim();
  let recentDuplicate = false;
  let existingId: string | number | null = null;
  try {
    const found = await payload.find({
      collection: "leads",
      where: {
        and: [
          { email: { equals: normEmail } },
          { type: { equals: type } },
          { createdAt: { greater_than: since } },
          ...(dupSlug ? [{ courseSlug: { equals: dupSlug } }] : []),
        ],
      },
      sort: "-createdAt",
      limit: 1,
      depth: 0,
    });
    if (found.docs.length > 0) {
      recentDuplicate = true;
      existingId = (found.docs[0] as { id: string | number }).id;
    }
  } catch (err) {
    console.error("[leads] error consultando duplicados:", err);
  }

  try {
    if (recentDuplicate && existingId != null) {
      // Solo refrescamos el last-touch (no reenviamos el email).
      await payload.update({
        collection: "leads",
        id: existingId,
        data: { lastTouch: body.lastTouch ?? {} },
      });
    } else {
      await payload.create({
        collection: "leads",
        data: {
          email: normEmail,
          name: body.name?.trim() || undefined,
          phone: body.phone?.trim() || undefined,
          municipio: body.municipio?.trim() || undefined,
          pais: body.pais?.trim() || undefined,
          situacion,
          comoNosConociste: body.comoNosConociste?.trim() || undefined,
          message: body.message?.trim() || undefined,
          type,
          courseSlug: body.courseSlug?.trim() || undefined,
          offerDeadline: deadline,
          firstTouch: body.firstTouch ?? {},
          lastTouch: body.lastTouch ?? body.firstTouch ?? {},
          clickIds: body.clickIds ?? {},
        },
      });
    }
  } catch (err) {
    console.error("[leads] error al crear/actualizar el lead:", err);
    return NextResponse.json({ error: "No se pudo registrar." }, { status: 500 });
  }

  // Email + CAPI: solo si NO es un duplicado reciente (idempotencia suave).
  // IMPORTANTE: en serverless (Vercel) hay que AWAITAR estos envíos. Si se hacen
  // "fire-and-forget" (void), la función puede congelarse tras responder y la
  // llamada a Resend/Meta nunca se ejecuta. Se lanzan en paralelo (allSettled)
  // para no serializar la latencia; sus fallos se registran sin romper el flujo.
  if (!recentDuplicate) {
    const eventSourceUrl = req.headers.get("referer") ?? undefined;
    const fbclid = body.clickIds?.fbclid;
    const clientUserAgent = req.headers.get("user-agent") ?? undefined;

    const jobs: Promise<unknown>[] = [
      // CAPI: Lead para todos; CompleteRegistration para el webinar (registro).
      sendCapiEvent({
        eventName: type === "webinar" ? "CompleteRegistration" : "Lead",
        eventSourceUrl,
        user: { email: normEmail, fbclid, clientUserAgent },
      }),
    ];

    switch (type) {
      case "webinar":
        jobs.push(sendWebinarSequence(normEmail));
        break;
      case "descarga-pdf": {
        const slug = body.courseSlug?.trim();
        const pdfPath = slug ? PDF_BY_SLUG[slug] : undefined;
        const pdfUrl = pdfPath ? `${serverUrl()}${pdfPath}` : PDF_PLACEHOLDER_URL;
        const title = slug ? programs.find((p) => p.id === slug)?.title : undefined;
        jobs.push(sendProgramPdf(normEmail, pdfUrl, title));
        break;
      }
      case "contacto":
        jobs.push(sendContactEmails({ email: normEmail, name: body.name?.trim(), message: body.message?.trim() }));
        break;
      case "lista-espera":
        jobs.push(sendWaitlistConfirm(normEmail));
        break;
      case "newsletter":
        jobs.push(sendNewsletterConfirm(normEmail));
        break;
    }

    await Promise.allSettled(jobs);
  }

  if (type === "webinar") {
    return NextResponse.json({ ok: true, redirect: "/webinar/ver", offerDeadline: deadline });
  }
  return NextResponse.json({ ok: true });
}
