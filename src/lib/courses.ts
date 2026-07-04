import { getPayloadClient } from "@/lib/payload";
import type { CourseDetail, CourseInstructor, Lesson, Module, PriceTier, PriceTone } from "@/data/curso";

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
};

export type Announcement = { date?: string | null; title: string; body: string };
export type { LessonDoc };
export type ModuleDoc = {
  num?: string;
  name: string;
  infoLabel?: string;
  description?: string;
  lessons?: LessonDoc[];
};

/** Instructor (group) ampliado para la landing. */
export type InstructorDoc = {
  name?: string;
  bio?: string;
  tagline?: string;
  photo?: MediaDoc | string | null;
  experienceLabel?: string;
  longBio?: { paragraph: string }[];
  specialties?: { item: string }[];
};

/** Curso: solo contenido permanente. El precio/estado/fechas viven en CourseEditions. */
export type CourseDoc = {
  slug: string;
  title: string;
  accent?: string;
  headline?: string;
  headlineAccent?: string;
  summary: string;
  durationLabel?: string;
  levelLabel?: string;
  instructor?: InstructorDoc;
  feats?: { feature: string }[];
  teams?: { title?: string; desc?: string };
  videoIntro?: { title?: string; desc?: string; label?: string };
  modules?: ModuleDoc[];
  forYes?: { title?: string; items?: { item: string }[] };
  forNo?: { title?: string; items?: { item: string }[] };
  outcomes?: { item: string }[];
  programPdfLabel?: string;
  faq?: { question: string; answer: string }[];
  webinar?: { desc?: string; nextSessionLabel?: string; durationLabel?: string; cta?: string };
  finalCta?: {
    title?: string;
    desc?: string;
    seatsTitle?: string;
    seatsDesc?: string;
    cta?: string;
  };
};

export type EditionStatus = "soon" | "open" | "running" | "past";

export type EditionLiveSession = { title: string; date: string; teamsLink?: string | null };

/** Edición (convocatoria) de un curso: todo lo que varía por cohorte. */
export type EditionDoc = {
  id?: string | number;
  course?: CourseDoc | string | number | null;
  editionLabel?: string;
  status: EditionStatus;
  statusLabel?: string;
  priceCents: number;
  oldPriceCents?: number | null;
  priceNote?: string;
  discountLabel?: string | null;
  startDate: string;
  endDate?: string | null;
  startLabel?: string;
  seatsLabel?: string;
  liveSessions?: EditionLiveSession[];
  announcements?: Announcement[];
};

export type AccessState = "pending" | "active";

/**
 * Estado de acceso del alumno según la fecha de inicio de la edición. Gate de
 * solo límite inferior: una vez alcanzada `startDate`, el acceso es de por vida.
 * Una ISO inválida produce `NaN` → tratado como `pending` (sin acceso).
 */
export function computeAccessState(startDate: string, now: number = Date.now()): AccessState {
  return new Date(startDate).getTime() <= now ? "active" : "pending";
}

/** Mapea el estado de la edición al estado binario que consume el catálogo. */
function catalogStatus(status: EditionStatus): "open" | "soon" {
  return status === "open" ? "open" : "soon";
}

const euros = (cents: number) => `${Math.round(cents / 100).toLocaleString("es-ES")}€`;

function moduleInfo(m: ModuleDoc): string {
  if (m.infoLabel) return m.infoLabel;
  const n = m.lessons?.length ?? 0;
  return n ? `${n} ${n === 1 ? "LECCIÓN" : "LECCIONES"}` : "PRÓXIMAMENTE";
}

/** Tono y etiqueta del tramo según su posición en el roadmap (1ª/2ª/3ª+). */
const tierTones: PriceTone[] = ["turquoise", "amber", "ink"];
const tierLabels = ["Primera edición", "Segunda edición", "A partir de la tercera edición"];

/** Descuento mostrado en un tramo: explícito en la edición o derivado de los precios. */
function tierDiscount(edition: EditionDoc): string | undefined {
  if (edition.discountLabel) return edition.discountLabel;
  if (edition.oldPriceCents && edition.oldPriceCents > edition.priceCents) {
    const pct = Math.round((1 - edition.priceCents / edition.oldPriceCents) * 100);
    return pct > 0 ? `-${pct}%` : undefined;
  }
  return undefined;
}

/**
 * Roadmap de precios de la tarjeta de compra: solo las ediciones COMPRABLES del
 * curso (ordenadas por fecha), como tramos seleccionables. 1ª = turquoise, 2ª =
 * amber, 3ª+ = ink. Marca `isDefault` en la edición preseleccionada (la `open`,
 * o la comprable más próxima). Las ediciones running/past no aparecen.
 */
