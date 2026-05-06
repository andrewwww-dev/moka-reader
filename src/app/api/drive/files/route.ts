import { getDriveClient } from "@/lib/drive";
import { getCurrentUser } from "@/lib/session";
import { apiError } from "@/lib/utils";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const drive = await getDriveClient(user.id);
  const files = await drive.files.list({
    fields: "files(id,name,mimeType,thumbnailLink)",
    pageSize: 50,
    q: "trashed = false",
  });
  return Response.json({ files: files.data.files ?? [] });
}
