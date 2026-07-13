import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getCurrentStudent } from "@/lib/session";

/** Actualiza el perfil del alumno (nombre y apellidos, teléfono, municipio, país). */
export async function POST(req: Request) {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    phone?: string;
    municipio?: string;
    pais?: string;
  };
  const clean = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const data = {
    name: clean(body.name),
    phone: clean(body.phone, 40),
    municipio: clean(body.municipio),
    pais: clean(body.pais),
  };

  const payload = await getPayloadClient();
  await payload.update({ collection: "students", id: student.id, data });
  return NextResponse.json({ ok: true, ...data });
}
