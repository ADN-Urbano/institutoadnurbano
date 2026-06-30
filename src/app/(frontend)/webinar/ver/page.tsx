import type { Metadata } from "next";
import Link from "next/link";
import WebinarCountdown from "@/components/marketing/WebinarCountdown";

export const metadata: Metadata = {
  title: "Tu webinar · Instituto ADN Local",
  description: "Acceso a la grabación del webinar de ADN Local y tu oferta exclusiva del programa.",
  robots: { index: false }, // página de visionado, no indexar
};

/**
 * Visionado del webinar evergreen: vídeo Bunny (placeholder hasta tener la
 * grabación) + cuenta atrás de la oferta (72 h, leída de la cookie adn_webinar)
 * + CTA al programa con el -40% como bonus del webinar.
 *
 * Bunny: enchufar `NEXT_PUBLIC_BUNNY_LIBRARY_ID` + `NEXT_PUBLIC_BUNNY_WEBINAR_VIDEO_ID`.
 * Sin ellos se muestra un placeholder. El CTA al curso se ajusta cuando el
 * cliente confirme el slug del programa destino (placeholder: /formacion).
 */
export default function WebinarVerPage() {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  const videoId = process.env.NEXT_PUBLIC_BUNNY_WEBINAR_VIDEO_ID;
  const hasVideo = Boolean(libraryId && videoId);
  const embedUrl = hasVideo
    ? `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&preload=true`
    : null;

  // Curso destino del CTA del webinar (placeholder hasta confirmar el slug).
  const courseHref = "/formacion";

  return (
    <main className="max-w-[1100px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-coral-soft text-coral rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-6">
        ·· Tu webinar
      </div>
      <h1 className="font-display font-extrabold text-[44px] leading-[0.95] tracking-[-0.025em] uppercase mb-6 md:text-[56px] max-sm:text-[34px] max-w-[18ch]">
        La estrategia local que sí funciona
      </h1>

      {/* Vídeo (Bunny) o placeholder */}
      <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-ink mb-8">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            loading="lazy"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            title="Webinar ADN Local"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white/70 px-6">
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase mb-3">Vídeo del webinar</div>
            <p className="text-[15px] max-w-[420px]">
              La grabación se publicará aquí. (Placeholder de Bunny Stream — pendiente de subir el
              vídeo y configurar la librería.)
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <section>
          <h2 className="font-display font-extrabold text-[32px] leading-[0.95] tracking-[-0.02em] uppercase mb-4 max-sm:text-[26px]">
            Tu bonus exclusivo: -40% en el programa
          </h2>
          <p className="text-[16px] leading-[1.6] text-ink-soft mb-6 max-w-[560px]">
            Por haber visto el webinar, tienes un descuento del 40% en el programa completo. Es una
            oferta limitada que caduca a las 72 horas desde tu registro. Da el paso antes de que se
            agote.
          </p>
          <Link
            href={courseHref}
            className="inline-flex items-center justify-center bg-ink text-white px-7 py-4 rounded-xl text-sm font-bold transition-all hover:bg-turquoise hover:-translate-y-px hover:shadow-[var(--shadow-md)]"
          >
            Quiero mi plaza con -40% →
          </Link>
        </section>

        <aside className="lg:sticky lg:top-[100px]">
          <WebinarCountdown />
        </aside>
      </div>
    </main>
  );
}
