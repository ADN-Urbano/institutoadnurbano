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

/* El catálogo de cursos ahora viene de Payload (ver src/lib/courses.ts y
   src/data/courses-seed.ts). Aquí solo queda el contenido de página fijo. */

export const testimonial = {
  quote:
    "“Lo mejor del curso no fueron los vídeos —que estaban muy bien— sino los directos. Llevaba ocho años en el ayuntamiento y nunca había podido sentarme con alguien que entendiera mi problema.”",
  author: "Inés Carmona",
  role: "Concejala de comercio · Ayto. de Lorca",
};
