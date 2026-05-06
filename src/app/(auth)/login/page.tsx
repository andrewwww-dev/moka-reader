import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginButton } from "@/components/auth/LoginButton";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = process.env.DATABASE_URL ? await auth() : null;
  if (session) redirect("/");

  return (
    <main className="dot-grid grid min-h-screen place-items-center bg-bg-primary p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text font-heading text-7xl leading-none text-transparent">
            MOKA
          </div>
          <div className="font-heading text-2xl tracking-widest text-text-primary">READER</div>
          <p className="mt-2 text-sm text-text-secondary">Tu biblioteca manga, siempre contigo.</p>
        </div>
        <section className="rounded-2xl border border-border bg-bg-secondary p-8 shadow-2xl shadow-bg-primary/50">
          <Suspense fallback={null}>
            <LoginButton />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
