import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ProgressBar } from "@/components/common/ProgressBar";
import type { SeriesSummary } from "@/types";

export function SeriesCard({ series }: { series: SeriesSummary }) {
  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative block aspect-[2/3] overflow-hidden rounded-xl border border-border bg-bg-secondary transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-accent-purple/25"
    >
      {series.coverImage ? (
        <Image
          src={series.coverImage}
          alt={series.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 180px"
          className="object-cover"
        />
      ) : (
        <div className="grid h-full place-items-center bg-bg-tertiary">
          <BookOpen className="size-12 text-accent-purple" aria-hidden="true" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/70 to-transparent p-3 pt-16">
        <h3 className="font-heading text-lg leading-none text-text-primary">{series.title}</h3>
        <span className="mt-2 inline-flex rounded-full bg-bg-primary/70 px-2 py-1 text-xs text-text-secondary">
          {series.totalVolumes} tomos
        </span>
      </div>
      {series.progressPercent > 0 ? (
        <div className="absolute inset-x-0 bottom-0">
          <ProgressBar value={series.progressPercent} />
        </div>
      ) : null}
      <div className="absolute inset-0 hidden place-items-center bg-bg-primary/45 group-hover:grid">
        <span className="rounded-xl bg-accent-purple px-4 py-2 text-sm font-semibold text-text-primary">
          {series.progressPercent > 0 ? "Continuar" : "Leer"}
        </span>
      </div>
    </Link>
  );
}
