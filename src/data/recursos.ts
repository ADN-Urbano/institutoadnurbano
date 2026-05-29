/**
 * Contenido estático del archivo del Centro de recursos (Versión D).
 * Copiado del mockup. En Fase 2 el listado, los filtros y la paginación se
 * conectarán al CMS con filtrado y búsqueda reales.
 */
import type { Resource } from "@/components/ui/ResourceCard";

export const header = {
  eyebrow: "Archivo · Centro de recursos",
  title: "Todo lo publicado, buscable y filtrable.",
  accent: "buscable",
  summary:
    "Más de 350 recursos entre artículos, vídeos, podcasts y casos. Filtra por materia, formato o tamaño de población.",
  stats: [
    ["352", "Recursos\npublicados"],
    ["68", "Casos\ndocumentados"],
    ["14", "Episodios\npodcast"],
  ] as [string, string][],
};

export const materias = [
  "Todas",
  "Comercio",
  "Movilidad",
  "Espacio público",
  "Vivienda",
  "Turismo",
  "Innovación",
];

/** Formatos como faceta del archivo. `slug` viaja en la URL (?formato=slug);
    `label` debe coincidir con `format` de cada recurso para poder filtrar. */
export const formatos = [
  { slug: "", label: "Todos" },
  { slug: "articulo", label: "Artículo" },
  { slug: "pildora", label: "Píldora" },
  { slug: "podcast", label: "Podcast" },
  { slug: "caso", label: "Caso" },
];

export const formatoLabelBySlug: Record<string, string> = {
  articulo: "Artículo",
  pildora: "Píldora",
  podcast: "Podcast",
  caso: "Caso",
};

export const poblaciones = ["< 20K", "20–50K", "50–250K", "> 250K"];

export const resources: Resource[] = [
  {
    thumb: "turquoise",
    format: "Caso",
    tag: "Movilidad · 83K hab.",
    title: "Pontevedra: 25 años después de la peatonalización total",
    summary: "Datos, errores corregidos y el coste político real de un cambio de modelo.",
    meta: ["FICHA", "HOY"],
  },
  {
    thumb: "turquoise-deep",
    format: "Píldora",
    tag: "Comercio",
    title: "El error que cometen casi todos los planes de comercio",
    summary: "Ponen al comerciante en el centro. Y no debería estar ahí.",
    meta: ["1:42 MIN", "AYER"],
  },
  {
    thumb: "green",
    format: "Podcast",
    tag: "Urbanismo · Ep. 13",
    title: "Carlos Moreno: la ciudad de los 15 minutos",
    summary: "El urbanista franco-colombiano explica por qué España está mejor preparada.",
    meta: ["1H 12 MIN", "2 MAY"],
  },
  {
    thumb: "dark",
    format: "Artículo",
    tag: "Comercio",
    title: "El comercio de proximidad ya no compite con Amazon",
    summary: "Compite con TikTok Shop. Y ese cambio lo cambia todo.",
    meta: ["6 MIN", "1 MAY"],
  },
  {
    thumb: "coral",
    format: "Caso",
    tag: "Turismo · 8.876 hab.",
    title: "Almagro: 32.000 visitantes en cinco meses",
    summary: "El programa de fines de semana temáticos que ha cambiado la economía local.",
    meta: ["FICHA", "28 ABR"],
  },
  {
    thumb: "yellow",
    format: "Píldora",
    tag: "Estrategia",
    title: "¿Tu municipio tiene “Plan Estratégico”? Probablemente no sirve para nada",
    summary: "Tres síntomas que delatan que un plan estratégico es solo un PDF.",
    meta: ["0:58 MIN", "26 ABR"],
  },
  {
    thumb: "turquoise",
    format: "Caso",
    tag: "Espacio público · 251K hab.",
    title: "Vitoria-Gasteiz: el corredor verde más rentable",
    summary: "Cómo una decisión política valiente convirtió 7 calles muertas en motor económico.",
    meta: ["FICHA", "24 ABR"],
  },
  {
    thumb: "dark",
    format: "Artículo",
    tag: "Comercio",
    title: "El pequeño comercio español ha crecido un 12% en seis años",
    summary: "Los datos del INE contradicen el relato dominante. Por qué nadie lo cuenta.",
    meta: ["12 MIN", "22 ABR"],
  },
  {
    thumb: "green",
    format: "Podcast",
    tag: "Patrimonio · Ep. 12",
    title: "Eva Ramos: cómo se gestiona un Bien de Interés Cultural",
    summary:
      "El día a día de quien gestiona un BIC sin que se caiga ni se convierta en parque temático.",
    meta: ["48 MIN", "19 ABR"],
  },
];
