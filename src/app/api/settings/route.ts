import { getSettings, updateSettings } from "@/lib/settings-service";
import { getCurrentUser } from "@/lib/session";
import { apiError } from "@/lib/utils";
import { settingsSchema } from "@/lib/validation";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  return Response.json({ settings: await getSettings(user.id) });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const parsed = settingsSchema.safeParse(await request.json());
  if (!parsed.success) return apiError("Invalid settings payload", "VALIDATION_ERROR", 422);
  const settings = await updateSettings(user.id, parsed.data);
  return Response.json({ settings });
}
