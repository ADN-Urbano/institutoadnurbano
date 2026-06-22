import type { CourseDetail, PriceTone } from "@/data/curso";
import { CheckIcon, UsersIcon, ShieldIcon } from "@/components/ui/icons";
import CheckoutButton from "@/components/curso/CheckoutButton";

const priceColor: Record<PriceTone, string> = {
  turquoise: "text-turquoise",
  amber: "text-[#c77f1e]",
  ink: "text-ink",
};

const discountBadge: Record<PriceTone, string> = {
  turquoise: "bg-turquoise-soft text-turquoise-dark",
  amber: "bg-yellow-soft text-[#9a7b15]",
  ink: "bg-bg-soft text-ink-soft",
};

const LIMITED_TEXT = "Máximo 30 participantes por edición";
const GUARANTEE_TEXT = "Nos reservamos el derecho de cancelar el curso si no se alcanza el mínimo.";

export default function PurchaseCard({ course }: { course: CourseDetail }) {
  return (
    <aside className="bg-white border-2 border-ink rounded-3xl p-8 sticky top-[100px] self-start shadow-[var(--shadow-md)] max-lg:static max-sm:p-6">
      <div className="inline-flex items-center gap-2 bg-green-soft text-[#5C6B26] px-3 py-[5px] rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-[22px]">
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
        <span>Inscripción abierta</span>
      </div>

      {/* Roadmap de ediciones: 3 tramos de precio */}
      <div className="grid grid-cols-3 gap-3 mb-5 max-sm:grid-cols-1">
        {course.priceTiers.map((t) => (
          <div key={t.label} className="bg-bg-soft rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-3 min-h-[34px]">
              <span className="font-mono text-[10px] font-medium text-ink-muted tracking-[0.04em] uppercase leading-[1.2]">
                {t.label}
              </span>
              {t.discount && (
                <span
                  className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${discountBadge[t.tone]}`}
                >
                  {t.discount}
                </span>
              )}
            </div>
            {t.oldPrice && (
              <s className="text-[13px] text-coral/80 line-through decoration-coral/60">
                {t.oldPrice}
              </s>
            )}
            <div
              className={`font-display font-extrabold text-[34px] leading-none tracking-[-0.02em] ${priceColor[t.tone]}`}
            >
              {t.price}
            </div>
            <div className="font-mono text-[10px] text-ink-muted tracking-[0.03em] mt-2 leading-[1.3]">
              {t.editionLabel}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-5 border-t border-rule mb-[22px] max-sm:grid-cols-1">
        <div className="flex items-start gap-2.5">
          <UsersIcon className="w-[18px] h-[18px] text-turquoise shrink-0 mt-0.5" />
          <div>
            <div className="text-[13px] font-semibold leading-tight">Plazas limitadas</div>
            <div className="text-[12px] text-ink-muted leading-snug">{LIMITED_TEXT}</div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <ShieldIcon className="w-[18px] h-[18px] text-turquoise shrink-0 mt-0.5" />
          <div>
            <div className="text-[13px] font-semibold leading-tight">Garantía ADN Local</div>
            <div className="text-[12px] text-ink-muted leading-snug">{GUARANTEE_TEXT}</div>
          </div>
        </div>
      </div>

      <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-3.5">
        ·· Reserva tu plaza
      </div>

      <ul className="list-none pb-[22px] border-b border-rule mb-[22px] flex flex-col gap-2.5">
        {course.feats.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm leading-[1.4]">
            <CheckIcon className="w-[18px] h-[18px] text-green shrink-0 mt-px" />
            {f}
          </li>
        ))}
      </ul>

      <CheckoutButton slug={course.slug} />
      <div className="text-center font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase">
        Pago seguro · Stripe · folleto en PDF
      </div>
    </aside>
  );
}
