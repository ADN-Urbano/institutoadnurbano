import type { CourseDetail } from "@/data/curso";
import { CheckIcon, UsersIcon, ShieldIcon } from "@/components/ui/icons";
import EditionPurchase from "@/components/curso/EditionPurchase";

const LIMITED_TEXT = "Máximo 30 participantes por edición";
const GUARANTEE_TEXT = "Nos reservamos el derecho de cancelar el curso si no se alcanza el mínimo.";

export default function PurchaseCard({ course }: { course: CourseDetail }) {
  return (
    <aside className="bg-white border-2 border-ink rounded-3xl p-8 sticky top-[100px] self-start shadow-[var(--shadow-md)] max-lg:static max-sm:p-6">
      <div className="inline-flex items-center gap-2 bg-green-soft text-[#5C6B26] px-3 py-[5px] rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-[22px]">
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
        <span>Inscripción abierta</span>
      </div>

      {/* Roadmap de ediciones COMPRABLES como selector + botón (client). El
          contenido intermedio (plazas/garantía, feats) va como children para que
          comparta el estado de selección con los tramos. */}
      <EditionPurchase
        slug={course.slug}
        priceTiers={course.priceTiers}
        defaultEditionId={course.defaultEditionId}
      >
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
      </EditionPurchase>

      <div className="text-center font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase">
        Pago seguro · Stripe · folleto en PDF
      </div>
    </aside>
  );
}
