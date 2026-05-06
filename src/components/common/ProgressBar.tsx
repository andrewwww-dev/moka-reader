export function ProgressBar({ value }: { value: number }) {
  return (
    <progress
      aria-label="Progreso de lectura"
      className="moka-progress block h-1 w-full overflow-hidden rounded-full"
      max={100}
      value={Math.min(100, Math.max(0, value))}
    />
  );
}
