import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentStudent } from "@/lib/session";
import { getStudentCourses } from "@/lib/courses";
import { ArrowRight } from "@/components/ui/icons";
import SlackCard from "@/components/area/SlackCard";

export const metadata: Metadata = { title: "Tu área · ADN Local" };
export const dynamic = "force-dynamic";

const SLACK_URL = process.env.SLACK_INVITE_URL || "#";

const accessDateFmt = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Madrid",
});

export default async function AreaPage() {
  const student = await getCurrentStudent();
  if (!student) redirect("/acceder");

  const courses = await getStudentCourses(String(student.id));
  const name = (student.name as string) || (student.email as string);

  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <header className="flex items-end justify-between gap-6 pb-8 mb-10 border-b border-rule max-sm:flex-col max-sm:items-start max-sm:gap-3">
        <div>
          <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-2.5">
            ·· Tu área
          </div>
          <h1 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase max-lg:text-[40px] max-sm:text-[34px]">
            Hola, <span className="text-turquoise">{name}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/area/cuenta" className="text-sm font-medium text-ink-soft hover:text-ink">
            Mi cuenta
          </Link>
          <Link
            href="/api/auth/logout"
            className="text-sm font-medium text-ink-muted hover:text-ink"
          >
            Cerrar sesión
          </Link>
        </div>
      </header>

      <h2 className="font-mono text-[11px] font-medium text-ink-soft tracking-[0.06em] uppercase mb-5">
        Tus cursos
      </h2>

      {courses.length === 0 ? (
        <div className="border border-rule rounded-3xl p-10 text-center">
          <p className="text-[17px] text-ink mb-2">Aún no tienes cursos.</p>
          <p className="text-sm text-ink-muted mb-6">
            Cuando te inscribas en un programa, aparecerá aquí con tu progreso.
          </p>
          <Link
            href="/formacion"
            className="inline-flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-turquoise"
          >
            Ver formación
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={`/area/curso/${c.slug}`}
              className="group bg-white border border-rule rounded-3xl p-8 flex flex-col transition-all hover:border-turquoise hover:-translate-y-[3px] hover:shadow-[var(--shadow-lg)] max-sm:p-6"
            >
              <div className="font-mono text-[11px] font-medium text-ink-muted tracking-[0.04em] uppercase mb-3">
                {c.editionLabel}
              </div>
              <h3 className="font-display font-extrabold text-[30px] leading-[0.95] tracking-[-0.02em] uppercase mb-6">
                {c.title}
              </h3>

              <div className="mt-auto">
                {c.accessState === "pending" ? (
                  <>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow" />
                      <span>Plaza confirmada</span>
                    </div>
                    <div className="text-sm text-ink-soft">
                      Acceso desde el{" "}
                      <strong className="text-ink">
                        {c.startDate ? accessDateFmt.format(new Date(c.startDate)) : "—"}
                      </strong>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-turquoise group-hover:gap-3 transition-all">
                      Ver detalles
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase mb-2">
                      <span>Progreso</span>
                      <span>
                        {c.completed}/{c.totalLessons} · {c.progress}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-bg-soft overflow-hidden">
                      <div
                        className="h-full bg-turquoise rounded-full transition-all"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-turquoise group-hover:gap-3 transition-all">
                      {c.progress > 0 ? "Continuar" : "Empezar"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <SlackCard url={SLACK_URL} />
      </div>
    </main>
  );
}
