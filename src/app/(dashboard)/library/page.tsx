import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { AlphabetSidebar } from "@/components/library/AlphabetSidebar";
import { LibraryFilters } from "@/components/library/LibraryFilters";
import { LibrarySearch } from "@/components/library/LibrarySearch";
import { SeriesGrid } from "@/components/library/SeriesGrid";
import { getLibrary } from "@/lib/series-service";
import { requireUser } from "@/lib/session";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; genre?: string; sort?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const library = await getLibrary(user.id, {
    search: params.search,
    genre: params.genre,
    sort: params.sort,
    take: 20,
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-5xl text-text-primary">Biblioteca</h1>
          <Badge>{library.total} series</Badge>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Vista de cuadrícula" className="rounded-xl bg-accent-purple p-3 text-text-primary">
            <Grid2X2 className="size-5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Vista de lista" className="rounded-xl bg-bg-secondary p-3 text-text-secondary">
            <List className="size-5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Ordenar biblioteca" className="rounded-xl bg-bg-secondary p-3 text-text-secondary">
            <SlidersHorizontal className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <LibrarySearch defaultValue={params.search} />
      <LibraryFilters active={params.genre} />
      <SeriesGrid series={library.series} />
      <AlphabetSidebar />
    </div>
  );
}
