import { hashEmail } from "@/lib/leads";

/**
 * Meta Conversions API (CAPI) server-side. Degradación suave como email.ts: sin
 * `NEXT_PUBLIC_META_PIXEL_ID` o `META_CAPI_TOKEN` no envía nada (devuelve false
 * sin lanzar). El motor funciona con placeholders; el cliente añade las creds.
 *
 * El email se hashea (SHA-256) antes de salir; nunca se manda en claro.
 */

const GRAPH_VERSION = "v19.0";

type CapiUserData = {
  email?: string;
  fbclid?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
};

type CapiEvent = {
  eventName: "Lead" | "CompleteRegistration" | "Purchase";
  eventId?: string; // para deduplicar con el pixel del navegador
  eventSourceUrl?: string;
  user: CapiUserData;
  value?: number; // en euros (no céntimos)
  currency?: string;
};

/** Construye `user_data` para CAPI: email hasheado + fbc derivado del fbclid. */
function buildUserData(user: CapiUserData): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  if (user.email) data.em = [hashEmail(user.email)];
  // fbc tiene un formato canónico: fb.1.<unixMs>.<fbclid>.
  if (user.fbclid) data.fbc = `fb.1.${Date.now()}.${user.fbclid}`;
  if (user.clientIpAddress) data.client_ip_address = user.clientIpAddress;
  if (user.clientUserAgent) data.client_user_agent = user.clientUserAgent;
  return data;
}

/**
 * Envía un evento de conversión a Meta CAPI. No lanza: ante falta de creds o
 * error de red, registra y devuelve false. Llamar con `await` pero sin bloquear
 * el flujo principal (registro / compra) por su resultado.
 */
export async function sendCapiEvent(event: CapiEvent): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return false; // degradación suave

  const body = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        ...(event.eventId ? { event_id: event.eventId } : {}),
        ...(event.eventSourceUrl ? { event_source_url: event.eventSourceUrl } : {}),
        user_data: buildUserData(event.user),
        ...(event.value != null
          ? { custom_data: { value: event.value, currency: event.currency ?? "EUR" } }
          : {}),
      },
    ],
  };

  try {
    const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("[meta-capi] respuesta no OK:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[meta-capi] fallo al enviar evento:", err);
    return false;
  }
}
