import Link from "next/link";
import { KeyRound, User as UserIcon } from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth/auth";
import { PasswordForm } from "@/components/admin/password-form";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const admin = await getCurrentAdmin();
  if (!admin) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your admin account credentials.
        </p>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Account
        </h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd className="mt-0.5 font-medium">{admin.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="mt-0.5 font-medium">{admin.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="mt-0.5">
              <span className="capitalize">{admin.role}</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Change password
          </h2>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          You&apos;ll stay signed in after changing it. Other sessions are not revoked.
        </p>
        <PasswordForm />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <Link href="/admin/dashboard" className="font-medium text-primary hover:underline">
          Back to dashboard
        </Link>
      </p>
    </div>
  );
}