import { prisma } from "@/lib/prisma";
import type { ReadingSettings } from "@/types";

export async function getSettings(userId: string): Promise<ReadingSettings> {
  const settings = await prisma.userSettings.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });

  return {
    readingDirection: settings.readingDirection,
    readingMode: settings.readingMode,
    pageLayout: settings.pageLayout,
    backgroundColor: settings.backgroundColor,
    autoScanDrive: settings.autoScanDrive,
  };
}

export async function updateSettings(userId: string, data: Partial<ReadingSettings>) {
  return prisma.userSettings.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}
