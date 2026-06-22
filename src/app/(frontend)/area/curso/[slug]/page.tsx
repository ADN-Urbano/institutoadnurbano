import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCurrentStudent } from "@/lib/session";
import {
  getCourseDocBySlug,
  toCourseDetail,
  getStudentCourses,
  getEditionById,
  nextLiveSession,
  courseMaterials,
  courseAnnouncements,
} from "@/lib/courses";
import Classroom from "@/components/area/Classroom";
import LessonArticle from "@/components/area/LessonArticle";
import NextSession from "@/components/area/NextSession";
import Announcements from "@/components/area/Announcements";
import Onboarding from "@/components/area/Onboarding";
import CourseResources from "@/components/area/CourseResources";

export const metadata: Metadata = { title: "Curso · Tu área · ADN Local" };
export const dynamic = "force-dynamic";

const SLACK_URL = process.env.SLACK_INVITE_URL || "#";

const pendingDateFmt = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Madrid",
});

/** Días naturales que faltan hasta `startDate` (>= 0); null si la fecha no es válida. */
function daysUntil(startDate: string | null): number | null {
  if (!startDate) return null;
  const ms = new Date(startDate).getTime();
  if (Number.isNaN(ms)) return null;
  return Math.max(0, Math.ceil((ms - Date.now()) / 86_400_000));
}

export default async function AreaCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const student = await getCurrentStudent();
  if (!student) redirect("/acceder");

  const enrolled = await getStudentCourses(String(student.id));
  const mine = enrolled.find((c) => c.slug === slug);
  if (!mine) redirect("/area");

  const doc = await getCourseDocBySlug(slug);
  if (!doc) notFound();

  // Edición comprada (la del cohorte): de aquí salen directos y anuncios.
  const edition = mine.editionId ? await getEditionById(mine.editionId) : null;
  const course = toCourseDetail(doc, edition);
  const announcements = courseAnnouncements(edition);

  // Gate de acceso (server-side): si la edición aún no empezó → pantalla de espera.
  if (mine.accessState === "pending") {
    const days = daysUntil(mine.startDate);
    const dateLabel = mine.startDate
      ? (() => {
          const r = pendingDateFmt.format(new Date(mine.startDate));
          return r.charAt(0).toUpperCase() + r.slice(1);
        })()
      : "—";
    return (
      <main className="max-w-[1320px] mx-auto px-8 pt-10 pb-24 max-sm:px-5">
        <div className="font-mono text-xs text-ink-muted mb-5 tracking-[0.04em] uppercase">
          <Link href="/area" className="transition-colors hover:text-turquoise">
            Tu área
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span>{course.title}</span>
        </div>

        <h1 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.025em] uppercase mb-8 max-sm:text-[30px]">
          {course.headline}
        </h1>

        <section className="rounded-2xl bg-turquoise text-white p-8 mb-8 overflow-hidden max-sm:p-6">
          <div className="font-mono text-[11px] font-medium tracking-[0.06em] uppercase text-yellow mb-3">
            ·· Plaza confirmada
          </div>
          <div className="font-display font-extrabold text-[34px] leading-[0.95] tracking-[-0.02em] uppercase mb-3 max-sm:text-[26px]">
            Tu plaza está reservada
          </div>
          <p className="text-[15px] leading-[1.6] opacity-95 max-w-[640px] mb-6">
            El curso aún no ha empezado. El acceso al contenido y a las clases en directo se abrirá
            el día de inicio. Te avisaremos por email; mientras tanto, puedes unirte a la comunidad
            de Slack.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-xl bg-white/10 px-5 py-4">
              <div className="font-mono text-[10px] tracking-[0.06em] uppercase opacity-80 mb-1">
                Acceso desde
              </div>
              <div className="text-[17px] font-bold leading-tight">{dateLabel} (CET)</div>
            </div>
            {days !== null && (
              <div className="rounded-xl bg-white/10 px-5 py-4">
                <div className="font-mono text-[10px] tracking-[0.06em] uppercase opacity-80 mb-1">
                  Cuenta atrás
                </div>
                <div className="text-[17px] font-bold leading-tight">
                  {days === 0 ? "Empieza hoy" : `Faltan ${days} día${days > 1 ? "s" : ""}`}
                </div>
              </div>
            )}
          </div>
        </section>

        <Onboarding slug={slug} slackUrl={SLACK_URL} />
        <Announcements items={announcements} />
      </main>
    );
  }

  const articles: Record<string, ReactNode> = {};
  for (const m of doc.modules ?? []) {
    for (const l of m.lessons ?? []) {
      if (l.kind === "text" && l.id) articles[String(l.id)] = <LessonArticle lesson={l} />;
    }
  }

  const session = nextLiveSession(edition);
  const materials = courseMaterials(doc);

  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-10 pb-24 max-sm:px-5">
      <div className="font-mono text-xs text-ink-muted mb-5 tracking-[0.04em] uppercase">
        <Link href="/area" className="transition-colors hover:text-turquoise">
          Tu área
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span>{course.title}</span>
      </div>

      <h1 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.025em] uppercase mb-8 max-sm:text-[30px]">
        {course.headline}
      </h1>

      <Onboarding slug={slug} slackUrl={SLACK_URL} />
      {session && <NextSession session={session} />}
      <Announcements items={announcements} />

      <Classroom
        course={course}
        enrollmentId={mine.enrollmentId}
        initialCompleted={mine.completedLessons}
        articles={articles}
      />

      <CourseResources materials={materials} />
    </main>
  );
}
