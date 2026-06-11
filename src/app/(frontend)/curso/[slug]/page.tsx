import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";
import CourseHero from "@/components/curso/CourseHero";
import TeamsBox from "@/components/curso/TeamsBox";
import Curriculum from "@/components/curso/Curriculum";
import ForYou from "@/components/curso/ForYou";
import Faq from "@/components/curso/Faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Curso no encontrado · ADN Local" };
  return {
    title: `${course.title} · Instituto ADN Local`,
    description: course.summary,
  };
}

export default async function CursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <CourseHero course={course} />
      <TeamsBox teams={course.teams} />
      <Curriculum course={course} />
      <ForYou forYes={course.forYes} forNo={course.forNo} />
      <Faq faq={course.faq} />
    </main>
  );
}
