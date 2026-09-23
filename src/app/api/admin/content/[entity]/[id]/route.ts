import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminFromRequest, isSameOrigin } from "@/lib/auth/auth";
import { CONTENT_TYPES, CONTENT_CONFIG, type FieldDef } from "@/lib/data/registry";
import type { ContentType } from "@/lib/data/types";
import { getContentById, updateContent, deleteContent } from "@/db/content";
import { writeAuditLog } from "@/db/audit";
import { slugify } from "@/utils";

type Params = Promise<{ entity: string; id: string }>;

function revalidatePublic(type: ContentType, slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/blog");
  if (type === "project" && slug) revalidatePath(`/projects/${slug}`);
  if (type === "blog_post" && slug) revalidatePath(`/blog/${slug}`);
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { entity, id } = await params;
  if (!CONTENT_TYPES.includes(entity as ContentType)) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
  }
  const row = await getContentById(id);
  if (!row || row.type !== entity) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ row });
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const { entity, id } = await params;
  if (!CONTENT_TYPES.includes(entity as ContentType)) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
  }
  const config = CONTENT_CONFIG[entity as ContentType];

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const existing = await getContentById(id);
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  // Merge existing data with new field values.
  const data: Record<string, unknown> = { ...existing.data };
  for (const field of config.fields) {
    if (field.key in body) {
      data[field.key] = normalizeField(field, body[field.key], data);
    }
  }

  const status = body.status === "draft" ? "draft" : "published";
  const featured = body.featured === true || body.featured === "true";

  let slug = existing.slug ?? "";
  if (body.slug !== undefined && body.slug !== null) {
    slug = slugify(String(body.slug).trim()) || slug;
  }
  if (!slug) {
    const title = String(data[config.titleField] ?? body.title ?? "").trim();
    slug = slugify(title) || `${entity}-${Date.now()}`;
  }

  const title = String(body.title ?? existing.title ?? data[config.titleField] ?? "")
    .trim();

  const row = await updateContent(id, {
    slug,
    title,
    category: body.category !== undefined && body.category !== null
      ? String(body.category)
      : existing.category,
    status,
    featured,
    orderIndex: body.orderIndex !== undefined ? Number(body.orderIndex) || 0 : existing.orderIndex,
    data,
  });

  if (!row) return NextResponse.json({ error: "Could not update content." }, { status: 500 });

  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "content.update",
    entityType: entity,
    entityId: row.id,
    meta: { slug, title },
  });

  revalidatePublic(entity as ContentType, slug);

  return NextResponse.json({ row });
}

function normalizeField(
  field: FieldDef,
  raw: unknown,
  data: Record<string, unknown>
): unknown {
  switch (field.type) {
    case "boolean":
      return raw === true || raw === "true" || raw === "on";
    case "number":
      return Number(raw) || 0;
    case "tags":
      if (Array.isArray(raw)) return raw.filter(Boolean);
      return String(raw ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    default:
      return raw ?? data[field.key] ?? "";
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const { entity, id } = await params;
  if (!CONTENT_TYPES.includes(entity as ContentType)) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
  }

  const existing = await getContentById(id);
  if (existing && existing.type !== entity) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const ok = await deleteContent(id);
  if (!ok) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "content.delete",
    entityType: entity,
    entityId: id,
    meta: { title: existing?.title },
  });

  revalidatePublic(entity as ContentType, existing?.slug);

  return NextResponse.json({ success: true });
}