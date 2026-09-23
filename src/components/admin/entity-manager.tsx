"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { CONTENT_CONFIG, type FieldDef } from "@/lib/data/registry";
import type { ContentRow, ContentType } from "@/lib/data/types";
import { apiFetch, errorMessage } from "@/lib/admin/api";
import { showToast } from "@/lib/admin/toast-store";
import { Badge } from "@/components/ui/badge";
import { publicPreviewPath, contentTypeFromRoute } from "@/lib/data/admin-routes";

const PAGE_SIZE = 15;

interface ListResponse {
  rows: ContentRow[];
  total: number;
  type: ContentType;
  label: string;
}

export function EntityManager() {
  const { entity } = useParams<{ entity: string }>();
  const type = contentTypeFromRoute(entity);

  const [rows, setRows] = useState<ContentRow[] | null>(null);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"draft" | "published" | "all">("all");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ContentRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  const config = type ? CONTENT_CONFIG[type] : null;
  const columns = useMemo(() => (config ? listColumns(config.fields) : []), [config]);

  useEffect(() => {
    if (!type) return;
    let cancelled = false;
    apiFetch<ListResponse>(
      `/api/admin/content/${type}?status=${status}&search=${encodeURIComponent(search)}&limit=${PAGE_SIZE}&offset=${offset}`
    )
      .then((res) => {
        if (cancelled) return;
        setRows(res.rows);
        setTotal(res.total);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(errorMessage(err));
        setRows([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [type, entity, status, search, offset]);

  if (!type || !config) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        Unknown or unsupported content type.
      </p>
    );
  }

  const handleTogglePublished = async (row: ContentRow) => {
    setBusyId(row.id);
    try {
      const res = await apiFetch<{ row: ContentRow }>(
        `/api/admin/content/${type}/${row.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            status: row.status === "published" ? "draft" : "published",
          }),
        }
      );
      setRows((prev) =>
        (prev ?? []).map((r) => (r.id === res.row.id ? res.row : r))
      );
      showToast(
        res.row.status === "published"
          ? "Published. It’s now visible on your site."
          : "Unpublished. It’s now hidden from your site."
      );
    } catch (err) {
      showToast(errorMessage(err), "error");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const id = confirmDelete.id;
    setBusyId(id);
    try {
      await apiFetch(`/api/admin/content/${type}/${id}`, { method: "DELETE" });
      setRows((prev) => (prev ?? []).filter((r) => r.id !== id));
      setTotal((t) => Math.max(0, t - 1));
      showToast("Deleted.");
      setConfirmDelete(null);
    } catch (err) {
      showToast(errorMessage(err), "error");
    } finally {
      setBusyId(null);
    }
  };

  const pages = Math.ceil(total / PAGE_SIZE);
  const page = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{config.label}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{config.description}</p>
        </div>
        <Link
          href={`/admin/${entity}/new`}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          New {config.label.slice(0, -1)}
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOffset(0);
            }}
            placeholder={`Search ${config.label.toLowerCase()}…`}
            className="flex h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </label>
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setOffset(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                status === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
                <th scope="col" className="px-5 py-3.5 font-semibold">
                  Name
                </th>
                {columns.slice(0, 3).map((col) => (
                  <th key={col.key + col.label} scope="col" className="hidden px-4 py-3.5 font-semibold md:table-cell">
                    {col.label}
                  </th>
                ))}
                <th scope="col" className="hidden px-4 py-3.5 font-semibold sm:table-cell">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4" colSpan={6}>
                      <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
                    </td>
                  </tr>
                ))
              ) : rows && rows.length > 0 ? (
                rows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-secondary/40">
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/${entity}/${row.id}/edit`}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {row.title ?? row.slug ?? "Untitled"}
                      </Link>
                      {row.featured && (
                        <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          Featured
                        </span>
                      )}
                    </td>
                    {columns.slice(0, 3).map((col) => {
                      const v = col.value(row);
                      return (
                        <td key={col.key + col.label} className="hidden px-4 py-4 text-muted-foreground md:table-cell">
                          {v}
                        </td>
                      );
                    })}
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <Badge variant={row.status === "published" ? "success" : "warning"}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {publicPreviewPath(type, row.slug) && (
                          <Link
                            href={publicPreviewPath(type, row.slug)!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            aria-label="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => handleTogglePublished(row)}
                          disabled={busyId === row.id}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
                          aria-label={row.status === "published" ? "Unpublish" : "Publish"}
                          title={row.status === "published" ? "Unpublish" : "Publish"}
                        >
                          {row.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <Link
                          href={`/admin/${entity}/${row.id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setConfirmDelete(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-12 text-center text-sm text-muted-foreground" colSpan={6}>
                    Nothing here yet.{" "}
                    <Link href={`/admin/${entity}/new`} className="font-medium text-primary hover:underline">
                      Create your first {config.label.toLowerCase().slice(0, -1)}.
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-between border-t border-border/60 px-5 py-3">
            <p className="text-xs text-muted-foreground">
              Page {page} of {pages} &middot; {total} items
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={offset <= 0}
                onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={offset + PAGE_SIZE >= total}
                onClick={() => setOffset((o) => o + PAGE_SIZE)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmDelete && (
        <DeleteDialog
          title={confirmDelete.title ?? "this item"}
          busy={busyId === confirmDelete.id}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

function DeleteDialog({
  title,
  busy,
  onCancel,
  onConfirm,
}: {
  title: string;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl" role="dialog" aria-modal="true">
        <h2 className="text-lg font-bold">Delete {title}?</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          This action is permanent and cannot be undone. It will also be removed from your live site.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={busy}
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:opacity-50"
          >
            {busy ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ColumnDef {
  key: string;
  label: string;
  value: (row: ContentRow) => string;
}

function listColumns(fields: FieldDef[]): ColumnDef[] {
  return fields
    .filter((f) => ["text", "tags", "select", "number"].includes(f.type))
    .filter((f) => {
      const blocked = new Set(["image", "longDescription", "content", "github", "liveUrl", "credentialUrl", "credentialId", "screenshots"]);
      return !blocked.has(f.key);
    })
    .slice(0, 5)
    .map((f) => ({
      key: f.key,
      label: f.label.split(" ")[0],
      value: (row) => {
        const v = row.data?.[f.key];
        if (Array.isArray(v)) return (v as string[]).slice(0, 3).join(", ");
        if (v == null || v === "") return "—";
        return String(v);
      },
    }));
}