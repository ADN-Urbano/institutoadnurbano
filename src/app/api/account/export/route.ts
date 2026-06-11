import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getCurrentStudent } from "@/lib/session";

/** Exporta los datos del alumno (portabilidad RGPD) como JSON descargable. */
export async function GET() {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const payload = await getPayloadClient();
  const enr = await payload.find({
    collection: "enrollments",
    where: { student: { equals: student.id } },
    depth: 1,
    limit: 100,
  });

  const data = {
    alumno: {
      id: student.id,
      email: student.email,
      nombre: student.name ?? null,
      creadoEl: student.createdAt ?? null,
    },
    inscripciones: enr.docs.map((e) => ({
      curso: typeof e.course === "object" && e.course ? (e.course as { title?: string }).title : e.course,
      estado: e.status,
      compradoEl: e.purchasedAt ?? null,
      leccionesCompletadas: Array.isArray(e.completedLessons) ? e.completedLessons.length : 0,
    })),
    exportadoEl: new Date().toISOString(),
  };

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mis-datos-adn-local.json"',
    },
  });
}
