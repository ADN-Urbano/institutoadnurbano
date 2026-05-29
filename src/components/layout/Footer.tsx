import BrandLogo from "@/components/ui/BrandLogo";

const columns = [
  {
    title: "Recursos",
    items: ["Artículos", "Casos de éxito", "Píldoras", "Podcast", "Newsletter"],
  },
  {
    title: "Formación",
    items: ["Programas activos", "Próximas ediciones", "Para ayuntamientos", "Para empresas"],
  },
  {
    title: "ADN Urbano",
    items: ["Sobre nosotros", "Equipo", "Servicios", "Contacto"],
  },
  {
    title: "Legal",
    items: ["Aviso legal", "Privacidad", "Cookies", "Condiciones"],
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
                  <li
                    key={item}
                    className="text-[13px] text-white/75 cursor-pointer transition-colors hover:text-white"
                  >
                    {item}
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
