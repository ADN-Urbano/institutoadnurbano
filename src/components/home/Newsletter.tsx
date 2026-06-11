import { newsletter } from "@/data/home";

export default function Newsletter() {
  return (
    <section id="newsletter" className="relative overflow-hidden bg-turquoise text-white rounded-[28px] px-12 py-16 mb-16 grid grid-cols-2 gap-12 items-center max-lg:grid-cols-1 max-lg:gap-8 max-sm:px-6 max-sm:py-10 max-sm:mb-12 scroll-mt-24">
      <span
        aria-hidden
        className="absolute -top-[100px] -right-[100px] w-[360px] h-[360px] rounded-full bg-white/[0.08]"
      />
      <div className="relative z-[1]">
        <div className="inline-flex items-center gap-2 px-3 py-[5px] bg-white/15 text-white rounded-full font-mono text-[11px] font-medium tracking-[0.04em] uppercase mb-5">
          {newsletter.eyebrow}
        </div>
        <h2 className="font-display font-extrabold text-[56px] tracking-[-0.02em] leading-[0.95] uppercase mb-[18px] text-white max-lg:text-[36px] max-sm:text-[32px]">
          {newsletter.title}
        </h2>
        <p className="text-base leading-[1.55] opacity-95">{newsletter.desc}</p>
      </div>

      <div className="relative z-[1]">
        <div className="bg-white rounded-[14px] p-1.5 flex items-center shadow-[var(--shadow-md)]">
          <input
            type="email"
            placeholder="tu@email.es"
            className="flex-1 min-w-0 bg-transparent border-none px-4 py-3.5 text-[15px] text-ink outline-none placeholder:text-ink-muted max-sm:px-3"
          />
          <button
            type="button"
            className="bg-ink text-white border-none px-5 py-3 rounded-[10px] text-sm font-semibold transition-colors hover:bg-turquoise-dark"
          >
            Suscribirme
          </button>
        </div>
        <div className="flex gap-8 mt-6">
          {newsletter.stats.map(([num, label]) => (
            <div key={label}>
              <strong className="block font-display font-extrabold text-[32px] tracking-[-0.02em] mb-0.5 text-white">
                {num}
              </strong>
              <span className="font-mono text-[11px] tracking-[0.04em] uppercase opacity-85">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
