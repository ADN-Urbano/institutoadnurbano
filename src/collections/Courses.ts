import type { Access, CollectionConfig } from "payload";

const canEdit: Access = ({ req }) => Boolean(req.user);

/** Cursos del Instituto. Alimenta el catálogo (/formacion) y la landing (/curso/[slug]). */
export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "priceCents", "published"],
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
        { name: "slug", type: "text", required: true, unique: true, index: true, admin: { width: "50%" } },
        { name: "edition", type: "text", admin: { width: "50%", description: "Ej.: Curso 01 · Edición Junio 2026" } },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    { name: "description", type: "richText" },

    {
      type: "collapsible",
      label: "Precio y estado",
      fields: [
        {
          type: "row",
          fields: [
            { name: "priceCents", type: "number", required: true, admin: { width: "33%", description: "En céntimos (45000 = 450€)." } },
            { name: "oldPriceCents", type: "number", admin: { width: "33%", description: "Precio anterior (tachado)." } },
            { name: "priceNote", type: "text", defaultValue: "IVA inc.", admin: { width: "34%" } },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "soon",
              admin: { width: "50%" },
              options: [
                { label: "Inscripción abierta", value: "open" },
                { label: "Próximamente", value: "soon" },
              ],
            },
            { name: "statusLabel", type: "text", admin: { width: "50%", description: "Ej.: Inscripción abierta · 16 plazas" } },
          ],
        },
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
            { name: "startLabel", type: "text", admin: { width: "25%", description: "Inicio" } },
            { name: "durationLabel", type: "text", admin: { width: "25%", description: "Duración" } },
            { name: "seatsLabel", type: "text", admin: { width: "25%", description: "Plazas" } },
            { name: "levelLabel", type: "text", admin: { width: "25%", description: "Nivel" } },
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
            { name: "bio", type: "text" },
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
                  admin: { width: "33%" },
                  options: [
                    { label: "Vídeo", value: "video" },
                    { label: "Texto / Lectura", value: "text" },
                    { label: "Material", value: "doc" },
                    { label: "Directo", value: "live" },
                  ],
                },
                { name: "durationLabel", type: "text", admin: { width: "33%", description: "Ej.: 14:32 · 6 min lectura" } },
                { name: "liveDate", type: "date", admin: { width: "34%", condition: (_, s) => s?.kind === "live" } },
              ],
            },
            { name: "bunnyVideoId", type: "text", admin: { condition: (_, s) => s?.kind === "video", description: "ID del vídeo en Bunny Stream." } },
            { name: "teamsLink", type: "text", admin: { condition: (_, s) => s?.kind === "live" } },
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
      name: "faq",
      type: "array",
      label: "Preguntas frecuentes",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "announcements",
      type: "array",
      label: "Anuncios (área del alumno)",
      labels: { singular: "Anuncio", plural: "Anuncios" },
      admin: { description: "Avisos del profesor que ven los alumnos inscritos." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "date", type: "date", admin: { width: "40%" } },
            { name: "title", type: "text", required: true, admin: { width: "60%" } },
          ],
        },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};
