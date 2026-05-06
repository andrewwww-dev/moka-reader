"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface ScanEvent {
  type: "log" | "done" | "error";
  message: string;
}

export function DriveScanProgress() {
  const [lines, setLines] = useState<ScanEvent[]>([]);
  const [scanning, setScanning] = useState(false);

  async function scan() {
    setScanning(true);
    setLines([]);
    const response = await fetch("/api/drive/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const reader = response.body?.getReader();
    if (!reader) {
      setScanning(false);
      return;
    }
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() ?? "";
      for (const chunk of chunks) {
        const payload = chunk.replace(/^data:\s*/, "");
        const event = JSON.parse(payload) as ScanEvent;
        setLines((current) => [...current, event]);
      }
    }
    setScanning(false);
  }

  return (
    <div>
      <button
        type="button"
        aria-label="Escanear ahora"
        disabled={scanning}
        onClick={() => void scan()}
        className="inline-flex items-center gap-2 rounded-xl bg-accent-purple px-5 py-3 text-sm font-semibold text-text-primary disabled:opacity-60"
      >
        <Search className="size-4" aria-hidden="true" />
        Escanear ahora
      </button>
      <div className="mt-4 min-h-32 rounded-xl border border-border bg-bg-primary p-4 text-sm text-text-secondary">
        {lines.length === 0 ? <p className="text-text-muted">Sin eventos de escaneo todavía.</p> : null}
        {lines.map((line, index) => (
          <p key={`${line.type}-${index}`} className="scan-line">
            {line.message}
          </p>
        ))}
      </div>
    </div>
  );
}
