import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminFromRequest, isSameOrigin } from "@/lib/auth/auth";
import { CONTENT_TYPES, CONTENT_CONFIG, type FieldDef } from "@/lib/data/registry";
import type { ContentType } from "@/lib/data/types";
import { listContent, countContent, createContent } from "@/db/content";
import { writeAuditLog } from "@/db/audit";
import { slugify } from "@/utils";

type Params = Promise<{ entity: string }>;

function revalidatePublic(type: ContentType, slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/blog");
  if (type === "project" && slug) revalidatePath(`/projects/${slug}`);
  if (type === "blog_post" && slug) revalidatePath(`/blog/${slug}`);
}

function getFieldValue(data: Record<string, unknown>, key: string): unknown {
  return data[key];
}

function normalizeField(
  field: FieldDef,
  raw: unknown,
  data: Record<string, unknown>
): unknown {
  const current = getFieldValue(data, field.key);
  if (raw === undefined) return current;
  switch (field.type) {
    case "boolean":
      return raw === true || raw === "true" || raw === "on";
    case "number":
      if (raw === "" || raw === null || raw === undefined) return current ?? 0;
      return Number(raw);
    case "tags": {
      if (Array.isArray(raw)) return raw.filter(Boolean);
      return String(raw ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    case "select":
    case "text":
    case "textarea":
      return raw ?? current ?? "";
    default:
      return raw ?? current;
  }
}

function buildData(fields: FieldDef[], body: Record<string, unknown>): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const field of fields) {
    data[field.key] = normalizeField(field, body[field.key], body);
  }
  return data;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { entity } = await params;
  if (!CONTENT_TYPES.includes(entity as ContentType)) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
  }
  const type = entity as ContentType;

  const url = new URL(request.url);
  const status = (url.searchParams.get("status") as "draft" | "published" | "all") ?? "all";
  const search = url.searchParams.get("search") ?? undefined;
  const category = url.searchParams.get("category") ?? undefined;
  const limit = Number(url.searchParams.get("limit") ?? 100);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const [rows, total] = await Promise.all([
    listContent({ type, status, search, category, limit, offset }),
    countContent(type, { status, search }),
  ]);

  return NextResponse.json({
    rows: rows ?? [],
    total: total ?? 0,
    type,
    label: CONTENT_CONFIG[type].label,
  });
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const { entity } = await params;
  if (!CONTENT_TYPES.includes(entity as ContentType)) {
    return NextResponse.json({ error: "Unknown content type." }, { status: 400 });
  }
  const type = entity as ContentType;
  const config = CONTENT_CONFIG[type];

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = buildData(config.fields, body);
  const title = String(data[config.titleField] ?? "").trim();
  if (!title) {
    return NextResponse.json({ error: `${config.titleField} is required.` }, { status: 400 });
  }

  const status = body.status === "draft" ? "draft" : "published";
  const featured = body.featured === true || body.featured === "true";
  const orderIndex = Number(body.orderIndex ?? 0) || 0;

  const slugRaw = String(body.slug ?? "").trim() || String(data[config.slugSource ?? config.titleField] ?? "").trim();
  const slug = slugify(slugRaw) || `${type}-${Date.now()}`;

  const row = await createContent({
    type,
    slug,
    title,
    category: body.category ? String(body.category) : null,
    status,
    featured,
    orderIndex,
    data,
  });

  if (!row) {
    return NextResponse.json({ error: "Could not create content." }, { status: 500 });
  }

  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "content.create",
    entityType: type,
    entityId: row.id,
    meta: { slug, title },
  });

  revalidatePublic(type, slug);

  return NextResponse.json({ row }, { status: 201 });
}