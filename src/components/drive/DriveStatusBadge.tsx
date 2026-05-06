export function DriveStatusBadge({ connected }: { connected: boolean }) {
  return (
    <span className={connected ? "inline-flex items-center gap-2 text-sm text-success" : "inline-flex items-center gap-2 text-sm text-accent-pink"}>
      <span className={connected ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-accent-pink"} aria-hidden="true" />
      {connected ? "Conectado" : "No conectado"}
    </span>
  );
}
