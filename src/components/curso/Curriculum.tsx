"use client";

import { useState } from "react";
import type { CourseDetail, Lesson } from "@/data/curso";
import { ChevronDown, PlayIcon, FileIcon, ClockIcon } from "@/components/ui/icons";

function LessonIcon({ kind }: { kind: Lesson["kind"] }) {
  if (kind === "doc") return <FileIcon className="w-[11px] h-[11px]" />;
  if (kind === "live") return <ClockIcon className="w-[11px] h-[11px]" />;
  return <PlayIcon className="w-[11px] h-[11px]" />;
}

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
            Las 8 <span className="text-turquoise">semanas</span>, paso a paso
          </h2>
        </div>
        <button className="text-turquoise text-sm font-semibold inline-flex items-center gap-1.5 shrink-0 hover:gap-2.5 transition-all">
          Descargar PDF →
        </button>
      </div>

      {course.modules.length === 0 ? (
        <div className="border border-rule rounded-[14px] p-8 text-center text-ink-muted">
          <p className="text-[15px]">
            El temario detallado de este programa se publicará próximamente. Déjanos tu email en
            la newsletter y te avisamos en cuanto esté disponible.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {course.modules.map((m, i) => {
            const open = i === openIdx;
            return (
              <div
                key={m.num}
                className={`bg-white border rounded-[14px] overflow-hidden transition-all ${
                  open ? "border-turquoise" : "border-rule hover:border-ink-muted"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  aria-expanded={open}
                  className="w-full grid grid-cols-[auto_1fr_auto] gap-5 items-center px-6 py-5 cursor-pointer text-left lg:grid-cols-[auto_1fr_auto_auto] lg:gap-[22px] max-sm:px-4 max-sm:gap-3"
                >
                  <span className="font-display font-extrabold text-[36px] text-turquoise w-12 leading-none max-sm:text-[28px] max-sm:w-9">
                    {m.num}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading font-bold text-[18px] tracking-[-0.005em] max-sm:text-[15px]">
                      {m.name}
                    </span>
                    {/* Info bajo el nombre en móvil/tablet; columna propia en escritorio */}
                    <span className="block font-mono text-xs text-ink-muted mt-1 lg:hidden">
                      {m.info}
                    </span>
                  </span>
                  <span className="hidden lg:block font-mono text-xs text-ink-muted whitespace-nowrap">
                    {m.info}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      open ? "bg-turquoise-soft text-turquoise rotate-180" : "bg-bg-soft"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>

                {open && m.lessons && (
                  <div className="px-6 pb-5 pl-24 max-sm:pl-4">
                    {m.lessons.map((l, j) => (
                      <div
                        key={j}
                        className="grid grid-cols-[auto_1fr_auto] gap-3.5 items-center py-3 text-sm text-ink-soft border-t border-rule-soft first:border-t-0"
                      >
                        <span className="w-[26px] h-[26px] rounded-full bg-bg-soft flex items-center justify-center text-ink-muted shrink-0">
                          <LessonIcon kind={l.kind} />
                        </span>
                        <span>{l.title}</span>
                        <span className="font-mono text-[11px] text-ink-muted">{l.time}</span>
                      </div>
                    ))}
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
