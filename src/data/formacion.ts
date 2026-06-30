/**
 * Contenido estático de la landing de Formación (Instituto ADN Local), que es
 * además la página principal del sitio. Basado en el documento "Landing página
 * Formación". En Fase 2/4 los programas pasarán a gestionarse desde el panel/CMS.
 */

/* ---- Hero ---- */
export const hero = {
  eyebrow: "ADN Local · Formación",
  title: "El espacio de referencia de los líderes locales",
  accent: "líderes locales",
  summary:
    "Programas especializados en liderazgo político, estrategia municipal y gestión pública para alcaldes, concejales, candidatos y responsables municipales.",
};

/* ---- ¿Por qué ADN Local? ---- */
export const why = {
  paragraphs: [
    "ADN Local nace de una realidad que hemos observado durante años trabajando junto a alcaldes, concejales, candidatos y equipos municipales.",
    "Cada legislatura exige tomar decisiones complejas, impulsar proyectos, gestionar equipos, comunicar con la ciudadanía y afrontar retos para los que nadie te prepara realmente.",
    "Existen escuelas para médicos, arquitectos, abogados o ingenieros. Sin embargo, quienes asumen responsabilidades públicas en el ámbito local rara vez encuentran espacios donde aprender de la experiencia práctica de otros responsables públicos y adquirir herramientas aplicables a su día a día.",
    "Por eso creamos ADN Local.",
    "Una plataforma de aprendizaje y acompañamiento estratégico para quienes quieren impulsar proyectos, transformar sus municipios y afrontar con mayor preparación los retos de la política local.",
    "Nuestra propuesta es sencilla: ofrecer herramientas, visión y estrategia para convertir la experiencia municipal en mejores decisiones y mejores resultados.",
  ],
  /* La cita se renderiza con varios acentos en turquesa (ver WhyAdn.tsx). */
  quote: [
    { text: "Impulsamos a quienes quieren liderar con más " },
    { text: "preparación", accent: true },
    { text: ", gobernar con más " },
    { text: "estrategia", accent: true },
    { text: " y " },
    { text: "dejar huella", accent: true },
    { text: " en sus municipios." },
  ] as { text: string; accent?: boolean }[],
};

/* ---- Metodología ---- */
export type MethodColor = "turquoise" | "green" | "coral";

export const method = [
  {
    color: "turquoise" as MethodColor,
    num: "01",
    title: "Teoría a tu ritmo",
    desc: "Lecciones interactivas de 8 a 15 minutos, con contenidos prácticos diseñados para la realidad municipal.",
  },
  {
    color: "green" as MethodColor,
    num: "02",
    title: "Casos reales en directo",
    desc: "Sesiones grupales donde analizamos situaciones reales planteadas por los participantes y trabajamos sobre experiencias compartidas.",
  },
  {
    color: "coral" as MethodColor,
    num: "03",
    title: "Todo listo para actuar",
    desc: "Herramientas, estrategias y ejercicios aplicados a problemas reales. Trabajarás sobre tu propio caso para terminar con claridad y una hoja de ruta preparada para poner en marcha.",
  },
];

/* ---- Webinar gratuito ---- */
export const webinar = {
  title: "Webinar gratuito",
  desc: "Te invitamos a participar en una sesión online gratuita donde compartiremos algunas de las claves para afrontar con éxito el último año antes de las elecciones municipales.",
  details: [
    ["Próxima sesión", "Fecha por confirmar"],
    ["Duración", "45 minutos"],
    ["Participación", "Gratuita"],
  ] as [string, string][],
  cta: "Reservar mi plaza en el webinar",
};

/* ---- Catálogo de programas ---- */
export type PriceTone = "turquoise" | "amber" | "ink";

export type PriceTier = {
  label: string;
  discount?: string;
  oldPrice?: string;
  price: string;
  edition: string;
  tone: PriceTone;
};

export type Program = {
  id: string;
  num: string;
  badge: string;
  badgeTone: "open" | "soon";
  title: string;
  accent: string;
  subtitle?: string;
  desc: string;
  tiers?: PriceTier[];
  limited?: string;
  guarantee?: string;
  priority?: { title: string; desc: string };
  href?: string; // landing del curso (/curso/[slug]) si existe
};

