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
