import type { CollectionConfig } from "payload";

/**
 * Alumnos. Colección de auth independiente (no acceden a /admin).
 * El login por enlace mágico se implementa sobre esta colección en el hito 4.3;
 * de momento queda con auth básica para poder crear alumnos desde el panel.
 */
export const Students: CollectionConfig = {
  slug: "students",
  auth: true,
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
    { name: "name", type: "text" },
    {
      name: "stripeCustomerId",
      type: "text",
      admin: { readOnly: true, description: "ID de cliente en Stripe." },
    },
  ],
};
