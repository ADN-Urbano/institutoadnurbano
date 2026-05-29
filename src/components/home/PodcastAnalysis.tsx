import { podcast, analysis } from "@/data/home";
import SectionHead from "@/components/ui/SectionHead";

function AnalysisChart() {
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#grid2)" />
      <polyline
        points="20,200 60,180 100,160 140,170 180,140 220,120 260,90 300,100 340,70 380,50"
        fill="none"
        stroke="#EAC736"
        strokeWidth="3"
      />
      <polyline
        points="20,210 60,205 100,200 140,195 180,180 220,175 260,160 300,165 340,150 380,140"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        strokeDasharray="4,4"
      />
      <circle cx="380" cy="50" r="6" fill="#EAC736" />
      <text x="20" y="40" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="var(--font-mono)">
        VOLUMEN COMERCIO LOCAL · 2020–2026
      </text>
      <text x="20" y="58" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="var(--font-mono)">
        FUENTE: INE
      </text>
    </svg>
  );
}

export default function PodcastAnalysis() {
  return (
    <section className="grid grid-cols-2 gap-10 mb-24 max-lg:grid-cols-1 max-lg:gap-6 max-sm:mb-14">
      {/* Podcast */}
      <div className="relative overflow-hidden bg-yellow text-ink rounded-3xl p-9 max-sm:p-6">
        <span
          aria-hidden
          className="absolute -bottom-[100px] -right-[100px] w-80 h-80 rounded-full bg-black/[0.06]"
        />
        <div className="relative z-[1]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/[0.12] rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-[22px]">
            <span className="w-1.5 h-1.5 rounded-full bg-ink/50 animate-pulse-dot" />
            <span>{podcast.eyebrow}</span>
          </div>
          <p className="font-display font-bold text-[38px] leading-[0.98] tracking-[-0.02em] uppercase mb-7 max-sm:text-[30px]">
            {podcast.quote}
          </p>
          <div className="flex items-center gap-3 mb-7">
            <span className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,var(--color-coral),#B23E2A)]" />
            <div>
              <div className="font-semibold mb-0.5">{podcast.author.name}</div>
              <div className="text-[13px] opacity-70">{podcast.author.role}</div>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 border-t border-black/15 pt-[18px]">
            {podcast.episodes.map((ep) => (
              <div
                key={ep.num}
                className="grid grid-cols-[auto_1fr_auto] gap-4 items-center py-3 cursor-pointer transition-opacity hover:opacity-70"
              >
                <span className="font-mono text-xs opacity-60 w-7">{ep.num}</span>
                <span className="text-sm leading-[1.3] font-medium">{ep.title}</span>
                <span className="font-mono text-xs opacity-60">{ep.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Análisis */}
      <div className="flex flex-col">
        <SectionHead
          eyebrow="·· Análisis"
          title={
            <>
              Datos contra <span className="text-turquoise">narrativa</span>
            </>
          }
        />
        <div className="relative overflow-hidden aspect-[16/10] rounded-[16px] bg-turquoise-deep mb-[22px]">
          <span className="absolute top-4 left-4 z-[2] bg-white text-ink px-3.5 py-1.5 rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase">
            {analysis.tag}
          </span>
          <AnalysisChart />
        </div>
        <h3 className="font-heading font-bold text-[28px] leading-[1.2] tracking-[-0.02em] mb-3.5">
          {analysis.title}
        </h3>
        <p className="text-[15px] leading-[1.55] text-ink-soft mb-[18px]">{analysis.summary}</p>
        <div className="flex items-center gap-3 text-ink-muted text-[13px]">
          <span className="w-8 h-8 rounded-full shrink-0 bg-[linear-gradient(135deg,var(--color-turquoise),var(--color-turquoise-dark))]" />
          <strong className="text-ink font-medium">{analysis.author}</strong>
          <span className="w-[3px] h-[3px] bg-ink-muted rounded-full" />
          <span>{analysis.readTime}</span>
        </div>
      </div>
    </section>
  );
}
