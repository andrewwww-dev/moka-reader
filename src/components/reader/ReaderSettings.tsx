"use client";

import { X } from "lucide-react";
import type { ReadingSettings } from "@/types";

export function ReaderSettings({
  open,
  settings,
  onClose,
  onChange,
}: {
  open: boolean;
  settings: ReadingSettings;
  onClose: () => void;
  onChange: (settings: Partial<ReadingSettings>) => void;
}) {
  if (!open) return null;

  return (
    <aside className="absolute inset-y-0 right-0 z-[60] w-full max-w-sm border-l border-border bg-bg-secondary p-5 shadow-2xl">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-3xl text-text-primary">Lectura</h2>
        <button type="button" aria-label="Cerrar ajustes" onClick={onClose} className="rounded-xl bg-bg-tertiary p-2 text-text-primary">
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 space-y-5">
        <Segmented
          label="Dirección"
          value={settings.readingDirection}
          options={["RTL", "LTR"]}
          onChange={(value) => onChange({ readingDirection: value as ReadingSettings["readingDirection"] })}
        />
        <Segmented
          label="Modo"
          value={settings.readingMode}
          options={["PAGED", "VERTICAL"]}
          onChange={(value) => onChange({ readingMode: value as ReadingSettings["readingMode"] })}
        />
        <Segmented
          label="Diseño"
          value={settings.pageLayout}
          options={["SINGLE", "DOUBLE"]}
          onChange={(value) => onChange({ pageLayout: value as ReadingSettings["pageLayout"] })}
        />
      </div>
    </aside>
  );
}

function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-sm text-text-secondary">{label}</div>
      <div className="grid grid-cols-2 rounded-xl bg-bg-tertiary p-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={option === value ? "rounded-lg bg-accent-purple px-3 py-2 text-sm text-text-primary" : "rounded-lg px-3 py-2 text-sm text-text-secondary"}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
