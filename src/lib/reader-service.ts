import { prisma } from "@/lib/prisma";
import { generateSignedUrl } from "@/lib/drive";
import { progressPercent } from "@/lib/utils";
import type { VolumePagesResponse } from "@/types";

export async function getVolumePages(userId: string, volumeId: string): Promise<VolumePagesResponse | null> {
  const volume = await prisma.volume.findFirst({
    where: {
      id: volumeId,
      series: { userId },
    },
    include: {
      series: true,
      readingProgress: { where: { userId } },
    },
  });
  if (!volume) return null;

  const totalPages = volume.totalPages ?? 1;
  const url = volume.driveFileId ? await generateSignedUrl(userId, volume.driveFileId) : "";
  const pages = Array.from({ length: totalPages }, (_, index) => ({
    page: index + 1,
    url,
  }));
  const progress = volume.readingProgress[0];

  return {
    volume: {
      id: volume.id,
      seriesId: volume.seriesId,
      title: volume.title,
      number: volume.number,
      driveFileId: volume.driveFileId,
      driveFolderId: volume.driveFolderId,
      fileType: volume.fileType,
      totalPages: volume.totalPages,
      coverImage: volume.coverImage,
      progressPercent: progressPercent(progress?.currentPage ?? 1, progress?.totalPages ?? volume.totalPages),
      currentPage: progress?.currentPage ?? 1,
      completed: progress?.completed ?? false,
      seriesTitle: volume.series.title,
      seriesSlug: volume.series.slug,
    },
    pages,
  };
}

export async function saveReadingProgress(
  userId: string,
  input: { volumeId: string; currentPage: number; completed?: boolean },
) {
  const volume = await prisma.volume.findFirst({
    where: { id: input.volumeId, series: { userId } },
    include: { series: true },
  });
  if (!volume) return null;

  return prisma.readingProgress.upsert({
    where: { userId_volumeId: { userId, volumeId: input.volumeId } },
    create: {
      userId,
      volumeId: input.volumeId,
      seriesId: volume.seriesId,
      currentPage: input.currentPage,
      totalPages: volume.totalPages,
      completed: input.completed ?? false,
    },
    update: {
      currentPage: input.currentPage,
      totalPages: volume.totalPages,
      completed: input.completed ?? false,
      lastReadAt: new Date(),
    },
  });
}
