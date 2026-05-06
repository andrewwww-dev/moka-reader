import { Header } from "@/components/layout/Header";
import { MobileNavbar } from "@/components/layout/MobileNavbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar user={user} />
      <Header />
      <main className="min-h-screen px-4 pb-24 pt-20 lg:ml-60 lg:p-6">
        <PageTransition>{children}</PageTransition>
      </main>
      <MobileNavbar />
    </div>
  );
}
