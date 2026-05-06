"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReaderControls({
  visible,
  title,
  seriesSlug,
  page,
  totalPages,
  onPageChange,
  onSettings,
}: {
  visible: boolean;
  title: string;
  seriesSlug: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSettings: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "absolute inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-bg-primary/90 to-transparent p-4 transition-opacity",
          visible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <Link href={`/series/${seriesSlug}`} aria-label="Volver a la serie" className="rounded-xl bg-bg-primary/60 p-3 text-text-primary">
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
        <div className="text-center text-sm text-text-primary">{title}</div>
        <button type="button" aria-label="Abrir ajustes del lector" onClick={onSettings} className="rounded-xl bg-bg-primary/60 p-3 text-text-primary">
          <Settings className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-50 flex items-center gap-4 bg-gradient-to-t from-bg-primary/90 to-transparent p-4 transition-opacity",
          visible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button type="button" aria-label="Página anterior" onClick={() => onPageChange(Math.max(1, page - 1))} className="rounded-xl bg-bg-primary/60 p-3 text-text-primary">
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <div className="flex flex-1 flex-col gap-2">
          <div className="text-center text-xs text-text-primary">
            Pág {page} / {totalPages}
          </div>
          <input
            aria-label="Navegar por páginas"
            type="range"
            min={1}
            max={Math.max(1, totalPages)}
            value={page}
            onChange={(event) => onPageChange(Number(event.target.value))}
            className="accent-accent-purple"
          />
        </div>
        <button type="button" aria-label="Página siguiente" onClick={() => onPageChange(Math.min(totalPages, page + 1))} className="rounded-xl bg-bg-primary/60 p-3 text-text-primary">
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
