"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Cloud, Home, Library, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import type { AppUser } from "@/types";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/library", label: "Biblioteca", icon: Library },
  { href: "/drive", label: "Google Drive", icon: Cloud },
  { href: "/settings", label: "Configuración", icon: Settings },
];

export function Sidebar({ user }: { user: AppUser }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-bg-secondary lg:flex">
      <div className="flex h-20 items-center gap-2 px-5">
        <BookOpen className="size-7 text-accent-purple" aria-hidden="true" />
        <div className="font-heading text-3xl tracking-wide text-text-primary">MOKA READER</div>
        <span className="size-2 rounded-full bg-accent-pink" aria-hidden="true" />
      </div>
      <nav className="flex flex-1 flex-col gap-2 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl border-l-2 border-transparent px-4 py-3 text-sm text-text-secondary transition-colors duration-150 hover:bg-bg-tertiary",
                active && "border-accent-purple bg-accent-purple/10 text-text-primary",
              )}
            >
              <item.icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <div className="mb-4 flex items-center gap-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? user.email}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="grid size-10 place-items-center rounded-full bg-bg-tertiary text-sm font-semibold">
              {user.email.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-text-primary">{user.name ?? "Moka Reader"}</div>
            <div className="truncate text-xs text-text-muted">{user.email}</div>
          </div>
        </div>
        <button
          type="button"
          aria-label="Cerrar sesión"
          onClick={() => void signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-tertiary"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
