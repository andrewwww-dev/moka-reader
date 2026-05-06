import { getVolumePages } from "@/lib/reader-service";
import { getCurrentUser } from "@/lib/session";
import { apiError } from "@/lib/utils";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const { id } = await context.params;
  const data = await getVolumePages(user.id, id);
  if (!data) return apiError("Volume not found", "NOT_FOUND", 404);
  return Response.json(data);
}
