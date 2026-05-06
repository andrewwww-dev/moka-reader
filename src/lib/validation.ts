import { z } from "zod";

export const seriesCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),
  coverImage: z.string().url().nullable().optional(),
  genres: z.array(z.string()).optional(),
  author: z.string().nullable().optional(),
  driveFolderId: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export const progressSchema = z.object({
  volumeId: z.string().min(1),
  currentPage: z.number().int().positive(),
  completed: z.boolean().optional(),
});

export const settingsSchema = z.object({
  readingDirection: z.enum(["LTR", "RTL"]).optional(),
  readingMode: z.enum(["PAGED", "VERTICAL"]).optional(),
  pageLayout: z.enum(["SINGLE", "DOUBLE"]).optional(),
  backgroundColor: z.string().min(1).optional(),
  autoScanDrive: z.boolean().optional(),
});

export const driveScanSchema = z.object({
  folderId: z.string().optional(),
});
