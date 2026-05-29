import type { CourseDetail } from "@/data/curso";
import { TeamsIcon } from "@/components/ui/icons";

export default function TeamsBox({ teams }: { teams: CourseDetail["teams"] }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 items-center bg-ink text-white rounded-[20px] px-8 py-7 mb-16 max-sm:px-6 max-sm:gap-4">
      <div className="w-[60px] h-[60px] bg-white rounded-[16px] flex items-center justify-center shadow-[var(--shadow-sm)] shrink-0">
        <TeamsIcon className="w-8 h-8 text-turquoise" />
      </div>
      <div>
        <div className="text-[18px] font-bold mb-1 max-sm:text-base">{teams.title}</div>
        <div className="text-sm leading-[1.5] opacity-85">{teams.desc}</div>
      </div>
    </div>
  );
}
