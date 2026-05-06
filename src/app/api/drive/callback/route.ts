import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { saveDriveTokens } from "@/lib/drive";
import { requireUser } from "@/lib/session";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("moka_drive_state")?.value;

  if (!code || !state || state !== expectedState || !state.startsWith(user.id)) {
    redirect("/drive?error=drive_oauth");
  }

  await saveDriveTokens(user.id, code);
  cookieStore.delete("moka_drive_state");
  redirect("/drive?connected=1");
}
