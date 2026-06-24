import { comoFunciona } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";
import { CheckIcon } from "@/components/ui/icons";

/** Metodología · "Todo lo que incluye": directos, campus, soporte, acceso… */
export default function ComoFunciona() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow={comoFunciona.eyebrow}
        title={
          <>
            Todo lo que <span className="text-turquoise">incluye</span>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {comoFunciona.items.map((it) => (
          <div key={it.title} className="bg-bg-soft rounded-2xl p-7">
            <div className="w-9 h-9 rounded-full bg-turquoise-soft text-turquoise flex items-center justify-center mb-4">
              <CheckIcon className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-[17px] leading-tight mb-2">{it.title}</h3>
            <p className="text-sm leading-[1.55] text-ink-muted">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
