"use client";

import type { FieldDef } from "@/lib/data/registry";
import { TagInput } from "@/components/admin/tag-input";
import { cn } from "@/lib/cn";

export type FieldValues = Record<string, unknown>;

export function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <input
          type="text"
          id={`field-${field.key}`}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      );
    case "textarea":
      return (
        <textarea
          id={`field-${field.key}`}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 4}
          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm leading-relaxed transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      );
    case "number":
      return (
        <input
          type="number"
          id={`field-${field.key}`}
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      );
    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            id={`field-${field.key}`}
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-input accent-(--primary)"
          />
          <span className="text-sm text-muted-foreground">{field.help ?? "Enabled"}</span>
        </label>
      );
    case "select":
      return (
        <select
          id={`field-${field.key}`}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <option value="">Select…</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case "tags":
      return (
        <TagInput
          value={
            Array.isArray(value) && field.decode
              ? ((field.decode(value) as string[]) ?? [])
              : Array.isArray(value)
                ? (value as string[])
                : []
          }
          onChange={(tags) => onChange(field.encode ? field.encode(tags) : tags)}
          placeholder={field.placeholder}
          help={field.help}
        />
      );
    default:
      return null;
  }
}

export function FieldGroup({
  field,
  value,
  onChange,
  grid,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (next: unknown) => void;
  grid?: boolean;
}) {
  return (
    <div className={cn("space-y-2", grid && "sm:col-span-1")}>
      <label htmlFor={`field-${field.key}`} className="text-sm font-medium">
        {field.label}
      </label>
      <FieldRenderer field={field} value={value} onChange={onChange} />
      {field.type !== "boolean" && field.type !== "tags" && field.help && (
        <p className="text-xs text-muted-foreground">{field.help}</p>
      )}
    </div>
  );
}