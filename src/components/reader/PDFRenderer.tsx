"use client";

import { useEffect, useRef } from "react";

export function PDFRenderer({ fileUrl, page }: { fileUrl: string; page: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!fileUrl || !canvasRef.current) return;
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.mjs",
        import.meta.url,
      ).toString();
      const pdf = await pdfjs.getDocument(fileUrl).promise;
      const pdfPage = await pdf.getPage(page);
      const viewport = pdfPage.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await pdfPage.render({ canvas, canvasContext: context, viewport }).promise;
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [fileUrl, page]);

  return <canvas ref={canvasRef} className="max-h-screen max-w-full shadow-2xl shadow-bg-primary" />;
}
