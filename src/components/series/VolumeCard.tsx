import Image from "next/image";
import Link from "next/link";
import { Check, FileText } from "lucide-react";
import { ProgressBar } from "@/components/common/ProgressBar";
import type { VolumeSummary } from "@/types";

export function VolumeCard({ volume }: { volume: VolumeSummary }) {
  return (
    <Link
      href={`/read/${volume.id}?page=${volume.currentPage}`}
      className="group relative block aspect-[2/3] overflow-hidden rounded-xl border border-border bg-bg-secondary transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-accent-purple/25"
    >
      {volume.coverImage ? (
        <Image src={volume.coverImage} alt={volume.title} fill sizes="140px" className="object-cover" />
      ) : (
        <div className="grid h-full place-items-center bg-bg-tertiary">
          <FileText className="size-10 text-accent-purple" aria-hidden="true" />
        </div>
      )}
      <span className="absolute left-0 top-0 rounded-br-xl bg-bg-primary/80 px-3 py-1 text-xs text-text-primary">
        Vol. {volume.number}
      </span>
      {volume.completed ? (
        <div className="absolute inset-0 grid place-items-center bg-success/25">
          <Check className="size-10 text-success" aria-hidden="true" />
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-primary/95 to-transparent p-3 pt-10">
        <h3 className="line-clamp-2 text-sm font-semibold text-text-primary">{volume.title}</h3>
      </div>
      {volume.progressPercent > 0 ? (
        <div className="absolute inset-x-0 bottom-0">
          <ProgressBar value={volume.progressPercent} />
        </div>
      ) : null}
    </Link>
  );
}
