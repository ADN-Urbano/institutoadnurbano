import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <main className="max-w-[1320px] mx-auto px-8 pt-24 pb-32 text-center max-sm:px-5">
      <div className="font-display font-extrabold text-[140px] leading-none tracking-[-0.04em] text-turquoise max-sm:text-[88px]">
        404
      </div>
      <h1 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mt-2 mb-4 max-sm:text-[30px]">
        Esta página no existe
      </h1>
      <p className="text-[16px] text-ink-muted max-w-[460px] mx-auto mb-8">
        Puede que el enlace esté roto o que el contenido se haya movido. Vuelve al inicio o explora los
        recursos y la formación.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ink text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-turquoise"
        >
          Volver al inicio
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/recursos"
          className="px-5 py-3 rounded-lg text-sm font-semibold border border-rule transition-colors hover:border-turquoise hover:text-turquoise"
        >
          Ver recursos
        </Link>
      </div>
    </main>
  );
}
