import Link from "next/link";
import { Check, Cloud, FolderSearch, X } from "lucide-react";

export default function DrivePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-5xl text-text-primary">Google Drive</h1>

      <section className="rounded-2xl border border-border bg-bg-secondary p-6">
        <div className="flex items-start gap-4">
          <Cloud className="size-10 text-accent-purple" aria-hidden="true" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-accent-pink">
              <span className="size-2 rounded-full bg-accent-pink" aria-hidden="true" />
              No conectado
            </div>
            <h2 className="mt-2 text-xl font-semibold text-text-primary">Conecta Google Drive</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
              MokaReader solicita permiso de solo lectura para encontrar PDFs, CBZ, CBR y carpetas de imágenes.
            </p>
            <div className="mt-4 grid gap-2 text-sm text-text-secondary sm:grid-cols-3">
              <span className="flex items-center gap-2"><Check className="size-4 text-success" /> Leer archivos</span>
              <span className="flex items-center gap-2"><X className="size-4 text-accent-pink" /> Modificar archivos</span>
              <span className="flex items-center gap-2"><X className="size-4 text-accent-pink" /> Compartir archivos</span>
            </div>
            <Link
              href="/api/drive/connect"
              className="mt-6 inline-flex rounded-xl bg-accent-purple px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-purple-dark"
            >
              Conectar Google Drive
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-bg-secondary p-6 opacity-70">
        <div className="flex items-start gap-4">
          <FolderSearch className="size-10 text-accent-purple" aria-hidden="true" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-text-primary">Escáner de biblioteca</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Se activará cuando termines la conexión con Drive. Soporta una carpeta específica o escaneo completo.
            </p>
            <div className="mt-5 rounded-xl border border-border bg-bg-primary p-4 text-sm text-text-muted">
              Esperando conexión...
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
