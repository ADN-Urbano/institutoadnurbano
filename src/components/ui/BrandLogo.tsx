import Link from "next/link";
import Image from "next/image";

/**
 * Logo de marca ADN Local (imagen en public/adn-local-logo.png, recortada al
 * trazo). tone="brand" (turquesa original, header) | tone="yellow" (footer
 * sobre fondo oscuro: se aclara a blanco para contraste).
 */
export default function BrandLogo({
  tone = "brand",
  href = "/",
}: {
  tone?: "brand" | "yellow";
  href?: string | null;
}) {
  const mark = (
    <Image
      src="/adn-local-logo.png"
      alt="ADN Local"
      width={580}
      height={308}
      priority
      className={`h-9 w-auto ${tone === "yellow" ? "brightness-0 invert" : ""}`}
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
