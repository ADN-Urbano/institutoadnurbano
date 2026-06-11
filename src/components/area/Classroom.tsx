"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type { CourseDetail, Lesson, LessonKind } from "@/data/curso";
import {
  ArrowRight,
  CheckIcon,
  PlayIcon,
  FileIcon,
  TextIcon,
  ClockIcon,
  TeamsIcon,
} from "@/components/ui/icons";

// Vídeo de muestra (placeholder). En 4.5 se sustituye por Bunny Stream con URL firmada.
const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

type FlatLesson = Lesson & { moduleNum: string; moduleName: string };

function KindIcon({ kind, className }: { kind: LessonKind; className?: string }) {
  if (kind === "text") return <TextIcon className={className} />;
  if (kind === "doc") return <FileIcon className={className} />;
  if (kind === "live") return <ClockIcon className={className} />;
  return <PlayIcon className={className} />;
}

export default function Classroom({
  course,
  enrollmentId,
  initialCompleted,
  articles,
}: {
  course: CourseDetail;
  enrollmentId: string;
  initialCompleted: string[];
  /** Contenido de las lecciones de texto, prerenderizado en servidor, por id de lección. */
  articles?: Record<string, ReactNode>;
}) {
  const lessons = useMemo<FlatLesson[]>(
    () =>
      course.modules.flatMap((m) =>
        (m.lessons ?? []).map((l) => ({ ...l, moduleNum: m.num, moduleName: m.name })),
      ) as FlatLesson[],
    [course],
  );

  const [completed, setCompleted] = useState<Set<string>>(new Set(initialCompleted));
  // Continuar donde lo dejaste: primera lección sin completar.
  const [currentId, setCurrentId] = useState<string>(() => {
    const firstIncomplete = lessons.find((l) => !initialCompleted.includes(l.id));
    return (firstIncomplete ?? lessons[0])?.id ?? "";
  });
  const [saving, setSaving] = useState(false);

  const idx = lessons.findIndex((l) => l.id === currentId);
  const current = lessons[idx];
  const isDone = current ? completed.has(current.id) : false;
  const total = lessons.length;
  const doneCount = completed.size;
  const progress = total ? Math.round((doneCount / total) * 100) : 0;

  async function setLessonCompleted(lessonId: string, value: boolean) {
    setSaving(true);
    setCompleted((prev) => {
      const next = new Set(prev);
      if (value) next.add(lessonId);
      else next.delete(lessonId);
      return next;
    });
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, lessonId, completed: value }),
      });
    } catch {
      setCompleted((prev) => {
        const next = new Set(prev);
        if (value) next.delete(lessonId);
        else next.add(lessonId);
        return next;
      });
    } finally {
      setSaving(false);
    }
  }

  function goTo(i: number) {
    const l = lessons[i];
    if (l) setCurrentId(l.id);
  }

  if (!current) {
    return (
      <div className="border border-rule rounded-[14px] p-10 text-center text-ink-muted">
        Este curso aún no tiene lecciones publicadas.
      </div>
    );
  }

  const header = (
    <div className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-2">
      {current.moduleNum} · {current.moduleName}
    </div>
  );

  const title = (
    <h2 className="font-display font-extrabold text-[36px] leading-[0.98] tracking-[-0.02em] uppercase mb-4 max-sm:text-[28px]">
      {current.title}
    </h2>
  );

  const controls = (
    <div className="flex items-center gap-3 flex-wrap border-t border-rule pt-6 mt-6">
      <button
        onClick={() => setLessonCompleted(current.id, !isDone)}
        disabled={saving}
        className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-60 ${
          isDone
            ? "bg-green-soft text-[#5C6B26]"
            : "bg-ink text-white hover:bg-turquoise hover:-translate-y-px"
        }`}
      >
        <CheckIcon className="w-4 h-4" />
        {isDone ? "Completada" : "Marcar como completada"}
      </button>
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => goTo(idx - 1)}
          disabled={idx <= 0}
          className="px-4 py-3 rounded-lg text-sm font-medium border border-rule transition-colors hover:border-turquoise hover:text-turquoise disabled:opacity-40 disabled:hover:border-rule disabled:hover:text-ink-soft"
        >
          ← Anterior
        </button>
        <button
          onClick={() => goTo(idx + 1)}
          disabled={idx >= total - 1}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-ink text-white transition-colors hover:bg-turquoise disabled:opacity-40 disabled:hover:bg-ink"
        >
          Siguiente
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-[1fr_340px] gap-8 max-lg:grid-cols-1">
      {/* Principal */}
      <div className="min-w-0">
        {current.kind === "text" ? (
          <>
            {header}
            {title}
            {current.description && (
              <p className="text-[17px] leading-[1.55] text-ink-muted mb-7">{current.description}</p>
            )}
            {articles?.[current.id] ?? (
              <p className="text-ink-muted">Esta lectura aún no tiene contenido.</p>
            )}
            {controls}
          </>
        ) : (
          <>
            {current.kind === "video" && (
              <div className="rounded-[16px] overflow-hidden bg-ink aspect-video">
                <video
                  key={current.id}
                  controls
                  className="w-full h-full"
                  onEnded={() => {
                    if (!completed.has(current.id)) setLessonCompleted(current.id, true);
                  }}
                >
                  <source src={SAMPLE_VIDEO} type="video/mp4" />
                </video>
              </div>
            )}
            {current.kind === "doc" && (
              <div className="rounded-[16px] bg-bg-soft border border-rule p-10 flex flex-col items-center text-center">
                <span className="w-14 h-14 rounded-2xl bg-white border border-rule flex items-center justify-center mb-4">
                  <FileIcon className="w-6 h-6 text-turquoise" />
                </span>
                <p className="text-[15px] text-ink mb-4">
                  {current.materialName
                    ? `Material descargable: ${current.materialName}`
                    : "Material descargable de la lección."}
                </p>
                {current.materialUrl ? (
                  <a
                    href={current.materialUrl}
                    download
                    className="bg-ink text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-turquoise"
                  >
                    Descargar material
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-ink text-white px-5 py-3 rounded-lg text-sm font-semibold opacity-50"
                  >
                    Disponible próximamente
                  </button>
                )}
              </div>
            )}
            {current.kind === "live" && (
              <div className="rounded-[16px] bg-ink text-white p-8 grid grid-cols-[auto_1fr] gap-5 items-center max-sm:grid-cols-1">
                <span className="w-[60px] h-[60px] bg-white rounded-2xl flex items-center justify-center shrink-0">
                  <TeamsIcon className="w-8 h-8 text-turquoise" />
                </span>
                <div>
                  <div className="text-[18px] font-bold mb-1">Sesión en directo por Microsoft Teams</div>
                  <div className="text-sm opacity-85">{course.teams.desc}</div>
                </div>
              </div>
            )}

            <div className="mt-6">
              {header}
              {title}
              {current.description && (
                <p className="text-[15px] leading-[1.6] text-ink-soft">{current.description}</p>
              )}
              {controls}
            </div>
          </>
        )}
      </div>

      {/* Barra lateral: temario */}
      <aside className="lg:sticky lg:top-[92px] lg:self-start">
        <div className="border border-rule rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-rule">
            <div className="flex justify-between items-center font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase mb-2">
              <span>Progreso</span>
              <span>
                {doneCount}/{total} · {progress}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-bg-soft overflow-hidden">
              <div className="h-full bg-turquoise rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {course.modules.map((m) => (
              <div key={m.num} className="border-b border-rule-soft last:border-b-0">
                <div className="px-5 pt-4 pb-2 font-mono text-[10px] font-medium text-ink-muted tracking-[0.06em] uppercase">
                  {m.num} · {m.name}
                </div>
                {(m.lessons ?? []).map((l) => {
                  const active = l.id === currentId;
                  const done = completed.has(l.id);
                  return (
                    <button
                      key={l.id}
                      onClick={() => setCurrentId(l.id)}
                      className={`w-full text-left px-5 py-2.5 flex items-center gap-3 transition-colors ${
                        active ? "bg-turquoise-soft" : "hover:bg-bg-soft"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          done ? "bg-green text-white" : "bg-bg-soft text-ink-muted border border-rule"
                        }`}
                      >
                        {done ? <CheckIcon className="w-3 h-3" /> : <KindIcon kind={l.kind} className="w-2.5 h-2.5" />}
                      </span>
                      <span className={`flex-1 text-[13px] leading-[1.3] ${active ? "text-turquoise font-semibold" : "text-ink-soft"}`}>
                        {l.title}
                      </span>
                      {l.time && <span className="font-mono text-[10px] text-ink-muted shrink-0">{l.time}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <Link href="/area" className="inline-block mt-4 text-sm font-medium text-ink-soft hover:text-turquoise">
          ← Volver a mis cursos
        </Link>
      </aside>
    </div>
  );
}
