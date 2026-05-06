"use client";

import { AlertTriangle } from "lucide-react";

export function ErrorBoundary({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-border bg-bg-secondary p-6 text-text-secondary">
      <AlertTriangle className="mb-3 size-6 text-warning" aria-hidden="true" />
      {message}
    </div>
  );
}
