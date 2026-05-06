"use client";

import { useState } from "react";

export function ConfirmDialog({
  label,
  confirmLabel,
  onConfirm,
}: {
  label: string;
  confirmLabel: string;
  onConfirm: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen(true)}
        className="rounded-xl border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-tertiary"
      >
        {label}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-bg-primary/80 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-secondary p-6">
            <h2 className="font-heading text-3xl text-text-primary">{label}</h2>
            <p className="mt-2 text-sm text-text-secondary">Esta acción necesita confirmación.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-bg-tertiary px-4 py-2 text-sm text-text-secondary"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
                className="rounded-xl bg-accent-purple px-4 py-2 text-sm font-semibold text-text-primary"
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
