import type { ReactNode } from "react";

/** Maquetación común de las páginas legales. */
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="max-w-[820px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-3">
        ·· Legal
      </div>
      <h1 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-3 max-sm:text-[36px]">
        {title}
      </h1>
      <p className="font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase mb-6">
        Última actualización: {updated}
      </p>

      <div className="rounded-xl bg-yellow-soft border border-yellow/40 px-5 py-4 mb-10 text-[13px] leading-[1.5] text-ink-soft">
        <strong className="text-ink">Borrador.</strong> Texto provisional pendiente de revisión por
        un profesional jurídico antes de la puesta en marcha. No constituye asesoramiento legal.
      </div>

      <div className="lesson-prose">{children}</div>
    </main>
  );
}
