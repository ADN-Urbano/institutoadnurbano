/** Renderiza un título con una palabra de acento en turquesa. */
export default function AccentTitle({ title, accent }: { title: string; accent: string }) {
  const idx = title.toLowerCase().indexOf(accent.toLowerCase());
  if (idx < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-turquoise">{title.slice(idx, idx + accent.length)}</span>
      {title.slice(idx + accent.length)}
    </>
  );
}
