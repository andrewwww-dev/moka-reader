import type { Prisma, SeriesStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { progressPercent, slugify } from "@/lib/utils";
import type {
  ContinueReadingItem,
  DashboardStats,
  LibraryResponse,
  SeriesDetail,
  SeriesSummary,
  VolumeSummary,
} from "@/types";

const seriesInclude = {
  volumes: {
    orderBy: { number: "asc" as const },
    include: { readingProgress: true },
  },
  readingProgress: true,
} satisfies Prisma.SeriesInclude;

type SeriesWithRelations = Prisma.SeriesGetPayload<{ include: typeof seriesInclude }>;

function toVolumeSummary(
  volume: Prisma.VolumeGetPayload<{ include: { readingProgress: true } }>,
  userId: string,
): VolumeSummary {
  const progress = volume.readingProgress.find((item) => item.userId === userId);
  return {
    id: volume.id,
    seriesId: volume.seriesId,
    title: volume.title,
    number: volume.number,
    driveFileId: volume.driveFileId,
    driveFolderId: volume.driveFolderId,
    fileType: volume.fileType,
    totalPages: volume.totalPages,
    coverImage: volume.coverImage,
    progressPercent: progressPercent(progress?.currentPage ?? 0, progress?.totalPages ?? volume.totalPages),
    currentPage: progress?.currentPage ?? 1,
    completed: progress?.completed ?? false,
  };
}

function toSeriesSummary(
  series: SeriesWithRelations,
  userId: string,
): SeriesSummary {
  const newestProgress = [...series.readingProgress]
    .filter((item) => item.userId === userId)
    .sort((a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime())[0];

  return {
    id: series.id,
    title: series.title,
    slug: series.slug,
    description: series.description,
    coverImage: series.coverImage,
    coverDriveId: series.coverDriveId,
    genres: series.genres,
    author: series.author,
    status: series.status,
    totalVolumes: series.totalVolumes,
    source: series.source,
    driveFolderId: series.driveFolderId,
    anilistId: series.anilistId,
    createdAt: series.createdAt.toISOString(),
    updatedAt: series.updatedAt.toISOString(),
    progressPercent: progressPercent(newestProgress?.currentPage ?? 0, newestProgress?.totalPages),
    lastReadAt: newestProgress?.lastReadAt.toISOString() ?? null,
  };
}

export async function getLibrary(
  userId: string,
  input: {
    search?: string;
    genre?: string;
    status?: SeriesStatus;
    sort?: string;
    take?: number;
    skip?: number;
  },
): Promise<LibraryResponse> {
  const where: Prisma.SeriesWhereInput = {
    userId,
    ...(input.search
      ? {
          OR: [
            { title: { contains: input.search, mode: "insensitive" } },
            { author: { contains: input.search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(input.genre ? { genres: { has: input.genre } } : {}),
    ...(input.status ? { status: input.status } : {}),
  };

  const orderBy: Prisma.SeriesOrderByWithRelationInput =
    input.sort === "recent" ? { createdAt: "desc" } : input.sort === "author" ? { author: "asc" } : { title: "asc" };

  const [series, total] = await prisma.$transaction([
    prisma.series.findMany({
      where,
      include: seriesInclude,
      orderBy,
      take: input.take ?? 20,
      skip: input.skip ?? 0,
    }),
    prisma.series.count({ where }),
  ]);

  return { series: series.map((item) => toSeriesSummary(item, userId)), total };
}

export async function getSeriesBySlug(userId: string, slug: string): Promise<SeriesDetail | null> {
  const series = await prisma.series.findUnique({
    where: { userId_slug: { userId, slug } },
    include: seriesInclude,
  });
  if (!series) return null;
  return {
    ...toSeriesSummary(series, userId),
    volumes: series.volumes.map((volume) => toVolumeSummary(volume, userId)),
  };
}

export async function getSeriesById(userId: string, id: string): Promise<SeriesDetail | null> {
  const series = await prisma.series.findFirst({
    where: { id, userId },
    include: seriesInclude,
  });
  if (!series) return null;
  return {
    ...toSeriesSummary(series, userId),
    volumes: series.volumes.map((volume) => toVolumeSummary(volume, userId)),
  };
}

export async function createSeries(
  userId: string,
  data: {
    title: string;
    slug?: string;
    coverImage?: string | null;
    genres?: string[];
    author?: string | null;
    driveFolderId?: string | null;
    description?: string | null;
  },
) {
  const slug = data.slug ?? slugify(data.title);
  return prisma.series.create({
    data: {
      userId,
      title: data.title,
      slug,
      coverImage: data.coverImage,
      genres: data.genres ?? [],
      author: data.author,
      driveFolderId: data.driveFolderId,
      description: data.description,
    },
  });
}

export async function getDashboard(userId: string) {
  const [library, completedVolumes, progressRows] = await prisma.$transaction([
    prisma.series.findMany({
      where: { userId },
      include: seriesInclude,
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    prisma.readingProgress.count({ where: { userId, completed: true } }),
    prisma.readingProgress.findMany({
      where: { userId },
      include: { volume: { include: { series: true } } },
      orderBy: { lastReadAt: "desc" },
      take: 10,
    }),
  ]);

  const continueReading: ContinueReadingItem[] = progressRows.map((item) => ({
    seriesTitle: item.volume.series.title,
    seriesSlug: item.volume.series.slug,
    volumeId: item.volumeId,
    volumeNumber: item.volume.number,
    coverImage: item.volume.coverImage ?? item.volume.series.coverImage,
    currentPage: item.currentPage,
    totalPages: item.totalPages ?? item.volume.totalPages,
    progressPercent: progressPercent(item.currentPage, item.totalPages ?? item.volume.totalPages),
  }));

  const stats: DashboardStats = {
    seriesCount: await prisma.series.count({ where: { userId } }),
    completedVolumes,
    readingHours: Math.ceil(
      progressRows.reduce((total, item) => total + item.currentPage, 0) / 60,
    ),
  };

  return {
    recentSeries: library.map((item) => toSeriesSummary(item, userId)),
    continueReading,
    stats,
  };
}
