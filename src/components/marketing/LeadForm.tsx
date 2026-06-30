"use client";

import { useState } from "react";
import type { LeadType } from "@/lib/leads";

/**
 * Formulario de captación reutilizable. Lee la atribución de las cookies
 * propias (`adn_attrib`/`adn_attrib_last`) y publica en /api/leads. El conjunto
 * de campos se elige con `fields`. Incluye honeypot anti-spam (`website`).
 *
 * En `type:webinar`, al éxito redirige a `data.redirect` (página de visionado).
 */

type FieldKey = "name" | "phone" | "municipio" | "situacion" | "comoNosConociste" | "message";

const inputClass =
  "w-full rounded-xl border border-rule bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-turquoise";
const labelClass = "flex flex-col gap-2 text-[13px] font-semibold text-ink-soft";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function parseTouch(name: string): Record<string, string> | undefined {
  try {
    const raw = readCookie(name);
    return raw ? (JSON.parse(raw) as Record<string, string>) : undefined;
  } catch {
    return undefined;
  }
}

/** Reconstruye clickIds del first-touch (donde AttributionInit los guarda). */
function clickIdsFrom(touch?: Record<string, string>) {
  if (!touch) return undefined;
  const ids: Record<string, string> = {};
  if (touch.fbclid) ids.fbclid = touch.fbclid;
  if (touch.gclid) ids.gclid = touch.gclid;
  if (touch.liFatId) ids.liFatId = touch.liFatId;
  return Object.keys(ids).length ? ids : undefined;
}

export default function LeadForm({
  type,
  fields,
  courseSlug,
  submitLabel = "Enviar →",
  successMessage = "¡Listo! Te hemos enviado un email.",
  className = "",
}: {
  type: LeadType;
  fields: FieldKey[];
  courseSlug?: string;
  submitLabel?: string;
  successMessage?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const firstTouch = parseTouch("adn_attrib");
    const lastTouch = parseTouch("adn_attrib_last");

    const payload: Record<string, unknown> = {
      type,
      courseSlug,
      email: String(fd.get("email") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
      firstTouch,
      lastTouch,
      clickIds: clickIdsFrom(firstTouch),
    };
    for (const key of fields) {
      const v = fd.get(key);
      if (v != null) payload[key] = String(v);
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        redirect?: string;
        offerDeadline?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "No se pudo enviar. Inténtalo de nuevo.");
        setLoading(false);
        return;
      }
      if (type === "webinar" && data.redirect) {
        // Persistimos el deadline para la cuenta atrás del visionado (72 h).
        if (data.offerDeadline) {
          const secure = location.protocol === "https:" ? "; Secure" : "";
          document.cookie = `adn_webinar=${encodeURIComponent(
            JSON.stringify({ offerDeadline: data.offerDeadline }),
          )}; Max-Age=${72 * 60 * 60}; Path=/; SameSite=Lax${secure}`;
        }
        window.location.href = data.redirect;
        return;
      }
      setDone(true);
      setLoading(false);
      form.reset();
    } catch {
      setError("No se pudo conectar. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className={`rounded-xl bg-turquoise-soft text-turquoise-dark px-5 py-4 text-[15px] font-semibold ${className}`} role="status">
        {successMessage}
      </div>
    );
  }

  return (
    <form className={`grid grid-cols-1 gap-4 ${className}`} onSubmit={handleSubmit}>
      {/* Honeypot anti-spam: oculto para humanos, tentador para bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {fields.includes("name") && (
        <label className={labelClass}>
          Nombre y apellidos
          <input type="text" name="name" className={inputClass} placeholder="Tu nombre" />
        </label>
      )}

      <label className={labelClass}>
        Email
        <input type="email" name="email" required className={inputClass} placeholder="tu@email.com" />
      </label>

      {fields.includes("phone") && (
        <label className={labelClass}>
          Teléfono
          <input type="tel" name="phone" className={inputClass} placeholder="Tu teléfono" />
        </label>
      )}

      {fields.includes("municipio") && (
        <label className={labelClass}>
          Municipio
          <input type="text" name="municipio" className={inputClass} placeholder="Tu municipio" />
        </label>
      )}

      {fields.includes("situacion") && (
        <label className={labelClass}>
          Tu situación
          <select name="situacion" className={inputClass} defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="gobierno">En gobierno (alcalde/concejal)</option>
            <option value="oposicion">En la oposición</option>
            <option value="candidato">Candidato/a</option>
            <option value="tecnico">Técnico/a municipal</option>
            <option value="otro">Otro</option>
          </select>
        </label>
      )}

      {fields.includes("comoNosConociste") && (
        <label className={labelClass}>
          ¿Cómo nos conociste?
          <input type="text" name="comoNosConociste" className={inputClass} placeholder="Redes, un compañero, una búsqueda…" />
        </label>
      )}

      {fields.includes("message") && (
        <label className={labelClass}>
          Mensaje
          <textarea name="message" rows={4} className={inputClass} placeholder="¿En qué podemos ayudarte?" />
        </label>
      )}

      <button
        type="submit"
        disabled={loading}
        className="justify-self-start bg-ink text-white px-7 py-4 rounded-xl text-sm font-bold transition-all hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)] disabled:opacity-60 disabled:cursor-wait"
      >
        {loading ? "Enviando…" : submitLabel}
      </button>

      {error && (
        <div className="text-[13px] text-coral" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
