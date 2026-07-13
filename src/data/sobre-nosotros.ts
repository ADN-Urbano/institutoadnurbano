/**
 * Contenido estático de la página "Sobre nosotros" (/sobre-nosotros).
 * La narrativa: ADN Local nace de ADN Urbano (consultora de transformación
 * urbana). La credibilidad viene de esa trayectoria de campo, NO de métricas de
 * formación (es una propuesta formativa nueva). Info de ADN Urbano: adnurbano.es.
 */

export const hero = {
  eyebrow: "Sobre ADN Local",
  title: "No venimos de la teoría, venimos del terreno",
  accent: "del terreno",
  summary:
    "ADN Local es la escuela de los líderes locales. Nace de ADN Urbano —la consultora con la que llevamos años transformando ciudades y acompañando a ayuntamientos— para convertir esa experiencia de campo en formación práctica para quienes gobiernan lo local.",
};

/* La sección "Por qué existe ADN Local" reutiliza el bloque <WhyAdn /> de la
   home (mismo texto + cita), así que su contenido vive en src/data/formacion.ts. */

export const queHacemos = {
  eyebrow: "·· Qué hacemos",
  title: "Convertimos experiencia en",
  accent: "estrategia",
  desc: "No damos teoría abstracta: trasladamos lo que funciona en el terreno a programas aplicables a tu municipio.",
  pillars: [
    {
      title: "Formamos",
      desc: "Programas prácticos de tres semanas, diseñados para cada etapa de un cargo local: gobernar, construir una alternativa o mejorar la gestión.",
    },
    {
      title: "Acompañamos",
      desc: "Teoría a tu ritmo, casos reales resueltos en directo y soporte directo para que avances sobre tu propio caso, no sobre supuestos.",
    },
    {
      title: "Conectamos",
      desc: "Una red de cargos públicos que comparten los mismos retos, para aprender también de quienes están en tu misma situación.",
    },
  ],
};

export const equipo = {
  eyebrow: "·· Quién está detrás",
  title: "Quién te acompaña",
  accent: "acompaña",
  director: {
    name: "Gerardo Sánchez Romero",
    role: "Director de ADN Local",
    bio: [
      "Director de ADN Local y consultor especializado en estrategia municipal, liderazgo político y comunicación pública.",
      "Durante más de diez años ha trabajado junto a ayuntamientos, alcaldes, concejales y equipos políticos, acompañándolos en procesos de planificación estratégica, gestión pública, participación ciudadana y preparación electoral.",
      "Su experiencia combina el conocimiento de la realidad municipal con el diseño de proyectos, campañas y estrategias adaptadas a municipios medianos y pequeños, donde cada decisión cuenta.",
    ],
    specialties: [
      "Estrategia municipal",
      "Liderazgo y campañas electorales",
      "Trabajo directo con ayuntamientos",
      "Municipios de 5.000 a 50.000 habitantes",
    ],
  },
};

export const adnUrbano = {
  eyebrow: "·· De dónde venimos",
  title: "Somos ADN Urbano",
  accent: "ADN Urbano",
  tagline: "Agencia de innovación local",
  paragraphs: [
    "ADN Urbano es una consultora especializada en transformación urbana y desarrollo territorial: ciudades y territorios más amables, atractivos y accesibles.",
    "Trabajamos desde una mirada humanista, impulsando el liderazgo público, la participación ciudadana y proyectos integrales junto a ayuntamientos y equipos de gobierno. ADN Local es la forma de llevar todo ese conocimiento de campo a la formación.",
  ],
  areas: [
    "Regeneración de cascos históricos",
    "Activación de barrios y transformación urbana",
    "Visiones y relatos de ciudad",
    "Planificación de espacios públicos",
    "Proyectos colaborativos público-privados",
  ],
  projects: [
    "Casco histórico de Cehegín",
    "Barrio de La Cruz · Montilla",
    "Plaza La Elíptica",
  ],
  url: "https://adnurbano.es",
  location: "Murcia",
};

export const cta = {
  title: "Pasa de la intuición a la estrategia",
  desc: "Descubre los programas de ADN Local o escríbenos y te ayudamos a elegir el que encaja con tu momento.",
  primary: { label: "Ver los programas", href: "/formacion" },
  secondary: { label: "Escríbenos", href: "mailto:hola@adnlocal.es" },
};
