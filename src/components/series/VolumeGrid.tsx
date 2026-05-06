import { VolumeCard } from "@/components/series/VolumeCard";
import type { VolumeSummary } from "@/types";

export function VolumeGrid({ volumes }: { volumes: VolumeSummary[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {volumes.map((volume) => (
        <VolumeCard key={volume.id} volume={volume} />
      ))}
    </div>
  );
}
