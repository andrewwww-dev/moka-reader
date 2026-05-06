import { notFound } from "next/navigation";
import { MangaReader } from "@/components/reader/MangaReader";
import { getVolumePages } from "@/lib/reader-service";
import { getSettings } from "@/lib/settings-service";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ReadPage({
  params,
  searchParams,
}: {
  params: Promise<{ volumeId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await requireUser();
  const [{ volumeId }, query] = await Promise.all([params, searchParams]);
  const [data, settings] = await Promise.all([getVolumePages(user.id, volumeId), getSettings(user.id)]);
  if (!data) notFound();

  return (
    <MangaReader
      data={data}
      initialSettings={settings}
      initialPage={Math.max(1, Number(query.page ?? data.volume.currentPage) || 1)}
    />
  );
}
