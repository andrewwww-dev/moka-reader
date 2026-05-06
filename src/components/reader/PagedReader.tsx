"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import { PDFRenderer } from "@/components/reader/PDFRenderer";
import type { ReaderPage, VolumePagesResponse } from "@/types";

export function PagedReader({
  volume,
  pages,
  page,
  onPageChange,
}: {
  volume: VolumePagesResponse["volume"];
  pages: ReaderPage[];
  page: number;
  onPageChange: (page: number) => void;
}) {
  const current = pages[page - 1];

  return (
    <div
      className="grid min-h-screen place-items-center"
      onClick={(event) => {
        const x = event.clientX / window.innerWidth;
        if (x < 0.3) onPageChange(Math.max(1, page - 1));
        if (x > 0.7) onPageChange(Math.min(pages.length, page + 1));
      }}
    >
      {volume.fileType === "PDF" && current?.url ? (
        <PDFRenderer fileUrl={current.url} page={page} />
      ) : current?.url ? (
        <Image src={current.url} alt={`Página ${page}`} width={1200} height={1800} priority className="max-h-screen w-auto object-contain" />
      ) : (
        <div className="grid place-items-center text-center text-text-secondary">
          <FileText className="mb-4 size-16 text-accent-purple" aria-hidden="true" />
          <p>Esta página estará disponible cuando el archivo tenga una URL de Drive válida.</p>
        </div>
      )}
    </div>
  );
}
