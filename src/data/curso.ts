/**
 * Tipos de la landing de curso (forma que consumen los componentes de
 * `src/components/curso/`). Los datos vienen ahora de Payload (ver
 * `src/lib/courses.ts`); este archivo solo define los tipos.
 */

export type LessonKind = "video" | "text" | "doc" | "live";

export type Lesson = {
  id: string;
  kind: LessonKind;
  title: string;
  time: string;
  description?: string;
  materialUrl?: string;
  materialName?: string;
};

export type Module = {
  num: string;
  name: string;
  info: string;
  description?: string;
  lessons?: Lesson[];
};

export type AccessState = "pending" | "active";

/** Tono visual de un tramo de precio (igual que en `src/data/formacion.ts`). */
export type PriceTone = "turquoise" | "amber" | "ink";

/** Tramo del roadmap de precios de la tarjeta de compra (= una edición real). */
export type PriceTier = {
  editionId: string; // id de la edición (para enviar al checkout)
  label: string; // "Primera edición" / "Segunda edición" / "A partir de la tercera edición"
  discount?: string; // "-40%" / "-20%"
  oldPrice?: string;
  price: string;
  editionLabel: string; // etiqueta de la edición ("Edición julio 2026")
  startLabel?: string; // "Comienza el 29 de julio" (de startDate), si hay fecha
  tone: PriceTone;
  purchasable: boolean; // edición comprable (open/soon + fecha futura + precio válido)
  isDefault: boolean; // edición preseleccionada por defecto
};

/** Instructor ampliado para la landing ("Imparte" del hero + "Quién te acompaña"). */
export type CourseInstructor = {
  name: string;
  bio: string;
  tagline: string;
  photoUrl?: string;
  experienceLabel: string;
  longBio: string[];
  specialties: string[];
};

export type CourseDetail = {
  slug: string;
  editionLabel: string; // etiqueta de la edición activa (antes `edition`)
  startDate: string | null; // inicio de acceso de la edición activa
  accessState: AccessState; // según `startDate` (sin edición → "pending")
  hasOpenEdition: boolean; // hay edición con status "open" → comprable
  title: string; // nombre corto (migas, metadata)
  accent: string;
  headline: string; // titular largo del hero
  headlineAccent: string;
  summary: string;
  instructor: CourseInstructor;
  statusLabel: string;
  price: string;
  oldPrice?: string;
  priceNote: string;
  priceTiers: PriceTier[]; // roadmap de ediciones (tarjeta de compra)
  defaultEditionId: string | null; // id de la edición preseleccionada (null si no hay comprables)
  feats: string[];
  teams: { title: string; desc: string };
  videoIntro: { title: string; desc: string; label: string };
  modules: Module[];
  forYes: { title: string; items: string[] };
  forNo: { title: string; items: string[] };
  outcomes: string[]; // "Al terminar el programa tendrás listo…"
  programPdfLabel: string; // enlace placeholder al PDF del programa
  faq: { q: string; a: string }[];
  webinar: { desc: string; nextSessionLabel: string; durationLabel: string; cta: string };
  finalCta: { title: string; desc: string; seatsTitle: string; seatsDesc: string; cta: string };
};
