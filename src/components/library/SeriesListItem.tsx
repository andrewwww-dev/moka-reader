import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import type { SeriesSummary } from "@/types";

export function SeriesListItem({ series }: { series: SeriesSummary }) {
  return (
    <Link
      href={`/series/${series.slug}`}
      className="flex gap-4 rounded-2xl border border-border bg-bg-secondary p-3 transition-colors hover:bg-bg-tertiary"
    >
      <div className="relative h-20 w-14 overflow-hidden rounded-lg bg-bg-tertiary">
        {series.coverImage ? (
          <Image src={series.coverImage} alt={series.title} fill sizes="56px" className="object-cover" />
        ) : (
          <BookOpen className="m-4 size-6 text-accent-purple" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-heading text-2xl text-text-primary">{series.title}</h3>
        <p className="truncate text-sm text-text-secondary">{series.author ?? "Autor desconocido"}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {series.genres.slice(0, 3).map((genre) => (
            <Badge key={genre}>{genre}</Badge>
          ))}
        </div>
      </div>
      <div className="hidden text-right text-sm text-text-secondary sm:block">
        <div>{series.totalVolumes} tomos</div>
        <div>{series.lastReadAt ? "Leído recientemente" : "Sin iniciar"}</div>
      </div>
    </Link>
  );
}
