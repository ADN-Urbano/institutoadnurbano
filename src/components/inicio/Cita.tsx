import { why } from "@/data/formacion";

/** Inicio · cita de marca como momento destacado (panel suave, limpio). */
export default function Cita() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <figure className="relative bg-bg-soft rounded-[28px] px-10 py-16 text-center max-sm:px-6 max-sm:py-10">
        <span
          aria-hidden
          className="font-display font-extrabold text-turquoise/30 text-[90px] leading-[0.25] block select-none"
        >
          &ldquo;
        </span>
        <blockquote className="font-display font-bold text-[36px] leading-[1.12] tracking-[-0.01em] uppercase text-ink max-w-[920px] mx-auto lg:text-[44px] max-sm:text-[24px]">
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
