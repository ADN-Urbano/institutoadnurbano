"use client";

import { useState } from "react";

type Result = { ok: true; message: string; devLink?: string } | { error: string };

export default function AccederForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setResult(await res.json());
    } catch {
      setResult({ error: "No se pudo conectar. Inténtalo de nuevo." });
    } finally {
      setLoading(false);
    }
  }

  if (result && "ok" in result) {
    return (
      <div className="rounded-xl border border-rule bg-bg-soft p-6">
        <p className="text-[15px] text-ink">{result.message}</p>
        {result.devLink && (
          <div className="mt-4 pt-4 border-t border-rule">
            <p className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-muted mb-2">
              Modo desarrollo · enlace de acceso
            </p>
            <a
              href={result.devLink}
              className="inline-flex items-center gap-2 bg-ink text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-turquoise"
            >
              Entrar ahora →
            </a>
          </div>
        )}
        <button
          onClick={() => {
            setResult(null);
            setEmail("");
          }}
          className="mt-4 text-[13px] text-turquoise font-medium hover:underline"
        >
          Usar otro email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] text-ink-soft tracking-[0.04em] uppercase">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.es"
          className="border border-rule rounded-xl px-4 py-3 text-[15px] outline-none transition-colors focus:border-turquoise"
        />
      </label>

      {result && "error" in result && (
        <p className="text-[13px] text-coral">{result.error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 bg-ink text-white text-center p-4 rounded-xl font-bold text-[15px] transition-all hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)] disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {loading ? "Enviando…" : "Enviar enlace de acceso"}
      </button>
      <p className="text-[13px] text-ink-muted leading-[1.5]">
        Te enviamos un enlace para entrar sin contraseña. Si acabas de comprar un programa, usa el
        email de la compra.
      </p>
    </form>
  );
}
