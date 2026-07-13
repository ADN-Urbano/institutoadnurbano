"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Enlace del footer. Si ya estás en esa misma ruta, Next no navega y te
 * quedarías abajo (junto al footer); forzamos scroll al inicio.
 */
export default function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (pathname === href) window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
}
