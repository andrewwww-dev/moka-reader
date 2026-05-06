import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDriveConsentUrl } from "@/lib/drive";
import { requireUser } from "@/lib/session";

export async function GET() {
  const user = await requireUser();
  const state = `${user.id}:${crypto.randomUUID()}`;
  const cookieStore = await cookies();
  cookieStore.set("moka_drive_state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  redirect(getDriveConsentUrl(state));
}
