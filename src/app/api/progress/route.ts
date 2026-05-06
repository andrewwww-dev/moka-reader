import { saveReadingProgress } from "@/lib/reader-service";
import { getCurrentUser } from "@/lib/session";
import { apiError } from "@/lib/utils";
import { progressSchema } from "@/lib/validation";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const parsed = progressSchema.safeParse(await request.json());
  if (!parsed.success) return apiError("Invalid progress payload", "VALIDATION_ERROR", 422);
  const progress = await saveReadingProgress(user.id, parsed.data);
  if (!progress) return apiError("Volume not found", "NOT_FOUND", 404);
  return Response.json({ progress });
}
