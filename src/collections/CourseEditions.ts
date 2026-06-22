import type { Access, CollectionConfig } from "payload";

const canEdit: Access = ({ req }) => Boolean(req.user);

/**
 * Edición (convocatoria) de un curso. Encapsula todo lo que varía por cohorte:
 * precio, estado, fechas, directos y anuncios. El contenido permanente
 * (módulos, vídeos, textos, instructor, FAQ) vive en `Courses`.
 *
 * Invariante de admin: a lo sumo una edición con `status:"open"` por curso a la vez.
 */
export const CourseEditions: CollectionConfig = {
  slug: "course-editions",
  admin: {
    useAsTitle: "editionLabel",
    defaultColumns: ["editionLabel", "course", "status", "startDate", "priceCents"],
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
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      admin: { description: "Curso padre al que pertenece esta edición." },
    },
    {
      name: "editionLabel",
      type: "text",
      admin: { description: "Ej.: Curso 01 · Edición Junio 2026" },
    },
    {
      type: "collapsible",
      label: "Precio y estado",
      fields: [
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
                { label: "Próximamente", value: "soon" },
                { label: "Inscripción abierta", value: "open" },
                { label: "En curso", value: "running" },
                { label: "Finalizada", value: "past" },
              ],
            },
            { name: "statusLabel", type: "text", admin: { width: "50%", description: "Ej.: Inscripción abierta · 16 plazas" } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "priceCents", type: "number", required: true, admin: { width: "33%", description: "En céntimos (45000 = 450€)." } },
            { name: "oldPriceCents", type: "number", admin: { width: "33%", description: "Precio anterior (tachado)." } },
            { name: "priceNote", type: "text", defaultValue: "IVA inc.", admin: { width: "34%" } },
          ],
        },
        {
          name: "discountLabel",
          type: "text",
          admin: { description: "Etiqueta de descuento del roadmap (ej.: -40%). Si se deja vacío, se calcula desde los precios." },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Fechas y atributos del catálogo",
      fields: [
        {
          type: "row",
          fields: [
            { name: "startDate", type: "date", required: true, admin: { width: "50%", description: "Inicio de acceso al contenido (gate del alumno)." } },
            { name: "endDate", type: "date", admin: { width: "50%", description: "Informativo. NO revoca el acceso." } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "startLabel", type: "text", admin: { width: "50%", description: "Ej.: 29 jun" } },
            { name: "seatsLabel", type: "text", admin: { width: "50%", description: "Ej.: 14 / 30" } },
          ],
        },
      ],
    },
    {
      name: "liveSessions",
      type: "array",
      label: "Clases en directo (Teams)",
      labels: { singular: "Directo", plural: "Directos" },
      admin: { initCollapsed: true },
      fields: [
        { name: "title", type: "text", required: true },
        {
          type: "row",
          fields: [
            { name: "date", type: "date", required: true, admin: { width: "50%" } },
            { name: "teamsLink", type: "text", admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "announcements",
      type: "array",
      label: "Anuncios (área del alumno)",
      labels: { singular: "Anuncio", plural: "Anuncios" },
      admin: { description: "Avisos del profesor que ven los alumnos de esta edición." },
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
