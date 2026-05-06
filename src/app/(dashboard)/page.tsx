import Link from "next/link";
import { BookOpen, Clock, Cloud, Library, Play, type LucideIcon } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { ProgressBar } from "@/components/common/ProgressBar";
import { SeriesGrid } from "@/components/library/SeriesGrid";
import { getDashboard } from "@/lib/series-service";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();
  const dashboard = await getDashboard(user.id);

  return (
    <div className="space-y-8">
      {dashboard.continueReading.length > 0 ? (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Play className="size-5 text-accent-purple" aria-hidden="true" />
            <h1 className="font-heading text-3xl text-text-primary">Continuar leyendo</h1>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {dashboard.continueReading.map((item) => (
              <Link
                key={item.volumeId}
                href={`/read/${item.volumeId}?page=${item.currentPage}`}
                className="group relative aspect-[2/3] w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-bg-secondary transition-all duration-200 hover:scale-105"
              >
                <div className="grid h-full place-items-center bg-bg-tertiary">
                  <BookOpen className="size-10 text-accent-purple" aria-hidden="true" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-primary/95 to-transparent p-3 pt-14">
                  <h2 className="font-heading text-lg leading-none text-text-primary">{item.seriesTitle}</h2>
                  <p className="text-xs text-text-secondary">Tomo {item.volumeNumber}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0">
                  <ProgressBar value={item.progressPercent} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-heading text-3xl text-text-primary">Añadido recientemente</h2>
          <Link href="/library" className="text-sm font-medium text-accent-purple hover:text-accent-pink">
            Ver toda la biblioteca
          </Link>
        </div>
        {dashboard.recentSeries.length > 0 ? (
          <SeriesGrid series={dashboard.recentSeries} />
        ) : (
          <EmptyState
            title="Tu biblioteca está vacía"
            description="Conecta Google Drive para escanear tus PDFs y carpetas de imágenes."
            ctaHref="/drive"
            ctaLabel="Conectar Drive"
          />
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Library} label="Series en biblioteca" value={dashboard.stats.seriesCount} />
        <StatCard icon={BookOpen} label="Capítulos leídos" value={dashboard.stats.completedVolumes} />
        <StatCard icon={Clock} label="Horas de lectura" value={dashboard.stats.readingHours} />
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-bg-secondary p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Cloud className="size-8 text-accent-purple" aria-hidden="true" />
          <div>
            <h2 className="font-semibold text-text-primary">Conecta tu Google Drive para escanear tu biblioteca</h2>
            <p className="text-sm text-text-secondary">PDFs y carpetas de imágenes aparecerán automáticamente.</p>
          </div>
        </div>
        <Link
          href="/drive"
          className="rounded-xl bg-accent-purple px-5 py-3 text-center text-sm font-semibold text-text-primary transition-colors hover:bg-accent-purple-dark"
        >
          Conectar Drive
        </Link>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-secondary p-4">
      <Icon className="mb-3 size-5 text-accent-purple" aria-hidden="true" />
      <div className="font-heading text-4xl text-accent-purple">{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  );
}
