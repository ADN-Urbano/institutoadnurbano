import type { Access, CollectionConfig } from "payload";

const canEdit: Access = ({ req }) => Boolean(req.user);

/** Cursos del Instituto. Alimenta el catálogo (/formacion) y la landing (/curso/[slug]). */
export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "published"],
    group: "Contenido",
  },
  access: {
    read: () => true,
    create: canEdit,
    update: canEdit,
    delete: canEdit,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: { width: "70%", description: "Nombre corto (catálogo, migas, título de pestaña). Ej.: Plan de dinamización comercial" },
        },
        {
          name: "accent",
          type: "text",
          admin: { width: "30%", description: "Palabra del nombre corto en turquesa." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "headline",
          type: "text",
          admin: { width: "70%", description: "Titular largo del hero de la landing. Si se deja vacío, usa el nombre corto." },
        },
        {
          name: "headlineAccent",
          type: "text",
          admin: { width: "30%", description: "Palabra del titular del hero en turquesa." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "slug", type: "text", required: true, unique: true, index: true, admin: { width: "100%" } },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    { name: "description", type: "richText" },

    {
      type: "collapsible",
      label: "Publicación",
      fields: [
        { name: "published", type: "checkbox", defaultValue: false, label: "Publicado (visible al público)" },
      ],
    },

    {
      type: "collapsible",
      label: "Atributos del catálogo",
      fields: [
        {
          type: "row",
          fields: [
            { name: "durationLabel", type: "text", admin: { width: "50%", description: "Duración" } },
            { name: "levelLabel", type: "text", admin: { width: "50%", description: "Nivel" } },
          ],
        },
      ],
    },

    {
      type: "collapsible",
      label: "Profesor",
      fields: [
        {
          name: "instructor",
          type: "group",
          fields: [
            { name: "name", type: "text" },
            { name: "bio", type: "text", admin: { description: "Línea breve (catálogo / pie del avatar)." } },
            { name: "tagline", type: "textarea", admin: { description: "Línea del bloque \"Imparte\" del hero." } },
            { name: "photo", type: "upload", relationTo: "media", admin: { description: "Foto del profesor (\"Quién te acompaña\")." } },
            { name: "experienceLabel", type: "text", admin: { description: "Ej.: Más de 10 años de experiencia" } },
            {
              name: "longBio",
              type: "array",
              label: "Bio larga (\"Quién te acompaña\")",
              labels: { singular: "Párrafo", plural: "Párrafos" },
              fields: [{ name: "paragraph", type: "textarea", required: true }],
            },
            {
              name: "specialties",
              type: "array",
              label: "Especialidades",
              fields: [{ name: "item", type: "text", required: true }],
            },
          ],
        },
      ],
    },

    {
      type: "collapsible",
      label: "Vídeo de presentación",
      fields: [
        {
          name: "videoIntro",
          type: "group",
          fields: [
            { name: "title", type: "text", defaultValue: "Descubre más sobre el programa" },
            { name: "desc", type: "textarea" },
            { name: "label", type: "text", defaultValue: "Vídeo presentación curso" },
          ],
        },
      ],
    },

    {
      name: "feats",
      type: "array",
      label: "Incluye (tarjeta de compra)",
      labels: { singular: "Punto", plural: "Puntos" },
      fields: [{ name: "feature", type: "text", required: true }],
    },

    {
      type: "collapsible",
      label: "Clases en directo (Teams)",
      fields: [
        {
          name: "teams",
          type: "group",
          fields: [
            { name: "title", type: "text" },
            { name: "desc", type: "textarea" },
          ],
        },
      ],
    },

    {
      name: "modules",
      type: "array",
      label: "Programa (módulos)",
      labels: { singular: "Módulo", plural: "Módulos" },
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            { name: "num", type: "text", admin: { width: "20%", description: "Ej.: 01" } },
            { name: "name", type: "text", required: true, admin: { width: "80%" } },
          ],
        },
        {
          name: "infoLabel",
          type: "text",
          admin: { description: "Resumen del módulo. Ej.: 5 LECCIONES · 1H 12 MIN" },
        },
        {
          name: "description",
          type: "textarea",
          admin: { description: "Párrafo del módulo que se muestra al abrir el acordeón." },
        },
        {
          name: "lessons",
          type: "array",
          labels: { singular: "Lección", plural: "Lecciones" },
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea" },
            {
              type: "row",
              fields: [
                {
                  name: "kind",
                  type: "select",
                  defaultValue: "video",
                  admin: { width: "50%" },
                  options: [
                    { label: "Vídeo", value: "video" },
                    { label: "Texto / Lectura", value: "text" },
                    { label: "Material", value: "doc" },
                  ],
                },
                { name: "durationLabel", type: "text", admin: { width: "50%", description: "Ej.: 14:32 · 6 min lectura" } },
              ],
            },
            { name: "bunnyVideoId", type: "text", admin: { condition: (_, s) => s?.kind === "video", description: "ID del vídeo en Bunny Stream." } },
            { name: "material", type: "upload", relationTo: "media", admin: { condition: (_, s) => s?.kind === "doc" } },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              admin: { condition: (_, s) => s?.kind === "text", description: "Foto destacada de la lectura (opcional)." },
            },
            {
              name: "content",
              type: "richText",
              admin: { condition: (_, s) => s?.kind === "text", description: "Texto de la lección. Admite encabezados, listas e imágenes." },
            },
          ],
        },
      ],
    },

    {
      type: "collapsible",
      label: "Para quién (es / no es)",
      fields: [
        {
          name: "forYes",
          type: "group",
          label: "Es para ti si…",
          fields: [
            { name: "title", type: "text" },
            { name: "items", type: "array", fields: [{ name: "item", type: "text", required: true }] },
          ],
        },
        {
          name: "forNo",
          type: "group",
          label: "NO es para ti si…",
          fields: [
            { name: "title", type: "text" },
            { name: "items", type: "array", fields: [{ name: "item", type: "text", required: true }] },
          ],
        },
      ],
    },

    {
      name: "outcomes",
      type: "array",
      label: "Al terminar tendrás listo…",
      labels: { singular: "Resultado", plural: "Resultados" },
      fields: [{ name: "item", type: "text", required: true }],
    },

    {
      name: "programPdfLabel",
      type: "text",
      defaultValue: "Descargar programa completo PDF",
      admin: { description: "Texto del botón de descarga del programa (enlace placeholder)." },
    },

    {
      name: "faq",
      type: "array",
      label: "Preguntas frecuentes",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },

    {
      type: "collapsible",
      label: "Webinar gratuito",
      fields: [
        {
          name: "webinar",
          type: "group",
          fields: [
            { name: "desc", type: "textarea" },
            { name: "nextSessionLabel", type: "text", admin: { description: "Ej.: 1 de julio 2026 a las 20:00 h" } },
            { name: "durationLabel", type: "text", defaultValue: "45 minutos" },
            { name: "cta", type: "text", defaultValue: "Reservar mi plaza en el webinar" },
          ],
        },
      ],
    },

    {
      type: "collapsible",
      label: "CTA final",
      fields: [
        {
          name: "finalCta",
          type: "group",
          fields: [
            { name: "title", type: "text" },
            { name: "desc", type: "textarea" },
            { name: "seatsTitle", type: "text", defaultValue: "Solo 30 plazas disponibles" },
            { name: "seatsDesc", type: "textarea" },
            { name: "cta", type: "text", defaultValue: "Reservar mi plaza" },
          ],
        },
      ],
    },
  ],
};
