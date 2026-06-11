"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon } from "@/components/ui/icons";

export default function Onboarding({ slug, slackUrl }: { slug: string; slackUrl: string }) {
  const KEY = `adn_onboarding_${slug}`;
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* noop */
    }
  }, [KEY]);

  if (!show) return null;

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* noop */
    }
    setShow(false);
  }

  return (
    <div className="relative rounded-2xl bg-turquoise text-white p-7 mb-8 overflow-hidden max-sm:p-6">
      <button
        onClick={dismiss}
        aria-label="Cerrar"
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-colors hover:bg-white/25"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
      <div className="font-display font-extrabold text-[26px] leading-none tracking-[-0.02em] uppercase mb-3 pr-10">
        ¡Bienvenido/a al curso!
      </div>
      <p className="text-[15px] leading-[1.6] opacity-95 max-w-[620px] mb-4">
        Así funciona: ves los vídeos y las lecturas a tu ritmo, cada semana hay una{" "}
        <strong>sesión en directo por Teams</strong> (la verás justo aquí arriba), y la comunidad está
        en <strong>Slack</strong>. Marca las lecciones como completadas para seguir tu progreso.
      </p>
      <div className="flex gap-2.5 flex-wrap">
        <Link
          href={slackUrl}
          target={slackUrl.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="bg-white text-ink px-4 py-2.5 rounded-lg text-sm font-semibold transition-transform hover:-translate-y-px"
        >
          Unirme a Slack
        </Link>
        <button
          onClick={dismiss}
          className="border border-white/25 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-white/10"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
