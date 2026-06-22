import type { CourseDetail } from "@/data/curso";
import { CheckIcon } from "@/components/ui/icons";

/** "Al terminar el programa tendrás listo…": lista de resultados (2 columnas en lg). */
export default function Outcomes({ outcomes }: { outcomes: CourseDetail["outcomes"] }) {
  if (outcomes.length === 0) return null;
  return (
    <section className="mb-20">
      <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-8 max-lg:text-[40px] max-sm:text-[34px]">
        Al <span className="text-turquoise">terminar</span> el programa tendrás listo…
      </h2>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-2">
        {outcomes.map((o) => (
          <li
            key={o}
            className="flex items-start gap-3.5 text-[16px] leading-[1.5] text-ink-soft border-b border-rule-soft pb-4"
          >
            <span className="w-7 h-7 rounded-full bg-green-soft text-green flex items-center justify-center shrink-0">
              <CheckIcon className="w-4 h-4" />
            </span>
            {o}
          </li>
        ))}
      </ul>
    </section>
  );
}
