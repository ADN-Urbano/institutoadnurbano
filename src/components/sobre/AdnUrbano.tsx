import { adnUrbano } from "@/data/sobre-nosotros";
import { ArrowUpRight, CheckIcon } from "@/components/ui/icons";

/** Bloque "De dónde venimos": la matriz ADN Urbano (fondo teal oscuro). */
export default function AdnUrbano() {
  return (
    <section className="relative overflow-hidden bg-turquoise-deep text-white rounded-[28px] px-12 py-14 mb-24 max-sm:px-6 max-sm:py-10 max-sm:mb-14">
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(47,159,163,0.30) 0%, transparent 55%), radial-gradient(circle at 85% 80%, rgba(234,199,54,0.12) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-[1] grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <div className="font-mono text-[11px] font-medium text-turquoise tracking-[0.06em] uppercase mb-3">
            {adnUrbano.eyebrow}
          </div>
          <h2 className="font-display font-extrabold text-[48px] leading-[0.95] tracking-[-0.02em] uppercase mb-2 max-lg:text-[38px] max-sm:text-[32px]">
            Somos <span className="text-turquoise">{adnUrbano.accent}</span>
          </h2>
          <div className="font-mono text-[12px] text-yellow tracking-[0.04em] uppercase mb-6">
            {adnUrbano.tagline}
          </div>
          <div className="flex flex-col gap-4 text-[15px] leading-[1.65] text-white/85 max-w-[58ch]">
            {adnUrbano.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href={adnUrbano.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-7 font-mono text-[12px] tracking-[0.04em] uppercase text-white border-b border-white/30 pb-0.5 transition-colors hover:text-turquoise hover:border-turquoise"
          >
            adnurbano.es · {adnUrbano.location}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <div className="font-mono text-[11px] font-semibold text-white/60 tracking-[0.06em] uppercase mb-3.5">
              Lo que hacemos
            </div>
            <ul className="flex flex-col gap-2.5">
              {adnUrbano.areas.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-[14px] leading-[1.4] text-white/90">
                  <CheckIcon className="w-[18px] h-[18px] text-turquoise shrink-0 mt-px" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-white/60 tracking-[0.06em] uppercase mb-3.5">
              Proyectos recientes
            </div>
            <div className="flex flex-wrap gap-2">
              {adnUrbano.projects.map((p) => (
                <span
                  key={p}
                  className="font-mono text-[11px] text-white bg-white/[0.12] px-3 py-1.5 rounded-full tracking-[0.03em]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
