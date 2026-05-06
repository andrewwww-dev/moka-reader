"use client";

import { Search } from "lucide-react";

export function LibrarySearch({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <form action="/library" className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" aria-hidden="true" />
      <input
        name="search"
        defaultValue={defaultValue}
        placeholder="Buscar manga..."
        className="h-12 w-full rounded-xl border border-border bg-bg-secondary pl-12 pr-4 text-sm text-text-primary transition-colors placeholder:text-text-muted focus:border-accent-purple"
      />
    </form>
  );
}
