import Link from "next/link";
import { BookOpen } from "lucide-react";

export function EmptyState({
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-border bg-bg-secondary p-8 text-center">
      <BookOpen className="mb-4 size-12 text-accent-purple" aria-hidden="true" />
      <h2 className="font-heading text-3xl text-text-primary">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-text-secondary">{description}</p>
      {ctaHref && ctaLabel ? (
        <Link
          href={ctaHref}
          className="mt-6 rounded-xl bg-accent-purple px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-accent-purple-dark"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
