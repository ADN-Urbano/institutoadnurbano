import Link from "next/link";
import { courses } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";
import AccentTitle from "@/components/ui/AccentTitle";
import { ArrowUpRight } from "@/components/ui/icons";

export default function Courses() {
  return (
    <section>
      <SectionHead
        eyebrow="·· Catálogo"
        title={
          <>
            Programas <span className="text-turquoise">activos</span>
          </>
        }
        subtitle="Cuatro programas en distintas áreas. Próximas ediciones desde junio."
      />
      <div className="grid grid-cols-1 gap-5 mb-24 lg:grid-cols-2 max-sm:mb-14">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="group bg-white border border-rule rounded-3xl p-8 flex flex-col cursor-pointer transition-all hover:border-turquoise hover:-translate-y-[3px] hover:shadow-[var(--shadow-lg)] max-sm:p-6"
          >
            <div className="flex justify-between items-center gap-3 mb-5">
              <span className="font-mono text-[11px] font-medium text-ink-muted tracking-[0.04em] uppercase">
                {c.id}
              </span>
              <span
                className={`font-mono text-[11px] font-medium px-3 py-[5px] rounded-full inline-flex items-center gap-1.5 tracking-[0.04em] uppercase whitespace-nowrap ${
                  c.status === "open"
                    ? "bg-green-soft text-[#5C6B26]"
                    : "bg-bg-soft text-ink-soft"
                }`}
              >
                {c.status === "open" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                )}
                {c.statusLabel}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-[38px] tracking-[-0.02em] leading-[0.95] uppercase mb-3.5 max-sm:text-[32px]">
              <AccentTitle title={c.title} accent={c.accent} />
            </h3>
            <p className="text-sm leading-[1.55] text-ink-soft mb-6">{c.desc}</p>

            <div className="grid grid-cols-4 gap-3 py-[18px] border-y border-rule mb-[22px]">
              {c.attrs.map(([label, value]) => (
                <div key={label}>
                  <div className="font-mono text-[10px] text-ink-muted tracking-[0.04em] uppercase mb-1.5">
                    {label}
                  </div>
                  <div className="text-sm font-bold">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-auto">
              <span className="font-display font-extrabold text-[36px] tracking-[-0.02em] leading-none">
                {c.price}
                <small className="font-sans text-[13px] text-ink-muted font-normal">
                  {c.priceNote}
                </small>
              </span>
              <span className="w-11 h-11 rounded-full bg-ink text-white flex items-center justify-center transition-all group-hover:bg-turquoise group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
