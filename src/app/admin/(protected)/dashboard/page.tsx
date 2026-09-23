import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  Inbox,
  Mail,
  PenLine,
  Plus,
} from "lucide-react";
import { CONTENT_CONFIG, CONTENT_TYPES } from "@/lib/data/registry";
import { countContent } from "@/db/content";
import { countMessages } from "@/db/messages";
import { listAuditLog } from "@/db/audit";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRelativeTime } from "@/utils";
import { routeForContentType } from "@/lib/data/admin-routes";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const content = await Promise.all(
    CONTENT_TYPES.map(async (type) => {
      const [published, drafts, total] = await Promise.all([
        countContent(type, { status: "published" }),
        countContent(type, { status: "draft" }),
        countContent(type),
      ]);
      return {
        type,
        label: CONTENT_CONFIG[type].label,
        description: CONTENT_CONFIG[type].description,
        published: published ?? 0,
        drafts: drafts ?? 0,
        total: total ?? 0,
      };
    })
  );

  const [messages, unread] = await Promise.all([
    countMessages(),
    countMessages("unread"),
  ]);
  const recent = (await listAuditLog(8)) ?? [];

  const totalContent = content.reduce((sum, c) => sum + c.total, 0);
  const totalDrafts = content.reduce((sum, c) => sum + c.drafts, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your portfolio content and inbox.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          New Content
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="sm:col-span-2">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderKanban className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Total content items
              </p>
              <p className="text-3xl font-bold tracking-tight">{totalContent}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {totalDrafts} drafts awaiting publication
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Inbox className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Messages
              </p>
              <p className="text-3xl font-bold tracking-tight">{messages ?? 0}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {(unread ?? 0) > 0 ? (
                  <Link href="/admin/messages" className="font-medium text-primary hover:underline">
                    {unread} unread
                  </Link>
                ) : (
                  "Inbox is clear"
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Content types
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.map((c) => {
            const href = `/admin/${routeForContentType(c.type)}`;
            return (
              <Card key={c.type} className="group transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{c.label}</p>
                    <Link
                      href={href}
                      className="text-muted-foreground transition-colors group-hover:text-primary"
                      aria-label={`Manage ${c.label}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-2xl font-bold tracking-tight">{c.total}</p>
                    <div className="flex items-center gap-1.5">
                      {c.published > 0 && (
                        <Badge variant="success">{c.published} published</Badge>
                      )}
                      {c.drafts > 0 && (
                        <Badge variant="warning">{c.drafts} draft</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card className="border-dashed">
            <CardContent className="p-5">
              <p className="font-semibold">Messages</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl font-bold tracking-tight">{messages ?? 0}</p>
                <div className="flex items-center gap-1.5">
                  <Badge variant={unread ? "warning" : "success"}>
                    {unread}{" "}
                    {(unread ?? 0) === 1 ? "unread" : "unread"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Recent activity
          </h2>
          <Link
            href="/admin/audit"
            className="text-xs font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <Card>
          <CardContent className="divide-y divide-border/60 p-0">
            {recent.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No activity yet.</p>
            ) : (
              recent.map((entry) => (
                <div key={entry.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      <span className="font-medium capitalize">{readableAction(entry.action)}</span>
                      {entry.entityType && (
                        <span className="text-muted-foreground">
                          {" "}
                          &middot; {entry.entityType.replace("_", " ")}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {entry.adminEmail ?? "System"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {getRelativeTime(entry.createdAt)}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <PenLine className="h-3.5 w-3.5" />
        Changes here reflect on your live site after publishing.
      </div>
    </div>
  );
}

function readableAction(action: string): string {
  return action.split(".").pop()?.replace(/_/g, " ") ?? action;
}