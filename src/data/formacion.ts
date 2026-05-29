/**
 * Contenido estático de la página de Formación (Instituto ADN Local).
 * Copiado del mockup del brandbook (Versión D). En Fase 2/4 los cursos
 * pasarán a gestionarse desde el panel/CMS.
 */

export const header = {
  eyebrow: "Instituto ADN Local · Formación",
  title: "Aprende haciendo: casos reales, en directo, con tutorización.",
  accent: "directo",
  summary:
    "Programas para concejales, técnicos municipales y consultores. Teoría pregrabada que se ve a tu ritmo, sesiones en directo donde resolvemos los casos que tú traes.",
  stats: [
    ["94%", "Tasa\nfinalización"],
    ["187", "Profesionales\nformados"],
    ["9.4", "Valoración\nmedia"],
  ] as [string, string][],
};

export type MethodColor = "turquoise" | "green" | "coral";

export const method = [
  {
    color: "turquoise" as MethodColor,
    num: "01",
    title: "Teoría a tu ritmo",
    desc: "Lecciones de 8 a 15 minutos en vídeo que ves cuando puedas, con ejercicios y plantillas reales que se aplican al día siguiente.",
  },
  {
    color: "green" as MethodColor,
    num: "02",
    title: "Directos por Teams",
    desc: "Una vez por semana traes tu caso. Lo trabajamos en directo con todo el grupo. Las sesiones se graban y quedan en tu área.",
  },
  {
    color: "coral" as MethodColor,
    num: "03",
    title: "Comunidad activa",
    desc: "Slack privado con todos los alumnos y profesores. El acceso no caduca: la red es uno de los activos más valiosos del programa.",
  },
];

export type CourseStatus = "open" | "soon";

export const courses = [
  {
    id: "CURSO 01 · ED. JUN'26",
    status: "open" as CourseStatus,
    statusLabel: "Inscripción abierta",
    title: "Plan de dinamización comercial",
    accent: "comercial",
    desc: "Cómo diseñar, presentar y ejecutar un plan que cambie de verdad la actividad comercial de un municipio.",
    attrs: [
      ["Inicio", "29 jun"],
      ["Duración", "8 sem."],
      ["Plazas", "14 / 30"],
      ["Nivel", "Inter."],
    ],
    price: "450€",
    priceNote: " / pago único",
    href: "/curso/plan-dinamizacion-comercial",
  },
  {
    id: "CURSO 02 · ED. JUL'26",
    status: "open" as CourseStatus,
    statusLabel: "Inscripción abierta",
    title: "Movilidad urbana para no expertos",
    accent: "no expertos",
    desc: "Lo que un concejal o técnico debe saber sobre peatonalización, ZBE, aparcamiento y bicicleta. Sin tecnicismos.",
    attrs: [
      ["Inicio", "13 jul"],
      ["Duración", "6 sem."],
      ["Plazas", "8 / 25"],
      ["Nivel", "Inicio"],
    ],
    price: "350€",
    priceNote: " / pago único",
    href: "/curso/movilidad-urbana",
  },
  {
    id: "CURSO 03 · ED. SEPT'26",
    status: "soon" as CourseStatus,
    statusLabel: "Próximamente",
    title: "Comunicación política local",
    accent: "política local",
    desc: "Cómo contar lo que haces sin parecer un panfleto. Estrategia de redes, prensa local, oratoria en pleno.",
    attrs: [
      ["Inicio", "15 sept"],
      ["Duración", "5 sem."],
      ["Plazas", "Reserva"],
      ["Nivel", "Todos"],
    ],
    price: "295€",
    priceNote: " / pago único",
    href: "/curso/comunicacion-politica-local",
  },
  {
    id: "CURSO 04 · ED. OCT'26",
    status: "soon" as CourseStatus,
    statusLabel: "Próximamente",
    title: "Turismo de interior desde cero",
    accent: "interior",
    desc: "Cómo construir una propuesta turística para municipios pequeños sin recursos. De la marca al producto.",
    attrs: [
      ["Inicio", "5 oct"],
      ["Duración", "7 sem."],
      ["Plazas", "Reserva"],
      ["Nivel", "Inter."],
    ],
    price: "395€",
    priceNote: " / pago único",
    href: "/curso/turismo-interior",
  },
];

export const testimonial = {
  quote:
    "“Lo mejor del curso no fueron los vídeos —que estaban muy bien— sino los directos. Llevaba ocho años en el ayuntamiento y nunca había podido sentarme con alguien que entendiera mi problema.”",
  author: "Inés Carmona",
  role: "Concejala de comercio · Ayto. de Lorca",
};
