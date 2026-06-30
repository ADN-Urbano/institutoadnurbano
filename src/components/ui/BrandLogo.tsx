import Link from "next/link";
import Image from "next/image";

/**
 * Logo de marca ADN Local (imagen en public/adn-local-logo.png, recortada al
 * trazo). tone="brand" (turquesa original, header) | tone="yellow" (footer
 * sobre fondo oscuro: se aclara a blanco para contraste).
 */
const sizeClass = { sm: "h-9", md: "h-11", lg: "h-14" } as const;

export default function BrandLogo({
  tone = "brand",
  href = "/",
  size = "sm",
}: {
  tone?: "brand" | "yellow";
  href?: string | null;
  size?: keyof typeof sizeClass;
}) {
  const mark = (
    <Image
      src="/adn-local-logo.png"
      alt="ADN Local"
      width={580}
      height={308}
      priority
      className={`${sizeClass[size]} w-auto ${tone === "yellow" ? "brightness-0 invert" : ""}`}
    />
  );

  if (href === null) {
    return <div className="flex items-center">{mark}</div>;
  }

  return (
    <Link href={href} className="flex items-center">
      {mark}
    </Link>
  );
}
