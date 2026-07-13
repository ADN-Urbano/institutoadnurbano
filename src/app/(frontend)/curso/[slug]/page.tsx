import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getCourseWithEdition, toCourseDetail } from "@/lib/courses";
import CourseHero from "@/components/curso/CourseHero";
import VideoIntro from "@/components/curso/VideoIntro";
import TeamsBox from "@/components/curso/TeamsBox";
import Curriculum from "@/components/curso/Curriculum";
import ForYou from "@/components/curso/ForYou";
import Outcomes from "@/components/curso/Outcomes";
import Instructor from "@/components/curso/Instructor";
import Faq from "@/components/curso/Faq";
import InfoContact from "@/components/curso/InfoContact";
import ProgramaCta from "@/components/curso/ProgramaCta";
import CourseCta from "@/components/curso/CourseCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Curso no encontrado · ADN Local" };
  return {
    title: `${course.title} · ADN Local`,
    description: course.summary,
  };
}

export default async function CursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await getCourseWithEdition(slug);
  if (!found) notFound();
  const course = toCourseDetail(found.course, found.edition, found.editions);

  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      {/* 1 + 2 · Hero + tarjeta de compra (roadmap de ediciones) */}
      <CourseHero course={course} />
      {/* 3 · Vídeo presentación */}
      <VideoIntro videoIntro={course.videoIntro} courseSlug={course.slug} />
      {/* 4 · Clases en directo por Teams */}
      <TeamsBox teams={course.teams} />
      {/* 5 · Programa (acordeón) */}
      <Curriculum course={course} />
      {/* 5b · Recibe el programa completo (descarga-pdf) */}
      <ProgramaCta courseSlug={course.slug} />
      {/* 6 · Es / No es para ti */}
      <ForYou forYes={course.forYes} forNo={course.forNo} />
      {/* 7 · Al terminar tendrás listo */}
      <Outcomes outcomes={course.outcomes} />
      {/* 8 · Quién te acompaña */}
      <Instructor instructor={course.instructor} />
      {/* 9 · FAQ */}
      <Faq faq={course.faq} />
      {/* 10 · ¿Necesitas más información? (form → Lead) */}
      <InfoContact courseSlug={course.slug} />
      {/* 12 · CTA final (Reservar mi plaza → checkout) */}
      <CourseCta course={course} />
    </main>
  );
}
