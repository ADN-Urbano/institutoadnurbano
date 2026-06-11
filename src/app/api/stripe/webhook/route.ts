import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getPayloadClient } from "@/lib/payload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook de Stripe. En `checkout.session.completed`: upsert del Student +
 * creación del Enrollment (idempotente). El email de bienvenida (acceso
 * magic-link + Slack) se conectará con Resend en el hito 4.6.
 *
 * Verifica la firma con STRIPE_WEBHOOK_SECRET. En dev, ese secreto lo da el
 * Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Falta la firma." }, { status: 400 });

  const raw = await req.text(); // cuerpo crudo: imprescindible para verificar la firma
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("[stripe webhook] firma inválida:", (err as Error).message);
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await fulfillCheckout(session);
    } catch (err) {
      console.error("[stripe webhook] error al procesar:", err);
      // 500 → Stripe reintentará el evento.
      return NextResponse.json({ error: "Error al procesar." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function fulfillCheckout(session: Stripe.Checkout.Session) {
  // La metadata de Stripe es siempre texto; los IDs de Payload son integer.
  const courseId = Number(session.metadata?.courseId);
  const email = (session.customer_details?.email || session.customer_email)?.toLowerCase().trim();
  const name = session.customer_details?.name ?? undefined;
  const customerId = typeof session.customer === "string" ? session.customer : undefined;
  const paymentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.id;

  if (!courseId || Number.isNaN(courseId) || !email) {
    console.error("[stripe webhook] sesión sin courseId/email válidos", { courseId, email });
    return;
  }

  const payload = await getPayloadClient();

  // 1) Upsert del alumno por email.
  const found = await payload.find({
    collection: "students",
    where: { email: { equals: email } },
    limit: 1,
  });
  let student = found.docs[0];
  if (!student) {
    student = await payload.create({
      collection: "students",
      data: { email, name, stripeCustomerId: customerId },
    });
  } else if (customerId && !(student as { stripeCustomerId?: string }).stripeCustomerId) {
    student = await payload.update({
      collection: "students",
      id: student.id,
      data: { stripeCustomerId: customerId },
    });
  }

  // 2) Enrollment idempotente (no duplicar si el webhook se reintenta).
  const existing = await payload.find({
    collection: "enrollments",
    where: {
      student: { equals: student.id },
      course: { equals: courseId },
    },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    console.log("[stripe webhook] enrollment ya existe, omito", { email, courseId });
    return;
  }

  await payload.create({
    collection: "enrollments",
    data: {
      student: student.id,
      course: courseId,
      status: "active",
      purchasedAt: new Date().toISOString(),
      stripePaymentId: paymentId,
    },
  });
  console.log("[stripe webhook] inscripción creada", { email, courseId });

  // TODO (4.6): email de bienvenida con Resend (enlace de acceso + Slack).
}
