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
  lessons?: Lesson[];
};

export type CourseDetail = {
  slug: string;
  edition: string;
  title: string; // nombre corto (migas, metadata)
  accent: string;
  headline: string; // titular largo del hero
  headlineAccent: string;
  summary: string;
  instructor: { name: string; bio: string };
  statusLabel: string;
  price: string;
  oldPrice?: string;
  priceNote: string;
  feats: string[];
  teams: { title: string; desc: string };
  modules: Module[];
  forYes: { title: string; items: string[] };
  forNo: { title: string; items: string[] };
  faq: { q: string; a: string }[];
};
