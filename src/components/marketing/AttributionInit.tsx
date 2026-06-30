"use client";

import { useEffect } from "react";

/**
 * Captura de atribución (cliente). En la PRIMERA visita guarda first-touch
 * (UTMs + referrer + landing + click IDs) en la cookie `adn_attrib` (90 días) si
 * no existe; en CADA visita actualiza last-touch en `adn_attrib_last`.
 *
 * Son cookies first-party FUNCIONALES (analítica propia) → no requieren
 * consentimiento. Los formularios las leen y las mandan a /api/leads. Los
 * píxeles de terceros sí dependen del consentimiento (ver PixelLoader).
 */

const FIRST = "adn_attrib";
const LAST = "adn_attrib_last";
const MAX_AGE = 90 * 24 * 60 * 60; // 90 días en segundos

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

function buildTouch(): Record<string, string> {
  const params = new URLSearchParams(location.search);
  const touch: Record<string, string> = {};
  const utms: [string, string][] = [
    ["utm_source", "source"],
    ["utm_medium", "medium"],
    ["utm_campaign", "campaign"],
    ["utm_content", "content"],
    ["utm_term", "term"],
  ];
  for (const [param, key] of utms) {
    const v = params.get(param)?.trim();
    if (v) touch[key] = v;
  }
  for (const [param, key] of [
    ["fbclid", "fbclid"],
    ["gclid", "gclid"],
    ["li_fat_id", "liFatId"],
  ] as [string, string][]) {
    const v = params.get(param)?.trim();
    if (v) touch[key] = v;
  }
  touch.landingPage = location.pathname;
  if (document.referrer) touch.referrer = document.referrer;
  touch.date = new Date().toISOString();
  return touch;
}

export default function AttributionInit() {
  useEffect(() => {
    try {
      const touch = buildTouch();
      const serialized = JSON.stringify(touch);
      // first-touch: solo si no existe.
      if (!readCookie(FIRST)) writeCookie(FIRST, serialized);
      // last-touch: siempre.
      writeCookie(LAST, serialized);
    } catch {
      /* almacenamiento/cookies no disponibles */
    }
  }, []);

  return null;
}
