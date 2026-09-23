import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/auth";
import { countMessages } from "@/db/messages";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const unread = await countMessages("unread");

  return (
    <AdminShell
      adminName={admin.name}
      unreadMessages={unread ?? 0}
    >
      {children}
    </AdminShell>
  );
}