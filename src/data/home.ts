/**
 * Contenido estático de la página principal (Versión D · Multicolor).
 * Copiado literal del mockup del brandbook. En Fase 2 esto se sustituye
 * por datos provenientes del CMS (Sanity/Payload).
 */

export type TileColor = "yellow" | "green" | "coral" | "dark";

export const hero = {
  pill: "Centro de recursos · Política local",
  title: "Ideas, casos y formación para política local de verdad.",
  summary:
    "Para concejales, técnicos municipales y consultores que quieren resultados concretos.",
  actions: {
    primary: { label: "Explorar", href: "/recursos" },
    secondary: { label: "Ver formación", href: "/formacion" },
  },
  tiles: [
    {
      color: "yellow" as TileColor,
      tag: "Próximo curso",
      title: "Plan de Dinamización Comercial",
      meta: "29 jun · 8 semanas · 14/30",
      href: "/curso/hacia-un-nuevo-mandato",
    },
    {
      color: "green" as TileColor,
      tag: "Caso destacado",
      title: "Vitoria-Gasteiz: el corredor verde más rentable",
      meta: "251K hab. · Espacio público",
      href: "/recursos?formato=caso",
    },
    {
      color: "coral" as TileColor,
      tag: "Píldora · 12.4K vistas",
      title: "“Si tu plaza está vacía, no es plaza, es decorado”",
      meta: "1:18 min · Reels",
      href: "/recursos?formato=pildora",
    },
    {
      color: "dark" as TileColor,
      tag: "Podcast · Ep. 14",
      title: "Marta Fernández, alcaldesa de Cáceres",
      meta: "52 min · Audio",
      href: "/recursos?formato=podcast",
    },
  ],
};

export const featured = {
  main: {
    imageTag: "Análisis",
    tag: "Reportaje · Comercio",
    title:
      "Cómo Logroño rescató su centro histórico en 18 meses sin gastar un euro en obra",
    summary:
      "Un programa municipal de cesión de locales vacíos a comerciantes emergentes ha multiplicado por cuatro la actividad en el casco antiguo. Las claves de un modelo replicable.",
    author: "Gerardo Sánchez",
    readTime: "8 min",
    date: "4 mayo",
  },
  side: [
    {
      color: "green" as const,
      tag: "Caso · 251K hab.",
      title: "Vitoria-Gasteiz: el corredor verde más rentable del País Vasco",
      meta: "Ficha · 2 mayo",
    },
    {
      color: "yellow" as const,
      tag: "Podcast · Ep. 14",
      title:
        "Marta Fernández, alcaldesa de Cáceres: “Una ciudad no se gestiona, se cuida”",
      meta: "Audio · 52 min",
    },
  ],
};

export const materias = [
  "Todo",
  "Comercio",
  "Movilidad",
  "Espacio público",
  "Vivienda",
  "Turismo",
  "Innovación",
];

export type Format = "Artículo" | "Píldora" | "Caso" | "Podcast";

export const recent = [
  {
    thumb: "dark" as const,
    format: "Artículo" as Format,
    tag: "Comercio",
    title:
      "El comercio de proximidad ya no compite con Amazon: compite con TikTok Shop",
    summary:
      "Por qué la conversación se ha movido de “competir en precio” a “competir en atención”.",
    meta: ["6 MIN", "HOY"],
  },
  {
    thumb: "yellow" as const,
    format: "Píldora" as Format,
    tag: "Estrategia",
    title:
      "Tres preguntas que todo concejal debería hacerse antes de aprobar un plan",
    summary:
      "Si no puedes responder con datos concretos, todavía no tienes un plan. Tienes una intención.",
    meta: ["1:42 MIN", "AYER"],
  },
  {
    thumb: "turquoise" as const,
    format: "Caso" as Format,
    tag: "Comercio · 442K hab.",
    title:
      "Murcia: los Mercados de Barrio que multiplicaron por seis sus visitas en un año",
    summary:
      "Una estrategia de programación cultural mensual transformó cinco mercados en proceso de cierre.",
    meta: ["FICHA", "2 MAY"],
  },
  {
    thumb: "green" as const,
    format: "Podcast" as Format,
    tag: "Urbanismo · Ep. 13",
    title: "Charla con Carlos Moreno, padre de la “ciudad de los 15 minutos”",
    summary:
      "El urbanista franco-colombiano explica por qué España está mejor preparada que Francia.",
    meta: ["1H 12 MIN", "1 MAY"],
  },
];

