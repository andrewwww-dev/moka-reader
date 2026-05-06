import Link from "next/link";
import { Cloud } from "lucide-react";

export function DriveConnectButton() {
  return (
    <Link
      href="/api/drive/connect"
      className="inline-flex items-center gap-2 rounded-xl bg-accent-purple px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-purple-dark"
    >
      <Cloud className="size-4" aria-hidden="true" />
      Conectar Google Drive
    </Link>
  );
}
