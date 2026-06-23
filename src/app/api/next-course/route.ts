import { NextResponse } from "next/server";
import { getNextCourse } from "@/lib/courses";

// Próximo curso disponible para el botón "Próximo curso" del Header. Se consume
// desde el cliente (como /api/auth/me) para que las páginas públicas sigan
// siendo estáticas. Cacheado 5 min: el próximo curso cambia muy de vez en cuando.
export const revalidate = 300;

export async function GET() {
  try {
    const next = await getNextCourse();
    return NextResponse.json({ href: next ? `/curso/${next.slug}` : "/formacion" });
  } catch {
    return NextResponse.json({ href: "/formacion" });
  }
}
