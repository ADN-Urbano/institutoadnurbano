import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { header } from "@/data/formacion";
import { getCatalogCourses } from "@/lib/courses";
import Method from "@/components/formacion/Method";
import Courses from "@/components/formacion/Courses";
import Testimonial from "@/components/formacion/Testimonial";

// Revalida el catálogo (ISR): cambios en /admin se reflejan en ≤60s sin redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Formación · Instituto ADN Local",
  description:
    "Programas para concejales, técnicos municipales y consultores: teoría pregrabada a tu ritmo y sesiones en directo por Teams con tutorización. Casos reales y comunidad activa.",
};

export default async function FormacionPage() {
  const courses = await getCatalogCourses();
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        accent={header.accent}
        summary={header.summary}
        stats={header.stats}
      />
      <Method />
      <Courses courses={courses} />
      <Testimonial />
    </main>
  );
}
