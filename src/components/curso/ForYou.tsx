import type { CourseDetail } from "@/data/curso";
import { CheckIcon, CloseIcon } from "@/components/ui/icons";

export default function ForYou({
  forYes,
  forNo,
}: {
  forYes: CourseDetail["forYes"];
  forNo: CourseDetail["forNo"];
}) {
  return (
    <section className="grid grid-cols-1 gap-6 mb-20 lg:grid-cols-2">
      <div className="bg-green text-white rounded-3xl p-10 max-sm:p-7">
        <div className="font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-3.5 opacity-85">
          ·· Es para ti si…
        </div>
        <h2 className="font-display font-extrabold text-[32px] tracking-[-0.02em] leading-[0.95] uppercase mb-6">
          {forYes.title}
        </h2>
        <ul className="list-none flex flex-col gap-3.5">
          {forYes.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-[1.5]">
              <CheckIcon className="w-5 h-5 shrink-0 mt-px opacity-95" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-ink text-white rounded-3xl p-10 max-sm:p-7">
        <div className="font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-3.5 opacity-85">
          ·· NO es para ti si…
        </div>
        <h2 className="font-display font-extrabold text-[32px] tracking-[-0.02em] leading-[0.95] uppercase mb-6">
          {forNo.title}
        </h2>
        <ul className="list-none flex flex-col gap-3.5">
          {forNo.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-[1.5]">
              <CloseIcon className="w-5 h-5 shrink-0 mt-px opacity-95" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
