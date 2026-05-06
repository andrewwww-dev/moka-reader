"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Inicio",
  "/library": "Biblioteca",
  "/drive": "Google Drive",
  "/settings": "Configuración",
};

export function Header() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "MokaReader";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg-secondary px-4 py-3 lg:hidden">
      <h1 className="font-heading text-2xl text-text-primary">{title}</h1>
    </header>
  );
}