const guaranteeText =
  "Nos reservamos el derecho de cancelar el curso si no se alcanza el mínimo.";
const limitedText = "Máximo 30 participantes por edición";

export const programs: Program[] = [
  {
    id: "hacia-un-nuevo-mandato",
    num: "Edición julio 2026",
    badge: "Inscripción abierta",
    badgeTone: "open",
    title: "Hacia un nuevo mandato",
    accent: "mandato",
    subtitle: "Prepara el último año de legislatura.",
    href: "/curso/hacia-un-nuevo-mandato",
    desc: "Dirigido a alcaldes y equipos de gobierno en ejercicio, este programa te ayuda a preparar el cierre de la legislatura y afrontar con garantías el próximo ciclo electoral. Analiza tu legislatura, organiza tu equipo, construye tu proyecto de futuro y prepara la estrategia que te permitirá afrontar con garantías el próximo proceso electoral.",
    tiers: [
      { label: "Primera edición", discount: "-40%", oldPrice: "330€", price: "198€", edition: "Edición julio 2026", tone: "turquoise" },
      { label: "Segunda edición", discount: "-20%", oldPrice: "330€", price: "264€", edition: "Edición agosto 2026", tone: "amber" },
      { label: "A partir de la tercera edición", price: "330€", edition: "Edición septiembre y sucesivas ediciones", tone: "ink" },
    ],
    limited: limitedText,
    guarantee: guaranteeText,
  },
  {
    id: "construir-la-alternativa",
    num: "Edición septiembre 2026",
    badge: "Inscripción abierta",
    badgeTone: "open",
    title: "Construir la alternativa",
    accent: "alternativa",
    subtitle: "Prepara la candidatura que tu municipio espera.",
    href: "/curso/construir-la-alternativa",
    desc: "Dirigido a concejales y equipos que ejercen la oposición y quieren convertirse en una alternativa sólida y creíble de gobierno. Aprende a analizar el contexto político, construir un proyecto capaz de ilusionar a los vecinos, organizar tu equipo y diseñar una estrategia que te permita ganar su confianza y optar al gobierno municipal.",
    tiers: [
      { label: "Primera edición", discount: "-40%", oldPrice: "330€", price: "198€", edition: "Edición septiembre 2026", tone: "turquoise" },
      { label: "Segunda edición", discount: "-20%", oldPrice: "330€", price: "264€", edition: "Edición octubre 2026", tone: "amber" },
      { label: "A partir de la tercera edición", price: "330€", edition: "Edición noviembre y sucesivas ediciones", tone: "ink" },
    ],
    limited: limitedText,
    guarantee: guaranteeText,
  },
  {
    id: "gobernando-con-exito",
    num: "Próximas ediciones",
    badge: "Reserva tu plaza",
    badgeTone: "soon",
    title: "Gobernando con éxito",
    accent: "éxito",
    desc: "Un programa orientado a mejorar tus capacidades de gestión, liderazgo y dirección pública. Aprende a organizar equipos, impulsar proyectos y afrontar los retos del día a día municipal con mayor preparación y confianza.",
    priority: {
      title: "Acceso prioritario",
      desc: "Déjanos tus datos y te avisaremos antes que nadie cuando se abran las inscripciones de la próxima edición.",
    },
  },
];

/* ---- CTA final ---- */
export const nextStep = {
  title: "Cada momento exige una preparación diferente",
  desc: "Ya sea para mejorar tu gestión, afrontar el último año de legislatura o construir una alternativa de gobierno, encontrarás un programa diseñado para ayudarte a avanzar con más preparación y estrategia.",
  label: "Elige tu próximo paso",
  options: [
    { label: "Hacia un nuevo mandato", href: "/curso/hacia-un-nuevo-mandato" },
    { label: "Construir la alternativa", href: "/curso/construir-la-alternativa" },
  ],
};

/* ---- Itinerario formativo (el programa completo) ---- */
export type ItineraryStatus = "open" | "soon";

export type ItineraryArea = {
  title: string;
  status: ItineraryStatus;
  desc: string;
  items: { label: string; href?: string }[];
};

