import type { drive_v3 } from "googleapis";
import { fetchAniListMetadata } from "@/lib/anilist";
import { getDriveClient } from "@/lib/drive";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export interface ScanEvent {
  type: "log" | "done" | "error";
  message: string;
}

interface DetectedVolume {
  title: string;
  number: number;
  driveFileId: string;
}

const volumePatterns: RegExp[] = [
  /^(.+?)\s*-\s*(?:vol|tomo|volume)\s*(\d+)/i,
  /^(.+?)[_\s-]+v(\d+)/i,
  /^(?:\[.+?\]\s*)?(.+?)\s+(\d{1,4})/i,
];

function detectVolume(file: drive_v3.Schema$File): DetectedVolume | null {
  if (!file.name || !file.id) return null;
  const lower = file.name.toLowerCase();
  if (![".pdf", ".cbz", ".cbr"].some((extension) => lower.endsWith(extension))) return null;

  const basename = file.name.replace(/\.(pdf|cbz|cbr)$/i, "");
  for (const pattern of volumePatterns) {
    const match = basename.match(pattern);
    const series = match?.[1];
    const number = match?.[2];
    if (series && number) {
      return {
        title: series.trim(),
        number: Number(number),
        driveFileId: file.id,
      };
    }
  }

  return {
    title: basename.trim(),
    number: 1,
    driveFileId: file.id,
  };
}

export async function* scanDriveForManga(
  userId: string,
  input: { folderId?: string },
): AsyncGenerator<ScanEvent> {
  const drive = await getDriveClient(userId);
  yield { type: "log", message: "Iniciando escaneo de Google Drive..." };

  const queryParts = [
    "trashed = false",
    "(mimeType = 'application/pdf' or name contains '.cbz' or name contains '.cbr')",
  ];
  if (input.folderId) queryParts.push(`'${input.folderId}' in parents`);

  const files = await drive.files.list({
    q: queryParts.join(" and "),
    fields: "files(id,name,mimeType,parents,thumbnailLink)",
    pageSize: 100,
  });

  const groups = new Map<string, DetectedVolume[]>();
  for (const file of files.data.files ?? []) {
    const detected = detectVolume(file);
    if (!detected) continue;
    yield { type: "log", message: `Encontrado: ${file.name ?? detected.title}` };
    const key = detected.title;
    groups.set(key, [...(groups.get(key) ?? []), detected]);
  }

  let seriesCount = 0;
  let volumeCount = 0;
  for (const [title, volumes] of groups) {
    const metadata = await fetchAniListMetadata(title).catch(() => null);
    const slug = slugify(metadata?.title ?? title);
    await prisma.$transaction(async (tx) => {
      const series = await tx.series.upsert({
        where: { userId_slug: { userId, slug } },
        create: {
          userId,
          title: metadata?.title ?? title,
          slug,
          description: metadata?.description,
          coverImage: metadata?.coverImage,
          genres: metadata?.genres ?? [],
          author: metadata?.author,
          anilistId: metadata?.anilistId,
          totalVolumes: volumes.length,
          driveFolderId: input.folderId,
        },
        update: {
          totalVolumes: { increment: 0 },
          updatedAt: new Date(),
        },
      });

      for (const volume of volumes) {
        await tx.volume.upsert({
          where: { seriesId_number: { seriesId: series.id, number: volume.number } },
          create: {
            seriesId: series.id,
            title: `Tomo ${volume.number}`,
            number: volume.number,
            driveFileId: volume.driveFileId,
            fileType: "PDF",
          },
          update: {
            driveFileId: volume.driveFileId,
          },
        });
        volumeCount += 1;
      }

      await tx.series.update({
        where: { id: series.id },
        data: { totalVolumes: await tx.volume.count({ where: { seriesId: series.id } }) },
      });
    });
    seriesCount += 1;
    yield { type: "log", message: `Biblioteca actualizada: ${title}` };
  }

  yield { type: "done", message: `${seriesCount} series encontradas, ${volumeCount} tomos añadidos` };
}
