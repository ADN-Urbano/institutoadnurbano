import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ResourceCard from "@/components/ui/ResourceCard";
import ResourceFilters from "@/components/recursos/ResourceFilters";
import Pagination from "@/components/recursos/Pagination";
import { header, resources, formatoLabelBySlug } from "@/data/recursos";

export const metadata: Metadata = {
  title: "Recursos · ADN Local",
  description:
    "Archivo del centro de recursos de ADN Local: más de 350 artículos, vídeos, podcasts y casos de política local, filtrables por materia, formato y tamaño de población.",
};

export default async function RecursosPage({
  searchParams,
}: {
  searchParams: Promise<{ formato?: string }>;
}) {
  const { formato } = await searchParams;
  const activeFormato = formato && formatoLabelBySlug[formato] ? formato : "";
  const label = activeFormato ? formatoLabelBySlug[activeFormato] : undefined;
  const list = label ? resources.filter((r) => r.format === label) : resources;

  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        accent={header.accent}
        summary={header.summary}
        stats={header.stats}
      />

      <ResourceFilters activeFormato={activeFormato} />

      <div className="font-mono text-[11px] text-ink-muted tracking-[0.04em] uppercase mb-6">
        {list.length} {list.length === 1 ? "recurso" : "recursos"}
        {label ? ` · ${label}` : ""}
      </div>

      {list.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-6 gap-y-8 mb-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {list.map((r, i) => (
            <ResourceCard key={i} resource={r} />
          ))}
        </div>
      ) : (
        <div className="border border-rule rounded-[14px] p-10 text-center text-ink-muted mb-16">
          No hay recursos de este formato todavía.
        </div>
      )}

      <Pagination />
    </main>
  );
}
