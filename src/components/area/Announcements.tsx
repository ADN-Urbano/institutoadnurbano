import type { Announcement } from "@/lib/courses";

const fmt = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Madrid",
});

export default function Announcements({ items }: { items: Announcement[] }) {
  if (!items.length) return null;
  return (
    <section className="mb-8">
      <h2 className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-3">
        ·· Anuncios
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((a, i) => (
          <div key={i} className="border border-rule rounded-xl p-5 bg-bg-soft">
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <div className="font-heading font-bold text-[16px]">{a.title}</div>
              {a.date && (
                <div className="font-mono text-[10px] text-ink-muted uppercase shrink-0">
                  {fmt.format(new Date(a.date))}
                </div>
              )}
            </div>
            <p className="text-sm text-ink-soft leading-[1.55]">{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