export const itinerario: {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  areas: ItineraryArea[];
} = {
  eyebrow: "·· El programa",
  title: "Un itinerario para gobernar lo local",
  accent: "gobernar lo local",
  subtitle:
    "No son cursos sueltos: cada programa es un paso de una ruta completa de aprendizaje para cargos públicos.",
  areas: [
    {
      title: "Estrategia y mandato",
      status: "open",
      desc: "Prepara cada etapa política: gobernar, construir una alternativa o afrontar el ciclo electoral.",
      items: [
        { label: "Hacia un nuevo mandato", href: "/curso/hacia-un-nuevo-mandato" },
        { label: "Construir la alternativa", href: "/curso/construir-la-alternativa" },
        { label: "Gobernando con éxito" },
      ],
    },
    {
      title: "Gestión municipal",
      status: "soon",
      desc: "Cómo funciona y se gestiona un ayuntamiento por dentro.",
      items: [
        { label: "Cómo funciona un ayuntamiento" },
        { label: "Presupuestos y financiación" },
        { label: "Contratación pública" },
        { label: "Servicios y gestión del día a día" },
      ],
    },
    {
      title: "Liderazgo y equipos",
      status: "soon",
      desc: "Dirigir personas y construir equipos que funcionan.",
      items: [
        { label: "Dirección de personas" },
        { label: "Gestión de equipos" },
        { label: "Toma de decisiones" },
      ],
    },
    {
      title: "Comunicación pública",
      status: "soon",
      desc: "Conectar con la ciudadanía y contar lo que haces.",
      items: [
        { label: "Comunicación institucional" },
        { label: "Relato y mensaje" },
        { label: "Redes y medios" },
      ],
    },
    {
      title: "Territorio y urbanismo",
      status: "soon",
      desc: "La transformación del municipio y el espacio público — el ADN de ADN Urbano.",
      items: [
        { label: "Regeneración urbana" },
        { label: "Espacio público y movilidad" },
        { label: "Comercio y dinamización local" },
      ],
    },
  ],
};

/* ---- Para quién es (inicio) ---- */
export const paraQuien = {
  eyebrow: "·· Para quién",
  title: "Pensado para quienes lideran lo local",
  accent: "lo local",
  profiles: [
    {
      title: "Alcaldes y equipos de gobierno",
      desc: "Para ordenar la gestión, el relato y el proyecto de futuro del municipio.",
    },
    {
      title: "Oposición que aspira a gobernar",
      desc: "Para dejar de ser “el que critica” y convertirte en la alternativa real de gobierno.",
    },
    {
      title: "Concejales",
      desc: "Para ganar método y estrategia en comercio, urbanismo, servicios o el área que lleves.",
    },
    {
      title: "Candidatos y futuros cargos",
      desc: "Para llegar preparados al ciclo electoral, sin improvisar.",
    },
    {
      title: "Técnicos y responsables municipales",
      desc: "Para convertir el trabajo del día a día en resultados visibles.",
    },
  ],
};

/* ---- Cómo funciona (metodología) ---- */
export const comoFunciona = {
  eyebrow: "·· Cómo funciona",
  title: "Todo lo que incluye",
  accent: "incluye",
  items: [
    {
      title: "Directos por Microsoft Teams",
      desc: "Una sesión por bloque (3 en total) para resolver casos reales. Si no puedes asistir, se graban y quedan en tu área en menos de 24 horas.",
    },
    {
      title: "Campus Virtual",
      desc: "Lecturas estructuradas, vídeos cortos de 5 a 15 minutos y un test de fijación por tema, para asimilar lo importante de forma ágil.",
    },
    {
      title: "Soporte directo por WhatsApp",
      desc: "Acceso a nuestro contacto de Whatsapp de ADN Local para resolver dudas y acompañarte durante todo el programa.",
    },
    {
      title: "Acceso durante 6 meses",
      desc: "Materiales y grabaciones disponibles 6 meses desde la finalización del curso.",
    },
    {
      title: "Certificado de finalización",
      desc: "Acreditación al completar el programa.",
    },
    {
      title: "Trabajas sobre tu caso",
      desc: "Terminas con una estrategia y una hoja de ruta aplicables a tu propio municipio.",
    },
  ],
};

