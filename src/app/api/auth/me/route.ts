import { NextResponse } from "next/server";
import { getCurrentStudent } from "@/lib/session";

/** Estado de sesión del alumno (para el header). */
export async function GET() {
  const student = await getCurrentStudent();
  if (!student) return NextResponse.json({ loggedIn: false });
  return NextResponse.json({
    loggedIn: true,
    name: (student.name as string) || (student.email as string),
  });
}
