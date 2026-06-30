import type { ComponentType, SVGProps } from "react";
import { competencias } from "@/data/formacion";
import {
  TargetIcon,
  MegaphoneIcon,
  UsersIcon,
  LandmarkIcon,
  ChatIcon,
  StoreIcon,
  CityIcon,
  BallotIcon,
} from "@/components/ui/icons";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  target: TargetIcon,
  megaphone: MegaphoneIcon,
  users: UsersIcon,
  landmark: LandmarkIcon,
  chat: ChatIcon,
  store: StoreIcon,
  city: CityIcon,
  ballot: BallotIcon,
};

/** Metodología · las 8 competencias (microcredenciales) que puedes combinar. */
export default function Competencias() {
  return (
    <section className="mb-24 max-sm:mb-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 max-sm:gap-3">
        {competencias.items.map((c) => {
          const Icon = iconMap[c.icon] ?? TargetIcon;
          return (
            <div
              key={c.label}
              className="bg-white border border-rule rounded-2xl p-6 flex flex-col items-center text-center gap-4 transition-all hover:border-turquoise hover:-translate-y-[3px] max-sm:p-5 max-sm:gap-3"
            >
              <span className="w-14 h-14 rounded-full bg-turquoise-soft flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7 text-turquoise-dark" />
              </span>
              <span className="text-[15px] font-bold leading-tight">{c.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3 bg-bg-soft rounded-2xl px-7 py-6 max-sm:px-5 max-sm:text-center">
        <p className="text-[15px] leading-[1.5] text-ink-soft">
          {competencias.footnote}{" "}
          <span className="font-bold text-ink">{competencias.footnoteStrong}</span>
        </p>
      </div>
    </section>
  );
}
