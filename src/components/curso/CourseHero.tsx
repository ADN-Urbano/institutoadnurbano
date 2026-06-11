import Link from "next/link";
import type { CourseDetail } from "@/data/curso";
import AccentTitle from "@/components/ui/AccentTitle";
import PurchaseCard from "@/components/curso/PurchaseCard";

export default function CourseHero({ course }: { course: CourseDetail }) {
  return (
    <>
      <div className="font-mono text-xs text-ink-muted mb-6 tracking-[0.04em] uppercase">
        <Link href="/" className="transition-colors hover:text-turquoise">
          Inicio
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <Link href="/formacion" className="transition-colors hover:text-turquoise">
          Formación
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span>{course.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-14 pb-16 mb-14 border-b border-rule lg:grid-cols-[1.4fr_1fr] max-lg:gap-10 max-sm:pb-10 max-sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-turquoise-soft text-turquoise-dark rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
            {course.edition}
          </div>
          <h1 className="font-display font-extrabold text-[76px] leading-[0.92] tracking-[-0.025em] uppercase mb-5 md:text-[64px] lg:text-[76px] max-md:text-[48px] max-sm:text-[40px]">
            <AccentTitle title={course.headline} accent={course.headlineAccent} />
          </h1>
          <p className="text-[18px] leading-[1.55] text-ink-soft mb-8 max-sm:text-base">
            {course.summary}
          </p>
          <div className="flex items-center gap-4 p-5 bg-bg-soft rounded-[16px]">
            <span className="w-14 h-14 rounded-full shrink-0 bg-[linear-gradient(135deg,var(--color-turquoise),var(--color-turquoise-dark))]" />
            <div>
              <div className="font-mono text-[10px] text-ink-muted tracking-[0.04em] uppercase mb-1">
                Imparte
              </div>
              <div className="text-[17px] font-bold">{course.instructor.name}</div>
              <div className="text-[13px] text-ink-muted mt-0.5">{course.instructor.bio}</div>
            </div>
          </div>
        </div>

        <PurchaseCard course={course} />
      </div>
    </>
  );
}
