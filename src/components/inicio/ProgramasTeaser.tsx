import Link from "next/link";
import { programs } from "@/data/formacion";
import SectionHead from "@/components/ui/SectionHead";
import AccentTitle from "@/components/ui/AccentTitle";
import { ArrowUpRight } from "@/components/ui/icons";

/** Inicio · vistazo a los programas (compacto) + enlace a /programas. */
export default function ProgramasTeaser() {
  return (
    <section className="mb-24 max-sm:mb-14">
      <SectionHead
        eyebrow="·· Microcredenciales"
        title={
          <>
            Nuestros <span className="text-turquoise">programas</span>
          </>
        }
        subtitle="Programas prácticos de tres semanas para cada etapa de tu trayectoria."
        link={{ label: "Ver todos →", href: "/programas#programas" }}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {programs.filter((p) => p.href).map((p) => {
          const open = p.badgeTone === "open";
          const inner = (
            <>
              <div className="flex justify-between items-center gap-3 mb-4">
                <span className="font-mono text-[11px] text-turquoise tracking-[0.04em] uppercase">
                  {p.categoria}
                </span>
                <span
                  className={`font-mono text-[10px] px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 tracking-[0.04em] uppercase whitespace-nowrap ${
                    open ? "bg-green-soft text-[#5C6B26]" : "bg-yellow-soft text-[#9a7b15]"
                  }`}
                >
                  {open && <span className="w-1.5 h-1.5 rounded-full bg-green" />}
                  {p.badge}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-[28px] leading-[0.95] uppercase tracking-[-0.02em] mb-2.5 max-sm:text-[24px]">
                <AccentTitle title={p.title} accent={p.accent} />
              </h3>
              {p.subtitle && (
                <p className="text-[15px] font-semibold text-ink mb-2 leading-snug">{p.subtitle}</p>
              )}
              <p className="text-sm leading-[1.55] text-ink-soft line-clamp-3">{p.desc}</p>
            </>
          );
          return p.href ? (
            <Link
              key={p.id}
              href={p.href}
              className="group bg-white border border-rule rounded-3xl p-7 flex flex-col transition-all hover:border-turquoise hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]"
            >
              {inner}
              <span className="mt-5 inline-flex items-center gap-1.5 text-turquoise text-sm font-semibold">
                Ver el programa <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          ) : (
            <div key={p.id} className="bg-white border border-rule rounded-3xl p-7 flex flex-col">
              {inner}
              <span className="mt-5 font-mono text-[11px] text-ink-muted uppercase tracking-[0.04em]">
                Próximamente
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
