import { featured } from "@/data/home";
import SectionHead from "@/components/ui/SectionHead";
import { FileIcon } from "@/components/ui/icons";

const sideImage: Record<"green" | "yellow", string> = {
  green: "bg-green",
  yellow: "bg-yellow",
};

function Cityscape() {
  const bars = [
    [0, 140, 60, 110],
    [65, 100, 40, 150],
    [110, 120, 50, 130],
    [165, 80, 35, 170],
    [205, 110, 55, 140],
    [265, 70, 45, 180],
    [315, 130, 40, 120],
    [360, 90, 60, 160],
    [425, 115, 40, 135],
    [470, 75, 50, 175],
    [525, 105, 45, 145],
    [575, 125, 55, 125],
    [635, 85, 40, 165],
    [680, 120, 50, 130],
    [735, 100, 65, 150],
  ];
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 h-[65%] z-[1]"
      viewBox="0 0 800 250"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="rgba(255,255,255,0.12)">
        {bars.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} />
        ))}
      </g>
    </svg>
  );
}

export default function Featured() {
  const { main, side } = featured;
  return (
    <section>
      <SectionHead
        eyebrow="·· Destacados"
        title={
          <>
            Lo que estamos <span className="text-turquoise">publicando</span>
          </>
        }
        link={{ label: "Ver todo el archivo →", href: "/recursos" }}
      />

      <div className="grid grid-cols-[2fr_1fr_1fr] gap-5 mb-24 max-lg:grid-cols-1 max-sm:mb-14">
        {/* Destacado principal */}
        <article className="group bg-white border border-rule rounded-[20px] overflow-hidden cursor-pointer transition-all hover:border-turquoise hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
          <div className="relative overflow-hidden aspect-video bg-coral">
            <span className="absolute top-4 left-4 z-[2] bg-white text-ink px-3.5 py-1.5 rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase inline-flex items-center gap-1.5">
              <FileIcon className="w-[11px] h-[11px]" />
              {main.imageTag}
            </span>
            <Cityscape />
          </div>
          <div className="p-7">
            <span className="inline-block font-mono text-[11px] font-medium text-turquoise tracking-[0.06em] uppercase mb-3">
              {main.tag}
            </span>
            <h2 className="font-heading font-bold text-[30px] leading-[1.15] tracking-[-0.02em] mb-3.5">
              {main.title}
            </h2>
            <p className="text-[15px] text-ink-soft leading-[1.55] mb-5">{main.summary}</p>
            <div className="flex items-center gap-3 text-ink-muted text-[13px]">
              <span className="w-8 h-8 rounded-full shrink-0 bg-[linear-gradient(135deg,var(--color-turquoise),var(--color-turquoise-dark))]" />
              <strong className="text-ink font-medium">{main.author}</strong>
              <span className="w-[3px] h-[3px] bg-ink-muted rounded-full" />
              <span>{main.readTime}</span>
              <span className="w-[3px] h-[3px] bg-ink-muted rounded-full" />
              <span>{main.date}</span>
            </div>
          </div>
        </article>

        {/* Destacados laterales */}
        {side.map((s, i) => (
          <article
            key={i}
            className="group bg-white border border-rule rounded-[20px] overflow-hidden cursor-pointer transition-all flex flex-col hover:border-turquoise hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
          >
            <div className={`aspect-[4/3] relative ${sideImage[s.color]}`} />
            <div className="p-[22px] flex-1 flex flex-col">
              <span className="font-mono text-[11px] font-medium text-turquoise tracking-[0.04em] uppercase mb-2.5">
                {s.tag}
              </span>
              <h3 className="font-heading font-bold text-[19px] leading-[1.25] tracking-[-0.01em] mb-3 flex-1">
                {s.title}
              </h3>
              <span className="text-xs text-ink-muted">{s.meta}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
