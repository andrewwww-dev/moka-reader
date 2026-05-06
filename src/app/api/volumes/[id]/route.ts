import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/utils";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const { id } = await context.params;
  const volume = await prisma.volume.findFirst({
    where: { id, series: { userId: user.id } },
    include: { series: true },
  });
  if (!volume) return apiError("Volume not found", "NOT_FOUND", 404);
  return Response.json({ volume });
}
