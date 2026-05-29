import type { Access, CollectionConfig } from "payload";

const isAdmin: Access = ({ req }) =>
  (req.user as { role?: string } | null)?.role === "admin";

/** Equipo de ADN Urbano. Acceden al panel /admin. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email", defaultColumns: ["name", "email", "role"] },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};
