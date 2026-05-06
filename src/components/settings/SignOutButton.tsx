"use client";

import { signOut } from "next-auth/react";

export function SignOutButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label="Cerrar sesión"
      onClick={() => void signOut({ callbackUrl: "/login" })}
      className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-tertiary"
    >
      {children}
    </button>
  );
}
