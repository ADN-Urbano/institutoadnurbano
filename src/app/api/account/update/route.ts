import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getCurrentStudent } from "@/lib/session";

/** Actualiza el perfil del alumno (nombre). */
export async function POST(req: Request) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { name?: string };
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";

  const payload = await getPayloadClient();
  await payload.update({ collection: "students", id: student.id, data: { name } });
  return NextResponse.json({ ok: true, name });
}
