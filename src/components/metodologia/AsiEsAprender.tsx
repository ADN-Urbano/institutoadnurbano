import type { ComponentType, SVGProps } from "react";
import { asiEsAprender } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";
import AccentTitle from "@/components/ui/AccentTitle";
import {
  CalendarIcon,
  WrenchIcon,
  BoltIcon,
  HeartIcon,
  StarIcon,
  CheckIcon,
} from "@/components/ui/icons";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  calendar: CalendarIcon,
  wrench: WrenchIcon,
  bolt: BoltIcon,
  heart: HeartIcon,
  star: StarIcon,
  check: CheckIcon,
};

/** Metodología · "Así es aprender en ADN Local": los 6 rasgos del modelo. */
export default function AsiEsAprender() {
  return (
    <section className="mb-24 max-sm:mb-16">
      <SectionHead
        eyebrow={asiEsAprender.eyebrow}
        title={<AccentTitle title={asiEsAprender.title} accent={asiEsAprender.accent} />}
      />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 max-sm:gap-3">
        {asiEsAprender.items.map((t) => {
          const Icon = iconMap[t.icon] ?? StarIcon;
          return (
            <div
              key={t.label}
              className="bg-white border border-rule rounded-2xl p-7 flex flex-col items-center text-center gap-3 transition-all hover:border-turquoise hover:-translate-y-[3px] max-sm:p-5"
            >
              <span className="w-14 h-14 rounded-full bg-bg-soft flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7 text-turquoise" />
              </span>
              <span className="font-display font-extrabold text-[18px] uppercase tracking-[-0.01em] text-turquoise">
                {t.label}
              </span>
              <span className="text-sm leading-snug text-ink-soft">{t.desc}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
