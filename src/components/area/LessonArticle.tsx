import { RichText } from "@payloadcms/richtext-lexical/react";
import type { LessonDoc, MediaDoc } from "@/lib/courses";

/** Renderiza una lección de tipo "Texto / Lectura": foto destacada + texto enriquecido. */
export default function LessonArticle({ lesson }: { lesson: LessonDoc }) {
  const image =
    lesson.image && typeof lesson.image === "object" ? (lesson.image as MediaDoc) : null;

  return (
    <div>
      {image?.url && (
        <figure className="rounded-[16px] overflow-hidden mb-7 border border-rule">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.url} alt={image.alt ?? ""} className="w-full h-auto block" />
        </figure>
      )}
      {lesson.content ? (
        <div className="lesson-prose">
          <RichText data={lesson.content as never} />
        </div>
      ) : null}
    </div>
  );
}
