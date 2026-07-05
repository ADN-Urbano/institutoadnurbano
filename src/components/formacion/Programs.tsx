import Link from "next/link";
import { programs, type Program, type PriceTone } from "@/data/formacion";
import type { PriceTier as LivePriceTier } from "@/data/curso";
import { getCourseBySlug } from "@/lib/courses";
import SectionHead from "@/components/ui/SectionHead";
import AccentTitle from "@/components/ui/AccentTitle";
import LeadForm from "@/components/marketing/LeadForm";
import { UsersIcon, ShieldIcon, ArrowRight } from "@/components/ui/icons";

const priceColor: Record<PriceTone, string> = {
  turquoise: "text-turquoise",
  amber: "text-[#c77f1e]",
  ink: "text-ink",
};

const discountBadge: Record<PriceTone, string> = {
  turquoise: "bg-turquoise-soft text-turquoise-dark",
  amber: "bg-yellow-soft text-[#9a7b15]",
  ink: "bg-bg-soft text-ink-soft",
};

/** Tramo de precio normalizado para pintar (de Payload en vivo o del dato estático). */
type RenderTier = {
  key: string;
  label: string;
  discount?: string;
  oldPrice?: string;
  price: string;
  edition: string;
  startLabel?: string;
  tone: PriceTone;
};

/**
 * Tarjeta de programa. Los precios/fechas se pintan de `liveTiers` (Payload,
 * sincronizado con /admin) si se pasan; si no, de los `tiers` estáticos.
 */
