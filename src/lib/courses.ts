import { getPayloadClient } from "@/lib/payload";
import type { CourseDetail, Lesson, Module } from "@/data/curso";

export type CatalogCard = {
  slug: string;
  id: string;
  status: "open" | "soon";
  statusLabel: string;
  title: string;
  accent: string;
  desc: string;
  attrs: [string, string][];
  price: string;
  priceNote: string;
  href: string;
};

export type MediaDoc = { url?: string | null; alt?: string | null };
type LessonDoc = {
  id?: string;
  title: string;
  description?: string;
  kind?: string;
  durationLabel?: string;
  content?: unknown; // estado Lexical (lecciones de texto)
  image?: MediaDoc | string | null;
  material?: (MediaDoc & { filename?: string | null }) | string | null;
  liveDate?: string | null;
  teamsLink?: string | null;
};

export type Announcement = { date?: string | null; title: string; body: string };
export type { LessonDoc };
export type ModuleDoc = { num?: string; name: string; infoLabel?: string; lessons?: LessonDoc[] };
export type CourseDoc = {
  slug: string;
  title: string;
  accent?: string;
  headline?: string;
  headlineAccent?: string;
  edition?: string;
  summary: string;
  priceCents: number;
  oldPriceCents?: number | null;
  priceNote?: string;
  status: "open" | "soon";
  statusLabel?: string;
  startLabel?: string;
  durationLabel?: string;
  seatsLabel?: string;
  levelLabel?: string;
  instructor?: { name?: string; bio?: string };
  feats?: { feature: string }[];
  teams?: { title?: string; desc?: string };
  modules?: ModuleDoc[];
  forYes?: { title?: string; items?: { item: string }[] };
  forNo?: { title?: string; items?: { item: string }[] };
  faq?: { question: string; answer: string }[];
  announcements?: Announcement[];
};

const euros = (cents: number) => `${Math.round(cents / 100).toLocaleString("es-ES")}€`;

function moduleInfo(m: ModuleDoc): string {
  if (m.infoLabel) return m.infoLabel;
  const n = m.lessons?.length ?? 0;
  return n ? `${n} ${n === 1 ? "LECCIÓN" : "LECCIONES"}` : "PRÓXIMAMENTE";
}

export function toCourseDetail(doc: CourseDoc): CourseDetail {
  return {
    slug: doc.slug,
    edition: doc.edition ?? "",
    title: doc.title,
    accent: doc.accent ?? "",
    headline: doc.headline || doc.title,
    headlineAccent: doc.headlineAccent || doc.accent || "",
    summary: doc.summary,
    instructor: { name: doc.instructor?.name ?? "", bio: doc.instructor?.bio ?? "" },
    statusLabel: doc.statusLabel ?? "",
    price: euros(doc.priceCents),
    oldPrice: doc.oldPriceCents ? euros(doc.oldPriceCents) : undefined,
    priceNote: doc.priceNote ?? "IVA inc.",
    feats: (doc.feats ?? []).map((f) => f.feature),
    teams: { title: doc.teams?.title ?? "", desc: doc.teams?.desc ?? "" },
    modules: (doc.modules ?? []).map(
      (m): Module => ({
        num: m.num ?? "",
        name: m.name,
        info: moduleInfo(m),
        lessons: (m.lessons ?? []).map(
          (l): Lesson => {
            const material =
              l.material && typeof l.material === "object" ? l.material : null;
            return {
              id: String(l.id ?? ""),
              kind: (l.kind as Lesson["kind"]) ?? "video",
              title: l.title,
              time: l.durationLabel ?? "",
              description: l.description ?? "",
              materialUrl: material?.url ?? undefined,
              materialName: material?.filename ?? undefined,
            };
          },
        ),
      }),
    ),
    forYes: { title: doc.forYes?.title ?? "", items: (doc.forYes?.items ?? []).map((i) => i.item) },
    forNo: { title: doc.forNo?.title ?? "", items: (doc.forNo?.items ?? []).map((i) => i.item) },
    faq: (doc.faq ?? []).map((f) => ({ q: f.question, a: f.answer })),
  };
}

