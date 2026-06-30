"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "adn_cookie_consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* noop */
    }
    // Avisa al PixelLoader para que cargue los píxeles sin recargar la página.
    if (value === "accepted") {
      try {
        window.dispatchEvent(new Event("adn-consent"));
      } catch {
        /* noop */
      }
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-[680px] rounded-2xl bg-ink text-white shadow-[var(--shadow-lg)] p-5 flex items-center gap-5 max-sm:flex-col max-sm:items-stretch max-sm:gap-4">
      <p className="text-[13px] leading-[1.5] text-white/85 flex-1">
        Usamos cookies técnicas necesarias y, si las aceptas, analíticas para mejorar el sitio. Más
        información en nuestra{" "}
        <Link href="/cookies" className="text-yellow font-medium hover:underline">
          política de cookies
        </Link>
        .
      </p>
      <div className="flex gap-2.5 shrink-0 max-sm:justify-end">
        <button
          onClick={() => decide("rejected")}
          className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white/80 border border-white/20 transition-colors hover:text-white hover:border-white/40"
        >
          Rechazar
        </button>
        <button
          onClick={() => decide("accepted")}
          className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-ink transition-transform hover:-translate-y-px"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