/** Quita el prefijo "Curso NN · " de una etiqueta de edición (dato de Payload). */
export function editionLabelClean(label: string): string {
  return label.replace(/^\s*curso\s+\d+\s*·\s*/i, "").trim();
}

/** "Comienza el 29 de julio" a partir del startDate de la edición (o undefined). */
export function startLabel(startDate?: string | null): string | undefined {
  if (!startDate) return undefined;
  const d = new Date(startDate);
  if (Number.isNaN(d.getTime())) return undefined;
  return `Comienza el ${d.toLocaleDateString("es-ES", { day: "numeric", month: "long" })}`;
}

export function toPriceTiers(editions: EditionDoc[], now: number = Date.now()): PriceTier[] {
  const purchasable = editions.filter((e) => isPurchasableEdition(e, now));
  const defaultEdition = defaultPurchasableEdition(purchasable, now);
  return purchasable.map((edition, i): PriceTier => {
    const tone = tierTones[Math.min(i, tierTones.length - 1)];
    const label = tierLabels[Math.min(i, tierLabels.length - 1)];
    return {
      editionId: edition.id != null ? String(edition.id) : "",
      label,
      discount: tierDiscount(edition),
      oldPrice: edition.oldPriceCents ? euros(edition.oldPriceCents) : undefined,
      price: euros(edition.priceCents),
      editionLabel: editionLabelClean(edition.editionLabel ?? ""),
      startLabel: startLabel(edition.startDate),
      tone,
      purchasable: true,
      isDefault: defaultEdition != null && edition === defaultEdition,
    };
  });
}

/** Instructor ampliado para la landing (fallbacks a cadena vacía / arrays vacíos). */
function toInstructor(doc: CourseDoc): CourseInstructor {
  const ins = doc.instructor;
  const photo = ins?.photo && typeof ins.photo === "object" ? ins.photo : null;
  return {
    name: ins?.name ?? "",
    bio: ins?.bio ?? "",
    tagline: ins?.tagline ?? "",
    photoUrl: photo?.url ?? undefined,
    experienceLabel: ins?.experienceLabel ?? "",
    longBio: (ins?.longBio ?? []).map((b) => b.paragraph),
    specialties: (ins?.specialties ?? []).map((s) => s.item),
  };
}

/**
 * Construye el detalle de la landing. Precio/estado/fechas vienen de la edición
 * (si la hay); duración/nivel y todo el contenido vienen del curso. Sin edición
 * → estado "Próximamente" sin precio comprable (la PurchaseCard lo refleja).
 */
