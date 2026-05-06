"use client";

import { useMutation } from "@tanstack/react-query";

export function useReadingProgress() {
  return useMutation({
    mutationFn: async (input: { volumeId: string; currentPage: number; completed?: boolean }) => {
      const response = await fetch("/api/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!response.ok) throw new Error("Unable to save progress");
      return response.json() as Promise<{ ok?: boolean }>;
    },
  });
}
