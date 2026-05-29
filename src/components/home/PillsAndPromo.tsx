import Link from "next/link";
import { pills, coursePromo } from "@/data/home";
import SectionHead from "@/components/ui/SectionHead";
import { PlayIcon } from "@/components/ui/icons";

const pillThumbBg: Record<string, string> = {
  coral: "bg-coral",
  "turquoise-deep": "bg-turquoise-deep",
  yellow: "bg-yellow",
  turquoise: "bg-turquoise",
  green: "bg-green",
};

export default function PillsAndPromo() {
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-12 mb-24 max-lg:grid-cols-1 max-lg:gap-8 max-sm:mb-14">
      {/* Píldoras */}
      <div>
        <SectionHead
          eyebrow="·· Píldoras"
          title={
            <>
              De las redes a tu <span className="text-turquoise">biblioteca</span>
            </>
          }
          link={{ label: "Ver todas →", href: "/recursos?formato=pildora" }}
        />
        <div className="flex flex-col gap-4">
          {pills.map((p, i) => (
            <article
              key={i}
              className="grid grid-cols-[168px_1fr] gap-6 p-5 border border-rule rounded-[16px] cursor-pointer transition-all bg-white hover:border-turquoise hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] max-sm:grid-cols-1"
            >
              <div className={`aspect-[4/5] rounded-[10px] relative max-sm:aspect-video ${pillThumbBg[p.thumb]}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-[var(--shadow-md)]">
                    <PlayIcon className="w-4 h-4 text-ink ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-mono text-[11px] font-medium text-turquoise tracking-[0.04em] uppercase mb-2">
                  {p.tag}
                </span>
                <h3 className="font-heading font-bold text-[20px] leading-[1.25] tracking-[-0.01em] mb-2.5">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-soft leading-[1.5] mb-3">{p.desc}</p>
                <div className="font-mono text-xs text-ink-muted flex gap-3">
                  {p.meta.map((m, j) => (
                    <span key={j}>{m}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Promo del curso */}
      <aside className="relative overflow-hidden bg-coral text-white rounded-3xl p-8 sticky top-[100px] self-start max-lg:static">
        <span
          aria-hidden
          className="absolute -bottom-20 -right-20 w-[200px] h-[200px] rounded-full bg-white/[0.12]"
        />
        <div className="relative z-[1]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-[22px]">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse-dot" />
            <span>{coursePromo.eyebrow}</span>
          </div>
          <h3 className="font-display font-extrabold text-[38px] tracking-[-0.02em] leading-[0.95] uppercase mb-3.5">
            {coursePromo.title}
          </h3>
          <p className="text-sm leading-[1.55] opacity-85 mb-[22px]">{coursePromo.desc}</p>
          <div className="flex flex-col gap-3 py-4 border-y border-white/[0.18] mb-[22px]">
            {coursePromo.meta.map(([k, v]) => (
              <div key={k} className="flex justify-between text-[13px] font-mono">
                <span className="opacity-70">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <Link
            href={coursePromo.cta.href}
            className="block bg-white text-ink text-center py-3.5 rounded-[10px] font-bold text-sm transition-all hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
          >
            {coursePromo.cta.label}
          </Link>
          <div className="text-center mt-3 font-mono text-xs opacity-75 cursor-pointer">
            {coursePromo.secondary}
          </div>
        </div>
      </aside>
    </section>
  );
}
