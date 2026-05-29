import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Seed de desarrollo: crea el usuario admin inicial y el curso estrella.
 * Protegido por token (?secret=PAYLOAD_SECRET) y deshabilitado en producción.
 * Idempotente: si el curso ya existe, lo actualiza.
 */

const ADMIN_EMAIL = "admin@adnlocal.es";
const ADMIN_PASSWORD = "adnlocal-dev-2026";

const flagship = {
  slug: "plan-dinamizacion-comercial",
  title: "Cómo diseñar un plan de dinamización comercial que funcione",
  accent: "comercial",
  edition: "Curso 01 · Edición Junio 2026",
  summary:
    "Ocho semanas para aprender, paso a paso y con casos reales, cómo hacer un plan de comercio que de verdad cambie la actividad de un municipio. No es teoría: al terminar tendrás tu propio plan listo para presentar.",
  priceCents: 45000,
  oldPriceCents: 59000,
  priceNote: "IVA inc.",
  status: "open",
  statusLabel: "Inscripción abierta · 16 plazas",
  published: true,
  startLabel: "29 jun",
  durationLabel: "8 sem.",
  seatsLabel: "14 / 30",
  levelLabel: "Inter.",
  instructor: {
    name: "Gerardo Sánchez Romero",
    bio: "Director de ADN Urbano · 14 años asesorando a más de 80 ayuntamientos",
  },
  feats: [
    "8 módulos · 42 lecciones en vídeo",
    "8 sesiones en directo por Teams",
    "Plantillas y materiales descargables",
    "Acceso a la comunidad de Slack",
    "Tutorización individual",
    "Certificado de finalización",
    "Acceso de por vida al contenido",
  ].map((feature) => ({ feature })),
  teams: {
    title: "Las clases en directo se imparten por Microsoft Teams",
    desc: "Todos los miércoles a las 19:00 (CET) durante las 8 semanas. Si no puedes asistir, las sesiones se graban y se publican en tu área en menos de 24 horas.",
  },
  modules: [
    {
      num: "01",
      name: "Diagnóstico: cómo entender de verdad qué pasa en tu municipio",
      lessons: [
        { title: "1.1 — El error más común: confundir intuición con datos", kind: "video", durationLabel: "14:32" },
        { title: "1.2 — Los seis indicadores que sí importan (y dónde sacarlos gratis)", kind: "video", durationLabel: "18:05" },
        { title: "1.3 — Cómo hacer un mapa comercial en una tarde", kind: "video", durationLabel: "12:48" },
        { title: "1.4 — Plantilla descargable: ficha de diagnóstico", kind: "doc", durationLabel: "XLSX" },
        { title: "1.5 — Sesión en directo · Miércoles 1 julio · 19:00", kind: "live", durationLabel: "~90 MIN" },
      ],
    },
    { num: "02", name: "Visión y objetivos: qué quieres conseguir y cómo lo medirás", lessons: [] },
    { num: "03", name: "El árbol de medidas: del objetivo a la acción concreta", lessons: [] },
    { num: "04", name: "Presupuesto y cronograma: hacer realista lo ambicioso", lessons: [] },
    { num: "05", name: "Gobernanza: cómo montar la mesa público-privada que funciona", lessons: [] },
    { num: "06", name: "Comunicación del plan: vender por dentro y por fuera", lessons: [] },
    { num: "07", name: "Ejecución y seguimiento: que el plan no se quede en cajón", lessons: [] },
    { num: "08", name: "Tu plan: presentación final con feedback personalizado", lessons: [] },
  ],
  forYes: {
    title: "Trabajas en lo local y quieres dejar de improvisar",
    items: [
      "Eres concejal de comercio, dinamización o desarrollo local y necesitas presentar un plan creíble.",
      "Eres técnico municipal y quieres que tu trabajo deje huella, no que se quede en informes.",
      "Eres consultor o asesor y quieres una metodología contrastada para tus clientes.",
      "Diriges una asociación de comerciantes y necesitas profesionalizar la interlocución.",
    ].map((item) => ({ item })),
  },
  forNo: {
    title: "Buscas teoría pura o atajos mágicos",
    items: [
      "Quieres un curso solo en vídeo sin participar en directos.",
      "Esperas plantillas mágicas que se aplican sin pensar al contexto.",
      "Buscas un programa académico con bibliografía extensa.",
    ].map((item) => ({ item })),
  },
  faq: [
    { question: "¿Y si no puedo asistir a un directo?", answer: "Todas las sesiones se graban y quedan disponibles en tu área privada en menos de 24 horas." },
    { question: "¿Necesito tener Microsoft Teams instalado?", answer: "No. Puedes acceder desde el navegador con el enlace que te enviamos cada semana." },
    { question: "¿Hay descuento para grupos del mismo ayuntamiento?", answer: "Sí. A partir de tres personas del mismo organismo, descuento del 20%. Escríbenos." },
    { question: "¿Se puede pagar a plazos?", answer: "Sí. Pago único o tres cuotas mensuales sin intereses." },
  ],
};

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Deshabilitado en producción" }, { status: 403 });
  }
  const secret = new URL(req.url).searchParams.get("secret");
  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const out: Record<string, unknown> = {};

  // 1) Usuario admin (si no hay ninguno)
  const users = await payload.find({ collection: "users", limit: 1 });
  if (users.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Equipo ADN", role: "admin" },
    });
    out.admin = { created: true, email: ADMIN_EMAIL, password: ADMIN_PASSWORD };
  } else {
    out.admin = { created: false, note: "Ya existe al menos un usuario admin." };
  }

  // 2) Curso estrella (upsert por slug)
  const existing = await payload.find({
    collection: "courses",
    where: { slug: { equals: flagship.slug } },
    limit: 1,
  });
  if (existing.totalDocs > 0) {
    await payload.update({ collection: "courses", id: existing.docs[0].id, data: flagship as never });
    out.course = { updated: true, slug: flagship.slug };
  } else {
    await payload.create({ collection: "courses", data: flagship as never });
    out.course = { created: true, slug: flagship.slug };
  }

  return NextResponse.json({ ok: true, ...out });
}
