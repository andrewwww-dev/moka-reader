"use client";

import { useQuery } from "@tanstack/react-query";

export function useDriveStatus() {
  return useQuery({
    queryKey: ["drive-status"],
    queryFn: async () => {
      const response = await fetch("/api/drive/files");
      return { connected: response.ok };
    },
  });
}
