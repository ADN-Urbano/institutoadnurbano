/**
 * Vídeos de presentación (Bunny Stream). Library ID y GUID son públicos (van en
 * la URL del embed) → no son secretos. Mapa por slug de curso.
 */
export const BUNNY_LIBRARY_ID = "697335";

export const bunnyVideoBySlug: Record<string, string> = {
  "hacia-un-nuevo-mandato": "e7eb8e65-f5be-44b1-a863-8e0e4aa94993",
  "construir-la-alternativa": "8ed0b7ee-41bb-4c30-9633-0f268f689f58",
};

/** URL de embed del player de Bunny para un curso, o undefined si no hay vídeo. */
export function bunnyEmbedUrl(slug: string): string | undefined {
  const guid = bunnyVideoBySlug[slug];
  return guid ? `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${guid}` : undefined;
}
