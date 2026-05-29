import Link from "next/link";
import { hero, type TileColor } from "@/data/home";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

const tileStyles: Record<TileColor, string> = {
  yellow: "bg-yellow text-ink",
  green: "bg-green text-white",
  coral: "bg-coral text-white",
  dark: "bg-ink text-white",
};

export default function HeroD() {
  return (
    <section className="pt-6 pb-14 border-b border-rule mb-16">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
        {/* Bloque principal — turquesa */}
        <div className="relative overflow-hidden bg-turquoise text-white rounded-3xl p-10 flex flex-col justify-between gap-8 min-h-[360px] lg:col-[1/3] lg:row-[1/3] lg:min-h-[460px] max-sm:p-7 max-sm:gap-6">
          <span
            aria-hidden
            className="absolute -bottom-[100px] -right-[100px] w-80 h-80 rounded-full bg-white/[0.08]"
          />
          <span className="relative z-[2] self-start bg-white/[0.18] backdrop-blur-[10px] text-white px-3.5 py-1.5 rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase">
            {hero.pill}
          </span>
          <div className="relative z-[2]">
            <h1 className="font-display font-extrabold text-[88px] leading-[0.92] tracking-[-0.025em] uppercase max-lg:text-[56px] max-sm:text-[44px]">
              {hero.title}
            </h1>
            <p className="text-[17px] leading-[1.5] max-w-[480px] opacity-95 mt-4">
              {hero.summary}
            </p>
          </div>
          <div className="relative z-[2] flex gap-2.5">
            <Link
              href={hero.actions.primary.href}
              className="bg-white text-ink px-5 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2 transition-transform hover:-translate-y-px"
            >
              {hero.actions.primary.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={hero.actions.secondary.href}
              className="bg-white/15 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors hover:bg-white/25"
            >
              {hero.actions.secondary.label}
            </Link>
          </div>
        </div>

        {/* Mosaico de tiles */}
        {hero.tiles.map((tile, i) => {
          const onLight = tile.color === "yellow";
          return (
            <Link
              key={i}
              href={tile.href}
              className={`group rounded-[20px] p-6 flex flex-col justify-between min-h-[222px] cursor-pointer transition-transform hover:-translate-y-[3px] ${tileStyles[tile.color]}`}
            >
              <div className="font-mono text-[10px] font-medium tracking-[0.06em] uppercase opacity-80">
                {tile.tag}
              </div>
              <div className="font-display font-bold text-[28px] leading-[0.95] tracking-[-0.015em] uppercase">
                {tile.title}
              </div>
              <div className="flex justify-between items-end">
                <div className="text-xs opacity-85">{tile.meta}</div>
                <span
                  className={`w-9 h-9 rounded-full bg-black/15 flex items-center justify-center ${onLight ? "text-ink" : "text-white"}`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
