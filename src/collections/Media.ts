import type { CollectionConfig } from "payload";

/**
 * Subidas: materiales descargables (PDF, plantillas) e imágenes.
 * En dev usa almacenamiento local; en el hito 4.5 se conecta a Cloudflare R2.
 */
export const Media: CollectionConfig = {
  slug: "media",
  upload: true,
  admin: { group: "Contenido" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: "alt", type: "text" }],
};
