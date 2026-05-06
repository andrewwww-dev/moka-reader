import Link from "next/link";
import { cn } from "@/lib/utils";

const filters = ["Todos", "Acción", "Romance", "Terror", "Comedia", "Drama", "Fantasía"];

export function LibraryFilters({ active }: { active?: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const selected = (!active && filter === "Todos") || active === filter;
        const href = filter === "Todos" ? "/library" : `/library?genre=${encodeURIComponent(filter)}`;
        return (
          <Link
            key={filter}
            href={href}
            className={cn(
              "shrink-0 rounded-full bg-bg-tertiary px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-accent-purple/20",
              selected && "bg-accent-purple text-text-primary",
            )}
          >
            {filter}
          </Link>
        );
      })}
    </div>
  );
}
