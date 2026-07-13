"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/ui/BrandLogo";
import { ArrowRight, MenuIcon, CloseIcon } from "@/components/ui/icons";

const itemBase = "px-3.5 py-2 text-sm rounded-lg transition-all";
const itemOn = "text-turquoise bg-turquoise-soft font-semibold";
const itemOff = "text-ink-soft font-medium hover:text-turquoise hover:bg-turquoise-soft";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState<{ loggedIn: boolean; name?: string }>({ loggedIn: false });
  const [nextCourseHref, setNextCourseHref] = useState("/programas");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(setMe)
      .catch(() => {});
  }, [pathname]);

  // Logo grande al entrar (arriba del todo); se encoge al hacer scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Próximo programa disponible (se resuelve solo según las ediciones).
  useEffect(() => {
    fetch("/api/next-course")
      .then((r) => r.json())
      .then((d) => setNextCourseHref(d.href ?? "/formacion"))
      .catch(() => {});
  }, []);

  const navItems = [
    { label: "Inicio", href: "/", active: pathname === "/" },
    {
      label: "Programas",
      href: "/programas",
      active:
        pathname.startsWith("/programas") ||
        pathname.startsWith("/curso") ||
        pathname.startsWith("/formacion"),
    },
    { label: "Itinerario", href: "/itinerario", active: pathname.startsWith("/itinerario") },
    { label: "Metodología", href: "/metodologia", active: pathname.startsWith("/metodologia") },
    {
      label: "Sobre nosotros",
      href: "/sobre-nosotros",
      active: pathname.startsWith("/sobre-nosotros"),
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md backdrop-saturate-[1.8] border-b border-rule">
      <div
        className={`max-w-[1320px] mx-auto px-8 flex items-center gap-10 max-md:px-5 max-md:gap-4 transition-[height] duration-300 ease-out ${
          scrolled ? "h-[76px]" : "h-[76px] md:h-[92px]"
        }`}
      >
        <div
          className={`origin-left transition-transform duration-300 ease-out ${
            scrolled ? "scale-100" : "scale-100 md:scale-[1.3]"
          }`}
        >
          <BrandLogo href="/" size="md" />
        </div>

        {/* Navegación de escritorio */}
        <nav className="flex items-center gap-0.5 flex-1 max-md:hidden">
          {navItems.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`${itemBase} ${it.active ? itemOn : itemOff}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 ml-auto max-md:gap-2">
          <Link
            href={me.loggedIn ? "/area" : "/acceder"}
            className="px-3.5 py-2 text-sm font-semibold text-coral rounded-lg transition-all hover:bg-coral-soft max-md:hidden"
          >
            {me.loggedIn ? "Mi campus" : "Campus"}
          </Link>
          {me.loggedIn && (
            <Link
              prefetch={false}
              href="/api/auth/logout"
              className="px-2.5 py-2 text-sm font-medium text-ink-muted rounded-lg transition-all hover:text-ink hover:bg-bg-soft max-md:hidden"
            >
              Salir
            </Link>
          )}
          <Link
            href={nextCourseHref}
            className="bg-ink text-white px-[18px] py-2.5 rounded-lg text-sm font-semibold transition-all inline-flex items-center gap-2 hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)] max-md:hidden"
          >
            Próximo programa
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
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={`px-3.5 py-2.5 text-[15px] rounded-lg ${it.active ? itemOn : itemOff}`}
              >
                {it.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 mt-4 pt-4 border-t border-rule">
            <Link
              href={me.loggedIn ? "/area" : "/acceder"}
              onClick={() => setOpen(false)}
              className="px-3.5 py-2.5 text-[15px] font-semibold text-coral rounded-lg text-center border border-coral-soft"
            >
              {me.loggedIn ? "Mi campus" : "Campus"}
            </Link>
            {me.loggedIn && (
              <Link
                prefetch={false}
                href="/api/auth/logout"
                onClick={() => setOpen(false)}
                className="px-3.5 py-2.5 text-[15px] font-medium text-ink-muted rounded-lg text-center"
              >
                Cerrar sesión
              </Link>
            )}
            <Link
              href={nextCourseHref}
              onClick={() => setOpen(false)}
              className="bg-ink text-white px-[18px] py-3 rounded-lg text-[15px] font-semibold inline-flex items-center justify-center gap-2"
            >
              Próximo programa
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
