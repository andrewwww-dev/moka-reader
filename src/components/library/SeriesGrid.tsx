import { EmptyState } from "@/components/common/EmptyState";
import { SeriesCard } from "@/components/library/SeriesCard";
import type { SeriesSummary } from "@/types";

export function SeriesGrid({ series }: { series: SeriesSummary[] }) {
  if (series.length === 0) {
    return (
      <EmptyState
        title="Tu biblioteca está vacía"
        description="Conecta Google Drive y escanea tus carpetas para llenar este espacio."
        ctaHref="/drive"
        ctaLabel="Conectar Drive"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
      {series.map((item) => (
        <SeriesCard key={item.id} series={item} />
      ))}
    </div>
  );
}
