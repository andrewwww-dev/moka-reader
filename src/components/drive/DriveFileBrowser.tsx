"use client";

import { useQuery } from "@tanstack/react-query";
import { Folder } from "lucide-react";

interface DriveFile {
  id?: string | null;
  name?: string | null;
  mimeType?: string | null;
}

export function DriveFileBrowser() {
  const { data, isLoading } = useQuery({
    queryKey: ["drive-files"],
    queryFn: async () => {
      const response = await fetch("/api/drive/files");
      if (!response.ok) throw new Error("Unable to load Drive files");
      return (await response.json()) as { files: DriveFile[] };
    },
    enabled: false,
  });

  return (
    <div className="rounded-xl border border-border bg-bg-primary p-4">
      <div className="mb-3 flex items-center gap-2 text-sm text-text-secondary">
        <Folder className="size-4 text-accent-purple" aria-hidden="true" />
        Explorador de archivos
      </div>
      {isLoading ? <p className="text-sm text-text-muted">Cargando...</p> : null}
      <div className="space-y-2">
        {(data?.files ?? []).map((file) => (
          <div key={file.id ?? file.name} className="rounded-lg bg-bg-tertiary px-3 py-2 text-sm text-text-secondary">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}
