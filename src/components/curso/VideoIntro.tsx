import type { CourseDetail } from "@/data/curso";
import { PlayIcon } from "@/components/ui/icons";
import { bunnyEmbedUrl } from "@/data/videos";

/** Vídeo de presentación del curso: tarjeta coral + player de Bunny (o mock si no hay vídeo). */
export default function VideoIntro({
  videoIntro,
  courseSlug,
}: {
  videoIntro: CourseDetail["videoIntro"];
  courseSlug?: string;
}) {
  const embed = courseSlug ? bunnyEmbedUrl(courseSlug) : undefined;
  return (
    <section className="grid grid-cols-1 gap-6 items-stretch mb-20 lg:grid-cols-2">
      <div className="bg-coral text-white rounded-[24px] p-10 flex flex-col justify-center max-sm:p-8">
        <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 max-sm:text-[32px]">
          {videoIntro.title}
        </h2>
        <p className="text-[15px] leading-[1.6] text-white/90">{videoIntro.desc}</p>
      </div>

      <div className="relative bg-ink rounded-[24px] overflow-hidden min-h-[320px] max-sm:min-h-[220px]">
        {embed ? (
          <iframe
            src={`${embed}?autoplay=false&preload=false&responsive=true`}
            title={videoIntro.title}
            loading="lazy"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
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
          </div>
        )}
      </div>
    </section>
  );
}
