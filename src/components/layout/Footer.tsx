import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";

const columns = [
  {
    title: "Recursos",
    items: [
      { label: "Artículos", href: "/recursos?formato=articulo" },
      { label: "Casos de éxito", href: "/recursos?formato=caso" },
      { label: "Píldoras", href: "/recursos?formato=pildora" },
      { label: "Podcast", href: "/recursos?formato=podcast" },
      { label: "Newsletter", href: "/#newsletter" },
    ],
  },
  {
    title: "Formación",
    items: [
      { label: "Programas activos", href: "/formacion" },
      { label: "Próximas ediciones", href: "/formacion" },
      { label: "Para ayuntamientos", href: "/formacion" },
      { label: "Para empresas", href: "/formacion" },
    ],
  },
  {
    title: "ADN Urbano",
    items: [
      { label: "Sobre nosotros", href: "#" },
      { label: "Equipo", href: "#" },
      { label: "Servicios", href: "#" },
      { label: "Contacto", href: "mailto:hola@adnlocal.es" },
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
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/15 mb-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div>
            <div className="mb-[18px]">
              <BrandLogo tone="yellow" href={null} />
            </div>
            <p className="text-sm leading-relaxed text-white/75 max-w-[280px]">
              Una iniciativa de ADN Urbano. Política local, comercio, movilidad y espacio
              público.
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
                    <Link
                      href={item.href}
                      className="text-[13px] text-white/75 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-mono text-[11px] text-white/50 tracking-[0.04em] uppercase max-sm:flex-col max-sm:gap-2">
          <span>© 2026 ADN Urbano · adnlocal.es</span>
          <span>San Rafael &amp; Madrid</span>
        </div>
      </div>
    </footer>
  );
}
