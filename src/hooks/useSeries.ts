"use client";

import { useQuery } from "@tanstack/react-query";
import type { SeriesDetail } from "@/types";

export function useSeries(id: string) {
  return useQuery({
    queryKey: ["series", id],
    queryFn: async () => {
      const response = await fetch(`/api/series/${id}`);
      if (!response.ok) throw new Error("Unable to load series");
      return (await response.json()) as { series: SeriesDetail };
    },
  });
}
