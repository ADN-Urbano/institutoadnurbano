import type { CourseDetail } from "@/data/curso";

/** CTA final del curso: bloque turquesa con título + plazas. Botón presentacional (Fase 2). */
export default function CourseCta({ finalCta }: { finalCta: CourseDetail["finalCta"] }) {
  if (!finalCta.title && !finalCta.desc) return null;
  return (
    <section className="relative overflow-hidden bg-turquoise text-white rounded-[28px] px-12 py-16 mb-8 grid grid-cols-2 gap-12 items-center max-lg:grid-cols-1 max-lg:gap-10 max-sm:px-6 max-sm:py-10">
      <span
        aria-hidden
        className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-white/[0.08]"
      />
      <div className="relative z-[1]">
        <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-5 text-white max-lg:text-[40px] max-sm:text-[32px]">
          {finalCta.title}
        </h2>
        <p className="text-base leading-[1.6] text-white/90 max-w-[46ch]">{finalCta.desc}</p>
      </div>

      <div className="relative z-[1] bg-white/[0.08] rounded-2xl p-8 max-sm:p-6">
        <div className="font-display font-extrabold text-[24px] tracking-[-0.01em] uppercase mb-3">
          {finalCta.seatsTitle}
        </div>
        <p className="text-[15px] leading-[1.55] text-white/85 mb-6">{finalCta.seatsDesc}</p>
        <a
          href="#"
          className="group bg-ink text-white px-6 py-4 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-3 transition-all hover:bg-turquoise-deep hover:-translate-y-px"
        >
          {finalCta.cta} →
        </a>
      </div>
    </section>
  );
}
