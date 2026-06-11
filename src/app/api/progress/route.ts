import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getCurrentStudent } from "@/lib/session";

/** Marca/desmarca una lección como completada en la inscripción del alumno. */
export async function POST(req: Request) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    enrollmentId?: string;
    lessonId?: string;
    completed?: boolean;
  };
  const { enrollmentId, lessonId } = body;
  if (!enrollmentId || !lessonId) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const payload = await getPayloadClient();
  let enrollment;
  try {
    enrollment = await payload.findByID({ collection: "enrollments", id: enrollmentId, depth: 0 });
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  // Solo el dueño de la inscripción puede modificar su progreso.
  const ownerId =
    typeof enrollment.student === "object" && enrollment.student
      ? (enrollment.student as { id: string | number }).id
      : enrollment.student;
  if (String(ownerId) !== String(student.id)) {
    return NextResponse.json({ error: "Prohibido" }, { status: 403 });
  }

  const current = Array.isArray(enrollment.completedLessons)
    ? (enrollment.completedLessons as unknown[]).map(String)
    : [];
  const set = new Set(current);
  if (body.completed) set.add(String(lessonId));
  else set.delete(String(lessonId));
  const completedLessons = [...set];

  await payload.update({
    collection: "enrollments",
    id: enrollmentId,
    data: { completedLessons },
  });

  return NextResponse.json({ ok: true, completedLessons });
}
