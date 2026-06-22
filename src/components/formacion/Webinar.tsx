import { webinar } from "@/data/formacion";
import { PlayIcon } from "@/components/ui/icons";

/** Webinar gratuito: tarjeta coral con CTA + mock de reproductor de vídeo. */
export default function Webinar() {
  return (
    <section className="grid grid-cols-1 gap-6 items-stretch mb-24 lg:grid-cols-2 max-sm:mb-14">
      {/* Tarjeta de invitación */}
      <div className="bg-coral text-white rounded-[24px] p-10 flex flex-col max-sm:p-8">
        <h2 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 max-sm:text-[32px]">
          {webinar.title}
        </h2>
        <p className="text-[15px] leading-[1.6] text-white/90 mb-7">{webinar.desc}</p>

        <ul className="flex flex-col gap-3 mb-8">
          {webinar.details.map(([label, value]) => (
            <li
              key={label}
              className="flex items-center justify-between gap-4 border-b border-white/20 pb-3 last:border-b-0"
            >
              <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-white/75">
                {label}
              </span>
              <span className="text-[15px] font-semibold">{value}</span>
            </li>
          ))}
        </ul>

        <a
          href="#programas"
          className="mt-auto inline-flex items-center justify-center bg-ink text-white px-6 py-4 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all hover:-translate-y-px hover:shadow-[var(--shadow-md)]"
        >
          {webinar.cta}
        </a>
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
        <div className="relative z-[1] flex flex-col items-center gap-5">
          <span className="w-[72px] h-[72px] rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <PlayIcon className="w-7 h-7 translate-x-[2px]" />
          </span>
          <span className="font-display font-extrabold text-[40px] tracking-[-0.02em] uppercase text-white max-sm:text-[30px]">
            Vídeo Webinar
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
