import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, isFullRefund } from "@/lib/stripe";
import { getPayloadClient } from "@/lib/payload";
import { createMagicToken, newNonce } from "@/lib/session";
import { sendWelcome } from "@/lib/email";

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

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    try {
      await revokeRefund(charge);
    } catch (err) {
      console.error("[stripe webhook] error al procesar reembolso:", err);
      // 500 → Stripe reintentará el evento.
      return NextResponse.json({ error: "Error al procesar reembolso." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function fulfillCheckout(session: Stripe.Checkout.Session) {
  // La metadata de Stripe es siempre texto; los IDs de Payload son integer.
  const courseId = Number(session.metadata?.courseId);
  const editionId = Number(session.metadata?.editionId);
  const email = (session.customer_details?.email || session.customer_email)?.toLowerCase().trim();
  const name = session.customer_details?.name ?? undefined;
  const customerId = typeof session.customer === "string" ? session.customer : undefined;
  const paymentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.id;

  if (!courseId || Number.isNaN(courseId) || !email) {
    console.error("[stripe webhook] sesión sin courseId/email válidos", { courseId, email });
    return;
  }
  if (!editionId || Number.isNaN(editionId)) {
    // Sin edición no podemos crear el enrollment correctamente; no reintentar.
    console.error("[stripe webhook] sesión sin editionId válido", { courseId, editionId, email });
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

  // 2) Enrollment idempotente por (alumno, edición); no duplicar en reintentos.
  const existing = await payload.find({
    collection: "enrollments",
    where: {
      student: { equals: student.id },
      edition: { equals: editionId },
    },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    console.log("[stripe webhook] enrollment ya existe, omito", { email, editionId });
    return;
  }

  // Guard secundario: si ya existe una inscripción con este pago, omitir.
  const byPayment = await payload.find({
    collection: "enrollments",
    where: { stripePaymentId: { equals: paymentId } },
    limit: 1,
  });
  if (byPayment.docs.length > 0) {
    console.log("[stripe webhook] enrollment con este pago ya existe, omito", { email, paymentId });
    return;
  }

  await payload.create({
    collection: "enrollments",
    data: {
      student: student.id,
      course: courseId,
      edition: editionId,
      status: "active",
      purchasedAt: new Date().toISOString(),
      stripePaymentId: paymentId,
    },
  });
  console.log("[stripe webhook] inscripción creada", { email, courseId, editionId });

  // Email de bienvenida con acceso directo (enlace mágico de un solo uso).
  try {
    const nonce = newNonce();
    await payload.update({ collection: "students", id: student.id, data: { loginNonce: nonce } });
    const token = createMagicToken(String(student.id), nonce);
    const rawBase = (process.env.NEXT_PUBLIC_SERVER_URL || "https://www.adnlocal.es").trim().replace(/\/+$/, "");
    const base = /^https?:\/\//.test(rawBase) ? rawBase : `https://${rawBase}`;
    const link = `${base}/api/auth/verify?token=${encodeURIComponent(token)}`;
    const course = await payload.findByID({ collection: "courses", id: courseId, depth: 0 });
    const title = (course as { title?: string }).title ?? "tu curso";
    await sendWelcome(email, link, title);
  } catch (err) {
    // No bloquear el alta por un fallo de email; el alumno puede entrar por /acceder.
    console.error("[stripe webhook] fallo al enviar email de bienvenida:", err);
  }
}

async function revokeRefund(charge: Stripe.Charge) {
  // Solo revocamos en reembolsos COMPLETOS; los parciales no cortan el acceso.
  if (!isFullRefund(charge)) {
    console.log("[stripe webhook] reembolso parcial, no revoco acceso", { charge: charge.id });
    return;
  }

  // El payment_intent es un id de Stripe (texto, pi_...); nunca Number().
  const paymentIntentId =
    typeof charge.payment_intent === "string" ? charge.payment_intent : null;
  if (!paymentIntentId) {
    console.log("[stripe webhook] charge sin payment_intent string, omito", { charge: charge.id });
    return;
  }

  const payload = await getPayloadClient();

  const found = await payload.find({
    collection: "enrollments",
    where: { stripePaymentId: { equals: paymentIntentId } },
    limit: 1,
  });

  if (found.docs.length === 0) {
    console.log(
      `[stripe webhook] Enrollment no encontrada para payment_intent ${paymentIntentId}, omito`,
    );
    return;
  }

  const enrollment = found.docs[0];
  if ((enrollment as { status?: string }).status === "refunded") {
    console.log("[stripe webhook] enrollment ya reembolsada, omito", { id: enrollment.id });
    return;
  }

  await payload.update({
    collection: "enrollments",
    id: enrollment.id,
    data: { status: "refunded" },
  });
  console.log(`[stripe webhook] Enrollment ${enrollment.id} reembolsada OK`);
}
