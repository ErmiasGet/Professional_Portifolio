import Link from "next/link";
import { Clock, Shield } from "lucide-react";
import { listAuditLog } from "@/db/audit";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateFull } from "@/utils";

export const metadata = {
  title: "Audit Log",
};

const ACTION_COLORS: Record<string, "default" | "primary" | "success" | "warning" | "destructive"> = {
  "login.success": "success",
  "login.failed": "destructive",
  "login.locked": "destructive",
  "logout": "default",
  "content.create": "primary",
  "content.update": "primary",
  "content.delete": "destructive",
  "message.status": "warning",
  "message.delete": "destructive",
  "settings.update": "warning",
  "password.change": "primary",
};

export default async function AuditPage() {
  const rows = (await listAuditLog(200)) ?? [];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          A read-only record of admin actions across the site. Logs are kept on the server and never exposed publicly.
        </p>
      </div>

      <Card>
        <CardContent className="divide-y divide-border/60 p-0">
          {rows.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No audit entries yet.
            </p>
          ) : (
            rows.map((entry) => (
              <div key={entry.id} className="flex flex-col gap-1.5 px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
                <Badge variant={ACTION_COLORS[entry.action] ?? "default"} className="w-fit shrink-0">
                  {readableAction(entry.action)}
                </Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">
                    {entry.adminEmail ?? "System"}
                    {entry.entityType && (
                      <span className="text-muted-foreground"> &middot; {entry.entityType.replace("_", " ")}</span>
                    )}
                    {entry.entityId && (
                      <span className="text-muted-foreground/70"> &middot; {shortId(entry.entityId)}</span>
                    )}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDateFull(entry.createdAt)}
                  </p>
                </div>
                {entry.meta && <pre className="hidden max-w-xs overflow-x-auto rounded-lg bg-secondary/60 p-2 text-[10px] text-secondary-foreground sm:block">
                  {JSON.stringify(entry.meta)}
                </pre>}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        <Link href="/admin/dashboard" className="font-medium text-primary hover:underline">
          Back to dashboard
        </Link>
      </p>
    </div>
  );
}

function readableAction(action: string): string {
  return action.split(".").pop()?.replace(/_/g, " ") ?? action;
}

function shortId(id: string): string {
  return id.slice(0, 8);
}