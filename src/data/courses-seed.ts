/**
 * Datos de siembra de los cursos (forma de la colección `courses` de Payload).
 * Fuente única para el seed de desarrollo. En producción los cursos se
 * gestionan desde /admin; esto solo precarga el catálogo inicial.
 */

/**
 * Instructor ampliado para las landings de los cursos del PDF (bloque "Imparte"
 * del hero + "Quién te acompaña"). La foto no la tenemos: el admin la sube luego.
 */
const landingInstructor = {
  name: "Gerardo Sánchez Romero",
  bio: "Director de ADN Local",
  tagline:
    "Director de ADN Local, con más de 10 años acompañando a gobiernos municipales en momentos estratégicos.",
  experienceLabel: "Más de 10 años de experiencia",
  longBio: [
    "Director de ADN Local y consultor especializado en estrategia municipal, liderazgo político y comunicación pública.",
    "Durante más de diez años ha trabajado junto a ayuntamientos, alcaldes, concejales y equipos políticos, acompañándolos en procesos de planificación estratégica, gestión pública, participación ciudadana y preparación electoral.",
    "Su experiencia combina el conocimiento de la realidad municipal con el diseño de proyectos, campañas y estrategias adaptadas a municipios medianos y pequeños, donde cada decisión cuenta y cada elección se gana desde el trabajo previo.",
    "A través de ADN Local, comparte una metodología práctica orientada a un objetivo claro: ayudar a responsables públicos y candidatos a afrontar con mayor claridad, organización y estrategia el año más importante de una legislatura.",
  ].map((paragraph) => ({ paragraph })),
  specialties: [
    "Estrategia municipal",
    "Liderazgo y campañas electorales",
    "Trabajo directo con ayuntamientos y equipos políticos",
    "Especializado en municipios de 5.000 a 50.000 habitantes",
  ].map((item) => ({ item })),
};

/* ---- Contenido compartido por los 2 cursos del PDF (Hacia un nuevo mandato / Construir la alternativa) ---- */

const landingVideoIntro = {
  title: "Descubre más sobre el programa",
  desc: "Conoce cómo está estructurado, qué trabajarás durante las tres semanas de formación y qué resultados obtendrás al finalizar.",
  label: "Vídeo presentación curso",
};

const landingTeams = {
  title: "El enlace a las clases en directo estará en tu campus virtual",
  desc: "Todos los miércoles a las 19:00 (CET) durante las 3 semanas. Encontrarás el enlace de acceso en tu campus virtual. Si no puedes asistir, las sesiones se graban y se publican en tu área en menos de 24 horas.",
};

const landingFeats = [
  "Formación online compatible con tu tiempo.",
  "Vídeos de formación (5–15 min) y test de fijación",
  "3 sesiones prácticas en directo aplicadas a tu caso",
  "Saldrás con una estrategia lista para aplicar en tu municipio",
  "Acceso a Campus Virtual y comunidad",
  "Certificado de finalización",
  "Acceso a todos los materiales y grabaciones durante 6 meses",
].map((feature) => ({ feature }));

const landingFaq = [
  {
    question: "¿Y si no puedo asistir a un directo?",
    answer:
      "No hay problema. Las tres sesiones prácticas de resolución de casos se graban y se suben al campus en menos de 24 horas. Podrás verlas cuando quieras y plantear tus dudas a través del foro de la comunidad.",
  },
  {
    question: "¿Cuánto tiempo tendré acceso a los materiales?",
    answer:
      "Tendrás acceso al campus virtual durante 6 meses desde la finalización del curso, para repasar los materiales y las grabaciones con calma.",
  },
  {
    question: "¿Cuándo y cómo son las sesiones en directo?",
    answer:
      "Se realiza una sesión en directo por módulo (3 en total) centrada en la resolución de casos prácticos. Las sesiones se realizan a través del campus virtual y tienen una duración aproximada de dos horas.",
  },
  {
    question: "¿Necesito instalar algún software especial?",
    answer:
      "No. Puedes acceder al campus y a las sesiones en directo directamente desde tu navegador web (Chrome, Safari, etc.) con el enlace que recibirás cada semana. La plataforma es compatible con dispositivos móviles, tablets y ordenadores.",
  },
  {
    question: "¿Cómo se imparte el contenido teórico?",
    answer:
      "Todo el material está alojado en el Campus Virtual. El programa consta de lecturas estructuradas, vídeos cortos de entre 5 y 15 minutos y un test de fijación de conocimientos para asegurar que asimilas los conceptos clave de forma ágil.",
  },
];

