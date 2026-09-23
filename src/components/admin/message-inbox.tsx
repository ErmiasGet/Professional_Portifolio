"use client";

import { useEffect, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  Check,
  Inbox as InboxIcon,
  Mail,
  MailOpen,
  Reply,
  Trash2,
} from "lucide-react";
import type { MessageRow } from "@/db/messages";
import { apiFetch, errorMessage } from "@/lib/admin/api";
import { showToast } from "@/lib/admin/toast-store";
import { Badge } from "@/components/ui/badge";
import { getRelativeTime } from "@/utils";
import { cn } from "@/lib/cn";

type StatusFilter = "all" | "unread" | "read" | "replied" | "archived";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "archived", label: "Archived" },
];

interface ListResponse {
  rows: MessageRow[];
  total: number;
  unread: number;
}

export function MessageInbox() {
  const [rows, setRows] = useState<MessageRow[] | null>(null);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MessageRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);
      apiFetch<ListResponse>(
        `/api/admin/messages?status=${status}&search=${encodeURIComponent(search)}&limit=50&offset=0`
      )
        .then((res) => {
          setRows(res.rows);
          setTotal(res.total);
        })
        .catch((err) => {
          setError(errorMessage(err));
          setRows([]);
        })
        .finally(() => setLoading(false));
    }, 0);
    return () => clearTimeout(timer);
  }, [status, search]);

  const openMessage = async (message: MessageRow) => {
    setSelected(message);
    if (message.status === "unread") {
      try {
        const res = await apiFetch<{ message: MessageRow }>(
          `/api/admin/messages/${message.id}`,
          { method: "PATCH", body: JSON.stringify({ status: "read" }) }
        );
        setRows((prev) =>
          (prev ?? []).map((r) => (r.id === res.message.id ? res.message : r))
        );
        setSelected(res.message);
      } catch {
        // Non-fatal: keep showing it even if marking read failed.
      }
    }
  };

  const patch = async (message: MessageRow, next: string) => {
    try {
      const res = await apiFetch<{ message: MessageRow }>(
        `/api/admin/messages/${message.id}`,
        { method: "PATCH", body: JSON.stringify({ status: next }) }
      );
      setRows((prev) =>
        (prev ?? []).map((r) => (r.id === res.message.id ? res.message : r))
      );
      if (selected?.id === res.message.id) setSelected(null);
      showToast("Message updated.");
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
  };

  const remove = async (message: MessageRow) => {
    if (!window.confirm("Delete this message permanently?")) return;
    try {
      await apiFetch(`/api/admin/messages/${message.id}`, { method: "DELETE" });
      setRows((prev) => (prev ?? []).filter((r) => r.id !== message.id));
      if (selected?.id === message.id) setSelected(null);
      showToast("Message deleted.");
    } catch (err) {
      showToast(errorMessage(err), "error");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <InboxIcon className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions from your live site.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-card p-1">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatus(opt.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                status === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages…"
          className="h-10 w-full rounded-xl border border-input bg-background px-4 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:w-64"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl border border-border/60 bg-secondary/50" />
            ))
          ) : rows && rows.length > 0 ? (
            rows.map((message) => (
              <button
                key={message.id}
                onClick={() => openMessage(message)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-colors",
                  selected?.id === message.id
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/80 bg-card hover:border-primary/30",
                  message.status === "unread" && "border-primary/30"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    {message.status === "unread" ? (
                      <Mail className="h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <MailOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className={cn("truncate text-sm font-medium", message.status === "unread" && "font-semibold")}>
                      {message.name}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {getRelativeTime(message.createdAt)}
                  </span>
                </div>
                <p className="mt-1.5 truncate text-sm text-muted-foreground">{message.subject}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground/80">{message.message}</p>
              </button>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No messages here.
            </p>
          )}
          {!loading && total > 0 && (
            <p className="px-1 text-xs text-muted-foreground">{total} messages total</p>
          )}
        </div>

        <div className="hidden lg:block">
          {selected ? (
            <div className="sticky top-24 rounded-2xl border border-border/80 bg-card shadow-sm">
              <div className="flex items-start justify-between gap-3 border-b border-border/60 p-5">
                <div>
                  <h2 className="text-lg font-bold">{selected.subject}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    From <span className="font-medium text-foreground">{selected.name}</span>{" "}
                    &lt;{selected.email}&gt;
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(selected.createdAt).toLocaleString()}
                    {selected.purpose && <> &middot; {selected.purpose}</>}
                  </p>
                </div>
                <Badge variant={statusBadge(selected.status)}>{selected.status}</Badge>
              </div>

              <div className="whitespace-pre-wrap p-5 text-sm leading-relaxed text-foreground/90">
                {selected.message}
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-border/60 p-4">
                {selected.status === "unread" && (
                  <ActionButton label="Mark read" icon={Check} onClick={() => patch(selected, "read")} />
                )}
                {selected.status !== "read" && (
                  <ActionButton label="Mark read" icon={Check} onClick={() => patch(selected, "read")} />
                )}
                <ActionButton label="Replied" icon={Reply} onClick={() => patch(selected, "replied")} />
                {selected.status === "archived" ? (
                  <ActionButton label="Restore" icon={ArchiveRestore} onClick={() => patch(selected, "read")} />
                ) : (
                  <ActionButton label="Archive" icon={Archive} onClick={() => patch(selected, "archived")} />
                )}
                <ActionButton label="Delete" icon={Trash2} destructive onClick={() => remove(selected)} />
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Select a message to read it.
            </div>
          )}
        </div>
      </div>

      {/* Mobile detail */}
      {selected && (
        <div className="fixed inset-0 z-[80] overflow-y-auto p-4">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative mx-auto max-w-lg rounded-2xl border border-border bg-card shadow-xl">
            <div className="flex items-start justify-between gap-3 border-b border-border/60 p-5">
              <div>
                <h2 className="text-lg font-bold">{selected.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  From {selected.name} &lt;{selected.email}&gt;
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Close">
                <XIcon />
              </button>
            </div>
            <div className="whitespace-pre-wrap p-5 text-sm leading-relaxed">{selected.message}</div>
            <div className="flex flex-wrap gap-2 border-t border-border/60 p-4">
              {selected.status !== "read" && <ActionButton label="Mark read" icon={Check} onClick={() => patch(selected, "read")} />}
              <ActionButton label="Replied" icon={Reply} onClick={() => patch(selected, "replied")} />
              <ActionButton label="Archive" icon={Archive} onClick={() => patch(selected, "archived")} />
              <ActionButton label="Delete" icon={Trash2} destructive onClick={() => remove(selected)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  onClick,
  destructive,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors",
        destructive
          ? "text-destructive hover:bg-destructive/10"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function statusBadge(status: MessageRow["status"]): "primary" | "success" | "warning" | "default" {
  switch (status) {
    case "unread":
      return "warning";
    case "read":
      return "primary";
    case "replied":
      return "success";
    case "archived":
      return "default";
  }
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}