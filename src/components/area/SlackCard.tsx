import Link from "next/link";

export default function SlackCard({ url }: { url: string }) {
  return (
    <Link
      href={url}
      target={url.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="block rounded-3xl bg-ink text-white p-7 transition-transform hover:-translate-y-[3px]"
    >
      <div className="font-mono text-[10px] text-yellow tracking-[0.06em] uppercase mb-2">
        ·· Comunidad
      </div>
      <div className="font-display font-extrabold text-[26px] leading-[0.95] tracking-[-0.02em] uppercase mb-2">
        Slack de ADN Local
      </div>
      <p className="text-sm opacity-80 leading-[1.5] mb-3">
        Dudas, casos y networking con el resto de alumnos y profesores. El acceso no caduca.
      </p>
      <span className="text-sm font-semibold text-yellow">Unirme a la comunidad →</span>
    </Link>
  );
}
