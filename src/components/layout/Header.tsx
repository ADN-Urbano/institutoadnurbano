"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/ui/BrandLogo";
import { ArrowRight, SearchIcon, MenuIcon, CloseIcon, ChevronDown } from "@/components/ui/icons";

const resourceMenu = [
  { label: "Todos los recursos", href: "/recursos" },
  { label: "Artículos", href: "/recursos?formato=articulo" },
  { label: "Casos", href: "/recursos?formato=caso" },
  { label: "Píldoras", href: "/recursos?formato=pildora" },
  { label: "Podcast", href: "/recursos?formato=podcast" },
];

const itemBase = "px-3.5 py-2 text-sm rounded-lg transition-all";
const itemOn = "text-turquoise bg-turquoise-soft font-semibold";
const itemOff = "text-ink-soft font-medium hover:text-turquoise hover:bg-turquoise-soft";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState<{ loggedIn: boolean; name?: string }>({ loggedIn: false });
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(setMe)
      .catch(() => {});
  }, [pathname]);

  const homeActive = pathname === "/";
  const recursosActive = pathname.startsWith("/recursos");
  const formacionActive = pathname.startsWith("/formacion");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md backdrop-saturate-[1.8] border-b border-rule">
      <div className="max-w-[1320px] mx-auto px-8 h-[76px] flex items-center gap-10 max-md:px-5 max-md:gap-4">
        <BrandLogo href="/" />

        {/* Navegación de escritorio */}
        <nav className="flex items-center gap-0.5 flex-1 max-md:hidden">
          <Link href="/" className={`${itemBase} ${homeActive ? itemOn : itemOff}`}>
            Inicio
          </Link>

          {/* Recursos + desplegable */}
          <div className="relative group">
            <Link
              href="/recursos"
              className={`${itemBase} inline-flex items-center gap-1 ${recursosActive ? itemOn : itemOff}`}
            >
              Recursos
              <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
              <div className="bg-white border border-rule rounded-xl shadow-[var(--shadow-lg)] p-1.5 min-w-[210px]">
                {resourceMenu.map((r) => (
                  <Link
                    key={r.label}
                    href={r.href}
                    className="block px-3 py-2 text-sm text-ink-soft font-medium rounded-lg transition-all hover:text-turquoise hover:bg-turquoise-soft"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/formacion" className={`${itemBase} ${formacionActive ? itemOn : itemOff}`}>
            Formación
          </Link>
        </nav>

        <div className="flex items-center gap-2.5 ml-auto max-md:gap-2">
          <button
            aria-label="Buscar"
            className="w-[38px] h-[38px] border border-rule bg-white rounded-lg flex items-center justify-center text-ink-soft transition-all hover:border-turquoise hover:text-turquoise"
          >
            <SearchIcon className="w-3.5 h-3.5" />
          </button>
          <Link
            href={me.loggedIn ? "/area" : "/acceder"}
            className="px-3.5 py-2 text-sm font-medium text-ink-soft rounded-lg transition-all hover:text-ink hover:bg-bg-soft max-md:hidden"
          >
            {me.loggedIn ? "Mi área" : "Acceder"}
          </Link>
          {me.loggedIn && (
            <a
              href="/api/auth/logout"
              className="px-2.5 py-2 text-sm font-medium text-ink-muted rounded-lg transition-all hover:text-ink hover:bg-bg-soft max-md:hidden"
            >
              Salir
            </a>
          )}
          <Link
            href="/curso/plan-dinamizacion-comercial"
            className="bg-ink text-white px-[18px] py-2.5 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)] max-md:hidden"
          >
            Próximo curso
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Botón hamburguesa (solo móvil) */}
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="hidden max-md:flex w-[38px] h-[38px] border border-rule bg-white rounded-lg items-center justify-center text-ink"
          >
            {open ? <CloseIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Panel de navegación móvil */}
      {open && (
        <nav className="hidden max-md:block border-t border-rule bg-white px-5 py-4">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`px-3.5 py-2.5 text-[15px] rounded-lg ${homeActive ? itemOn : itemOff}`}
            >
              Inicio
            </Link>

            <Link
              href="/recursos"
              onClick={() => setOpen(false)}
              className={`px-3.5 py-2.5 text-[15px] rounded-lg ${recursosActive ? itemOn : itemOff}`}
            >
              Recursos
            </Link>
            <div className="flex flex-col border-l border-rule ml-5 pl-2">
              {resourceMenu.slice(1).map((r) => (
                <Link
                  key={r.label}
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="px-3.5 py-2 text-sm text-ink-soft font-medium rounded-lg transition-all hover:text-turquoise hover:bg-turquoise-soft"
                >
                  {r.label}
                </Link>
              ))}
            </div>

            <Link
              href="/formacion"
              onClick={() => setOpen(false)}
              className={`px-3.5 py-2.5 text-[15px] rounded-lg ${formacionActive ? itemOn : itemOff}`}
            >
              Formación
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 mt-4 pt-4 border-t border-rule">
            <Link
              href={me.loggedIn ? "/area" : "/acceder"}
              onClick={() => setOpen(false)}
              className="px-3.5 py-2.5 text-[15px] font-medium text-ink-soft rounded-lg text-center border border-rule"
            >
              {me.loggedIn ? "Mi área" : "Acceder"}
            </Link>
            {me.loggedIn && (
              <a
                href="/api/auth/logout"
                className="px-3.5 py-2.5 text-[15px] font-medium text-ink-muted rounded-lg text-center"
              >
                Cerrar sesión
              </a>
            )}
            <Link
              href="/curso/plan-dinamizacion-comercial"
              onClick={() => setOpen(false)}
              className="bg-ink text-white px-[18px] py-3 rounded-lg text-[15px] font-semibold inline-flex items-center justify-center gap-2"
            >
              Próximo curso
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
