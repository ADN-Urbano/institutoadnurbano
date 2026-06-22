/**
 * Datos de siembra de los cursos (forma de la colección `courses` de Payload).
 * Fuente única para el seed de desarrollo. En producción los cursos se
 * gestionan desde /admin; esto solo precarga el catálogo inicial.
 */

const sharedForYes = {
  title: "Trabajas en lo local y quieres dejar de improvisar",
  items: [
    "Eres concejal de comercio, dinamización o desarrollo local y necesitas presentar un plan creíble.",
    "Eres técnico municipal y quieres que tu trabajo deje huella, no que se quede en informes.",
    "Eres consultor o asesor y quieres una metodología contrastada para tus clientes.",
    "Diriges una asociación de comerciantes y necesitas profesionalizar la interlocución.",
  ].map((item) => ({ item })),
};

const sharedForNo = {
  title: "Buscas teoría pura o atajos mágicos",
  items: [
    "Quieres un curso solo en vídeo sin participar en directos.",
    "Esperas plantillas mágicas que se aplican sin pensar al contexto.",
    "Buscas un programa académico con bibliografía extensa.",
  ].map((item) => ({ item })),
};

const sharedFaq = [
  { question: "¿Y si no puedo asistir a un directo?", answer: "Todas las sesiones se graban y quedan disponibles en tu área privada en menos de 24 horas." },
  { question: "¿Necesito tener Microsoft Teams instalado?", answer: "No. Puedes acceder desde el navegador con el enlace que te enviamos cada semana." },
  { question: "¿Hay descuento para grupos del mismo ayuntamiento?", answer: "Sí. A partir de tres personas del mismo organismo, descuento del 20%. Escríbenos." },
  { question: "¿Se puede pagar a plazos?", answer: "Sí. Pago único o tres cuotas mensuales sin intereses." },
];