export function toCourseDetail(
  doc: CourseDoc,
  edition: EditionDoc | null = null,
  editions: EditionDoc[] = [],
  now: number = Date.now(),
): CourseDetail {
  return {
    slug: doc.slug,
    editionLabel: editionLabelClean(edition?.editionLabel ?? ""),
    startDate: edition?.startDate ?? null,
    accessState: edition ? computeAccessState(edition.startDate, now) : "pending",
    hasOpenEdition: edition?.status === "open",
    title: doc.title,
    accent: doc.accent ?? "",
    headline: doc.headline || doc.title,
    headlineAccent: doc.headlineAccent || doc.accent || "",
    summary: doc.summary,
    instructor: toInstructor(doc),
    statusLabel: edition?.statusLabel ?? "",
    price: edition ? euros(edition.priceCents) : "",
    oldPrice: edition?.oldPriceCents ? euros(edition.oldPriceCents) : undefined,
    priceNote: edition?.priceNote ?? "IVA inc.",
    priceTiers: toPriceTiers(editions, now),
    defaultEditionId: (() => {
      const def = defaultPurchasableEdition(editions, now);
      return def?.id != null ? String(def.id) : null;
    })(),
    feats: (doc.feats ?? []).map((f) => f.feature),
    teams: { title: doc.teams?.title ?? "", desc: doc.teams?.desc ?? "" },
    videoIntro: {
      title: doc.videoIntro?.title ?? "Descubre más sobre el programa",
      desc: doc.videoIntro?.desc ?? "",
      label: doc.videoIntro?.label ?? "Vídeo presentación curso",
    },
    modules: (doc.modules ?? []).map(
      (m): Module => ({
        num: m.num ?? "",
        name: m.name,
        info: moduleInfo(m),
        description: m.description ?? "",
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
    outcomes: (doc.outcomes ?? []).map((o) => o.item),
    programPdfLabel: doc.programPdfLabel ?? "Descargar programa completo PDF",
    faq: (doc.faq ?? []).map((f) => ({ q: f.question, a: f.answer })),
    webinar: {
      desc: doc.webinar?.desc ?? "",
      nextSessionLabel: doc.webinar?.nextSessionLabel ?? "",
      durationLabel: doc.webinar?.durationLabel ?? "45 minutos",
      cta: doc.webinar?.cta ?? "Reservar mi plaza en el webinar",
    },
    finalCta: {
      title: doc.finalCta?.title ?? "",
      desc: doc.finalCta?.desc ?? "",
      seatsTitle: doc.finalCta?.seatsTitle ?? "Solo 30 plazas disponibles",
      seatsDesc: doc.finalCta?.seatsDesc ?? "",
      cta: doc.finalCta?.cta ?? "Reservar mi plaza",
    },
  };
}

/** Tarjeta de catálogo: precio/estado/fechas de la edición; duración/nivel del curso. */
export function toCatalogCard(doc: CourseDoc, edition: EditionDoc): CatalogCard {
  return {
    slug: doc.slug,
    id: edition.editionLabel ?? "",
    status: catalogStatus(edition.status),
    statusLabel: edition.statusLabel ?? "",
    title: doc.title,
    accent: doc.accent ?? "",
    desc: doc.summary,
    attrs: [
      ["Inicio", edition.startLabel ?? "—"],
      ["Duración", doc.durationLabel ?? "—"],
      ["Plazas", edition.seatsLabel ?? "—"],
      ["Nivel", doc.levelLabel ?? "—"],
    ],
    price: euros(edition.priceCents),
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

/** Todas las ediciones de un curso, ordenadas por fecha de inicio (asc). */
export async function getCourseEditions(courseId: string | number): Promise<EditionDoc[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "course-editions",
    where: {
      course: { equals: courseId },
      status: { in: ["open", "soon", "running", "past"] },
    },
    sort: "startDate",
    limit: 50,
    depth: 0,
  });
  return res.docs as unknown as EditionDoc[];
}

/**
 * Edición vendible/visible de un curso (la abierta tiene prioridad; si no, la
 * próxima por fecha). Devuelve null si el curso no tiene edición activa.
 */
export function pickActiveEdition(editions: EditionDoc[]): EditionDoc | null {
  return editions.find((e) => e.status === "open") ?? editions[0] ?? null;
}

/** Precio mínimo (céntimos) que Stripe acepta y que consideramos válido. */
export const MIN_PRICE_CENTS = 50;

/**
 * ¿Es una edición comprable? = estado open|soon + fecha de inicio en el futuro +
 * precio válido (≥ 50 céntimos). Las ediciones running/past no son comprables.
 */
export function isPurchasableEdition(edition: EditionDoc, now: number = Date.now()): boolean {
  if (edition.status !== "open" && edition.status !== "soon") return false;
  if (new Date(edition.startDate).getTime() <= now) return false;
  return typeof edition.priceCents === "number" && edition.priceCents >= MIN_PRICE_CENTS;
}

/**
 * Edición preseleccionada por defecto: la `open` comprable; si no hay, la
 * comprable más próxima por `startDate`. Asume `editions` ordenadas por fecha.
 */
export function defaultPurchasableEdition(
  editions: EditionDoc[],
  now: number = Date.now(),
): EditionDoc | null {
  const purchasable = editions.filter((e) => isPurchasableEdition(e, now));
  return purchasable.find((e) => e.status === "open") ?? purchasable[0] ?? null;
}

/**
 * Resultado de resolver la edición a comprar. Distingue para que el checkout
 * pueda responder con el código HTTP correcto:
 * - `ok`            → edición válida y comprable (la devuelta).
 * - `not-found`     → el `editionId` no pertenece al curso (→ 404).
 * - `not-purchasable` → existe en el curso pero no es comprable, p. ej. past (→ 409).
 * - `none`          → el curso no tiene ninguna edición comprable (→ 409).
 */
export type ResolveEditionResult =
  | { status: "ok"; edition: EditionDoc }
  | { status: "not-found" }
  | { status: "not-purchasable" }
  | { status: "none" };

/**
 * Resuelve qué edición se compra. Con `editionId`: la devuelve solo si pertenece
 * al curso y es comprable (si no, distingue "no encontrada" de "no comprable").
 * Sin `editionId`: la edición por defecto. Sin comprables: `none`.
 */
export function resolvePurchasableEdition(
  editions: EditionDoc[],
  editionId?: string | number | null,
  now: number = Date.now(),
): ResolveEditionResult {
  if (editionId != null && editionId !== "") {
    const target = editions.find((e) => e.id != null && String(e.id) === String(editionId));
    if (!target) return { status: "not-found" };
    if (!isPurchasableEdition(target, now)) return { status: "not-purchasable" };
    return { status: "ok", edition: target };
  }
  const fallback = defaultPurchasableEdition(editions, now);
  return fallback ? { status: "ok", edition: fallback } : { status: "none" };
}

/**
 * Edición vendible/visible de un curso (la abierta tiene prioridad; si no, la
 * próxima por fecha). Devuelve null si el curso no tiene edición activa.
 */
export async function getActiveEdition(courseId: string | number): Promise<EditionDoc | null> {
  return pickActiveEdition(await getCourseEditions(courseId));
}

/** Edición concreta por id (la edición comprada por el alumno), o null. */
export async function getEditionById(editionId: string | number): Promise<EditionDoc | null> {
  const payload = await getPayloadClient();
  try {
    const doc = await payload.findByID({ collection: "course-editions", id: editionId, depth: 0 });
    return (doc as unknown as EditionDoc) ?? null;
  } catch {
    return null;
  }
}

/**
 * Curso + su edición activa + TODAS sus ediciones (roadmap de precios). Lo usan
 * la landing pública y el área.
 */
export async function getCourseWithEdition(
  slug: string,
): Promise<{ course: CourseDoc; edition: EditionDoc | null; editions: EditionDoc[] } | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "courses",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
  });
  const courseRaw = res.docs[0] as unknown as (CourseDoc & { id: string | number }) | undefined;
  if (!courseRaw) return null;
  const editions = await getCourseEditions(courseRaw.id);
  return { course: courseRaw, edition: pickActiveEdition(editions), editions };
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const found = await getCourseWithEdition(slug);
  return found ? toCourseDetail(found.course, found.edition, found.editions) : null;
}

