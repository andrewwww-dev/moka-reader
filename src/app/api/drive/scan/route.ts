import { scanDriveForManga } from "@/lib/drive-scanner";
import { getCurrentUser } from "@/lib/session";
import { apiError } from "@/lib/utils";
import { driveScanSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return apiError("Unauthorized", "UNAUTHORIZED", 401);
  const parsed = driveScanSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return apiError("Invalid scan payload", "VALIDATION_ERROR", 422);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of scanDriveForManga(user.id, parsed.data)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown scan error";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
