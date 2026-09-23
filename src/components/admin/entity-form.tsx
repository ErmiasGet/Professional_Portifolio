"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Eye, Save, Trash2 } from "lucide-react";
import { CONTENT_CONFIG } from "@/lib/data/registry";
import type { ContentRow } from "@/lib/data/types";
import { apiFetch, errorMessage } from "@/lib/admin/api";
import { showToast } from "@/lib/admin/toast-store";
import { FieldGroup } from "@/components/admin/field-renderer";
import { publicPreviewPath, contentTypeFromRoute } from "@/lib/data/admin-routes";
import { slugify } from "@/utils";

export function EntityForm({
  row,
}: {
  row: ContentRow | null;
}) {
  const { entity, id } = useParams<{ entity: string; id?: string }>();
  const router = useRouter();
  const type = contentTypeFromRoute(entity);

  const config = type ? CONTENT_CONFIG[type] : null;
  const isEdit = Boolean(id);

  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const fields = config?.fields ?? [];
    const base: Record<string, unknown> = { slug: "", featured: false, orderIndex: 0, status: "draft" };
    for (const field of fields) {
      base[field.key] = defaultFieldValue(field.type);
    }
    if (row) {
      const merged = { ...base };
      for (const field of fields) {
        if (row.data?.[field.key] !== undefined) {
          merged[field.key] = row.data[field.key];
        }
      }
      merged.slug = row.slug ?? "";
      merged.featured = row.featured;
      merged.orderIndex = row.orderIndex;
      merged.status = row.status;
      return merged;
    }
    return base;
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugDirty, setSlugDirty] = useState(Boolean(row?.slug));

  if (!type || !config) {
    return (
      <main className="mx-auto max-w-4xl py-16 text-center">
        <h1 className="text-xl font-bold">Unknown section</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This content section is not registered. Check the admin navigation.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-light"
        >
          Back to Dashboard
        </Link>
      </main>
    );
  }

  const setValue = (key: string, next: unknown) => {
    setValues((prev) => ({ ...prev, [key]: next }));
    if (key === config.titleField && !slugDirty) {
      const newSlug = slugify(String(next ?? ""));
      setValues((prev) => (newSlug ? { ...prev, slug: newSlug } : prev));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);

    const body: Record<string, unknown> = { ...values };
    const title = String(values[config.titleField] ?? "").trim();
    if (!title) {
      setError(`The "${config.titleField}" field is required.`);
      setBusy(false);
      return;
    }

    try {
      const res = await apiFetch<{ row: ContentRow }>(
        isEdit ? `/api/admin/content/${type}/${id}` : `/api/admin/content/${type}`,
        { method: isEdit ? "PUT" : "POST", body: JSON.stringify(body) }
      );
      showToast(isEdit ? "Changes saved." : "Created.");
      router.replace(`/admin/${entity}/${res.row.id}/edit`);
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Delete this item permanently? It will also be removed from your live site.")) return;
    setBusy(true);
    try {
      await apiFetch(`/api/admin/content/${type}/${id}`, { method: "DELETE" });
      showToast("Deleted.");
      router.replace(`/admin/${entity}`);
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  const preview = isEdit && row?.slug ? publicPreviewPath(type, row.slug) : null;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEdit ? `Edit ${config.label.slice(0, -1)}` : `New ${config.label.slice(0, -1)}`}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{config.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {preview && (
            <Link
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Link>
          )}
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-10 items-center rounded-xl border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-destructive/10 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary-light disabled:opacity-60"
          >
            {busy ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isEdit ? "Save Changes" : "Create"}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {config.fields.map((field) => (
            <div
              key={field.key}
              className={field.type === "textarea" || field.type === "tags" ? "sm:col-span-2" : undefined}
            >
              <FieldGroup field={field} value={values[field.key]} onChange={(next) => setValue(field.key, next)} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Publishing
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={(values.slug as string) ?? ""}
              onChange={(e) => {
                setSlugDirty(true);
                setValue("slug", e.target.value);
              }}
              placeholder={String(values[config.titleField] ?? "") ? slugify(String(values[config.titleField])) : "auto-generated"}
              className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <p className="text-xs text-muted-foreground">Leave empty to auto-generate from title.</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="orderIndex" className="text-sm font-medium">
              Order
            </label>
            <input
              id="orderIndex"
              type="number"
              value={(values.orderIndex as number) ?? 0}
              onChange={(e) => setValue("orderIndex", Number(e.target.value))}
              className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <p className="text-xs text-muted-foreground">Lower numbers sort first.</p>
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <input
                id="status-published"
                type="radio"
                name="status"
                checked={values.status === "published"}
                onChange={() => setValue("status", "published")}
                className="h-4 w-4 accent-(--primary)"
              />
              <div>
                <label htmlFor="status-published" className="text-sm font-medium">Published</label>
                <p className="text-xs text-muted-foreground">Visible on your live site.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <input
                id="status-draft"
                type="radio"
                name="status"
                checked={values.status !== "published"}
                onChange={() => setValue("status", "draft")}
                className="h-4 w-4 accent-(--primary)"
              />
              <div>
                <label htmlFor="status-draft" className="text-sm font-medium">Draft</label>
                <p className="text-xs text-muted-foreground">Hidden until you publish it.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={Boolean(values.featured)}
              onChange={(e) => setValue("featured", e.target.checked)}
              className="h-4 w-4 accent-(--primary)"
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Featured highlight
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pb-4">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary-light disabled:opacity-60"
        >
          {busy ? "Saving…" : isEdit ? "Save Changes" : "Create"}
        </button>
      </div>
    </form>
  );
}

function defaultFieldValue(type: string): unknown {
  switch (type) {
    case "boolean":
      return false;
    case "number":
      return 0;
    case "tags":
      return [];
    default:
      return "";
  }
}