import { method, type MethodColor } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";

const cardBg: Record<MethodColor, string> = {
  turquoise: "bg-turquoise",
  green: "bg-green",
  coral: "bg-coral",
};

/** Inicio · teaser de metodología (los 3 pilares) + enlace a /metodologia. */
export default function MetodologiaTeaser() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow="·· Metodología"
        title={
          <>
            Así <span className="text-turquoise">aprenderás</span>
          </>
        }
        subtitle="Un modelo flexible y aplicado: teoría a tu ritmo, casos reales en directo y todo llevado a tu propio municipio."
        link={{ label: "Ver metodología →", href: "/metodologia#el-modelo" }}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {method.map((m) => (
          <div key={m.num} className={`rounded-[20px] p-8 text-white max-sm:p-7 ${cardBg[m.color]}`}>
            <div className="font-display font-extrabold text-[56px] leading-none mb-4 opacity-40">
              {m.num}
            </div>
            <h3 className="font-heading font-bold text-[19px] leading-[1.2] mb-2.5">{m.title}</h3>
            <p className="text-sm leading-[1.55] opacity-95 line-clamp-3">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
