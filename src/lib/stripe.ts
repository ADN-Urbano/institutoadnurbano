import Stripe from "stripe";

let cached: Stripe | null = null;

/** Cliente de Stripe (servidor). Lee STRIPE_SECRET_KEY del entorno. */
export function getStripe(): Stripe {
  if (!cached) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Falta STRIPE_SECRET_KEY en el entorno.");
    // Sin apiVersion: usamos la versión por defecto fijada por el SDK.
    cached = new Stripe(key);
  }
  return cached;
}

/**
 * Decide si un charge de Stripe corresponde a un reembolso COMPLETO (100% del
 * importe capturado). Devuelve `false` ante reembolsos parciales, sin reembolso
 * o sin captura. Acepta la forma estructural mínima (no `Stripe.Charge` entero)
 * para poder testearla sin instanciar el SDK; un `Stripe.Charge` la satisface.
 */
export function isFullRefund(charge: {
  amount_refunded: number;
  amount_captured: number;
}): boolean {
  return charge.amount_captured > 0 && charge.amount_refunded === charge.amount_captured;
}
