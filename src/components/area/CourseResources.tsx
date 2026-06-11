import type { CourseMaterial } from "@/lib/courses";
import { FileIcon } from "@/components/ui/icons";

export default function CourseResources({ materials }: { materials: CourseMaterial[] }) {
  if (!materials.length) return null;
  return (
    <section className="mt-14">
      <h2 className="font-mono text-[11px] font-medium text-coral tracking-[0.06em] uppercase mb-4">
        ·· Material del curso
      </h2>
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {materials.map((m, i) => (
          <a
            key={i}
            href={m.url}
            download
            className="flex items-center gap-3 border border-rule rounded-xl p-4 transition-all hover:border-turquoise hover:-translate-y-[2px]"
          >
            <span className="w-9 h-9 rounded-lg bg-bg-soft flex items-center justify-center shrink-0">
              <FileIcon className="w-4 h-4 text-turquoise" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-sm font-semibold truncate">{m.filename}</span>
              <span className="block text-xs text-ink-muted truncate">{m.lessonTitle}</span>
            </span>
            <span className="text-turquoise text-xs font-semibold shrink-0">Descargar</span>
          </a>
        ))}
      </div>
    </section>
  );
}
