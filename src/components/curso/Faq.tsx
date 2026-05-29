import type { CourseDetail } from "@/data/curso";
import SectionHead from "@/components/ui/SectionHead";

export default function Faq({ faq }: { faq: CourseDetail["faq"] }) {
  return (
    <section className="mb-16">
      <SectionHead
        eyebrow="·· FAQ"
        title={
          <>
            Preguntas <span className="text-turquoise">frecuentes</span>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-x-12 gap-y-7 max-md:grid-cols-1">
        {faq.map((f) => (
          <div key={f.q}>
            <h4 className="font-heading font-bold text-[17px] mb-2">{f.q}</h4>
            <p className="text-sm leading-[1.55] text-ink-soft">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
