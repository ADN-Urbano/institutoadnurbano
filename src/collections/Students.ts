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
    defaultColumns: ["name", "email", "createdAt"],
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
