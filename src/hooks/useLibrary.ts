"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { LibraryResponse } from "@/types";

export function useLibrary(search: string) {
  return useInfiniteQuery({
    queryKey: ["library", search],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        search,
        skip: String(pageParam),
      });
      const response = await fetch(`/api/series?${params}`);
      if (!response.ok) throw new Error("Unable to load library");
      return (await response.json()) as LibraryResponse;
    },
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce((total, page) => total + page.series.length, 0);
      return loaded < lastPage.total ? loaded : undefined;
    },
  });
}
