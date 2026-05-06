import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { AppUser } from "@/types";

export async function getCurrentUser(): Promise<AppUser | null> {
  if (!process.env.DATABASE_URL) return null;
  const session = await auth();
  if (!session?.user?.id || !session.user.email) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
  };
}

export async function requireUser(): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
