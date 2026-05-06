import { NextRequest } from "next/server";
import { getSeriesById } from "@/lib/series-service";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/utils";
import { seriesCreateSchema } from "@/lib/validation";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const { id } = await context.params;
  const series = await getSeriesById(user.id, id);
  if (!series) return apiError("Series not found", "NOT_FOUND", 404);
  return Response.json({ series });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const parsed = seriesCreateSchema.partial().safeParse(await request.json());
  if (!parsed.success) return apiError("Invalid series payload", "VALIDATION_ERROR", 422);
  const { id } = await context.params;
  const series = await prisma.series.updateMany({
    where: { id, userId: user.id },
    data: parsed.data,
  });
  if (series.count === 0) return apiError("Series not found", "NOT_FOUND", 404);
  return Response.json({ ok: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const { id } = await context.params;
  await prisma.series.deleteMany({ where: { id, userId: user.id } });
  return Response.json({ ok: true });
}
