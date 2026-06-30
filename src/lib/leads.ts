import { createHash } from "crypto";

/**
 * Helpers puros del motor de captación de leads (atribución, deadline de la
 * oferta del webinar, hash de email para CAPI). Sin dependencias de Payload,
 * Stripe, red ni cookies → testeables en aislamiento con Vitest.
 */

/** Tipos de lead que maneja la colección `Leads` y el endpoint /api/leads. */
export const LEAD_TYPES = ["webinar", "descarga-pdf", "contacto", "lista-espera"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export function isLeadType(value: unknown): value is LeadType {
  return typeof value === "string" && (LEAD_TYPES as readonly string[]).includes(value);
}

/** Ventana de la oferta del webinar: 72 h desde el registro. */
export const WEBINAR_OFFER_MS = 72 * 60 * 60 * 1000;

/** Touch de atribución (un único punto de contacto: first o last). */
export type AttributionTouch = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  landingPage?: string;
  referrer?: string;
  date?: string;
};

/** Identificadores de clic de plataformas de ads (para CAPI / Insight Tag). */
export type ClickIds = {
  fbclid?: string;
  gclid?: string;
  liFatId?: string;
};

/**
 * Parsea los parámetros UTM + landing + referrer de una query a un touch de
 * atribución. Solo incluye claves con valor (omite vacías) para no pisar un
 * first-touch persistido con campos nulos. `date` se fija al momento dado.
 */
export function parseUtms(
  params: URLSearchParams,
  opts: { landingPage?: string; referrer?: string; now?: number } = {},
): AttributionTouch {
  const touch: AttributionTouch = {};
  const map: Record<string, keyof AttributionTouch> = {
    utm_source: "source",
    utm_medium: "medium",
    utm_campaign: "campaign",
    utm_content: "content",
    utm_term: "term",
  };
  for (const [param, key] of Object.entries(map)) {
    const v = params.get(param)?.trim();
    if (v) touch[key] = v;
  }
  if (opts.landingPage) touch.landingPage = opts.landingPage;
  if (opts.referrer) touch.referrer = opts.referrer;
  touch.date = new Date(opts.now ?? Date.now()).toISOString();
  return touch;
}

/** Extrae los click IDs (fbclid/gclid/li_fat_id) de una query. Solo presentes. */
export function parseClickIds(params: URLSearchParams): ClickIds {
  const ids: ClickIds = {};
  const fbclid = params.get("fbclid")?.trim();
  const gclid = params.get("gclid")?.trim();
  const liFatId = params.get("li_fat_id")?.trim();
  if (fbclid) ids.fbclid = fbclid;
  if (gclid) ids.gclid = gclid;
  if (liFatId) ids.liFatId = liFatId;
  return ids;
}

/** Deadline de la oferta del webinar: ISO de (registro + 72 h). */
export function offerDeadline(registeredAt: number = Date.now()): string {
  return new Date(registeredAt + WEBINAR_OFFER_MS).toISOString();
}

/**
 * ¿Sigue vigente la oferta? true si `now` es anterior al deadline. Un deadline
 * inválido (ISO no parseable → NaN) se considera caducado.
 */
export function isOfferActive(deadlineIso: string, now: number = Date.now()): boolean {
  const t = new Date(deadlineIso).getTime();
  return !Number.isNaN(t) && now < t;
}

/** Normaliza un email para hashear/comparar: trim + minúsculas. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Hash de email para Meta CAPI (user_data.em): SHA-256 hex del email
 * normalizado (trim + minúsculas), como exige la Conversions API.
 */
export function hashEmail(email: string): string {
  return createHash("sha256").update(normalizeEmail(email)).digest("hex");
}

/** Validación mínima de email (no estricta; evita basura obvia). */
export function isValidEmail(email: string): boolean {
  const e = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;
}