export const pills = [
  {
    thumb: "coral" as const,
    tag: "Reels · 12.4K vistas",
    title:
      "“Si tu plaza es bonita pero está vacía, no es una plaza, es un decorado”",
    desc:
      "Una de las ideas que más debate ha generado en LinkedIn esta semana: por qué los KPIs de uso son los únicos que importan en espacio público.",
    meta: ["1:18 MIN", "· HOY"],
  },
  {
    thumb: "turquoise-deep" as const,
    tag: "TikTok · 28.1K vistas",
    title:
      "El truco de Pamplona para llenar de gente las calles los lunes por la tarde",
    desc:
      "Una intervención de 4.000 € que ha cambiado la dinámica comercial de toda una zona.",
    meta: ["1:42 MIN", "· 2 MAY"],
  },
  {
    thumb: "yellow" as const,
    tag: "Instagram · 8.7K vistas",
    title:
      "¿Tu municipio tiene “Plan Estratégico de Comercio”? Probablemente no sirve para nada",
    desc:
      "Tres síntomas que delatan que un plan estratégico es solo un PDF para colgar en la web del ayuntamiento.",
    meta: ["0:58 MIN", "· 30 ABR"],
  },
];

export const coursePromo = {
  eyebrow: "Próxima edición · Plazas limitadas",
  title: "Plan de dinamización comercial",
  desc:
    "Ocho semanas de formación con casos reales, sesiones en directo y tutorización individual. Para concejales, técnicos y consultores.",
  meta: [
    ["INICIO", "29 JUN 2026"],
    ["DURACIÓN", "8 SEMANAS"],
    ["MODALIDAD", "ONLINE · TEAMS"],
    ["PLAZAS", "14 / 30"],
  ],
  cta: { label: "Ver el programa →", href: "/curso/hacia-un-nuevo-mandato" },
  secondary: "o descarga el folleto en PDF",
};

export const cases = [
  {
    color: "turquoise" as const,
    popTag: "Población · < 20.000 hab.",
    name: "Almagro",
    province: "Ciudad Real · 8.876 hab.",
    quote:
      "“Un programa de fines de semana temáticos llevó a 32.000 visitantes en cinco meses a un municipio de menos de 9.000 personas.”",
    tags: ["Turismo", "Comercio", "Cultura"],
  },
  {
    color: "green" as const,
    popTag: "Población · 50–250.000 hab.",
    name: "Pontevedra",
    province: "Galicia · 83.260 hab.",
    quote:
      "“La ciudad que peatonalizó su centro hace 25 años y hoy es la referencia europea en movilidad urbana.”",
    tags: ["Movilidad", "Espacio público"],
  },
  {
    color: "coral" as const,
    popTag: "Población · > 250.000 hab.",
    name: "Bilbao",
    province: "Vizcaya · 348.181 hab.",
    quote:
      "“Cómo el efecto Guggenheim sigue funcionando 30 años después: las cinco decisiones de gestión que casi nadie cuenta.”",
    tags: ["Cultura", "Estrategia"],
  },
];

export const podcast = {
  eyebrow: "El podcast · ADN Conversaciones",
  quote: "“La política local es la única política donde todavía se puede hacer algo.”",
  author: { name: "Marta Fernández", role: "Alcaldesa de Cáceres · Ep. 14" },
  episodes: [
    { num: "14", title: "Marta Fernández, alcaldesa de Cáceres", time: "52:18" },
    { num: "13", title: "Carlos Moreno y la ciudad de los 15 minutos", time: "1:12:04" },
    { num: "12", title: "Eva Ramos · Cómo se gestiona un BIC", time: "48:32" },
  ],
};

export const analysis = {
  tag: "Datos · Comercio",
  title:
    "El pequeño comercio español ha crecido un 12% en seis años. ¿Por qué nadie lo cuenta?",
  summary:
    "El relato de “cierre del comercio tradicional” lleva una década en los medios. Los datos del INE cuentan otra historia bastante más matizada — y mucho más interesante.",
  author: "Gerardo Sánchez",
  readTime: "12 min",
};

export const newsletter = {
  eyebrow: "Newsletter semanal",
  title: "Cada lunes, lo que de verdad importa en política local",
  desc:
    "Análisis, casos prácticos y la conversación de la semana en comercio, urbanismo y gestión municipal. Sin spam, sin relleno.",
  stats: [
    ["3.412", "Suscriptores"],
    ["62%", "Apertura"],
    ["Gratis", "Siempre"],
  ],
};
