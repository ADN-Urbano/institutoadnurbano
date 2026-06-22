"use client";

import { useState } from "react";
import type { CourseDetail } from "@/data/curso";
import { ChevronDown } from "@/components/ui/icons";

export default function Curriculum({ course }: { course: CourseDetail }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="mb-20">
      <div className="flex items-end justify-between gap-6 mb-8 max-sm:flex-col max-sm:items-start max-sm:gap-3">
        <div className="flex-1">
          <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-2.5">
            ·· Programa
          </div>
          <h2 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase max-lg:text-[40px] max-sm:text-[34px]">
            Tres <span className="text-turquoise">semanas</span>, paso a paso
          </h2>
        </div>
        <a
          href="#"
          className="text-turquoise text-sm font-semibold inline-flex items-center gap-1.5 shrink-0 hover:gap-2.5 transition-all"
        >
          {course.programPdfLabel} →
        </a>
      </div>

      {course.modules.length === 0 ? (
        <div className="border border-rule rounded-[14px] p-8 text-center text-ink-muted">
          <p className="text-[15px]">
            El temario detallado de este programa se publicará próximamente.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {course.modules.map((m, i) => {
            const open = i === openIdx;
            return (
              <div
                key={m.num || m.name}
                className={`bg-white border rounded-[14px] overflow-hidden transition-all ${
                  open ? "border-turquoise" : "border-rule hover:border-ink-muted"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  aria-expanded={open}
                  className="w-full grid grid-cols-[auto_1fr_auto] gap-5 items-center px-6 py-5 cursor-pointer text-left lg:gap-[22px] max-sm:px-4 max-sm:gap-3"
                >
                  <span className="font-display font-extrabold text-[36px] text-turquoise w-12 leading-none max-sm:text-[28px] max-sm:w-9">
                    {m.num}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading font-bold text-[18px] tracking-[-0.005em] max-sm:text-[15px]">
                      {m.name}
                    </span>
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      open ? "bg-turquoise-soft text-turquoise rotate-180" : "bg-bg-soft"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>

                {open && (
                  <div className="px-6 pb-5 pl-24 max-sm:pl-4">
                    {m.description && (
                      <p className="text-sm leading-[1.6] text-ink-soft mb-4">{m.description}</p>
                    )}
                    {m.lessons && m.lessons.length > 0 && (
                      <ul className="list-none flex flex-col gap-2.5">
                        {m.lessons.map((l, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm leading-[1.5] text-ink-soft"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-turquoise shrink-0 mt-2" />
                            {l.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
