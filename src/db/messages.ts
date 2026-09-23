import { queryWithSchema } from "./migrate";

export type MessageStatus = "unread" | "read" | "replied" | "archived";

export interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  purpose: string | null;
  status: MessageStatus;
  ip: string | null;
  createdAt: string;
  readAt: string | null;
}

export interface CreateMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  purpose?: string;
  ip?: string;
  userAgent?: string;
}

export async function createMessage(
  input: CreateMessageInput
): Promise<MessageRow | null> {
  const res = await queryWithSchema<{ rows: MessageRow[] }>(
    `INSERT INTO messages (name, email, subject, message, purpose, ip, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, name, email, subject, message, purpose, status, ip,
               created_at AS "createdAt", read_at AS "readAt"`,
    [
      input.name,
      input.email,
      input.subject,
      input.message,
      input.purpose ?? null,
      input.ip ?? null,
      input.userAgent ?? null,
    ]
  );
  return res?.rows?.[0] ?? null;
}

export interface MessageListParams {
  status?: MessageStatus | "all";
  search?: string;
  limit?: number;
  offset?: number;
}

export async function listMessages(params: MessageListParams): Promise<MessageRow[] | null> {
  const values: unknown[] = [];
  let clause = "";
  if (params.status && params.status !== "all") {
    values.push(params.status);
    clause += `${clause ? "AND" : "WHERE"} status = $${values.length}`;
  }
  if (params.search) {
    values.push(`%${params.search}%`);
    clause += `${
      clause ? "AND" : "WHERE"
    } (name ILIKE $${values.length} OR email ILIKE $${values.length} OR subject ILIKE $${values.length} OR message ILIKE $${values.length})`;
  }
  const limit = params.limit ?? 50;
  const offset = params.offset ?? 0;
  values.push(limit, offset);

  const res = await queryWithSchema<{ rows: MessageRow[] }>(
    `SELECT id, name, email, subject, message, purpose, status, ip,
            created_at AS "createdAt", read_at AS "readAt"
     FROM messages ${clause}
     ORDER BY created_at DESC
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  );
  return res?.rows ?? null;
}

export async function countMessages(status?: MessageStatus | "all"): Promise<number | null> {
  const values: unknown[] = [];
  let clause = "";
  if (status && status !== "all") {
    values.push(status);
    clause = `WHERE status = $1`;
  }
  const res = await queryWithSchema<{ rows: { count: string }[] }>(
    `SELECT COUNT(*)::text AS count FROM messages ${clause}`,
    values
  );
  return res?.rows?.[0] ? Number(res.rows[0].count) : null;
}

export async function getMessage(id: string): Promise<MessageRow | null> {
  const res = await queryWithSchema<{ rows: MessageRow[] }>(
    `SELECT id, name, email, subject, message, purpose, status, ip,
            created_at AS "createdAt", read_at AS "readAt"
     FROM messages WHERE id = $1`,
    [id]
  );
  return res?.rows?.[0] ?? null;
}

export async function updateMessageStatus(
  id: string,
  status: MessageStatus
): Promise<MessageRow | null> {
  const res = await queryWithSchema<{ rows: MessageRow[] }>(
    `UPDATE messages
     SET status = $1,
         read_at = CASE WHEN $1 = 'read' THEN now() ELSE read_at END
     WHERE id = $2
     RETURNING id, name, email, subject, message, purpose, status, ip,
               created_at AS "createdAt", read_at AS "readAt"`,
    [status, id]
  );
  return res?.rows?.[0] ?? null;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const res = await queryWithSchema(
    `DELETE FROM messages WHERE id = $1 RETURNING id`,
    [id]
  );
  return Boolean(res);
}