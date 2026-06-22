import { why } from "@/data/formacion";

/** Sección "¿Por qué ADN Local?": texto explicativo + cita destacada. */
export default function WhyAdn() {
  return (
    <section className="grid grid-cols-1 gap-12 items-start mb-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16 max-sm:mb-14">
      <div>
        <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-8 max-lg:text-[40px] max-sm:text-[34px]">
          ¿Por qué <span className="text-turquoise">ADN Local</span>?
        </h2>
        <div className="flex flex-col gap-4 text-[16px] leading-[1.65] text-ink-soft max-w-[60ch]">
          {why.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <figure className="relative bg-turquoise-soft rounded-[24px] p-10 lg:sticky lg:top-[100px] max-sm:p-8">
        <span
          aria-hidden
          className="font-display font-extrabold text-turquoise/40 text-[80px] leading-[0.4] block select-none"
        >
          &ldquo;
        </span>
        <blockquote className="font-display font-bold text-[28px] leading-[1.15] tracking-[-0.01em] uppercase text-ink lg:text-[32px] max-sm:text-[24px]">
          {why.quote.map((part, i) => (
            <span key={i} className={part.accent ? "text-turquoise" : undefined}>
              {part.text}
            </span>
          ))}
        </blockquote>
      </figure>
    </section>
  );
}