function ProgramCard({ program, liveTiers }: { program: Program; liveTiers?: LivePriceTier[] }) {
  const open = program.badgeTone === "open";

  const tiers: RenderTier[] =
    liveTiers && liveTiers.length
      ? liveTiers.map((t) => ({
          key: t.editionId || t.editionLabel,
          label: t.label,
          discount: t.discount,
          oldPrice: t.oldPrice,
          price: t.price,
          edition: t.editionLabel,
          startLabel: t.startLabel,
          tone: t.tone as PriceTone,
        }))
      : (program.tiers ?? []).map((t) => ({
          key: t.label,
          label: t.label,
          discount: t.discount,
          oldPrice: t.oldPrice,
          price: t.price,
          edition: t.edition,
          tone: t.tone,
        }));

  return (
    <article
      id={program.id}
      className="scroll-mt-24 bg-white border border-rule rounded-3xl p-8 flex flex-col transition-all hover:border-turquoise hover:shadow-[var(--shadow-md)] max-sm:p-6"
    >
      <div className="flex justify-between items-center gap-3 mb-5">
        <span className="font-mono text-[11px] font-medium text-turquoise tracking-[0.04em] uppercase">
          {program.categoria}
        </span>
        <span
          className={`font-mono text-[11px] font-medium px-3 py-[5px] rounded-full inline-flex items-center gap-1.5 tracking-[0.04em] uppercase whitespace-nowrap ${
            open ? "bg-green-soft text-[#5C6B26]" : "bg-yellow-soft text-[#9a7b15]"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green" : "bg-yellow"}`} />
          {program.badge}
        </span>
      </div>

      <h3 className="font-display font-extrabold text-[38px] tracking-[-0.02em] leading-[0.95] uppercase mb-3.5 max-sm:text-[30px]">
        <AccentTitle title={program.title} accent={program.accent} />
      </h3>
      <p className="text-sm leading-[1.6] text-ink-soft mb-6">{program.desc}</p>

      {tiers.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-5 max-sm:grid-cols-1">
            {tiers.map((t) => (
              <div key={t.key} className="bg-bg-soft rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-3 min-h-[34px]">
                  <span className="font-mono text-[10px] font-medium text-ink-muted tracking-[0.04em] uppercase leading-[1.2]">
                    {t.label}
                  </span>
                  {t.discount && (
                    <span
                      className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${discountBadge[t.tone]}`}
                    >
                      {t.discount}
                    </span>
                  )}
                </div>
                {t.oldPrice && (
                  <s className="text-[13px] text-coral/80 line-through decoration-coral/60">
                    {t.oldPrice}
                  </s>
                )}
                <div
                  className={`font-display font-extrabold text-[34px] leading-none tracking-[-0.02em] ${priceColor[t.tone]}`}
                >
                  {t.price}
                </div>
                <div className="font-mono text-[10px] text-ink-muted tracking-[0.03em] mt-2 leading-[1.3]">
                  {t.edition}
                </div>
                {t.startLabel && (
                  <div className="text-[11px] font-semibold text-turquoise mt-1 leading-[1.2]">
                    {t.startLabel}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-rule mt-auto max-sm:grid-cols-1">
            {program.limited && (
              <div className="flex items-start gap-2.5">
                <UsersIcon className="w-[18px] h-[18px] text-turquoise shrink-0 mt-0.5" />
                <div>
                  <div className="text-[13px] font-semibold leading-tight">Plazas limitadas</div>
                  <div className="text-[12px] text-ink-muted leading-snug">{program.limited}</div>
                </div>
              </div>
            )}
            {program.guarantee && (
              <div className="flex items-start gap-2.5">
                <ShieldIcon className="w-[18px] h-[18px] text-turquoise shrink-0 mt-0.5" />
                <div>
                  <div className="text-[13px] font-semibold leading-tight">Garantía ADN Local</div>
                  <div className="text-[12px] text-ink-muted leading-snug">{program.guarantee}</div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {program.priority && (
        <div className="mt-auto">
          <div className="bg-turquoise-soft rounded-2xl p-6">
            <div className="font-display font-extrabold text-[22px] tracking-[-0.01em] uppercase text-turquoise-dark mb-2">
              {program.priority.title}
            </div>
            <p className="text-sm leading-[1.55] text-ink-soft">{program.priority.desc}</p>
          </div>
          {/* Captación de lista de espera (no hay ficha propia para este curso). */}
          <LeadForm
            type="lista-espera"
            fields={["municipio"]}
            courseSlug={program.id}
            submitLabel="Quiero recibir información →"
            successMessage="¡Hecho! Te avisaremos en cuanto abra la próxima edición."
            className="mt-5"
          />
        </div>
      )}

      {program.href && (
        <Link
          href={program.href}
          className="group mt-6 bg-ink text-white px-6 py-4 rounded-xl text-sm font-semibold inline-flex items-center justify-between gap-3 transition-all hover:bg-turquoise hover:-translate-y-px"
        >
          Ver el curso
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </article>
  );
}

/** Tarjeta vacía de "próximo programa" (futuras formaciones aún sin definir). */
function PlaceholderCard() {
  return (
    <article className="border border-dashed border-rule rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[260px]">
      <span className="w-16 h-16 rounded-full border border-dashed border-ink-muted/40 flex items-center justify-center mb-5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-7 h-7 text-ink-muted/50"
          aria-hidden
        >
          <rect x="3" y="4.5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v3M16 3v3" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-mono text-[12px] text-ink-muted tracking-[0.06em] uppercase">
        Próximo programa
      </span>
      <span className="w-8 h-px bg-turquoise mt-4" />
    </article>
  );
}

export default async function Programs() {
  const openPrograms = programs.filter((p) => p.badgeTone === "open");
  const soonPrograms = programs.filter((p) => p.badgeTone === "soon");
  // Rellenamos "próximos" hasta 3 columnas con placeholders.
  const placeholders = Math.max(0, 3 - soonPrograms.length);

  // Ediciones reales (Payload) de cada curso abierto → precios/fechas sincronizados
  // con /admin. Si el curso no está en Payload, se cae al tier estático.
  const liveTiers = await Promise.all(
    openPrograms.map((p) => getCourseBySlug(p.id).then((d) => d?.priceTiers ?? null)),
  );

  return (
    <>
      <section id="programas" className="scroll-mt-24">
        <SectionHead
          eyebrow="·· Catálogo"
          title={
            <>
              Programas <span className="text-turquoise">abiertos</span>
            </>
          }
          subtitle="Formación disponible para que empieces hoy tu desarrollo como líder local."
        />
        <div className="grid grid-cols-1 gap-5 mb-20 lg:grid-cols-2 max-sm:mb-14">
          {openPrograms.map((p, i) => (
            <ProgramCard key={p.id} program={p} liveTiers={liveTiers[i] ?? undefined} />
          ))}
        </div>
      </section>

      <section id="proximos-programas" className="scroll-mt-24">
        <SectionHead
          eyebrow="·· Catálogo"
          title={
            <>
              Próximos <span className="text-turquoise">programas</span>
            </>
          }
          subtitle="Nuevas formaciones en desarrollo para seguir ampliando tus competencias como líder local."
        />
        <div className="grid grid-cols-1 gap-5 mb-24 lg:grid-cols-3 max-sm:mb-14">
          {soonPrograms.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
          {Array.from({ length: placeholders }).map((_, i) => (
            <PlaceholderCard key={`placeholder-${i}`} />
          ))}
        </div>
      </section>
    </>
  );
}
