import type { CourseDetail } from "@/data/curso";
import { CheckIcon } from "@/components/ui/icons";
import CheckoutButton from "@/components/curso/CheckoutButton";

export default function PurchaseCard({ course }: { course: CourseDetail }) {
  return (
    <aside className="bg-white border-2 border-ink rounded-3xl p-8 sticky top-[100px] self-start shadow-[var(--shadow-md)] max-lg:static max-sm:p-6">
      <div className="inline-flex items-center gap-2 bg-green-soft text-[#5C6B26] px-3 py-[5px] rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-[22px]">
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
        <span>{course.statusLabel}</span>
      </div>

      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-display font-extrabold text-[76px] tracking-[-0.03em] leading-none">
          {course.price}
        </span>
        <span className="font-mono text-sm text-ink-muted tracking-[0.04em] uppercase">
          {course.priceNote}
        </span>
      </div>
      {course.oldPrice && (
        <div className="text-[13px] text-ink-muted mb-6">
          Antes <s className="line-through">{course.oldPrice}</s> ·{" "}
          <strong className="text-coral font-semibold">descuento de lanzamiento</strong>
        </div>
      )}

      <ul className="list-none py-[22px] border-y border-rule mb-[22px] flex flex-col gap-2.5">
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
