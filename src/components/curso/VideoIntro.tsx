import type { CourseDetail } from "@/data/curso";
import { PlayIcon } from "@/components/ui/icons";

/** Vídeo de presentación: tarjeta coral + mock de reproductor (placeholder, sin reproductor real). */
export default function VideoIntro({ videoIntro }: { videoIntro: CourseDetail["videoIntro"] }) {
  return (
    <section className="grid grid-cols-1 gap-6 items-stretch mb-20 lg:grid-cols-2">
      <div className="bg-coral text-white rounded-[24px] p-10 flex flex-col justify-center max-sm:p-8">
        <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 max-sm:text-[32px]">
          {videoIntro.title}
        </h2>
        <p className="text-[15px] leading-[1.6] text-white/90">{videoIntro.desc}</p>
      </div>

      {/* Mock del reproductor */}
      <div className="relative bg-ink rounded-[24px] overflow-hidden flex items-center justify-center min-h-[320px] max-sm:min-h-[220px]">
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, rgba(219,81,58,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-[1] flex flex-col items-center gap-5 px-8 text-center">
          <span className="w-[72px] h-[72px] rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <PlayIcon className="w-7 h-7 translate-x-[2px]" />
          </span>
          <span className="font-display font-extrabold text-[28px] tracking-[-0.02em] uppercase text-white max-sm:text-[22px]">
            {videoIntro.label}
          </span>
        </div>
        <div className="absolute left-6 right-6 bottom-6 z-[1]">
          <div className="h-1 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-1/4 bg-coral" />
          </div>
        </div>
      </div>
    </section>
  );
}
