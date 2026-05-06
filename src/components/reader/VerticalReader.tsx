"use client";

import { FileText } from "lucide-react";
import { PDFRenderer } from "@/components/reader/PDFRenderer";
import type { ReaderPage, VolumePagesResponse } from "@/types";

export function VerticalReader({
  volume,
  pages,
}: {
  volume: VolumePagesResponse["volume"];
  pages: ReaderPage[];
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center gap-4 py-16">
      {pages.length > 0 && volume.fileType === "PDF" ? (
        pages.map((item) => <PDFRenderer key={item.page} fileUrl={item.url} page={item.page} />)
      ) : (
        <div className="grid min-h-screen place-items-center text-center text-text-secondary">
          <FileText className="mb-4 size-16 text-accent-purple" aria-hidden="true" />
          <p>Modo vertical listo para carpetas de imágenes conectadas.</p>
        </div>
      )}
    </div>
  );
}
