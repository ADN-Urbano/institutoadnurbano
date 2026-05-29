import Link from "next/link";

/**
 * Logo derivado «adk·LOCAL» — recreación tipográfica del logo del brandbook.
 * tone="brand" (turquesa, header) | tone="yellow" (footer sobre fondo oscuro).
 */
export default function BrandLogo({
  tone = "brand",
  href = "/",
}: {
  tone?: "brand" | "yellow";
  href?: string | null;
}) {
  const color = tone === "yellow" ? "text-yellow" : "text-turquoise";

  const mark = (
    <div className="flex items-stretch gap-1 h-10">
      <span
        className={`font-display font-black text-[42px] leading-none tracking-[-0.04em] ${color}`}
      >
        adk
      </span>
      <span
        className={`flex flex-col justify-between font-display font-extrabold text-[9px] leading-none tracking-[0.02em] pt-[3px] pb-[4px] ${color}`}
      >
        <span>LO</span>
        <span>CA</span>
        <span>L</span>
      </span>
    </div>
  );

  if (href === null) {
    return <div className="flex items-center gap-2.5">{mark}</div>;
  }

  return (
    <Link href={href} className="flex items-center gap-2.5">
      {mark}
    </Link>
  );
}