const instructor = {
  name: "Gerardo Sánchez Romero",
  bio: "Director de ADN Urbano · 14 años asesorando a más de 80 ayuntamientos",
};

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
  title: "Las clases en directo se imparten por Microsoft Teams",
  desc: "Todos los miércoles a las 19:00 (CET) durante las 3 semanas. Si no puedes asistir, las sesiones se graban y se publican en tu área en menos de 24 horas.",
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
      "No hay problema. Las tres sesiones magistrales de resolución de casos se graban y se suben al campus en menos de 24 horas. Podrás verlas cuando quieras y plantear tus dudas a través del foro de la comunidad.",
  },
  {
    question: "¿Cuánto tiempo tendré acceso a los materiales?",
    answer:
      "Tendrás acceso total al campus virtual durante tres meses (el mes de formación y dos meses adicionales de consulta).",
  },
  {
    question: "¿Cuándo y cómo son las sesiones en directo?",
    answer:
      "Se realiza una sesión en directo por módulo (3 en total) centrada en la resolución de casos prácticos. Las sesiones se realizan a través de videoconferencia y tienen una duración aproximada de dos horas.",
  },
  {
    question: "¿Necesito instalar algún software especial?",
    answer:
      "No. Puedes acceder al campus y a las sesiones en directo directamente desde tu navegador web (Chrome, Safari, etc.) con el enlace que recibirás cada semana. La plataforma es compatible con dispositivos móviles, tablets y ordenadores.",
  },
  {
    question: "¿Cómo se imparte el contenido teórico?",
    answer:
      "Todo el material está alojado en un Campus Virtual (LMS). Cada tema consta de lecturas estructuradas, vídeos cortos de entre 5 y 15 minutos y un test de fijación de conocimientos para asegurar que asimilas los conceptos clave de forma ágil.",
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

const sharedFeats = (sessions: string) =>
  [
    "Lecciones en vídeo a tu ritmo",
    `${sessions} sesiones semanales en directo por Teams`,
    "Plantillas y materiales descargables",
    "Acceso a la comunidad de Slack",
    "Tutorización individual",
    "Certificado de finalización",
    "Acceso de por vida al contenido",
  ].map((feature) => ({ feature }));

export const coursesSeed = [
  {
    slug: "plan-dinamizacion-comercial",
    title: "Plan de dinamización comercial",
    accent: "comercial",
    headline: "Cómo diseñar un plan de dinamización comercial que funcione",
    headlineAccent: "comercial",
    summary:
      "Ocho semanas para aprender, paso a paso y con casos reales, cómo hacer un plan de comercio que de verdad cambie la actividad de un municipio. No es teoría: al terminar tendrás tu propio plan listo para presentar.",
    published: true,
    durationLabel: "8 sem.",
    levelLabel: "Inter.",
    instructor,
    feats: [
      "8 módulos · más de 30 lecciones",
      "Sesiones en directo por Teams cada semana",
      "Plantillas y materiales descargables",
      "Acceso a la comunidad de Slack",
      "Tutorización individual",
      "Certificado de finalización",
      "Acceso de por vida al contenido",
    ].map((feature) => ({ feature })),
    teams: {
      title: "Las clases en directo se imparten por Microsoft Teams",
      desc: "Todos los miércoles a las 19:00 (CET) durante las 8 semanas. Si no puedes asistir, las sesiones se graban y se publican en tu área en menos de 24 horas.",
    },
    modules: [
      {
        num: "01",
        name: "Diagnóstico: cómo entender de verdad qué pasa en tu municipio",
        infoLabel: "5 LECCIONES · 1H 12 MIN",
        lessons: [
          { title: "1.1 — El error más común: confundir intuición con datos", kind: "video", durationLabel: "14:32", description: "Por qué casi todos los planes arrancan mal: partimos de lo que creemos saber. Te enseño a separar la percepción de la evidencia antes de escribir una sola medida." },
          { title: "1.2 — Los seis indicadores que sí importan (y dónde sacarlos gratis)", kind: "video", durationLabel: "18:05", description: "Locales vacíos, rotación, afluencia, gasto medio, mix comercial y dependencia. Dónde conseguir cada dato sin contratar a nadie." },
          { title: "1.3 — Cómo hacer un mapa comercial en una tarde", kind: "video", durationLabel: "12:48", description: "Un método sencillo para cartografiar la actividad de tu centro y detectar huecos y concentraciones de un vistazo." },
          { title: "1.4 — Plantilla: ficha de diagnóstico", kind: "doc", durationLabel: "XLSX", description: "Hoja de cálculo lista para rellenar con los seis indicadores y generar tu foto de partida." },
        ],
      },
      {
        num: "02",
        name: "Visión y objetivos: qué quieres conseguir y cómo lo medirás",
        infoLabel: "4 LECCIONES · 50 MIN",
        lessons: [
          { title: "2.1 — De la queja al objetivo: formular metas medibles", kind: "video", durationLabel: "12:10", description: "Cómo transformar “hay que animar el comercio” en objetivos concretos, con número y plazo." },
          { title: "2.2 — Indicadores de éxito que no se inventan a posteriori", kind: "video", durationLabel: "15:40", description: "Define cómo vas a medir el éxito antes de empezar, para no maquillar resultados al final." },
          { title: "2.3 — El cuadro de mando del plan en una hoja", kind: "video", durationLabel: "09:55", description: "Un panel simple para que cualquiera entienda en 30 segundos cómo va el plan." },
          { title: "2.4 — Plantilla: cuadro de objetivos e indicadores", kind: "doc", durationLabel: "XLSX", description: "Plantilla para fijar objetivos, metas y responsables de seguimiento." },
        ],
      },
      {
        num: "03",
        name: "El árbol de medidas: del objetivo a la acción concreta",
        infoLabel: "5 LECCIONES · 1H 30 MIN",
        lessons: [
          { title: "3.1 — Del objetivo a la acción: el árbol de medidas", kind: "video", durationLabel: "16:20", description: "La herramienta central del curso: cómo bajar cada objetivo a medidas concretas y accionables." },
          { title: "3.2 — Medidas rápidas vs. medidas estructurales", kind: "video", durationLabel: "13:05", description: "Equilibra victorias tempranas que generan apoyo con cambios de fondo que duran." },
          { title: "3.3 — Priorizar con criterio (y no por presión política)", kind: "video", durationLabel: "18:48", description: "Un sistema de priorización por impacto y esfuerzo que aguanta una junta de gobierno." },
          { title: "3.4 — Catálogo de 30 medidas que sí funcionan", kind: "video", durationLabel: "21:12", description: "Repaso a medidas contrastadas en municipios reales, con su contexto de aplicación." },
        ],
      },
      {
        num: "04",
        name: "Presupuesto y cronograma: hacer realista lo ambicioso",
        infoLabel: "4 LECCIONES · 1H 05 MIN",
        lessons: [
          { title: "4.1 — Cuánto cuesta de verdad un plan de comercio", kind: "video", durationLabel: "14:00", description: "Partidas reales, costes ocultos y cómo presupuestar sin quedarte corto ni asustar." },
          { title: "4.2 — Financiación y fondos europeos sin morir en el intento", kind: "video", durationLabel: "19:30", description: "Mapa de fuentes de financiación y claves para encajar tu plan en convocatorias." },
          { title: "4.3 — El cronograma realista: 18 meses, no 18 años", kind: "video", durationLabel: "11:25", description: "Cómo secuenciar las medidas para que el plan avance y se note." },
          { title: "4.4 — Plantilla: presupuesto y cronograma", kind: "doc", durationLabel: "XLSX", description: "Plantilla para planificar gasto y fechas por medida." },
        ],
      },
      {
        num: "05",
        name: "Gobernanza: cómo montar la mesa público-privada que funciona",
        infoLabel: "5 LECCIONES · 1H 28 MIN",
        lessons: [
          { title: "5.1 — Quién manda en un plan de comercio (y por qué importa)", kind: "video", durationLabel: "13:20", description: "Roles, responsabilidades y el error de que “lo lleve todo el área de comercio”." },
          { title: "5.2 — La mesa público-privada que no se reúne para nada", kind: "video", durationLabel: "17:10", description: "Cómo montar un órgano de gobernanza que decida, no que dé vueltas." },
          { title: "5.3 — Asociaciones de comerciantes: aliados, no enemigos", kind: "video", durationLabel: "15:00", description: "Construir confianza con el tejido comercial y repartir el trabajo." },
          { title: "5.4 — El reglamento mínimo para que todo funcione", kind: "video", durationLabel: "12:40", description: "Las pocas reglas escritas que evitan el 90% de los conflictos." },
        ],
      },
      {
        num: "06",
        name: "Comunicación del plan: vender por dentro y por fuera",
        infoLabel: "4 LECCIONES · 48 MIN",
        lessons: [
          { title: "6.1 — Vender el plan por dentro: técnicos y políticos", kind: "video", durationLabel: "12:15", description: "Cómo conseguir que tu propia organización empuje el plan en vez de frenarlo." },
          { title: "6.2 — Vender el plan por fuera: comercios y vecinos", kind: "video", durationLabel: "14:50", description: "Mensajes y canales para que la calle perciba el plan y lo apoye." },
          { title: "6.3 — Errores de comunicación que matan un plan", kind: "video", durationLabel: "10:30", description: "Lo que NO debes hacer: promesas, silencios y autobombo." },
          { title: "6.4 — Plantilla: plan de comunicación en 1 página", kind: "doc", durationLabel: "PDF", description: "Un esquema de comunicación que cabe en una hoja y se entiende." },
        ],
      },
      {
        num: "07",
        name: "Ejecución y seguimiento: que el plan no se quede en cajón",
        infoLabel: "5 LECCIONES · 1H 23 MIN",
        lessons: [
          { title: "7.1 — Del PDF a la calle: arrancar la ejecución", kind: "video", durationLabel: "15:45", description: "Los primeros 90 días: por dónde empezar para coger inercia." },
          { title: "7.2 — Seguimiento mensual sin burocracia", kind: "video", durationLabel: "13:30", description: "Una rutina ligera de seguimiento que cualquiera puede mantener." },
          { title: "7.3 — Qué hacer cuando algo no funciona", kind: "video", durationLabel: "12:05", description: "Cómo corregir el rumbo sin desmontar el plan entero." },
          { title: "7.4 — Rendir cuentas: el informe que sí se lee", kind: "video", durationLabel: "11:50", description: "Comunicar resultados con honestidad y de forma que interese." },
        ],
      },
      {
        num: "08",
        name: "Tu plan: presentación final con feedback personalizado",
        infoLabel: "3 LECCIONES · 2H 26 MIN",
        lessons: [
          { title: "8.1 — Cómo montar la presentación final", kind: "video", durationLabel: "13:00", description: "Estructura y narrativa para defender tu plan ante quien decide." },
          { title: "8.2 — Plantilla maestra del plan (entregable)", kind: "doc", durationLabel: "DOCX", description: "El documento final del curso: tu plan completo listo para presentar." },
        ],
      },
    ],
    forYes: sharedForYes,
    forNo: sharedForNo,
    faq: sharedFaq,
  },
  {
    slug: "movilidad-urbana",
    title: "Movilidad urbana para no expertos",
    accent: "no expertos",
    summary:
      "Lo que un concejal o técnico debe saber sobre peatonalización, ZBE, aparcamiento y bicicleta. Sin tecnicismos, con casos reales y trabajo en directo sobre tu municipio.",
    published: true,
    durationLabel: "6 sem.",
    levelLabel: "Inicio",
    instructor,
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
    title: "Comunicación política local",
    accent: "política local",
    summary:
      "Cómo contar lo que haces sin parecer un panfleto. Estrategia de redes, prensa local y oratoria en pleno, con práctica en directo sobre tus propios mensajes.",
    published: true,
    durationLabel: "5 sem.",
    levelLabel: "Todos",
    instructor,
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
    title: "Turismo de interior desde cero",
    accent: "interior",
    summary:
      "Cómo construir una propuesta turística para municipios pequeños sin recursos. De la marca al producto, con casos reales y tutorización individual.",
    published: true,
    durationLabel: "7 sem.",
    levelLabel: "Inter.",
    instructor,
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
const flagshipStart = new Date(Date.now() - 14 * 86_400_000).toISOString();
// Directos relativos a "ahora" para que NextSession muestre uno futuro en dev.
const inDays = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString();

export const editionsSeed = [
  {
    courseSlug: "plan-dinamizacion-comercial",
    editionLabel: "Curso 01 · Edición Junio 2026",
    status: "open",
    statusLabel: "Inscripción abierta · 16 plazas",
    priceCents: 45000,
    oldPriceCents: 59000,
    priceNote: "IVA inc.",
    startDate: flagshipStart,
    startLabel: "29 jun",
    seatsLabel: "14 / 30",
    liveSessions: [
      { title: "Sesión en directo · Diagnóstico de tu municipio", date: inDays(3), teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-1" },
      { title: "Sesión en directo · Trabajamos tu árbol de medidas", date: inDays(17), teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-3" },
      { title: "Sesión en directo · Diseña tu gobernanza", date: inDays(31), teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-5" },
    ],
    announcements: [
      {
        date: inDays(-13),
        title: "Bienvenido/a: así arranca el curso",
        body: "El curso ya está abierto. Esta semana te recomendamos ver el módulo 1 a tu ritmo y preparar los datos de tu municipio para el primer directo. Cualquier duda, nos vemos en Slack.",
      },
      {
        date: inDays(-7),
        title: "Recordatorio: prepara tu ficha de diagnóstico",
        body: "Para el primer directo trae tu ficha de diagnóstico rellena. Si no puedes asistir, la grabación estará disponible en menos de 24 horas.",
      },
    ],
  },
  {
    courseSlug: "movilidad-urbana",
    editionLabel: "Curso 02 · Edición Julio 2026",
    status: "open",
    statusLabel: "Inscripción abierta · 17 plazas",
    priceCents: 35000,
    priceNote: "IVA inc.",
    startDate: inDays(21),
    startLabel: "13 jul",
    seatsLabel: "8 / 25",
    liveSessions: [],
    announcements: [],
  },
  {
    courseSlug: "comunicacion-politica-local",
    editionLabel: "Curso 03 · Edición Septiembre 2026",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    priceCents: 29500,
    priceNote: "IVA inc.",
    startDate: inDays(85),
    startLabel: "15 sept",
    seatsLabel: "Reserva",
    liveSessions: [],
    announcements: [],
  },
  {
    courseSlug: "turismo-interior",
    editionLabel: "Curso 04 · Edición Octubre 2026",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    priceCents: 39500,
    priceNote: "IVA inc.",
    startDate: inDays(105),
    startLabel: "5 oct",
    seatsLabel: "Reserva",
    liveSessions: [],
    announcements: [],
  },

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
