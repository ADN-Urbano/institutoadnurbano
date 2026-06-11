import path from "node:path";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { coursesSeed } from "@/data/courses-seed";

/* Helpers mínimos para construir contenido Lexical (texto enriquecido). */
const t = (text: string, format = 0) => ({
  type: "text",
  detail: 0,
  format,
  mode: "normal",
  style: "",
  text,
  version: 1,
});
const p = (...children: unknown[]) => ({
  type: "paragraph",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  textFormat: 0,
  textStyle: "",
  children,
});
const h = (tag: string, text: string) => ({
  type: "heading",
  tag,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: [t(text)],
});
const ul = (items: string[]) => ({
  type: "list",
  listType: "bullet",
  tag: "ul",
  start: 1,
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: items.map((it, i) => ({
    type: "listitem",
    value: i + 1,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [t(it)],
  })),
});
const lex = (children: unknown[]) => ({
  root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children },
});

const lecturaContent = lex([
  p(
    t(
      "Antes de seguir con los vídeos, una lectura corta. El caso que viene es uno de los más citados del curso, y conviene leerlo con calma.",
    ),
  ),
  h("h2", "El cambio que casi nadie cuenta"),
  p(
    t(
      "Cuando se habla de comercio de proximidad se suele contar la versión dramática: cierres, persianas bajadas, centros vacíos. Pero hay municipios que han hecho lo contrario, y casi siempre por las mismas razones.",
    ),
  ),
  p(
    t(
      "La foto de arriba resume la idea: una calle comercial no se reactiva con una sola medida, sino con un conjunto de decisiones pequeñas que se refuerzan entre sí.",
    ),
  ),
  h("h3", "Tres factores que se repiten"),
  ul([
    "Una gobernanza clara: alguien con nombre y apellidos lidera el plan.",
    "Medidas visibles en los primeros 90 días, para generar confianza.",
    "Datos antes y después, para poder demostrar que algo funcionó.",
  ]),
  p(
    t("En la próxima lección en vídeo lo veremos con números. De momento, quédate con la idea de fondo: "),
    t("el comercio se cuida, no se decreta.", 1),
  ),
]);

/**
 * Seed de desarrollo: crea el usuario admin inicial y precarga el catálogo de
 * cursos. Protegido por token (?secret=PAYLOAD_SECRET) y deshabilitado en
 * producción. Idempotente: hace upsert de cada curso por slug.
 */

const ADMIN_EMAIL = "admin@adnlocal.es";
const ADMIN_PASSWORD = "adnlocal-dev-2026";

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
    out.admin = { created: false, note: "Ya existe al menos un usuario." };
  }

  // 2a) Imagen de ejemplo para la lección de lectura (Media)
  let lecturaImageId: string | number | null = null;
  try {
    const mres = await payload.find({
      collection: "media",
      where: { alt: { equals: "Calle comercial (ejemplo de lectura)" } },
      limit: 1,
    });
    lecturaImageId =
      mres.totalDocs > 0
        ? mres.docs[0].id
        : (
            await payload.create({
              collection: "media",
              data: { alt: "Calle comercial (ejemplo de lectura)" },
              filePath: path.join(process.cwd(), "src/seed-assets/lectura-comercio.svg"),
            })
          ).id;
  } catch (e) {
    out.mediaError = String(e).slice(0, 200);
  }

  const lecturaLesson = {
    title: "1.2 — Lectura: por qué algunas calles comerciales sí reviven",
    description:
      "Un caso breve, para leer en 6 minutos, sobre los factores que se repiten en los municipios que recuperan su comercio.",
    kind: "text",
    durationLabel: "6 min lectura",
    content: lecturaContent,
    ...(lecturaImageId ? { image: lecturaImageId } : {}),
  };

  // 2a-bis) Material descargable de ejemplo (CSV) para una lección de tipo "Material"
  let materialId: string | number | null = null;
  try {
    const mat = await payload.find({
      collection: "media",
      where: { alt: { equals: "Plantilla de diagnóstico (ejemplo)" } },
      limit: 1,
    });
    materialId =
      mat.totalDocs > 0
        ? mat.docs[0].id
        : (
            await payload.create({
              collection: "media",
              data: { alt: "Plantilla de diagnóstico (ejemplo)" },
              filePath: path.join(process.cwd(), "src/seed-assets/plantilla-diagnostico.csv"),
            })
          ).id;
  } catch (e) {
    out.materialError = String(e).slice(0, 200);
  }

  // 2b) Cursos (upsert por slug). En el curso estrella inyectamos la lección de lectura.
  const results: { slug: string; action: "created" | "updated" }[] = [];
  for (const course of coursesSeed) {
    let data: Record<string, unknown> = course;
    if (course.slug === "plan-dinamizacion-comercial") {
      const clone = JSON.parse(JSON.stringify(course));
      const mod = clone.modules[0];
      if (!mod.lessons.some((l: { kind?: string }) => l.kind === "text")) {
        mod.lessons.splice(1, 0, lecturaLesson);
        mod.infoLabel = "6 LECCIONES · 1H 18 MIN";
      }
      if (materialId) {
        const docLesson = mod.lessons.find((l: { kind?: string }) => l.kind === "doc");
        if (docLesson) docLesson.material = materialId;
      }
      data = clone;
    }
    const existing = await payload.find({
      collection: "courses",
      where: { slug: { equals: course.slug } },
      limit: 1,
    });
    if (existing.totalDocs > 0) {
      await payload.update({ collection: "courses", id: existing.docs[0].id, data: data as never });
      results.push({ slug: course.slug, action: "updated" });
    } else {
      await payload.create({ collection: "courses", data: data as never });
      results.push({ slug: course.slug, action: "created" });
    }
  }
  out.courses = results;

  // 3) Alumno + inscripción de prueba (para probar el área privada)
  const studentEmail = "alumno@adnlocal.es";
  const sres = await payload.find({
    collection: "students",
    where: { email: { equals: studentEmail } },
    limit: 1,
  });
  const studentId =
    sres.totalDocs > 0
      ? sres.docs[0].id
      : (await payload.create({
          collection: "students",
          data: { email: studentEmail, name: "Alumno de prueba" },
        })).id;
  out.student = { email: studentEmail, created: sres.totalDocs === 0 };

  const flagship = await payload.find({
    collection: "courses",
    where: { slug: { equals: "plan-dinamizacion-comercial" } },
    limit: 1,
  });
  if (flagship.totalDocs > 0) {
    const courseId = flagship.docs[0].id;
    const enr = await payload.find({
      collection: "enrollments",
      where: { and: [{ student: { equals: studentId } }, { course: { equals: courseId } }] },
      limit: 1,
    });
    if (enr.totalDocs === 0) {
      await payload.create({
        collection: "enrollments",
        data: {
          student: studentId,
          course: courseId,
          status: "active",
          purchasedAt: new Date().toISOString(),
        },
      });
      out.enrollment = { created: true };
    } else {
      out.enrollment = { created: false };
    }
  }

  return NextResponse.json({ ok: true, ...out });
}
