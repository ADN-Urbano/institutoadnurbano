import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getPayloadClient } from "@/lib/payload";
import { getCurrentStudent } from "@/lib/session";
import type { CourseDoc } from "@/lib/courses";

export const dynamic = "force-dynamic";

/**
 * Crea una Checkout Session de Stripe para un curso (por slug). El botón
 * "Inscribirme" del landing apunta aquí. El precio NUNCA viene del cliente: se
 * lee del curso en Payload. El alta del alumno la hace el webhook tras el pago.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { slug?: string };
  const slug = body.slug?.trim();
  if (!slug) {
    return NextResponse.json({ error: "Falta el curso." }, { status: 400 });
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
    return NextResponse.json({ error: "Curso no encontrado." }, { status: 404 });
  }
  if (course.status !== "open") {
    return NextResponse.json({ error: "Este curso aún no está abierto a inscripción." }, { status: 409 });
  }
  if (!course.priceCents || course.priceCents < 50) {
    return NextResponse.json({ error: "Precio del curso no configurado." }, { status: 409 });
  }

  // Prefill del email si el alumno ya tiene sesión (recompra / curso adicional).
  const student = await getCurrentStudent();
  const email = (student as { email?: string } | null)?.email;
  const stripeCustomerId = (student as { stripeCustomerId?: string } | null)?.stripeCustomerId;

  const base = process.env.NEXT_PUBLIC_SERVER_URL || new URL(req.url).origin;

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
            unit_amount: course.priceCents,
            product_data: {
              name: course.title,
              description: course.summary?.slice(0, 300) || undefined,
            },
          },
        },
      ],
      allow_promotion_codes: true,
      // Para activar IVA automático: descomenta y habilita Stripe Tax en el dashboard.
      // automatic_tax: { enabled: true },
      ...(stripeCustomerId
        ? { customer: stripeCustomerId }
        : email
          ? { customer_email: email }
          : {}),
      metadata: { courseId: String(course.id), slug: course.slug },
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
