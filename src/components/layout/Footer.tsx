import BrandLogo from "@/components/ui/BrandLogo";
import FooterLink from "@/components/layout/FooterLink";

const columns = [
  {
    title: "Formación",
    items: [
      { label: "Programas", href: "/programas" },
      { label: "Itinerario", href: "/itinerario" },
      { label: "Metodología", href: "/metodologia" },
      { label: "Sobre nosotros", href: "/sobre-nosotros" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Aviso legal", href: "/aviso-legal" },
      { label: "Privacidad", href: "/privacidad" },
      { label: "Cookies", href: "/cookies" },
      { label: "Condiciones", href: "/condiciones" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-turquoise-deep text-white pt-16 pb-8 mt-20">
      <div className="max-w-[1320px] mx-auto px-8">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-12 pb-12 border-b border-white/15 mb-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div>
            <div className="mb-[18px]">
              <BrandLogo tone="yellow" href={null} size="lg" />
            </div>
            <p className="text-sm leading-relaxed text-white/75 max-w-[280px]">
              El espacio de referencia de los líderes locales.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[11px] font-semibold text-yellow mb-4 tracking-[0.06em] uppercase">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink
                      href={item.href}
                      className="text-[13px] text-white/75 transition-colors hover:text-white"
                    >
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="font-mono text-[11px] text-white/50 tracking-[0.04em] uppercase">
          <span>© 2026 ADN Urbano · adnlocal.es</span>
        </div>
      </div>
    </footer>
  );
}
