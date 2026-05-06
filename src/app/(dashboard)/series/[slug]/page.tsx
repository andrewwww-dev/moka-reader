import { notFound } from "next/navigation";
import { SeriesHeader } from "@/components/series/SeriesHeader";
import { VolumeGrid } from "@/components/series/VolumeGrid";
import { getSeriesBySlug } from "@/lib/series-service";
import { requireUser } from "@/lib/session";

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const { slug } = await params;
  const series = await getSeriesBySlug(user.id, slug);
  if (!series) notFound();

  return (
    <div className="space-y-8">
      <SeriesHeader series={series} />
      <section>
        <div className="mb-4 flex items-end gap-3">
          <h2 className="font-heading text-4xl text-text-primary">Tomos</h2>
          <span className="pb-1 text-sm text-text-secondary">{series.volumes.length} disponibles</span>
        </div>
        <VolumeGrid volumes={series.volumes} />
      </section>
    </div>
  );
}
