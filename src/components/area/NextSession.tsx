"use client";

import { useEffect, useState } from "react";
import { TeamsIcon } from "@/components/ui/icons";
import type { LiveSession } from "@/lib/courses";

const dateFmt = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Madrid",
});

export default function NextSession({ session }: { session: LiveSession }) {
  const target = new Date(session.date).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const raw = dateFmt.format(new Date(session.date));
  const dateLabel = raw.charAt(0).toUpperCase() + raw.slice(1);

  let countdown = "";
  if (now !== null) {
    const diff = target - now;
    if (diff <= 0) countdown = "En directo ahora";
    else {
      const d = Math.floor(diff / 86_400_000);
      const h = Math.floor((diff % 86_400_000) / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      countdown = d > 0 ? `Faltan ${d} día${d > 1 ? "s" : ""}` : h > 0 ? `Faltan ${h} h ${m} min` : `Faltan ${m} min`;
    }
  }

  const ics =
    `/api/ics?title=${encodeURIComponent(session.title)}` +
    `&start=${encodeURIComponent(session.date)}&dur=90` +
    (session.teamsLink ? `&url=${encodeURIComponent(session.teamsLink)}` : "") +
    `&desc=${encodeURIComponent("Sesión en directo del curso por Microsoft Teams.")}`;

  return (
    <div className="rounded-2xl bg-turquoise-deep text-white p-6 mb-8 flex items-center gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
        <TeamsIcon className="w-6 h-6 text-yellow" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-yellow mb-1">
          Próxima clase en directo{countdown ? ` · ${countdown}` : ""}
        </div>
        <div className="text-[17px] font-bold leading-tight">{session.title}</div>
        <div className="text-[13px] opacity-85 mt-0.5">{dateLabel} (CET)</div>
      </div>
      <div className="flex gap-2 shrink-0 max-md:w-full">
        {session.teamsLink && (
          <a
            href={session.teamsLink}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-ink px-4 py-2.5 rounded-lg text-sm font-semibold transition-transform hover:-translate-y-px max-md:flex-1 max-md:text-center"
          >
            Unirse por Teams
          </a>
        )}
        <a
          href={ics}
          className="border border-white/25 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-white/10 max-md:flex-1 max-md:text-center"
        >
          Añadir al calendario
        </a>
      </div>
    </div>
  );
}
