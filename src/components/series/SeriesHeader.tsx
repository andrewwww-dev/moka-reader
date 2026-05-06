import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart, Play } from "lucide-react";
import { SeriesMetadata } from "@/components/series/SeriesMetadata";
import { formatDate } from "@/lib/utils";
import type { SeriesDetail } from "@/types";

export function SeriesHeader({ series }: { series: SeriesDetail }) {
  const firstVolume = series.volumes[0];
  const progressVolume = series.volumes.find((volume) => volume.progressPercent > 0) ?? firstVolume;

  return (
    <section className="relative -mx-4 -mt-4 overflow-hidden px-4 py-10 sm:-mx-6 sm:-mt-6 sm:px-6">
      {series.coverImage ? (
        <Image src={series.coverImage} alt="" fill priority className="object-cover opacity-30 blur-3xl" />
      ) : null}
      <div className="relative z-10 flex flex-col gap-6 md:flex-row">
        <div className="relative aspect-[2/3] w-44 shrink-0 overflow-hidden rounded-2xl bg-bg-tertiary shadow-2xl shadow-bg-primary/50 md:w-52">
          {series.coverImage ? (
            <Image src={series.coverImage} alt={series.title} fill priority sizes="208px" className="object-cover" />
          ) : (
            <BookOpen className="m-16 size-20 text-accent-purple" aria-hidden="true" />
          )}
        </div>
        <div className="max-w-3xl">
          <h1 className="font-heading text-5xl text-text-primary md:text-6xl">{series.title}</h1>
          <p className="mt-1 text-lg text-text-secondary">{series.author ?? "Autor desconocido"}</p>
          <div className="mt-4">
            <SeriesMetadata series={series} />
          </div>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-text-secondary">
            {series.description ?? "Sin descripción todavía. Puedes enriquecer los metadatos después de escanear Drive."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-text-secondary">
            <span>{series.totalVolumes} tomos</span>
            <span>Fuente: {series.source}</span>
            <span>Añadido: {formatDate(series.createdAt)}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {progressVolume ? (
              <Link
                href={`/read/${progressVolume.id}?page=${progressVolume.currentPage}`}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent-purple px-6 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-purple-dark"
              >
                <Play className="size-4" aria-hidden="true" />
                {progressVolume.progressPercent > 0
                  ? `Continuar - Tomo ${progressVolume.number}, pág ${progressVolume.currentPage}`
                  : "Empezar a leer"}
              </Link>
            ) : null}
            <button
              type="button"
              aria-label="Añadir a favoritos"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm text-text-secondary transition-colors hover:bg-bg-tertiary"
            >
              <Heart className="size-4" aria-hidden="true" />
              Añadir a favoritos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
