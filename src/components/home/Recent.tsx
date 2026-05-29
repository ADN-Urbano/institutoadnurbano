import { recent } from "@/data/home";
import SectionHead from "@/components/ui/SectionHead";
import ResourceCard from "@/components/ui/ResourceCard";

export default function Recent() {
  return (
    <section>
      <SectionHead
        eyebrow="·· Reciente"
        title={
          <>
            Los últimos <span className="text-turquoise">recursos</span>
          </>
        }
        subtitle="Artículos, vídeos, podcast y casos publicados estas semanas."
        link={{ label: "Ver más →", href: "/recursos" }}
      />

      <div className="grid grid-cols-4 gap-6 mb-24 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:mb-14">
        {recent.map((r, i) => (
          <ResourceCard key={i} resource={r} />
        ))}
      </div>
    </section>
  );
}
