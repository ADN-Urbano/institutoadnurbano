"use client";

import { useState, type ReactNode } from "react";
import type { PriceTier, PriceTone } from "@/data/curso";
import CheckoutButton from "@/components/curso/CheckoutButton";

const priceColor: Record<PriceTone, string> = {
  turquoise: "text-turquoise",
  amber: "text-[#c77f1e]",
  ink: "text-ink",
};

const discountBadge: Record<PriceTone, string> = {
  turquoise: "bg-turquoise-soft text-turquoise-dark",
  amber: "bg-yellow-soft text-[#9a7b15]",
  ink: "bg-bg-soft text-ink-soft",
};

/**
 * Selector interactivo de edición + botón de inscripción. Cada tramo de precio
 * (= una edición comprable) es una opción seleccionable (rol radio, accesible
 * por teclado). El tramo seleccionado se resalta; los demás se atenúan. El botón
 * envía la edición elegida al checkout. El contenido intermedio de la tarjeta
 * (plazas/garantía, checklist de `feats`…) se inyecta como `children` para que
 * el botón comparta el estado de selección con los tramos.
 */
export default function EditionPurchase({
  slug,
  priceTiers,
  defaultEditionId,
  children,
}: {
  slug: string;
  priceTiers: PriceTier[];
  defaultEditionId: string | null;
  children?: ReactNode;
}) {
  const initial =
    defaultEditionId ?? priceTiers.find((t) => t.isDefault)?.editionId ?? priceTiers[0]?.editionId ?? "";
  const [selectedEditionId, setSelectedEditionId] = useState(initial);

  return (
    <>
      {/* Roadmap de ediciones comprables: tramos seleccionables (rol radio) */}
      <div
        role="radiogroup"
        aria-label="Elige la edición"
        className="grid grid-cols-1 gap-3 mb-5 lg:grid-cols-3"
      >
        {priceTiers.map((t) => {
          const selected = t.editionId === selectedEditionId;
          return (
            <button
              type="button"
              key={t.editionId}
              role="radio"
              aria-checked={selected}
              onClick={() => setSelectedEditionId(t.editionId)}
              className={`text-left rounded-2xl p-4 flex flex-col border-2 cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 ${
                selected
                  ? "bg-white border-turquoise ring-2 ring-turquoise/30"
                  : "bg-bg-soft border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3 min-h-[34px]">
                <span className="font-mono text-[10px] font-medium text-ink-muted tracking-[0.04em] uppercase leading-[1.2]">
                  {t.label}
                </span>
                {t.discount && (
                  <span
                    className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${discountBadge[t.tone]}`}
                  >
                    {t.discount}
                  </span>
                )}
              </div>
              {t.oldPrice && (
                <s className="text-[13px] text-coral/80 line-through decoration-coral/60">
                  {t.oldPrice}
                </s>
              )}
              <div
                className={`font-display font-extrabold text-[34px] leading-none tracking-[-0.02em] ${priceColor[t.tone]}`}
              >
                {t.price}
              </div>
              <div className="font-mono text-[10px] text-ink-muted tracking-[0.03em] mt-2 leading-[1.3]">
                {t.editionLabel}
              </div>
              {t.startLabel && (
                <div className="text-[11px] font-semibold text-turquoise mt-1 leading-[1.2]">
                  {t.startLabel}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {children}

      <CheckoutButton slug={slug} editionId={selectedEditionId || undefined} />
    </>
  );
}
