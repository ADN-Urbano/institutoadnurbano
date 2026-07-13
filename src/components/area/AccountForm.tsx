"use client";

import { useState } from "react";

export default function AccountForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const [name, setName] = useState(initialName);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    setDeleting(true);
    try {
      await fetch("/api/account/delete", { method: "POST" });
      window.location.href = "/";
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Datos */}
      <form onSubmit={save} className="flex flex-col gap-4 max-w-[480px]">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-ink-soft tracking-[0.04em] uppercase">Email</span>
          <input
            value={email}
            disabled
            className="border border-rule rounded-xl px-4 py-3 text-[15px] bg-bg-soft text-ink-muted"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-ink-soft tracking-[0.04em] uppercase">Nombre</span>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
            placeholder="Tu nombre"
            className="border border-rule rounded-xl px-4 py-3 text-[15px] outline-none transition-colors focus:border-turquoise"
          />
        </label>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-ink text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-turquoise disabled:opacity-60"
          >
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
          {saved && <span className="text-sm text-[#5C6B26] font-medium">Guardado ✓</span>}
        </div>
      </form>

      {/* Datos y privacidad */}
      <div className="border-t border-rule pt-8">
        <h2 className="font-mono text-[11px] font-medium text-ink-soft tracking-[0.06em] uppercase mb-4">
          Datos y privacidad
        </h2>
        <div className="flex flex-col gap-3 items-start">
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="text-sm font-semibold text-coral hover:underline"
            >
              Eliminar mi cuenta
            </button>
          ) : (
            <div className="rounded-xl border border-coral/40 bg-coral-soft p-5 max-w-[520px]">
              <p className="text-sm text-ink mb-4">
                Esto eliminará tu cuenta y tus inscripciones de forma permanente. Esta acción no se
                puede deshacer.
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={remove}
                  disabled={deleting}
                  className="bg-coral text-white px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60"
                >
                  {deleting ? "Eliminando…" : "Sí, eliminar definitivamente"}
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-rule"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