export type LiveSession = { title: string; date: string; teamsLink?: string };
export type CourseMaterial = { lessonTitle: string; url: string; filename: string };

/** Próxima sesión en directo de la edición (la más cercana en el futuro), o null. */
export function nextLiveSession(edition: EditionDoc | null, now = Date.now()): LiveSession | null {
  const sessions = (edition?.liveSessions ?? [])
    .filter((s) => s.date)
    .map((s) => ({ title: s.title, date: s.date, teamsLink: s.teamsLink ?? undefined }))
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

/** Anuncios de la edición, ordenados de más reciente a más antiguo. */
export function courseAnnouncements(edition: EditionDoc | null): Announcement[] {
  return [...(edition?.announcements ?? [])].sort(
    (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime(),
  );
}

/**
 * Catálogo: una única consulta a CourseEditions con estado open/soon, poblando
 * el curso (depth:1). Evita el N+1. Omite ediciones sin curso publicado.
 */
export async function getCatalogCourses(): Promise<CatalogCard[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "course-editions",
    where: { status: { in: ["open", "soon"] } },
    sort: "startDate",
    limit: 50,
    depth: 1,
  });
  const editions = res.docs as unknown as EditionDoc[];
  return editions
    .map((edition): CatalogCard | null => {
      const course = edition.course;
      if (!course || typeof course === "string" || typeof course === "number") return null;
      return toCatalogCard(course, edition);
    })
    .filter((c): c is CatalogCard => c !== null);
}

/**
 * Próximo curso disponible = el curso cuya edición comprable (open/soon, fecha
 * de inicio en el futuro) empieza antes. Alimenta el botón "Próximo curso" del
 * Header. Devuelve null si no hay ninguno (el Header cae a /formacion).
 */
export async function getNextCourse(
  now: number = Date.now(),
): Promise<{ slug: string; title: string } | null> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "course-editions",
    where: { status: { in: ["open", "soon"] } },
    sort: "startDate",
    limit: 50,
    depth: 1,
  });
  const editions = res.docs as unknown as EditionDoc[];
  for (const edition of editions) {
    if (!isPurchasableEdition(edition, now)) continue;
    const course = edition.course;
    if (!course || typeof course === "string" || typeof course === "number") continue;
    return { slug: course.slug, title: course.title };
  }
  return null;
}

export type EnrolledCourse = {
  enrollmentId: string;
  slug: string;
  title: string;
  editionId: string | null;
  editionLabel: string;
  startDate: string | null;
  accessState: AccessState;
  totalLessons: number;
  completed: number;
  progress: number; // 0-100
  completedLessons: string[];
};

function countLessons(modules: ModuleDoc[] = []): number {
  return modules.reduce((n, m) => n + (m.lessons?.length ?? 0), 0);
}

/** Cursos en los que el alumno está inscrito, con su progreso y estado de acceso. */
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

      // Edición poblada (depth:1). Legado (sin edición) → acceso activo.
      const edition = e.edition as unknown as EditionDoc | string | number | null;
      const editionObj =
        edition && typeof edition === "object" ? edition : null;
      const startDate = editionObj?.startDate ?? null;
      const accessState: AccessState = startDate ? computeAccessState(startDate) : "active";

      return {
        enrollmentId: String(e.id),
        slug: course.slug,
        title: course.title,
        editionId: editionObj?.id != null ? String(editionObj.id) : null,
        editionLabel: editionObj?.editionLabel ?? "",
        startDate,
        accessState,
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
