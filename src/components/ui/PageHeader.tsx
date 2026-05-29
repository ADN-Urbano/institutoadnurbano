import AccentTitle from "@/components/ui/AccentTitle";

/**
 * Cabecera de página interior (Formación, Recursos…): eyebrow + título grande
 * con acento + resumen, y una columna de stats a la derecha (border-left en
 * escritorio, border-top en móvil).
 */
export default function PageHeader({
  eyebrow,
  title,
  accent,
  summary,
  stats,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  stats: [string, string][];
}) {
  return (
    <section className="grid grid-cols-1 gap-10 items-end pt-8 pb-16 mb-16 border-b border-rule lg:grid-cols-[1.6fr_1fr] lg:gap-12 max-sm:pb-10 max-sm:mb-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-turquoise-soft text-turquoise-dark rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
          {eyebrow}
        </div>
        <h1 className="font-display font-extrabold text-[56px] leading-[0.92] tracking-[-0.025em] uppercase mb-5 md:text-[72px] lg:text-[96px] max-sm:text-[44px]">
          <AccentTitle title={title} accent={accent} />
        </h1>
        <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[90%] max-sm:text-base">
          {summary}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 pl-8 border-l border-rule max-lg:pl-0 max-lg:border-l-0 max-lg:pt-6 max-lg:border-t">
        {stats.map(([num, label]) => (
          <div key={label}>
            <div className="font-display font-extrabold text-[56px] leading-none tracking-[-0.025em] mb-1.5 text-turquoise max-sm:text-[40px]">
              {num}
            </div>
            <div className="font-mono text-[11px] text-ink-muted leading-[1.3] tracking-[0.04em] uppercase whitespace-pre-line">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