/* ---- Metodología · hero + modelo (aprende paso a paso) ---- */
export const methodHero = {
  eyebrow: "·· Metodología",
  title: "Todo lo que necesitas saber sobre política local",
  accent: "sobre política local",
  subtitle:
    "Un modelo de formación flexible, práctico y aplicado para que cada responsable local construya su propio itinerario de aprendizaje.",
  modelEyebrow: "·· El modelo",
  modelTitle: "Aprende paso a paso",
  modelAccent: "paso a paso",
  modelParagraphs: [
    "No creemos en formaciones largas donde aprendes de todo y acabas aplicando poco.",
    "En ADN Local cada programa es una microcredencial: una formación especializada que desarrolla una competencia concreta para el ejercicio del gobierno local.",
    "Puedes realizar un único programa o construir, poco a poco, un itinerario completo adaptado a tus necesidades.",
  ],
};

/* ---- Metodología · competencias (microcredenciales) ---- */
export const competencias = {
  items: [
    { label: "Estrategia local", icon: "target" },
    { label: "Comunicación política", icon: "megaphone" },
    { label: "Liderazgo", icon: "users" },
    { label: "Gestión municipal", icon: "landmark" },
    { label: "Participación ciudadana", icon: "chat" },
    { label: "Comercio local", icon: "store" },
    { label: "Urbanismo", icon: "city" },
    { label: "Campaña electoral", icon: "ballot" },
  ] as { label: string; icon: string }[],
  footnote: "Tú decides qué programas necesitas y en qué orden.",
  footnoteStrong: "Construye tu itinerario, paso a paso.",
};

/* ---- Metodología · así es aprender (rasgos) ---- */
export const asiEsAprender = {
  eyebrow: "·· Lo que nos define",
  title: "Así es aprender en ADN Local",
  accent: "en ADN Local",
  items: [
    { label: "Flexible", desc: "Aprende cuando puedas.", icon: "calendar" },
    { label: "Práctica", desc: "Todo está pensado para aplicar.", icon: "wrench" },
    { label: "Eficiente", desc: "Contenidos breves y directos.", icon: "bolt" },
    { label: "Cercana", desc: "Acompañamiento durante todo el proceso.", icon: "heart" },
    { label: "Especializada", desc: "Solo política y gestión local.", icon: "star" },
    { label: "Aplicada", desc: "Metodologías basadas en casos reales.", icon: "check" },
  ] as { label: string; desc: string; icon: string }[],
};

/* ---- Metodología · CTA construye tu itinerario ---- */
export const construyeItinerario = {
  title: "Construye tu propio itinerario",
  desc: "Cada programa desarrolla una competencia concreta. Tú eliges por dónde empezar y cómo construir tu formación en gobierno local.",
  ctaIntro: "Empieza ahora",
  ctaSub: "Descubre los programas disponibles y elige el que mejor se adapta a tus necesidades.",
  ctaLabel: "Ver programas disponibles",
  ctaHref: "/programas",
};

/* ---- Por qué tres semanas (metodología) ---- */
export const tresSemanas = {
  eyebrow: "·· El formato",
  title: "Por qué tres semanas",
  accent: "tres semanas",
  intro:
    "Tres semanas es el tiempo justo: suficiente para trabajar en profundidad sobre tu municipio, sin alargarse tanto que lo dejes a medias. Una semana por bloque, un directo por semana, y terminas con una estrategia lista para aplicar.",
  weeks: [
    {
      num: "Semana 1",
      block: "El QUÉ",
      desc: "Analizas y diagnosticas: de dónde partes y qué quieres conseguir en tu municipio.",
    },
    {
      num: "Semana 2",
      block: "El QUIÉN",
      desc: "Organizas tu equipo y el mapa de actores: con quién cuentas y a quién debes llegar.",
    },
    {
      num: "Semana 3",
      block: "El CÓMO",
      desc: "Conviertes el diagnóstico en proyecto, mensaje y un plan de acciones concretas.",
    },
  ],
  note: "Cada semana: teoría a tu ritmo + una sesión en directo por Teams donde trabajamos tu caso real. Las sesiones se graban, así que no pierdes nada si no puedes asistir.",
};
