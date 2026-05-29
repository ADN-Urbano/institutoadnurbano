import { cases } from "@/data/home";
import SectionHead from "@/components/ui/SectionHead";

const cardBg: Record<string, string> = {
  turquoise: "bg-turquoise",
  green: "bg-green",
  coral: "bg-coral",
};

export default function Cases() {
  return (
    <section className="pb-24 max-sm:pb-14">
      <SectionHead
        eyebrow="·· Buenas prácticas"
        title={
          <>
            Casos que han <span className="text-turquoise">funcionado</span> de verdad
          </>
        }
        subtitle="Filtra por tamaño de población para encontrar referencias replicables a tu municipio."
        link={{ label: "Archivo de casos →", href: "/recursos?formato=caso" }}
      />

      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {cases.map((c, i) => (
          <article
            key={i}
            className={`relative overflow-hidden text-white rounded-[20px] p-8 cursor-pointer transition-transform hover:-translate-y-[3px] hover:shadow-[var(--shadow-lg)] ${cardBg[c.color]}`}
          >
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white px-3 py-[5px] rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-[18px]">
              {c.popTag}
            </span>
            <h3 className="font-display font-extrabold text-[42px] tracking-[-0.02em] leading-[0.9] uppercase mb-1.5">
              {c.name}
            </h3>
            <div className="text-[13px] text-white/80 mb-[22px] font-mono">{c.province}</div>
            <div className="text-[15px] leading-[1.55] py-5 border-y border-white/25 mb-[18px]">
              {c.quote}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] font-medium text-white bg-white/[0.18] px-2.5 py-1 rounded-full tracking-[0.04em] uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
