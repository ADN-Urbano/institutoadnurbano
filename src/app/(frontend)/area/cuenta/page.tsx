import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentStudent } from "@/lib/session";
import AccountForm from "@/components/area/AccountForm";

export const metadata: Metadata = { title: "Mi cuenta · ADN Local" };
export const dynamic = "force-dynamic";

export default async function CuentaPage() {
  const student = await getCurrentStudent();
  if (!student) redirect("/acceder");

  return (
    <main className="max-w-[820px] mx-auto px-8 pt-14 pb-24 max-sm:px-5">
      <div className="font-mono text-xs text-ink-muted mb-5 tracking-[0.04em] uppercase">
        <Link href="/area" className="transition-colors hover:text-turquoise">
          Tu área
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span>Mi cuenta</span>
      </div>

      <h1 className="font-display font-extrabold text-[52px] leading-[0.95] tracking-[-0.02em] uppercase mb-8 max-sm:text-[36px]">
        Mi cuenta
      </h1>

      <AccountForm
        initialName={(student.name as string) ?? ""}
        email={(student.email as string) ?? ""}
      />
    </main>
  );
}
