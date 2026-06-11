import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import { CheckIcon } from "@/components/ui/icons";
import AccederForm from "@/components/acceder/AccederForm";

export const metadata: Metadata = {
  title: "Acceder · ADN Local",
  description: "Accede a tu área de alumno del Instituto ADN Local.",
};

const perks = [
  "Tus cursos y vídeos pregrabados",
  "Enlace a la próxima clase en directo por Teams",
  "Materiales y plantillas descargables",
  "Tu progreso y certificados",
];

export default function AccederPage() {
  return (
    <main className="max-w-[980px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-rule shadow-[var(--shadow-md)]">
        {/* Panel de marca */}
        <div className="relative overflow-hidden bg-turquoise text-white p-10 flex flex-col justify-between gap-10 max-sm:p-7">
          <span
            aria-hidden
            className="absolute -bottom-[100px] -right-[100px] w-80 h-80 rounded-full bg-white/[0.08]"
          />
          <div className="relative z-[1]">
            <BrandLogo tone="yellow" href={null} />
            <h1 className="font-display font-extrabold text-[40px] leading-[0.95] tracking-[-0.02em] uppercase mt-8">
              Tu área de formación
            </h1>
            <p className="text-[15px] leading-[1.55] opacity-95 mt-4 max-w-[360px]">
              Entra para seguir tus cursos, ver los directos y descargar tus materiales.
            </p>
          </div>
          <ul className="relative z-[1] flex flex-col gap-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm leading-[1.4]">
                <CheckIcon className="w-[18px] h-[18px] text-yellow shrink-0 mt-px" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Formulario */}
        <div className="bg-white p-10 flex flex-col justify-center max-sm:p-7">
          <h2 className="font-display font-extrabold text-[32px] leading-none tracking-[-0.02em] uppercase mb-1">
            Accede a tu cuenta
          </h2>
          <p className="text-sm text-ink-muted mb-7">
            Sin contraseñas: te enviamos un enlace de acceso a tu email.
          </p>

          <AccederForm />

          <div className="mt-7 pt-6 border-t border-rule text-[13px] text-ink-muted leading-[1.5]">
            ¿Aún no tienes cuenta? El acceso se crea automáticamente al{" "}
            <Link href="/formacion" className="text-turquoise font-medium hover:underline">
              comprar tu primer curso
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
