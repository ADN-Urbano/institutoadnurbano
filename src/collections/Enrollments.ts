import type { CollectionConfig } from "payload";

/** Inscripción de un alumno a un curso (creada por el webhook de Stripe en 4.4). */
export const Enrollments: CollectionConfig = {
  slug: "enrollments",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["student", "course", "status", "purchasedAt"],
    group: "Alumnado",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "student", type: "relationship", relationTo: "students", required: true },
    { name: "course", type: "relationship", relationTo: "courses", required: true },
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          defaultValue: "active",
          admin: { width: "50%" },
          options: [
            { label: "Activa", value: "active" },
            { label: "Reembolsada", value: "refunded" },
          ],
        },
        { name: "purchasedAt", type: "date", admin: { width: "50%" } },
      ],
    },
    { name: "stripePaymentId", type: "text", admin: { readOnly: true } },
    {
      name: "completedLessons",
      type: "json",
      defaultValue: [],
      admin: { description: "IDs de lecciones completadas." },
    },
    {
      type: "row",
      fields: [
        { name: "completedAt", type: "date", admin: { width: "50%" } },
        { name: "certificateUrl", type: "text", admin: { width: "50%", readOnly: true } },
      ],
    },
  ],
};
