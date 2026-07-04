import Link from "next/link";
import Image from "next/image";
import type { CourseDetail } from "@/data/curso";
import { programs } from "@/data/formacion";
import AccentTitle from "@/components/ui/AccentTitle";
import PurchaseCard from "@/components/curso/PurchaseCard";
import LeadForm from "@/components/marketing/LeadForm";

export default function CourseHero({ course }: { course: CourseDetail }) {
  // Categoría (área del catálogo) por slug; fallback a la etiqueta de edición.
  const categoria = programs.find((p) => p.id === course.slug)?.categoria ?? course.editionLabel;
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
          {categoria && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-turquoise-soft text-turquoise-dark rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
              {categoria}
            </div>
          )}
          <h1 className="font-display font-extrabold text-[76px] leading-[0.92] tracking-[-0.025em] uppercase mb-5 md:text-[64px] lg:text-[76px] max-md:text-[48px] max-sm:text-[40px]">
            <AccentTitle title={course.headline} accent={course.headlineAccent} />
          </h1>
          <p className="text-[18px] leading-[1.55] text-ink-soft mb-6 max-sm:text-base">
            {course.summary}
          </p>
          <a
            href="#programa"
            className="inline-flex items-center justify-center bg-turquoise-soft text-turquoise-dark px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[var(--shadow-sm)] mb-8"
          >
            Recibe el programa completo →
          </a>
          <div className="flex items-center gap-4 p-5 bg-bg-soft rounded-[16px]">
            <span className="relative w-14 h-14 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/img/gerardo.jpg"
                alt={course.instructor.name}
                fill
                sizes="56px"
                className="object-cover object-[50%_16%]"
              />
            </span>
            <div>
              <div className="font-mono text-[10px] text-ink-muted tracking-[0.04em] uppercase mb-1">
                Imparte
              </div>
              <div className="text-[17px] font-bold">{course.instructor.name}</div>
              <div className="text-[13px] text-ink-muted mt-0.5">
                {course.instructor.tagline || course.instructor.bio}
              </div>
            </div>
          </div>
        </div>

        {course.defaultEditionId ? <PurchaseCard course={course} /> : <ComingSoonCard slug={course.slug} />}
      </div>
    </>
  );
}

/**
 * Tarjeta cuando no hay edición abierta a la venta: informativa + captura de
 * lista de espera (Lead `lista-espera`).
 */
function ComingSoonCard({ slug }: { slug: string }) {
  return (
    <aside className="bg-white border-2 border-ink rounded-3xl p-8 sticky top-[100px] self-start shadow-[var(--shadow-md)] max-lg:static max-sm:p-6">
      <div className="inline-flex items-center gap-2 bg-yellow-soft text-[#9a7b15] px-3 py-[5px] rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-[22px]">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow" />
        <span>Próximamente</span>
      </div>
      <div className="font-display font-extrabold text-[34px] leading-[0.95] tracking-[-0.02em] uppercase mb-3">
        Acceso prioritario
      </div>
      <p className="text-[15px] leading-[1.55] text-ink-soft mb-6">
        Aún no hay convocatoria abierta para este programa. Déjanos tus datos y te avisamos antes
        que nadie cuando abra la próxima edición.
      </p>
      <LeadForm
        type="lista-espera"
        fields={["name", "municipio"]}
        courseSlug={slug}
        submitLabel="Avísame →"
        successMessage="¡Hecho! Te avisaremos cuando abra la edición."
      />
    </aside>
  );
}
