import { testimonial } from "@/data/formacion";

export default function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-turquoise-deep text-white rounded-[28px] p-[72px] mb-16 text-center max-sm:p-9 max-sm:mb-12">
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(47,159,163,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(234,199,54,0.15) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-[1]">
        <p className="font-display font-bold text-[44px] leading-none tracking-[-0.02em] uppercase max-w-[920px] mx-auto mb-8 max-sm:text-[30px]">
          {testimonial.quote}
        </p>
        <div className="font-mono text-xs tracking-[0.06em] uppercase opacity-85">
          <strong className="font-semibold opacity-100">{testimonial.author}</strong> ·{" "}
          {testimonial.role}
        </div>
      </div>
    </section>
  );
}
