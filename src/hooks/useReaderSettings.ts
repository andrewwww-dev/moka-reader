"use client";

import { useQuery } from "@tanstack/react-query";
import type { ReadingSettings } from "@/types";

export function useReaderSettings() {
  return useQuery({
    queryKey: ["reader-settings"],
    queryFn: async () => {
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Unable to load settings");
      return (await response.json()) as { settings: ReadingSettings };
    },
  });
}
