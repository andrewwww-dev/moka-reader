"use client";

import { useState } from "react";
import type { ReadingSettings } from "@/types";

export function SettingsForm({ settings }: { settings: ReadingSettings }) {
  const [form, setForm] = useState(settings);

  async function patch(next: Partial<ReadingSettings>) {
    const merged = { ...form, ...next };
    setForm(merged);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
  }

  return (
    <section className="rounded-2xl border border-border bg-bg-secondary p-6">
      <h2 className="text-lg font-semibold text-text-primary">Preferencias de lectura</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <SelectControl
          label="Dirección"
          value={form.readingDirection}
          options={["RTL", "LTR"]}
          onChange={(value) => void patch({ readingDirection: value as ReadingSettings["readingDirection"] })}
        />
        <SelectControl
          label="Modo"
          value={form.readingMode}
          options={["PAGED", "VERTICAL"]}
          onChange={(value) => void patch({ readingMode: value as ReadingSettings["readingMode"] })}
        />
        <SelectControl
          label="Páginas"
          value={form.pageLayout}
          options={["SINGLE", "DOUBLE"]}
          onChange={(value) => void patch({ pageLayout: value as ReadingSettings["pageLayout"] })}
        />
      </div>
      <label className="mt-5 flex items-center justify-between rounded-xl bg-bg-tertiary p-4 text-sm text-text-secondary">
        Escanear Drive al abrir la app
        <input
          type="checkbox"
          checked={form.autoScanDrive}
          onChange={(event) => void patch({ autoScanDrive: event.target.checked })}
          className="size-5 accent-accent-purple"
        />
      </label>
    </section>
  );
}

function SelectControl({
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
    <label className="text-sm text-text-secondary">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-border bg-bg-tertiary px-3 text-text-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
