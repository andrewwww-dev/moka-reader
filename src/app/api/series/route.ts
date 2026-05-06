import type { SeriesStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { createSeries, getLibrary } from "@/lib/series-service";
import { getCurrentUser } from "@/lib/session";
import { apiError } from "@/lib/utils";
import { seriesCreateSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);

  const params = request.nextUrl.searchParams;
  const library = await getLibrary(user.id, {
    search: params.get("search") ?? undefined,
    genre: params.get("genre") ?? undefined,
    status: (params.get("status") as SeriesStatus | null) ?? undefined,
    sort: params.get("sort") ?? undefined,
  });

  return Response.json(library);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);

  const parsed = seriesCreateSchema.safeParse(await request.json());
  if (!parsed.success) return apiError("Invalid series payload", "VALIDATION_ERROR", 422);

  const series = await createSeries(user.id, parsed.data);
  return Response.json({ series }, { status: 201 });
}
