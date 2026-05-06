import { NextRequest } from "next/server";
import { generateSignedUrl } from "@/lib/drive";
import { getCurrentUser } from "@/lib/session";
import { apiError } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const fileId = request.nextUrl.searchParams.get("fileId");
  if (!fileId) return apiError("Missing fileId", "VALIDATION_ERROR", 422);
  const url = await generateSignedUrl(user.id, fileId);
  return Response.json({ url });
}
