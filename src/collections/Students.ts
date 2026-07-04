import type { CollectionConfig } from "payload";

/**
 * Alumnos. NO usa la auth de Payload: la sesión del área privada se gestiona
 * con cookie firmada propia (src/lib/session.ts) + enlace mágico. Los alumnos
 * se crean al comprar (hito 4.4). El acceso a esta colección por REST queda
 * restringido a admins; el front usa la Local API (que omite el control de acceso).
 */
export const Students: CollectionConfig = {
  slug: "students",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "municipio", "cargo", "createdAt"],
    group: "Alumnado",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    { name: "name", type: "text" },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%", description: "Teléfono (checkout)." } },
        { name: "pais", type: "text", admin: { width: "50%", description: "País (checkout)." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "municipio", type: "text", admin: { width: "50%", description: "Municipio (checkout)." } },
        {
          name: "cargo",
          type: "select",
          admin: { width: "50%", description: "Cargo / situación (checkout)." },
          options: [
            { label: "En gobierno", value: "gobierno" },
            { label: "Oposición", value: "oposicion" },
            { label: "Candidato/a", value: "candidato" },
            { label: "Técnico/a municipal", value: "tecnico" },
            { label: "Otro", value: "otro" },
          ],
        },
      ],
    },
    {
      name: "stripeCustomerId",
      type: "text",
      admin: { readOnly: true, description: "ID de cliente en Stripe." },
    },
    {
      name: "loginNonce",
      type: "text",
      admin: { hidden: true },
    },
  ],
};