const landingWebinar = (nextSessionLabel: string) => ({
  desc: "Te invitamos a participar en una sesión online gratuita donde compartiremos algunas de las claves para afrontar con éxito el último año antes de las elecciones municipales.",
  nextSessionLabel,
  durationLabel: "45 minutos",
  cta: "Reservar mi plaza en el webinar",
});

const landingFinalCtaShared = {
  seatsTitle: "Solo 30 plazas disponibles",
  seatsDesc:
    "Un grupo reducido para garantizar el trabajo sobre la realidad de cada municipio.",
  cta: "Reservar mi plaza",
};

/** Convierte el array de "Tema N…" en lecciones (solo título, kind text). */
const temasToLessons = (temas: string[]) =>
  temas.map((title) => ({ title, kind: "text" as const }));

export const coursesSeed = [
  /* ---- CURSO 01 · Hacia un nuevo mandato (PDF) ---- */
  {
    slug: "hacia-un-nuevo-mandato",
    title: "Hacia un nuevo mandato",
    accent: "mandato",
    headline: "Cómo liderar el último año de legislatura para asegurar tu reelección",
    headlineAccent: "reelección",
    summary:
      "Tres semanas para ordenar tu relato de mandato, alinear a tu equipo y diseñar el proyecto de futuro que tus vecinos votarán. Sin improvisación: saldrás con tu estrategia lista para ejecutar.",
    published: true,
    durationLabel: "3 sem.",
    levelLabel: "Gobierno",
    instructor: landingInstructor,
    feats: landingFeats,
    teams: landingTeams,
    videoIntro: landingVideoIntro,
    modules: [
      {
        num: "01",
        name: "Gestionar: El QUÉ.",
        description:
          "De la lista de logros al hilo conductor. Aprenderás a construir un diagnóstico integrado del mandato (interno + territorial) que no sea un simple catálogo de obras, sino un relato con sentido.",
        lessons: temasToLessons([
          "Tema 1. Análisis interno del mandato: unir los puntos",
          "Tema 2. Análisis externo: el municipio por sectores y por territorio",
        ]),
      },
      {
        num: "02",
        name: "Dirigir: El QUIÉN.",
        description:
          "El diseño del equipo de campaña y el mapa de actores. Definirás tu núcleo de confianza y el plan de acercamiento a los colectivos clave del municipio para que ningún contacto sea fruto de la improvisación.",
        lessons: temasToLessons([
          "Tema 3. El equipo de campaña: núcleo duro y círculos de confianza",
          "Tema 4. Mapa de actores del municipio y plan de acercamiento",
        ]),
      },
      {
        num: "03",
        name: "Comunicar: El CÓMO.",
        description:
          "Proyecto de legislatura y mensaje marco. Transformarás el diagnóstico en una visión de futuro, definiendo tu eslogan de precampaña y un calendario de acciones visibles que generen confianza.",
        lessons: temasToLessons([
          "Tema 5. Del diagnóstico al proyecto de legislatura y el mensaje marco",
          "Tema 6. Eslogan de precampaña, acciones visibles y proceso de participación",
        ]),
      },
    ],
    forYes: {
      title: "Quieres que tu gestión se convierta en votos",
      items: [
        'Eres alcalde o concejal que se siente "ahogado por la gestión" diaria y necesita recuperar el control de su tiempo y su mensaje',
        "Sientes que has hecho mucho, pero te falta un hilo conductor que dé sentido a tus logros ante los vecinos.",
        "Necesitas alinear a tu equipo bajo una estrategia única para evitar la improvisación electoral.",
        "Quieres pasar de la intuición a una metodología con datos para ganar votos en cada barrio.",
      ].map((item) => ({ item })),
    },
    forNo: {
      title: "Vas a dejar tu reelección al azar",
      items: [
        "Crees que la victoria se consigue improvisando en los últimos meses de legislatura",
        "Buscas teoría abstracta y no quieres trabajar sobre la realidad de tu municipio",
        "Prefieres reaccionar a la oposición en lugar de marcar tú la agenda del año electoral",
      ].map((item) => ({ item })),
    },
    outcomes: [
      "El relato que explica lo que has hecho y hacia dónde quieres llevar el municipio.",
      "El mapa de prioridades de cada barrio y sector de población.",
      "El equipo con el que afrontarás el último año de legislatura.",
      "Los contactos y colectivos clave con los que debes trabajar.",
      "El proyecto que presentarás para la próxima legislatura.",
      "El mensaje que guiará toda tu comunicación política.",
      "Las acciones que debes activar para generar confianza y visibilidad.",
      "Un plan de trabajo para llegar preparado al inicio de la campaña electoral.",
    ].map((item) => ({ item })),
    faq: landingFaq,
    webinar: landingWebinar("1 de julio 2026 a las 20:00 h"),
    finalCta: {
      title: "Si gobiernas, este año no se improvisa",
      desc: "Si quieres llegar al próximo proceso electoral con una estrategia clara, un equipo alineado y un proyecto de futuro definido, este programa está diseñado para ti.",
      ...landingFinalCtaShared,
    },
  },

  /* ---- CURSO 02 · Construir la alternativa (PDF) ---- */
  {
    slug: "construir-la-alternativa",
    title: "Construir la alternativa",
    accent: "alternativa",
    headline:
      'Deja de ser "la oposición" para convertirte en la alternativa real de gobierno',
    headlineAccent: "alternativa real",
    summary:
      "Las elecciones no se ganan en campaña; se ganan ahora. Tres semanas para analizar las vulnerabilidades del gobierno, construir tu equipo y prefigurar el cambio que el municipio necesita.",
    published: true,
    durationLabel: "3 sem.",
    levelLabel: "Oposición",
    instructor: landingInstructor,
    feats: landingFeats,
    teams: landingTeams,
    videoIntro: landingVideoIntro,
    modules: [
      {
        num: "01",
        name: "Analizar: ¿Por qué el cambio?",
        description:
          "Aprenderás a identificar las vulnerabilidades reales del gobierno (no solo las aparentes) y a realizar un balance honesto de tu grupo para encontrar tus ejes de contraste.",
        lessons: temasToLessons([
          "Tema 1. Análisis de la gestión del gobierno: vulnerabilidades reales y ejes de contraste",
          "Tema 2. Análisis del municipio y del propio grupo de oposición",
        ]),
      },
      {
        num: "02",
        name: "Dirigir: El equipo y la calle.",
        description:
          'Diseñarás tu equipo de campaña con recursos limitados, ordenarás la relación con el partido y crearás un mapa de actores para acercarte al municipio sin la "palanca" de la institución.',
        lessons: temasToLessons([
          "Tema 3. Candidato, equipo de campaña y relación con el partido",
          "Tema 4. Mapa de actores y plan de acercamiento desde la oposición",
        ]),
      },
      {
        num: "03",
        name: "Comunicar: Hacer visible la alternativa.",
        description:
          "Del mensaje marco al eslogan de precampaña. Diseñarás formatos de encuentro ciudadano y acciones de prefiguración para que los vecinos te visualicen ya como el futuro alcalde/sa.",
        lessons: temasToLessons([
          "Tema 5. De los ejes de contraste al proyecto de alternativa y el mensaje marco",
          "Tema 6. Eslogan, formatos de encuentro ciudadano y acciones de precampaña",
        ]),
      },
    ],
    forYes: {
      title: "Quieres ser la alternativa real de gobierno",
      items: [
        'Necesitas que el municipio deje de verte como "el que critica" y empiece a reconocerte como el futuro alcalde o alcaldesa',
        "Quieres basar tu victoria en un proyecto de futuro para el municipio y no solo en el desgaste o la crítica al gobierno actual",
        "Buscas diseñar un equipo de campaña profesional y eficiente, incluso si cuentas con recursos y personal limitado",
        "Quieres identificar las vulnerabilidades reales del gobierno actual para construir ejes de contraste que movilicen el voto de cambio",
      ].map((item) => ({ item })),
    },
    forNo: {
      title: "Crees que criticarlo todo es una estrategia",
      items: [
        "Piensas que la crítica sistemática es suficiente para ganar la confianza de tus vecinos sin ofrecer una alternativa creíble",
        "No estás dispuesto a realizar un balance honesto de los errores y aciertos de tu propio grupo municipal durante esta legislatura",
        "Buscas marketing genérico o teoría abstracta en lugar de una guía técnica y práctica específica para política municipal",
      ].map((item) => ({ item })),
    },
    outcomes: [
      "Un diagnóstico claro de las debilidades y oportunidades del gobierno actual.",
      "Los ejes de contraste que diferenciarán tu candidatura.",
      "El equipo con el que afrontarás el último año antes de las elecciones.",
      "Los contactos y colectivos clave con los que debes construir alianzas.",
      "El proyecto de alternativa que presentarás a tus vecinos.",
      "El mensaje marco que dará coherencia a toda tu candidatura.",
      "Las acciones y encuentros que te ayudarán a ganar visibilidad y confianza.",
      "Un plan de trabajo para llegar preparado al inicio de la campaña electoral.",
    ].map((item) => ({ item })),
    faq: landingFaq,
    webinar: landingWebinar("1 de septiembre a las 20:00 h"),
    finalCta: {
      title: "Si te presentas, este año no se improvisa",
      desc: "Si quieres dejar de ser percibido como oposición y empezar a ser visto como una opción real de gobierno, este programa está diseñado para ti.",
      ...landingFinalCtaShared,
    },
  },
];

