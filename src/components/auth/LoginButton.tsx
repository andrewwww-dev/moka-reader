"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

function GoogleLogo() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21.8 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.7 3.1-4.3 3.1-7.4Z" />
      <path fill="currentColor" d="M12 22c2.7 0 5-0.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path fill="currentColor" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" />
      <path fill="currentColor" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.6C7.2 7.8 9.4 6 12 6Z" />
    </svg>
  );
}

export function LoginButton() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="w-full">
      <div className="mb-5 flex justify-center">
        <BookOpen className="size-12 text-accent-purple" aria-hidden="true" />
      </div>
      <h1 className="text-center text-xl font-semibold text-text-primary">Bienvenido de vuelta</h1>
      <p className="mt-2 text-center text-sm text-text-secondary">
        Inicia sesión con tu cuenta de Google para acceder a tu biblioteca
      </p>
      {error ? (
        <div className="mt-4 rounded-xl border border-accent-pink/40 bg-accent-pink/10 p-3 text-sm text-text-primary">
          No pudimos iniciar sesión. Inténtalo de nuevo.
        </div>
      ) : null}
      <button
        type="button"
        aria-label="Continuar con Google"
        disabled={loading}
        onClick={() => {
          setLoading(true);
          void signIn("google", { callbackUrl: "/" });
        }}
        className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-text-primary font-semibold text-bg-primary transition-colors hover:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <LoadingSpinner className="size-4" /> : <GoogleLogo />}
        Continuar con Google
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-text-muted">
        Al continuar, aceptas que esta app acceda a tu Google Drive para gestionar tu biblioteca.
      </p>
    </div>
  );
}
