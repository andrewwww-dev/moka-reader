import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(value: Date | string | null) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function progressPercent(currentPage: number, totalPages: number | null | undefined) {
  if (!totalPages || totalPages <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((currentPage / totalPages) * 100)));
}

export function apiError(error: string, code: string, status = 400) {
  return Response.json({ error, code }, { status });
}
