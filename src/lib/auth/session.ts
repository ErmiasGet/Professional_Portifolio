import { queryWithSchema } from "../../db/migrate";
import { generateToken, hashToken } from "./password";
import type { AdminUser } from "./admin";

export const SESSION_COOKIE = "admin_session";
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionRecord {
  id: string;
  userId: string;
  tokenHash: string;
  userAgent: string | null;
  ip: string | null;
  createdAt: string;
  expiresAt: string;
}

export async function createSession(input: {
  userId: string;
  userAgent?: string;
  ip?: string;
}): Promise<{ token: string; session: SessionRecord } | null> {
  const token = generateToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  const res = await queryWithSchema<{ rows: SessionRecord[] }>(
    `INSERT INTO admin_sessions (user_id, token_hash, user_agent, ip, expires_at)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, user_id AS "userId", token_hash AS "tokenHash",
               user_agent AS "userAgent", ip, created_at AS "createdAt",
               expires_at AS "expiresAt"`,
    [input.userId, tokenHash, input.userAgent ?? null, input.ip ?? null, expiresAt]
  );
  if (!res?.rows?.[0]) return null;
  return { token, session: res.rows[0] };
}

export async function getSessionByToken(token: string): Promise<SessionRecord | null> {
  const tokenHash = await hashToken(token);
  const res = await queryWithSchema<{ rows: SessionRecord[] }>(
    `SELECT id, user_id AS "userId", token_hash AS "tokenHash",
            user_agent AS "userAgent", ip, created_at AS "createdAt",
            expires_at AS "expiresAt"
     FROM admin_sessions
     WHERE token_hash = $1 AND expires_at > now()`,
    [tokenHash]
  );
  return res?.rows?.[0] ?? null;
}

export async function deleteSessionByToken(token: string): Promise<boolean> {
  const tokenHash = await hashToken(token);
  const res = await queryWithSchema(
    `DELETE FROM admin_sessions WHERE token_hash = $1 RETURNING id`,
    [tokenHash]
  );
  return Boolean(res);
}

export async function revokeUserSessions(userId: string): Promise<void> {
  await queryWithSchema(`DELETE FROM admin_sessions WHERE user_id = $1`, [userId]);
}

export async function cleanupExpiredSessions(): Promise<void> {
  await queryWithSchema(`DELETE FROM admin_sessions WHERE expires_at <= now()`);
}

/** Resolve an admin from a raw session token, or null. */
export async function getAdminFromToken(
  token: string | undefined | null
): Promise<AdminUser | null> {
  if (!token) return null;
  try {
    const session = await getSessionByToken(token);
    if (!session) return null;
    const { getAdminById } = await import("./admin");
    const admin = await getAdminById(session.userId);
    if (!admin) return null;
    await cleanupExpiredSessions();
    return admin;
  } catch {
    return null;
  }
}

/** Extract the session token from a request Cookie header. */
export function parseSessionToken(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)admin_session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}