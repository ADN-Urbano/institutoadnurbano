import { method, type MethodColor } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";

const cardBg: Record<MethodColor, string> = {
  turquoise: "bg-turquoise",
  green: "bg-green",
  coral: "bg-coral",
};

export default function Method() {
  return (
    <section>
      <SectionHead
        eyebrow="·· Metodología"
        title={
          <>
            Tres pilares que <span className="text-turquoise">funcionan</span>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-5 mb-24 md:grid-cols-3 max-sm:mb-14">
        {method.map((m) => (
          <div
            key={m.num}
            className={`rounded-[20px] p-9 text-white transition-transform hover:-translate-y-[3px] max-sm:p-7 ${cardBg[m.color]}`}
          >
            <div className="font-display font-extrabold text-[80px] leading-none mb-6 opacity-40">
              {m.num}
            </div>
            <h3 className="font-heading font-bold text-[22px] tracking-[-0.01em] leading-[1.2] mb-3.5">
              {m.title}
            </h3>
            <p className="text-sm leading-[1.6] opacity-95">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
