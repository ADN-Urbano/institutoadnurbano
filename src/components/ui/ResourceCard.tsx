import { FormatIcon } from "@/components/ui/icons";

export type ThumbColor =
  | "turquoise"
  | "green"
  | "yellow"
  | "dark"
  | "coral"
  | "turquoise-deep";

export type Resource = {
  thumb: ThumbColor;
  format: string;
  tag: string;
  title: string;
  summary: string;
  meta: string[];
};

const thumbBg: Record<ThumbColor, string> = {
  turquoise: "bg-turquoise",
  green: "bg-green",
  yellow: "bg-yellow",
  dark: "bg-ink",
  coral: "bg-coral",
  "turquoise-deep": "bg-turquoise-deep",
};

/** Tarjeta de recurso (artículo, píldora, caso, podcast). Usada en home y archivo. */
export default function ResourceCard({ resource }: { resource: Resource }) {
  const isVideo = resource.format === "Píldora" || resource.format === "Vídeo";
  return (
    <article className="group cursor-pointer transition-transform hover:-translate-y-[3px]">
      <div
        className={`w-full aspect-[4/3] rounded-[14px] mb-3.5 relative overflow-hidden transition-shadow group-hover:shadow-[var(--shadow-md)] ${thumbBg[resource.thumb]}`}
      >
        <span
          className={`absolute top-3 left-3 z-[2] px-2.5 py-[5px] rounded-full font-mono text-[10px] font-medium tracking-[0.04em] uppercase inline-flex items-center gap-1.5 ${
            isVideo ? "bg-ink text-white" : "bg-white text-ink"
          }`}
        >
          <FormatIcon format={resource.format} className="w-2.5 h-2.5" />
          {resource.format}
        </span>
      </div>
      <span className="inline-block font-mono text-[11px] font-medium text-turquoise tracking-[0.04em] uppercase mb-2">
        {resource.tag}
      </span>
      <h3 className="font-heading font-bold text-[18px] leading-[1.25] tracking-[-0.01em] mb-2.5">
        {resource.title}
      </h3>
      <p className="text-sm text-ink-muted leading-[1.5] mb-3">{resource.summary}</p>
      <div className="font-mono text-xs text-ink-muted flex gap-2 items-center tracking-[0.02em]">
        {resource.meta.map((m, j) => (
          <span key={j} className="flex items-center gap-2">
            {j > 0 && <span className="w-[3px] h-[3px] bg-ink-muted rounded-full" />}
            {m}
          </span>
        ))}
      </div>
    </article>
  );
}