export function toCatalogCard(doc: CourseDoc): CatalogCard {
  return {
    slug: doc.slug,
    id: doc.edition ?? "",
    status: doc.status,
    statusLabel: doc.statusLabel ?? "",
    title: doc.title,
    accent: doc.accent ?? "",
    desc: doc.summary,
    attrs: [
      ["Inicio", doc.startLabel ?? "—"],
      ["Duración", doc.durationLabel ?? "—"],
      ["Plazas", doc.seatsLabel ?? "—"],
      ["Nivel", doc.levelLabel ?? "—"],
    ],
    price: euros(doc.priceCents),
    priceNote: " / pago único",
    href: `/curso/${doc.slug}`,
  };
}

/** Documento crudo del curso (con uploads poblados) para renderizar el texto. */
export async function getCourseDocBySlug(slug: string): Promise<CourseDoc | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "courses",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1, // pobla imágenes/uploads (incl. dentro del texto enriquecido)
  });
  return (res.docs[0] as unknown as CourseDoc | undefined) ?? null;
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const doc = await getCourseDocBySlug(slug);
  return doc ? toCourseDetail(doc) : null;
}

export type LiveSession = { title: string; date: string; teamsLink?: string };
export type CourseMaterial = { lessonTitle: string; url: string; filename: string };

/** Próxima sesión en directo del curso (la más cercana en el futuro), o null. */
export function nextLiveSession(doc: CourseDoc, now = Date.now()): LiveSession | null {
  const sessions = (doc.modules ?? [])
    .flatMap((m) => m.lessons ?? [])
    .filter((l) => l.kind === "live" && l.liveDate)
    .map((l) => ({ title: l.title, date: l.liveDate as string, teamsLink: l.teamsLink ?? undefined }))
    .filter((s) => new Date(s.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return sessions[0] ?? null;
}

/** Todos los materiales descargables del curso. */
export function courseMaterials(doc: CourseDoc): CourseMaterial[] {
  const out: CourseMaterial[] = [];
  for (const m of doc.modules ?? []) {
    for (const l of m.lessons ?? []) {
      const mat = l.material && typeof l.material === "object" ? l.material : null;
      if (mat?.url) out.push({ lessonTitle: l.title, url: mat.url, filename: mat.filename ?? "archivo" });
    }
  }
  return out;
}

export function courseAnnouncements(doc: CourseDoc): Announcement[] {
  return [...(doc.announcements ?? [])].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
  );
}

export async function getCatalogCourses(): Promise<CatalogCard[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "courses",
    where: { published: { equals: true } },
    sort: "edition",
    limit: 50,
    depth: 0,
  });
  return (res.docs as unknown as CourseDoc[]).map(toCatalogCard);
}

export type EnrolledCourse = {
  enrollmentId: string;
  slug: string;
  title: string;
  edition: string;
  status: "open" | "soon";
  totalLessons: number;
  completed: number;
  progress: number; // 0-100
  completedLessons: string[];
};

function countLessons(modules: ModuleDoc[] = []): number {
  return modules.reduce((n, m) => n + (m.lessons?.length ?? 0), 0);
}

/** Cursos en los que el alumno está inscrito, con su progreso. */
export async function getStudentCourses(studentId: string): Promise<EnrolledCourse[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "enrollments",
    where: { student: { equals: studentId }, status: { equals: "active" } },
    depth: 1,
    limit: 50,
  });
  return res.docs
    .map((e): EnrolledCourse | null => {
      const course = e.course as unknown as CourseDoc | string | null;
      if (!course || typeof course === "string") return null;
      const total = countLessons(course.modules);
      const completedLessons = Array.isArray(e.completedLessons)
        ? (e.completedLessons as unknown[]).map(String)
        : [];
      const completed = completedLessons.length;
      return {
        enrollmentId: String(e.id),
        slug: course.slug,
        title: course.title,
        edition: course.edition ?? "",
        status: course.status,
        totalLessons: total,
        completed,
        progress: total ? Math.round((completed / total) * 100) : 0,
        completedLessons,
      };
    })
    .filter((c): c is EnrolledCourse => c !== null);
}

/** ¿El alumno está inscrito en este curso (por slug)? */
export async function isEnrolled(studentId: string, slug: string): Promise<boolean> {
  const courses = await getStudentCourses(studentId);
  return courses.some((c) => c.slug === slug);
}
