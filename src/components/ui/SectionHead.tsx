import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Cabecera de sección: eyebrow (coral en Versión D) + h2 con acento turquesa,
 * subtítulo opcional y enlace lateral opcional.
 */
export default function SectionHead({
  eyebrow,
  title,
  subtitle,
  link,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  link?: { label: string; href?: string };
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-3 max-sm:mb-6">
      <div className="flex-1">
        <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-2.5">
          {eyebrow}
        </div>
        <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-2 max-lg:text-[40px] max-sm:text-[34px]">
          {title}
        </h2>
        {subtitle && <p className="text-[15px] text-ink-muted mt-1">{subtitle}</p>}
      </div>
      {link && (
        <Link
          href={link.href ?? "#"}
          className="text-turquoise text-sm font-semibold inline-flex items-center gap-1.5 shrink-0 hover:gap-2.5 transition-all"
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}
