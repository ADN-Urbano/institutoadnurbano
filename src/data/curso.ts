/**
 * Contenido de las landings de venta de curso (Versión D).
 * El curso estrella («plan-dinamizacion-comercial») está poblado fiel al
 * mockup del brandbook. Los demás reutilizan la misma plantilla a partir de
 * datos del catálogo + bloques comunes del programa. En Fase 4 los cursos se
 * gestionarán desde el panel/CMS.
 */

export type LessonKind = "video" | "doc" | "live";

export type Lesson = { kind: LessonKind; title: string; time: string };

export type Module = {
  num: string;
  name: string;
  info: string;
  lessons?: Lesson[];
};

export type CourseDetail = {
  slug: string;
  edition: string;
  title: string;
  accent: string;
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

/* Bloques comunes a todos los programas del Instituto. */
const sharedForYes = {
  title: "Trabajas en lo local y quieres dejar de improvisar",
  items: [
    "Eres concejal de comercio, dinamización o desarrollo local y necesitas presentar un plan creíble.",
    "Eres técnico municipal y quieres que tu trabajo deje huella, no que se quede en informes.",
    "Eres consultor o asesor y quieres una metodología contrastada para tus clientes.",
    "Diriges una asociación de comerciantes y necesitas profesionalizar la interlocución.",
  ],
};

const sharedForNo = {
  title: "Buscas teoría pura o atajos mágicos",
  items: [
    "Quieres un curso solo en vídeo sin participar en directos.",
    "Esperas plantillas mágicas que se aplican sin pensar al contexto.",
    "Buscas un programa académico con bibliografía extensa.",
  ],
};

const sharedFaq = [
  {
    q: "¿Y si no puedo asistir a un directo?",
    a: "Todas las sesiones se graban y quedan disponibles en tu área privada en menos de 24 horas.",
  },
  {
    q: "¿Necesito tener Microsoft Teams instalado?",
    a: "No. Puedes acceder desde el navegador con el enlace que te enviamos cada semana.",
  },
  {
    q: "¿Hay descuento para grupos del mismo ayuntamiento?",
    a: "Sí. A partir de tres personas del mismo organismo, descuento del 20%. Escríbenos.",
  },
  {
    q: "¿Se puede pagar a plazos?",
    a: "Sí. Pago único o tres cuotas mensuales sin intereses.",
  },
];

const flagship: CourseDetail = {
  slug: "plan-dinamizacion-comercial",
  edition: "Curso 01 · Edición Junio 2026",
  title: "Cómo diseñar un plan de dinamización comercial que funcione",
  accent: "comercial",
  summary:
    "Ocho semanas para aprender, paso a paso y con casos reales, cómo hacer un plan de comercio que de verdad cambie la actividad de un municipio. No es teoría: al terminar tendrás tu propio plan listo para presentar.",
  instructor: {
    name: "Gerardo Sánchez Romero",
    bio: "Director de ADN Urbano · 14 años asesorando a más de 80 ayuntamientos",
  },
  statusLabel: "Inscripción abierta · 16 plazas",
  price: "450€",
  oldPrice: "590€",
  priceNote: "IVA inc.",
  feats: [
    "8 módulos · 42 lecciones en vídeo",
    "8 sesiones en directo por Teams",
    "Plantillas y materiales descargables",
    "Acceso a la comunidad de Slack",
    "Tutorización individual",
    "Certificado de finalización",
    "Acceso de por vida al contenido",
  ],
  teams: {
    title: "Las clases en directo se imparten por Microsoft Teams",
    desc: "Todos los miércoles a las 19:00 (CET) durante las 8 semanas. Si no puedes asistir, las sesiones se graban y se publican en tu área en menos de 24 horas.",
  },
  modules: [
    {
      num: "01",
      name: "Diagnóstico: cómo entender de verdad qué pasa en tu municipio",
      info: "5 LECCIONES · 1H 12 MIN",
      lessons: [
        { kind: "video", title: "1.1 — El error más común: confundir intuición con datos", time: "14:32" },
        { kind: "video", title: "1.2 — Los seis indicadores que sí importan (y dónde sacarlos gratis)", time: "18:05" },
        { kind: "video", title: "1.3 — Cómo hacer un mapa comercial en una tarde", time: "12:48" },
        { kind: "doc", title: "1.4 — Plantilla descargable: ficha de diagnóstico", time: "XLSX" },
        { kind: "live", title: "1.5 — Sesión en directo · Miércoles 1 julio · 19:00", time: "~90 MIN" },
      ],
    },
    { num: "02", name: "Visión y objetivos: qué quieres conseguir y cómo lo medirás", info: "4 LECCIONES · 58 MIN" },
    { num: "03", name: "El árbol de medidas: del objetivo a la acción concreta", info: "6 LECCIONES · 1H 24 MIN" },
    { num: "04", name: "Presupuesto y cronograma: hacer realista lo ambicioso", info: "5 LECCIONES · 1H 02 MIN" },
    { num: "05", name: "Gobernanza: cómo montar la mesa público-privada que funciona", info: "5 LECCIONES · 1H 18 MIN" },
    { num: "06", name: "Comunicación del plan: vender por dentro y por fuera", info: "4 LECCIONES · 52 MIN" },
    { num: "07", name: "Ejecución y seguimiento: que el plan no se quede en cajón", info: "5 LECCIONES · 1H 08 MIN" },
    { num: "08", name: "Tu plan: presentación final con feedback personalizado", info: "3 LECCIONES · 45 MIN" },
  ],
  forYes: sharedForYes,
  forNo: sharedForNo,
  faq: sharedFaq,
};

/* Cursos secundarios: misma plantilla, datos del catálogo + bloques comunes.
   El temario detallado se publicará cuando el contenido esté producido. */
const sharedFeats = (weeks: string) => [
  `Lecciones en vídeo a tu ritmo`,
  `${weeks} sesiones semanales en directo por Teams`,
  "Plantillas y materiales descargables",
  "Acceso a la comunidad de Slack",
  "Tutorización individual",
  "Certificado de finalización",
  "Acceso de por vida al contenido",
];

const secondary: CourseDetail[] = [
  {
    slug: "movilidad-urbana",
    edition: "Curso 02 · Edición Julio 2026",
    title: "Movilidad urbana para no expertos",
    accent: "no expertos",
    summary:
      "Lo que un concejal o técnico debe saber sobre peatonalización, ZBE, aparcamiento y bicicleta. Sin tecnicismos, con casos reales y trabajo en directo sobre tu municipio.",
    instructor: {
      name: "Gerardo Sánchez Romero",
      bio: "Director de ADN Urbano · 14 años asesorando a más de 80 ayuntamientos",
    },
    statusLabel: "Inscripción abierta · 17 plazas",
    price: "350€",
    priceNote: "IVA inc.",
    feats: sharedFeats("6"),
    teams: {
      title: "Las clases en directo se imparten por Microsoft Teams",
      desc: "Una sesión semanal en directo durante 6 semanas. Si no puedes asistir, todo queda grabado en tu área en menos de 24 horas.",
    },
    modules: [],
    forYes: sharedForYes,
    forNo: sharedForNo,
    faq: sharedFaq,
  },
  {
    slug: "comunicacion-politica-local",
    edition: "Curso 03 · Edición Septiembre 2026",
    title: "Comunicación política local",
    accent: "política local",
    summary:
      "Cómo contar lo que haces sin parecer un panfleto. Estrategia de redes, prensa local y oratoria en pleno, con práctica en directo sobre tus propios mensajes.",
    instructor: {
      name: "Gerardo Sánchez Romero",
      bio: "Director de ADN Urbano · 14 años asesorando a más de 80 ayuntamientos",
    },
    statusLabel: "Reserva tu plaza",
    price: "295€",
    priceNote: "IVA inc.",
    feats: sharedFeats("5"),
    teams: {
      title: "Las clases en directo se imparten por Microsoft Teams",
      desc: "Una sesión semanal en directo durante 5 semanas. Si no puedes asistir, todo queda grabado en tu área en menos de 24 horas.",
    },
    modules: [],
    forYes: sharedForYes,
    forNo: sharedForNo,
    faq: sharedFaq,
  },
  {
    slug: "turismo-interior",
    edition: "Curso 04 · Edición Octubre 2026",
    title: "Turismo de interior desde cero",
    accent: "interior",
    summary:
      "Cómo construir una propuesta turística para municipios pequeños sin recursos. De la marca al producto, con casos reales y tutorización individual.",
    instructor: {
      name: "Gerardo Sánchez Romero",
      bio: "Director de ADN Urbano · 14 años asesorando a más de 80 ayuntamientos",
    },
    statusLabel: "Reserva tu plaza",
    price: "395€",
    priceNote: "IVA inc.",
    feats: sharedFeats("7"),
    teams: {
      title: "Las clases en directo se imparten por Microsoft Teams",
      desc: "Una sesión semanal en directo durante 7 semanas. Si no puedes asistir, todo queda grabado en tu área en menos de 24 horas.",
    },
    modules: [],
    forYes: sharedForYes,
    forNo: sharedForNo,
    faq: sharedFaq,
  },
];

export const coursesDetail: Record<string, CourseDetail> = Object.fromEntries(
  [flagship, ...secondary].map((c) => [c.slug, c]),
);

export const courseSlugs = Object.keys(coursesDetail);

export function getCourse(slug: string): CourseDetail | undefined {
  return coursesDetail[slug];
}
