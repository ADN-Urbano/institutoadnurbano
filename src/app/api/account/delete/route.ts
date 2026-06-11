import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { getCurrentStudent, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

/** Elimina la cuenta del alumno y sus inscripciones (derecho de supresión RGPD). */
export async function POST() {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const payload = await getPayloadClient();
  const enr = await payload.find({
    collection: "enrollments",
    where: { student: { equals: student.id } },
    limit: 200,
  });
  for (const e of enr.docs) {
    await payload.delete({ collection: "enrollments", id: e.id });
  }
  await payload.delete({ collection: "students", id: student.id });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return res;
}
