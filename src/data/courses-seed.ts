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
    edition: "Curso 01 · Edición Junio 2026",
    summary:
      "Ocho semanas para aprender, paso a paso y con casos reales, cómo hacer un plan de comercio que de verdad cambie la actividad de un municipio. No es teoría: al terminar tendrás tu propio plan listo para presentar.",
    priceCents: 45000,
    oldPriceCents: 59000,
    priceNote: "IVA inc.",
    status: "open",
    statusLabel: "Inscripción abierta · 16 plazas",
    published: true,
    startLabel: "29 jun",
    durationLabel: "8 sem.",
    seatsLabel: "14 / 30",
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
          { title: "1.5 — Sesión en directo · Diagnóstico de tu municipio", kind: "live", durationLabel: "~90 MIN", liveDate: "2026-07-01T17:00:00.000Z", teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-1", description: "Traes tus datos y los revisamos en grupo. Resolvemos dudas y detectamos los puntos ciegos de cada caso." },
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
          { title: "3.5 — Sesión en directo · Trabajamos tu árbol de medidas", kind: "live", durationLabel: "~90 MIN", liveDate: "2026-07-15T17:00:00.000Z", teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-3", description: "Construimos en directo el árbol de medidas de los casos que traigáis." },
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
          { title: "5.5 — Sesión en directo · Diseña tu gobernanza", kind: "live", durationLabel: "~90 MIN", liveDate: "2026-07-29T17:00:00.000Z", teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-5", description: "Diseñamos el modelo de gobernanza adaptado a cada municipio." },
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
          { title: "7.5 — Sesión en directo · Tu sistema de seguimiento", kind: "live", durationLabel: "~90 MIN", liveDate: "2026-08-12T17:00:00.000Z", teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-7", description: "Montamos el sistema de seguimiento de cada participante." },
        ],
      },
      {
        num: "08",
        name: "Tu plan: presentación final con feedback personalizado",
        infoLabel: "3 LECCIONES · 2H 26 MIN",
        lessons: [
          { title: "8.1 — Cómo montar la presentación final", kind: "video", durationLabel: "13:00", description: "Estructura y narrativa para defender tu plan ante quien decide." },
          { title: "8.2 — Plantilla maestra del plan (entregable)", kind: "doc", durationLabel: "DOCX", description: "El documento final del curso: tu plan completo listo para presentar." },
          { title: "8.3 — Presentación final con feedback personalizado", kind: "live", durationLabel: "~120 MIN", liveDate: "2026-08-26T17:00:00.000Z", teamsLink: "https://teams.microsoft.com/l/meetup-join/demo-sesion-8", description: "Presentas tu plan y recibes feedback individual del profesor y el grupo." },
        ],
      },
    ],
    forYes: sharedForYes,
    forNo: sharedForNo,
    faq: sharedFaq,
    announcements: [
      {
        date: "2026-06-25T09:00:00.000Z",
        title: "Bienvenido/a: así arranca el curso",
        body: "El curso abre el 29 de junio. Esta semana te recomendamos ver el módulo 1 a tu ritmo y preparar los datos de tu municipio para el primer directo. Cualquier duda, nos vemos en Slack.",
      },
      {
        date: "2026-07-01T08:00:00.000Z",
        title: "Hoy, primer directo a las 19:00",
        body: "Recuerda: esta tarde tenemos la primera sesión en directo por Teams. Trae tu ficha de diagnóstico rellena. Si no puedes asistir, la grabación estará disponible en menos de 24 horas.",
      },
    ],
  },
  {
    slug: "movilidad-urbana",
    title: "Movilidad urbana para no expertos",
    accent: "no expertos",
    edition: "Curso 02 · Edición Julio 2026",
    summary:
      "Lo que un concejal o técnico debe saber sobre peatonalización, ZBE, aparcamiento y bicicleta. Sin tecnicismos, con casos reales y trabajo en directo sobre tu municipio.",
    priceCents: 35000,
    priceNote: "IVA inc.",
    status: "open",
    statusLabel: "Inscripción abierta · 17 plazas",
    published: true,
    startLabel: "13 jul",
    durationLabel: "6 sem.",
    seatsLabel: "8 / 25",
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
    edition: "Curso 03 · Edición Septiembre 2026",
    summary:
      "Cómo contar lo que haces sin parecer un panfleto. Estrategia de redes, prensa local y oratoria en pleno, con práctica en directo sobre tus propios mensajes.",
    priceCents: 29500,
    priceNote: "IVA inc.",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    published: true,
    startLabel: "15 sept",
    durationLabel: "5 sem.",
    seatsLabel: "Reserva",
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
    edition: "Curso 04 · Edición Octubre 2026",
    summary:
      "Cómo construir una propuesta turística para municipios pequeños sin recursos. De la marca al producto, con casos reales y tutorización individual.",
    priceCents: 39500,
    priceNote: "IVA inc.",
    status: "soon",
    statusLabel: "Reserva tu plaza",
    published: true,
    startLabel: "5 oct",
    durationLabel: "7 sem.",
    seatsLabel: "Reserva",
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
];
