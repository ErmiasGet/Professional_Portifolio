import { queryWithSchema, withTransaction } from "./migrate";
import type { ContentRow, ContentType } from "../lib/data/types";

const BASE_SELECT = `
  SELECT id, type, slug, title, category, status, featured,
         order_index AS "orderIndex", published_at AS "publishedAt",
         created_at AS "createdAt", updated_at AS "updatedAt", data
  FROM content_items
`;

export interface ContentListParams {
  type: ContentType;
  status?: "draft" | "published" | "all";
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

function buildWhere(params: ContentListParams): { clause: string; values: unknown[] } {
  const values: unknown[] = [params.type];
  let clause = `WHERE type = $1`;

  if (params.status && params.status !== "all") {
    values.push(params.status);
    clause += ` AND status = $${values.length}`;
  }
  if (params.category) {
    values.push(params.category);
    clause += ` AND category = $${values.length}`;
  }
  if (params.search) {
    values.push(`%${params.search}%`);
    clause += ` AND (title ILIKE $${values.length} OR data::text ILIKE $${values.length})`;
  }
  return { clause, values };
}

export async function listContent(
  params: ContentListParams
): Promise<ContentRow[] | null> {
  const { clause, values } = buildWhere(params);
  const limit = params.limit ?? 100;
  const offset = params.offset ?? 0;
  values.push(limit, offset);

  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `${BASE_SELECT} ${clause} ORDER BY order_index ASC, updated_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  );
  return res?.rows ?? null;
}

export async function countContent(
  type: ContentType,
  params?: { status?: "draft" | "published" | "all"; search?: string }
): Promise<number | null> {
  const values: unknown[] = [type];
  let clause = `WHERE type = $1`;
  if (params?.status && params.status !== "all") {
    values.push(params.status);
    clause += ` AND status = $${values.length}`;
  }
  if (params?.search) {
    values.push(`%${params.search}%`);
    clause += ` AND (title ILIKE $${values.length} OR data::text ILIKE $${values.length})`;
  }
  const res = await queryWithSchema<{ rows: { count: string }[] }>(
    `SELECT COUNT(*)::text AS count FROM content_items ${clause}`,
    values
  );
  return res?.rows?.[0] ? Number(res.rows[0].count) : null;
}

export async function getContentById(id: string): Promise<ContentRow | null> {
  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `${BASE_SELECT} WHERE id = $1`,
    [id]
  );
  return res?.rows?.[0] ?? null;
}

export async function getContentBySlug(
  type: ContentType,
  slug: string
): Promise<ContentRow | null> {
  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `${BASE_SELECT} WHERE type = $1 AND slug = $2 AND status = 'published'`,
    [type, slug]
  );
  return res?.rows?.[0] ?? null;
}

export async function getPublishedByType(
  type: ContentType
): Promise<ContentRow[] | null> {
  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `${BASE_SELECT} WHERE type = $1 AND status = 'published' ORDER BY order_index ASC, updated_at DESC`,
    [type]
  );
  return res?.rows ?? null;
}

export async function getAnyBySlug(
  type: ContentType,
  slug: string
): Promise<ContentRow | null> {
  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `${BASE_SELECT} WHERE type = $1 AND slug = $2`,
    [type, slug]
  );
  return res?.rows?.[0] ?? null;
}

export interface ContentWrite {
  type: ContentType;
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  status: "draft" | "published";
  featured: boolean;
  orderIndex: number;
  publishedAt?: Date | string | null;
  data: Record<string, unknown>;
}

export async function createContent(input: ContentWrite): Promise<ContentRow | null> {
  const publishedAt =
    input.status === "published" && !input.publishedAt
      ? new Date().toISOString()
      : (input.publishedAt ?? null);

  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `INSERT INTO content_items
       (type, slug, title, category, status, featured, order_index, published_at, data)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, type, slug, title, category, status, featured,
               order_index AS "orderIndex", published_at AS "publishedAt",
               created_at AS "createdAt", updated_at AS "updatedAt", data`,
    [
      input.type,
      input.slug ?? null,
      input.title ?? null,
      input.category ?? null,
      input.status,
      input.featured,
      input.orderIndex,
      publishedAt,
      JSON.stringify(input.data),
    ]
  );
  return res?.rows?.[0] ?? null;
}

export async function updateContent(
  id: string,
  input: Partial<ContentWrite> & { data?: Record<string, unknown> }
): Promise<ContentRow | null> {
  const existing = await queryWithSchema<{ rows: { status: string }[] }>(
    `SELECT status FROM content_items WHERE id = $1`,
    [id]
  );
  if (!existing?.rows?.length) return null;

  const values: unknown[] = [];
  const set: string[] = [];

  const publishNow =
    input.status === "published" &&
    existing.rows[0].status === "draft";

  if (input.slug !== undefined) {
    values.push(input.slug ?? null);
    set.push(`slug = $${values.length}`);
  }
  if (input.title !== undefined) {
    values.push(input.title ?? null);
    set.push(`title = $${values.length}`);
  }
  if (input.category !== undefined) {
    values.push(input.category ?? null);
    set.push(`category = $${values.length}`);
  }
  if (input.status !== undefined) {
    values.push(input.status);
    set.push(`status = $${values.length}`);
  }
  if (input.featured !== undefined) {
    values.push(input.featured);
    set.push(`featured = $${values.length}`);
  }
  if (input.orderIndex !== undefined) {
    values.push(input.orderIndex);
    set.push(`order_index = $${values.length}`);
  }
  if (input.data !== undefined) {
    values.push(JSON.stringify(input.data));
    set.push(`data = $${values.length}`);
  }
  if (publishNow && !input.publishedAt) {
    values.push(new Date().toISOString());
    set.push(`published_at = $${values.length}`);
  } else if (input.publishedAt) {
    values.push(input.publishedAt);
    set.push(`published_at = $${values.length}`);
  }
  values.push(new Date().toISOString());
  set.push(`updated_at = $${values.length}`);

  if (set.length === 0) return getContentById(id);

  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `UPDATE content_items SET ${set.join(", ")} WHERE id = $${values.length + 1}
     RETURNING id, type, slug, title, category, status, featured,
               order_index AS "orderIndex", published_at AS "publishedAt",
               created_at AS "createdAt", updated_at AS "updatedAt", data`,
    [...values, id]
  );
  return res?.rows?.[0] ?? null;
}

export async function deleteContent(id: string): Promise<boolean> {
  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `DELETE FROM content_items WHERE id = $1 RETURNING id`,
    [id]
  );
  return Boolean(res?.rows?.[0]);
}

/** Reorder multiple rows in one transaction. */
export async function reorderContent(
  pairs: { id: string; orderIndex: number }[]
): Promise<boolean> {
  const ok = await withTransaction(async (client) => {
    for (const { id, orderIndex } of pairs) {
      await client.query(
        `UPDATE content_items SET order_index = $1, updated_at = now() WHERE id = $2`,
        [orderIndex, id]
      );
    }
    return true;
  }).catch(() => false);
  return ok;
}

/**
 * Idempotent upsert keyed on (type, slug). Used by the seed step so re-running
 * it never duplicates content. Returns the row.
 */
export async function upsertContentBySlug(
  input: ContentWrite & { slug: string }
): Promise<ContentRow | null> {
  const publishedAt =
    input.status === "published" && !input.publishedAt
      ? new Date().toISOString()
      : (input.publishedAt ?? null);

  const res = await queryWithSchema<{ rows: ContentRow[] }>(
    `INSERT INTO content_items
       (type, slug, title, category, status, featured, order_index, published_at, data)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (type, slug) DO UPDATE SET
       title = EXCLUDED.title,
       category = EXCLUDED.category,
       status = EXCLUDED.status,
       featured = EXCLUDED.featured,
       order_index = EXCLUDED.order_index,
       published_at = EXCLUDED.published_at,
       data = EXCLUDED.data,
       updated_at = now()
     RETURNING id, type, slug, title, category, status, featured,
               order_index AS "orderIndex", published_at AS "publishedAt",
               created_at AS "createdAt", updated_at AS "updatedAt", data`,
    [
      input.type,
      input.slug,
      input.title ?? null,
      input.category ?? null,
      input.status,
      input.featured,
      input.orderIndex,
      publishedAt,
      JSON.stringify(input.data),
    ]
  );
  return res?.rows?.[0] ?? null;
}