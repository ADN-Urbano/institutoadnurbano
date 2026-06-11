import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCurrentStudent } from "@/lib/session";
import {
  getCourseDocBySlug,
  toCourseDetail,
  getStudentCourses,
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
  const course = toCourseDetail(doc);

  const articles: Record<string, ReactNode> = {};
  for (const m of doc.modules ?? []) {
    for (const l of m.lessons ?? []) {
      if (l.kind === "text" && l.id) articles[String(l.id)] = <LessonArticle lesson={l} />;
    }
  }

  const session = nextLiveSession(doc);
  const announcements = courseAnnouncements(doc);
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
