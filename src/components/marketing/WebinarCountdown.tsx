"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Cuenta atrás de la oferta del webinar (deadline 72 h por registrante). Lee el
 * `offerDeadline` de la cookie `adn_webinar` (la fija /webinar al registrar) o,
 * en su defecto, del prop. Persiste aunque el usuario recargue. Cuando caduca,
 * muestra el estado "oferta caducada".
 *
 * El deadline (valor de cookie, solo cliente) se lee con `useSyncExternalStore`
 * para evitar setState en efecto y desajustes de hidratación; el tiempo restante
 * se actualiza por intervalo dentro de un callback (no en el cuerpo del efecto).
 */

function cookieDeadline(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )adn_webinar=([^;]*)/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as { offerDeadline?: string };
    return parsed.offerDeadline ?? null;
  } catch {
    return null;
  }
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// Suscripción no-op: la cookie no cambia tras montar; basta el snapshot inicial.
function noopSubscribe(): () => void {
  return () => {};
}

export default function WebinarCountdown({ offerDeadline }: { offerDeadline?: string }) {
  // Snapshot del deadline: cookie en cliente, prop como fallback, null en SSR.
  const cookieValue = useSyncExternalStore(noopSubscribe, cookieDeadline, () => null);
  const deadline = cookieValue ?? offerDeadline ?? null;

  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!deadline) return;
    const target = new Date(deadline).getTime();
    if (Number.isNaN(target)) return;
    const id = setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000);
    // Primer valor en microtask para no llamar setState en el cuerpo del efecto.
    const raf = requestAnimationFrame(() => setRemaining(Math.max(0, target - Date.now())));
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [deadline]);

  // Sin deadline aún (no registrado): no mostramos cuenta atrás.
  if (remaining == null) return null;

  if (remaining <= 0) {
    return (
      <div className="rounded-2xl bg-bg-soft border border-rule px-6 py-5 text-center">
        <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-ink-muted mb-1">Tu oferta exclusiva</p>
        <p className="text-[17px] font-bold text-ink-soft">Tu oferta del webinar ha caducado.</p>
      </div>
    );
  }

  const totalS = Math.floor(remaining / 1000);
  const h = Math.floor(totalS / 3600);
  const m = Math.floor((totalS % 3600) / 60);
  const s = totalS % 60;

  const cell = (value: string, label: string) => (
    <div className="flex flex-col items-center">
      <span className="font-display font-extrabold text-[40px] leading-none tabular-nums max-sm:text-[32px]">{value}</span>
      <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-muted mt-1">{label}</span>
    </div>
  );

  return (
    <div className="rounded-2xl bg-ink text-white px-6 py-5 text-center">
      <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-white/70 mb-3">
        Tu oferta -40% caduca en
      </p>
      <div className="flex items-center justify-center gap-5 max-sm:gap-3">
        {cell(pad(h), "Horas")}
        <span className="font-display text-[32px] leading-none opacity-40">:</span>
        {cell(pad(m), "Min")}
        <span className="font-display text-[32px] leading-none opacity-40">:</span>
        {cell(pad(s), "Seg")}
      </div>
    </div>
  );
}
