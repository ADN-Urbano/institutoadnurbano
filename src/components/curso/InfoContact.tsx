"use client";

import { useState } from "react";
import LeadForm from "@/components/marketing/LeadForm";

/**
 * "¿Necesitas más información?": captura del programa en PDF (email →
 * type:descarga-pdf, se envía el folleto) + formulario de contacto
 * (type:contacto). Ambos publican en /api/leads vía LeadForm / fetch directo.
 */
export default function InfoContact({
  programPdfLabel,
  courseSlug,
}: {
  programPdfLabel: string;
  courseSlug?: string;
}) {
  return (
    <section className="mb-20 bg-bg-soft rounded-[28px] p-10 max-sm:p-7">
      <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 max-sm:text-[32px]">
        ¿Necesitas más información?
      </h2>

      {/* Descarga del programa: capturamos el email y enviamos el PDF por email. */}
      <ProgramPdfCapture label={programPdfLabel} courseSlug={courseSlug} />

      <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4 mt-10">
        ·· Escríbenos
      </div>

      <LeadForm
        type="contacto"
        courseSlug={courseSlug}
        fields={["name", "phone", "municipio", "situacion", "message"]}
        submitLabel="Enviar mensaje →"
        successMessage="¡Gracias! Hemos recibido tu mensaje y te responderemos pronto."
        className="lg:grid-cols-2"
      />
    </section>
  );
}

/** Captura de email para enviar el folleto en PDF (type:descarga-pdf). */
function ProgramPdfCapture({ label, courseSlug }: { label: string; courseSlug?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const firstTouch = parseTouch("adn_attrib");
    const lastTouch = parseTouch("adn_attrib_last");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "descarga-pdf", email, courseSlug, firstTouch, lastTouch }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "No se pudo enviar. Inténtalo de nuevo.");
        setLoading(false);
        return;
      }
      setDone(true);
      setLoading(false);
    } catch {
      setError("No se pudo conectar. Inténtalo de nuevo.");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mb-8 inline-flex rounded-xl bg-turquoise-soft text-turquoise-dark px-5 py-4 text-[15px] font-semibold" role="status">
        ¡Listo! Te hemos enviado el programa en PDF a tu email.
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center bg-turquoise-soft text-turquoise-dark px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[var(--shadow-sm)] mb-8"
      >
        {label} →
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-wrap items-end gap-3 max-w-[520px]">
      <label className="flex flex-1 flex-col gap-2 text-[13px] font-semibold text-ink-soft min-w-[220px]">
        Tu email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-rule bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-turquoise"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="bg-ink text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)] disabled:opacity-60 disabled:cursor-wait"
      >
        {loading ? "Enviando…" : "Enviar el PDF →"}
      </button>
      {error && (
        <div className="w-full text-[13px] text-coral" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
