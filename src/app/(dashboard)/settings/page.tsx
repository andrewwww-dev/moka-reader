import Image from "next/image";
import Link from "next/link";
import { Cloud, LogOut, User } from "lucide-react";
import { getSettings } from "@/lib/settings-service";
import { requireUser } from "@/lib/session";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { SignOutButton } from "@/components/settings/SignOutButton";

export default async function SettingsPage() {
  const user = await requireUser();
  const settings = await getSettings(user.id);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-5xl text-text-primary">Configuración</h1>
      <section className="rounded-2xl border border-border bg-bg-secondary p-6">
        <div className="flex items-center gap-4">
          {user.image ? (
            <Image src={user.image} alt={user.name ?? user.email} width={64} height={64} className="rounded-full" />
          ) : (
            <div className="grid size-16 place-items-center rounded-full bg-bg-tertiary">
              <User className="size-7 text-accent-purple" aria-hidden="true" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold text-text-primary">{user.name ?? "Perfil"}</h2>
            <p className="truncate text-sm text-text-secondary">{user.email}</p>
          </div>
          <SignOutButton>
            <LogOut className="size-4" aria-hidden="true" />
            Cerrar sesión
          </SignOutButton>
        </div>
      </section>
      <SettingsForm settings={settings} />
      <section className="rounded-2xl border border-border bg-bg-secondary p-6">
        <Cloud className="mb-3 size-6 text-accent-purple" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-text-primary">Google Drive</h2>
        <p className="mt-2 text-sm text-text-secondary">Gestiona la conexión y el escaneo de tu biblioteca.</p>
        <Link href="/drive" className="mt-4 inline-flex rounded-xl bg-bg-tertiary px-4 py-2 text-sm text-text-primary">
          Ir a Drive
        </Link>
      </section>
    </div>
  );
}
