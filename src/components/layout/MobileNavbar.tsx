"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, Home, Library, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/library", label: "Biblioteca", icon: Library },
  { href: "/drive", label: "Drive", icon: Cloud },
  { href: "/settings", label: "Ajustes", icon: Settings },
];

export function MobileNavbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-border bg-bg-secondary py-2 lg:hidden">
      {navItems.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={cn("rounded-xl p-3 text-text-secondary", active && "text-accent-purple")}
          >
            <item.icon className="size-6" aria-hidden="true" />
          </Link>
        );
      })}
    </nav>
  );
}
