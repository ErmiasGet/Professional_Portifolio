import { queryWithSchema } from "./migrate";

export interface AuditEntry {
  id: number;
  adminId: string | null;
  adminEmail: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  meta: Record<string, unknown> | null;
  createdAt: string;
}

export async function writeAuditLog(input: {
  adminId?: string | null;
  adminEmail?: string | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  meta?: Record<string, unknown>;
}): Promise<void> {
  await queryWithSchema(
    `INSERT INTO audit_log (admin_id, admin_email, action, entity_type, entity_id, meta)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      input.adminId ?? null,
      input.adminEmail ?? null,
      input.action,
      input.entityType ?? null,
      input.entityId ?? null,
      input.meta ? JSON.stringify(input.meta) : null,
    ]
  );
}

export async function listAuditLog(limit = 50): Promise<AuditEntry[] | null> {
  const res = await queryWithSchema<{ rows: AuditEntry[] }>(
    `SELECT id, admin_id AS "adminId", admin_email AS "adminEmail",
            action, entity_type AS "entityType", entity_id AS "entityId",
            meta, created_at AS "createdAt"
     FROM audit_log ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return res?.rows ?? null;
}