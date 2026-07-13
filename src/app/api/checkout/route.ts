import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getPayloadClient } from "@/lib/payload";
import { getCurrentStudent } from "@/lib/session";
import {
  getCourseEditions,
  resolvePurchasableEdition,
  editionLabelClean,
  type CourseDoc,
} from "@/lib/courses";

export const dynamic = "force-dynamic";

/**
 * Crea una Checkout Session de Stripe para un curso (por slug). El botón
 * "Inscribirme" del landing apunta aquí. El precio NUNCA viene del cliente: se
 * lee de la edición elegida en Payload, validando que pertenece al curso y es
 * comprable. El alta del alumno la hace el webhook tras el pago.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { slug?: string; editionId?: string | number };
  const slug = body.slug?.trim();
  if (!slug) {
    return NextResponse.json({ error: "Falta el programa." }, { status: 400 });
  }

  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "courses",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 0,
  });
  const course = res.docs[0] as unknown as (CourseDoc & { id: string }) | undefined;
  if (!course) {
    return NextResponse.json({ error: "Programa no encontrado." }, { status: 404 });
  }

  // El precio NUNCA viene del cliente: se lee de la edición en Payload. El
  // `editionId` del cliente se valida contra las ediciones del curso.
  const editions = await getCourseEditions(course.id);
  const resolved = resolvePurchasableEdition(editions, body.editionId);
  if (resolved.status === "not-found") {
    // El editionId no pertenece a este curso.
    return NextResponse.json({ error: "Edición no encontrada." }, { status: 404 });
  }
  if (resolved.status === "not-purchasable") {
    return NextResponse.json({ error: "Esta edición no está disponible para inscripción." }, { status: 409 });
  }
  if (resolved.status === "none") {
    return NextResponse.json({ error: "Este programa aún no está abierto a inscripción." }, { status: 409 });
  }
  const edition = resolved.edition;
  const editionId = edition.id;
  if (editionId == null) {
    return NextResponse.json({ error: "Edición no encontrada." }, { status: 404 });
  }

  // Prefill del email si el alumno ya tiene sesión (recompra / curso adicional).
  const student = await getCurrentStudent();
  const email = (student as { email?: string } | null)?.email;
  const stripeCustomerId = (student as { stripeCustomerId?: string } | null)?.stripeCustomerId;

  // Normaliza la URL base: tolera falta de protocolo o barra(s) finales para
  // que success_url/cancel_url sean siempre absolutas y válidas para Stripe.
  const rawBase = (process.env.NEXT_PUBLIC_SERVER_URL || "").trim().replace(/\/+$/, "");
  const base = rawBase
    ? /^https?:\/\//.test(rawBase)
      ? rawBase
      : `https://${rawBase}`
    : new URL(req.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Sin payment_method_types: Stripe ofrece los métodos habilitados en el
      // dashboard (tarjeta, Bizum, Klarna…) según elegibilidad.
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: edition.priceCents,
            product_data: {
              name: edition.editionLabel
                ? `${course.title} · ${editionLabelClean(edition.editionLabel)}`
                : course.title,
              description: course.summary?.slice(0, 300) || undefined,
            },
          },
        },
      ],
      allow_promotion_codes: true,
      // Datos del participante: teléfono nativo + municipio/país/cargo como
      // campos personalizados (sin dirección completa). El webhook los guarda en el Student.
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "municipio",
          label: { type: "custom", custom: "Municipio" },
          type: "text",
        },
        {
          key: "pais",
          label: { type: "custom", custom: "País" },
          type: "text",
        },
        {
          key: "cargo",
          label: { type: "custom", custom: "Tu cargo" },
          type: "dropdown",
          dropdown: {
            options: [
              { label: "En gobierno (alcalde/concejal)", value: "gobierno" },
              { label: "En la oposición", value: "oposicion" },
              { label: "Candidato/a", value: "candidato" },
              { label: "Técnico/a municipal", value: "tecnico" },
              { label: "Otro", value: "otro" },
            ],
          },
        },
      ],
      // Para activar IVA automático: descomenta y habilita Stripe Tax en el dashboard.
      // automatic_tax: { enabled: true },
      ...(stripeCustomerId
        ? { customer: stripeCustomerId }
        : email
          ? { customer_email: email }
          : {}),
      // IDs de Payload/Postgres son enteros; la metadata de Stripe es siempre
      // string. El webhook hace Number(metadata.editionId) al leerla.
      metadata: { courseId: String(course.id), editionId: String(editionId), slug: course.slug },
      success_url: `${base}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/curso/${course.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[checkout] error al crear la sesión de Stripe:", detail);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago.", detail },
      { status: 502 },
    );
  }
}
