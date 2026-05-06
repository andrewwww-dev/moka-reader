import type {
  FileType,
  PageLayout,
  ReadingDirection,
  ReadingMode,
  SeriesStatus,
  SourceType,
} from "@prisma/client";

export interface ApiError {
  error: string;
  code: string;
}

export interface AppUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

export interface SeriesSummary {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  coverDriveId: string | null;
  genres: string[];
  author: string | null;
  status: SeriesStatus;
  totalVolumes: number;
  source: SourceType;
  driveFolderId: string | null;
  anilistId: number | null;
  createdAt: string;
  updatedAt: string;
  progressPercent: number;
  lastReadAt: string | null;
}

export interface VolumeSummary {
  id: string;
  seriesId: string;
  title: string;
  number: number;
  driveFileId: string | null;
  driveFolderId: string | null;
  fileType: FileType;
  totalPages: number | null;
  coverImage: string | null;
  progressPercent: number;
  currentPage: number;
  completed: boolean;
}

export interface SeriesDetail extends SeriesSummary {
  volumes: VolumeSummary[];
}

export interface LibraryResponse {
  series: SeriesSummary[];
  total: number;
}

export interface ReaderPage {
  page: number;
  url: string;
  width?: number;
  height?: number;
}

export interface VolumePagesResponse {
  volume: VolumeSummary & {
    seriesTitle: string;
    seriesSlug: string;
  };
  pages: ReaderPage[];
}

export interface ReadingSettings {
  readingDirection: ReadingDirection;
  readingMode: ReadingMode;
  pageLayout: PageLayout;
  backgroundColor: string;
  autoScanDrive: boolean;
}

export interface DashboardStats {
  seriesCount: number;
  completedVolumes: number;
  readingHours: number;
}

export interface ContinueReadingItem {
  seriesTitle: string;
  seriesSlug: string;
  volumeId: string;
  volumeNumber: number;
  coverImage: string | null;
  currentPage: number;
  totalPages: number | null;
  progressPercent: number;
}
