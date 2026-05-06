import { Badge } from "@/components/common/Badge";
import type { SeriesDetail } from "@/types";

export function SeriesMetadata({ series }: { series: SeriesDetail }) {
  return (
    <div className="flex flex-wrap gap-2">
      {series.genres.map((genre) => (
        <Badge key={genre}>{genre}</Badge>
      ))}
      <Badge className="bg-success/20 text-success">{series.status}</Badge>
      <Badge>{series.source}</Badge>
    </div>
  );
}
