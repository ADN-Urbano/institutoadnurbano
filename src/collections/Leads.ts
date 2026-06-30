import type { Access, CollectionConfig } from "payload";

const canEdit: Access = ({ req }) => Boolean(req.user);

/** Campos de un touch de atribución (first o last). Reutilizado en dos grupos. */
const attributionFields = [
  {
    type: "row" as const,
    fields: [
      { name: "source", type: "text" as const, admin: { width: "50%" } },
      { name: "medium", type: "text" as const, admin: { width: "50%" } },
    ],
  },
  {
    type: "row" as const,
    fields: [
      { name: "campaign", type: "text" as const, admin: { width: "50%" } },
      { name: "content", type: "text" as const, admin: { width: "50%" } },
    ],
  },
  {
    type: "row" as const,
    fields: [
      { name: "term", type: "text" as const, admin: { width: "50%" } },
      { name: "date", type: "text" as const, admin: { width: "50%", description: "ISO del touch." } },
    ],
  },
  { name: "landingPage", type: "text" as const },
  { name: "referrer", type: "text" as const },
];

/**
 * Leads (captación). Una sola colección para todos los lead magnets vía `type`.
 * La crea el endpoint público `/api/leads` con la Local API (que omite el
 * control de acceso); por REST solo la admin puede leer/editar.
 *
 * NO usa la auth de Payload. La atribución (first/last touch + click IDs) se
 * captura en cliente y se persiste aquí para el reporting por canal hasta la venta.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    // Vista "por origen": source/campaign/content al frente. En el listado usa
    // "Filters" para acotar (p. ej. firstTouch.source = instagram) y ordena por
    // cualquier columna. firstTouch.content = el anuncio concreto (utm_content).
    defaultColumns: [
      "email",
      "type",
      "firstTouch.source",
      "firstTouch.campaign",
      "firstTouch.content",
      "situacion",
      "createdAt",
    ],
    group: "Marketing",
    description:
      "Origen de cada lead en las columnas first touch. Filtra por 'Firsttouch → Source' (instagram/linkedin/…) y 'Firsttouch → Content' (el anuncio) para ver qué creatividad trae cada lead. El origen llega a la venta vía el campo Enrollment.",
  },
  access: {
    create: () => true, // la crea el endpoint público /api/leads
    read: canEdit,
    update: canEdit,
    delete: canEdit,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "email", type: "email", required: true, index: true, admin: { width: "50%" } },
        { name: "name", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%" } },
        { name: "municipio", type: "text", admin: { width: "50%" } },
      ],
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Webinar", value: "webinar" },
        { label: "Descarga PDF", value: "descarga-pdf" },
        { label: "Contacto", value: "contacto" },
        { label: "Lista de espera", value: "lista-espera" },
      ],
    },
    {
      name: "situacion",
      type: "select",
      options: [
        { label: "En gobierno", value: "gobierno" },
        { label: "Oposición", value: "oposicion" },
        { label: "Candidato/a", value: "candidato" },
        { label: "Técnico/a municipal", value: "tecnico" },
        { label: "Otro", value: "otro" },
      ],
    },
    { name: "comoNosConociste", type: "text", admin: { description: "Autoreportado por el lead." } },
    { name: "message", type: "textarea", admin: { description: "Mensaje del formulario de contacto." } },
    { name: "courseSlug", type: "text", admin: { description: "Curso de contexto (lista de espera / ficha)." } },
    {
      name: "offerDeadline",
      type: "date",
      admin: { description: "Webinar: registro + 72 h (cuenta atrás de la oferta).", readOnly: true },
    },
    {
      name: "enrollment",
      type: "relationship",
      relationTo: "enrollments",
      admin: { description: "Inscripción enlazada tras la compra (atribución hasta la venta)." },
    },
    {
      type: "collapsible",
      label: "Atribución · first touch",
      admin: { initCollapsed: true },
      fields: [{ name: "firstTouch", type: "group", fields: attributionFields }],
    },
    {
      type: "collapsible",
      label: "Atribución · last touch",
      admin: { initCollapsed: true },
      fields: [{ name: "lastTouch", type: "group", fields: attributionFields }],
    },
    {
      name: "clickIds",
      type: "group",
      admin: { description: "IDs de clic de plataformas de ads." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "fbclid", type: "text", admin: { width: "33%" } },
            { name: "gclid", type: "text", admin: { width: "33%" } },
            { name: "liFatId", type: "text", admin: { width: "34%" } },
          ],
        },
      ],
    },
  ],
};