/**
 * Ediciones (convocatorias) de cada curso, en array paralelo a `coursesSeed`.
 * El seed las enlaza por `courseSlug`. La edición del curso estrella tiene
 * `startDate` en el pasado para que el alumno de prueba quede `active`.
 */

// startDate del curso estrella: en el pasado (acceso ya abierto en dev).
// Directos relativos a "ahora" para que NextSession muestre uno futuro en dev.
const inDays = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString();

export const editionsSeed = [
  /* ---- Ediciones · Hacia un nuevo mandato (3) ---- */
  {
    courseSlug: "hacia-un-nuevo-mandato",
    editionLabel: "Curso 01 · Edición julio 2026",
    status: "open",
    statusLabel: "Inscripción abierta",
    priceCents: 19800,
    oldPriceCents: 33000,
    priceNote: "IVA inc.",
    startDate: inDays(20),
    startLabel: "1 jul",
    seatsLabel: "30 plazas",
    liveSessions: [],
    announcements: [],
  },
  {
    courseSlug: "hacia-un-nuevo-mandato",
    editionLabel: "Curso 01 · Edición agosto 2026",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    priceCents: 26400,
    oldPriceCents: 33000,
    priceNote: "IVA inc.",
    startDate: inDays(51),
    startLabel: "1 ago",
    seatsLabel: "Reserva",
    liveSessions: [],
    announcements: [],
  },
  {
    courseSlug: "hacia-un-nuevo-mandato",
    editionLabel: "Curso 01 · Edición septiembre 2026",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    priceCents: 33000,
    priceNote: "IVA inc.",
    startDate: inDays(82),
    startLabel: "1 sept",
    seatsLabel: "Reserva",
    liveSessions: [],
    announcements: [],
  },

  /* ---- Ediciones · Construir la alternativa (3) ---- */
  {
    courseSlug: "construir-la-alternativa",
    editionLabel: "Curso 02 · Edición septiembre 2026",
    status: "open",
    statusLabel: "Inscripción abierta",
    priceCents: 19800,
    oldPriceCents: 33000,
    priceNote: "IVA inc.",
    startDate: inDays(82),
    startLabel: "1 sept",
    seatsLabel: "30 plazas",
    liveSessions: [],
    announcements: [],
  },
  {
    courseSlug: "construir-la-alternativa",
    editionLabel: "Curso 02 · Edición octubre 2026",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    priceCents: 26400,
    oldPriceCents: 33000,
    priceNote: "IVA inc.",
    startDate: inDays(112),
    startLabel: "1 oct",
    seatsLabel: "Reserva",
    liveSessions: [],
    announcements: [],
  },
  {
    courseSlug: "construir-la-alternativa",
    editionLabel: "Curso 02 · Edición noviembre 2026",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    priceCents: 33000,
    priceNote: "IVA inc.",
    startDate: inDays(143),
    startLabel: "1 nov",
    seatsLabel: "Reserva",
    liveSessions: [],
    announcements: [],
  },
];
