"use client";

import { useState } from "react";

/** Botón de inscripción: crea una Checkout Session y redirige a Stripe. */
export default function CheckoutButton({ slug, editionId }: { slug: string; editionId?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, editionId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error || "No se pudo iniciar el pago.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("No se pudo conectar. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="block w-full bg-ink text-white text-center p-4 rounded-xl font-bold text-[15px] cursor-pointer transition-all mb-3 hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)] disabled:opacity-60 disabled:cursor-wait"
      >
        {loading ? "Redirigiendo a pago…" : "Inscribirme al curso →"}
      </button>
      {error && (
        <div className="text-center text-[13px] text-coral mb-3" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
