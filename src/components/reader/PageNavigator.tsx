"use client";

export function PageNavigator({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <input
      aria-label="Selector de página"
      type="range"
      min={1}
      max={Math.max(1, totalPages)}
      value={page}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-full accent-accent-purple"
    />
  );
}
