import Image from "next/image";
import type { CourseDetail } from "@/data/curso";

/** "Quién te acompaña": foto del profesor + bio larga + especialidades. */
export default function Instructor({ instructor }: { instructor: CourseDetail["instructor"] }) {
  return (
    <section className="mb-20">
      <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-2.5">
        ·· El equipo
      </div>
      <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-8 max-lg:text-[40px] max-sm:text-[34px]">
        <span className="text-turquoise">Quién</span> te acompaña
      </h2>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] max-lg:gap-8">
        <div>
          {/* Foto del profesor: placeholder con degradado mientras no se sube */}
          {instructor.photoUrl ? (
            <Image
              src={instructor.photoUrl}
              alt={instructor.name}
              width={320}
              height={380}
              className="w-full aspect-[4/5] object-cover rounded-3xl"
            />
          ) : (
            <div className="w-full aspect-[4/5] rounded-3xl bg-[linear-gradient(135deg,var(--color-turquoise),var(--color-turquoise-deep))]" />
          )}
          <div className="mt-4">
            <div className="text-[20px] font-bold">{instructor.name}</div>
            {instructor.experienceLabel && (
              <div className="font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase mt-1">
                {instructor.experienceLabel}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4 mb-8">
            {instructor.longBio.map((para, i) => (
              <p key={i} className="text-[16px] leading-[1.6] text-ink-soft">
                {para}
              </p>
            ))}
          </div>

          {instructor.specialties.length > 0 && (
            <div className="bg-bg-soft rounded-2xl p-6">
              <div className="font-mono text-[11px] font-medium text-ink-muted tracking-[0.04em] uppercase mb-3.5">
                Especialidades
              </div>
              <ul className="list-none flex flex-col gap-2.5">
                {instructor.specialties.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] leading-[1.5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-turquoise shrink-0 mt-2" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
