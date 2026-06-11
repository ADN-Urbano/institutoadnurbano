import { NextResponse } from "next/server";

function fmt(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
function esc(s: string): string {
  return s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

/** Genera un evento de calendario (.ics) para una sesión en directo. */
export function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const startStr = p.get("start");
  if (!startStr) return new NextResponse("Falta start", { status: 400 });

  const title = p.get("title") || "Sesión en directo · ADN Local";
  const start = new Date(startStr);
  if (Number.isNaN(start.getTime())) return new NextResponse("Fecha no válida", { status: 400 });
  const durMin = Number(p.get("dur") || 90);
  const end = new Date(start.getTime() + durMin * 60000);
  const url = p.get("url") || "";
  const desc = p.get("desc") || "";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ADN Local//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}-adnlocal@adnlocal.es`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(title)}`,
    desc || url ? `DESCRIPTION:${esc([desc, url].filter(Boolean).join("\n"))}` : "",
    url ? `URL:${esc(url)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sesion-adn-local.ics"',
    },
  });
}
