import { queryWithSchema } from "../../db/migrate";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  failedAttempts: number;
  lockedUntil: string | null;
}

export interface PublicAdmin {
  id: string;
  email: string;
  name: string;
  role: string;
}

const ADMIN_SELECT = `
  SELECT id, email, name, role, password_hash AS "passwordHash",
         created_at AS "createdAt", updated_at AS "updatedAt",
         last_login_at AS "lastLoginAt",
         failed_attempts AS "failedAttempts", locked_until AS "lockedUntil"
  FROM admin_users
`;

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const res = await queryWithSchema<{ rows: AdminUser[] }>(
    `${ADMIN_SELECT} WHERE email = $1`,
    [email]
  );
  return res?.rows?.[0] ?? null;
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  const res = await queryWithSchema<{ rows: AdminUser[] }>(
    `${ADMIN_SELECT} WHERE id = $1`,
    [id]
  );
  return res?.rows?.[0] ?? null;
}

export async function createAdmin(input: {
  email: string;
  passwordHash: string;
  name?: string;
}): Promise<AdminUser | null> {
  const res = await queryWithSchema<{ rows: AdminUser[] }>(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = now()
     RETURNING id, email, name, role, password_hash AS "passwordHash",
               created_at AS "createdAt", updated_at AS "updatedAt",
               last_login_at AS "lastLoginAt",
               failed_attempts AS "failedAttempts", locked_until AS "lockedUntil"`,
    [input.email.toLowerCase(), input.passwordHash, input.name ?? "Admin"]
  );
  return res?.rows?.[0] ?? null;
}

export async function countAdmins(): Promise<number> {
  const res = await queryWithSchema<{ rows: { count: string }[] }>(
    `SELECT COUNT(*)::text AS count FROM admin_users`
  );
  return res?.rows?.[0] ? Number(res.rows[0].count) : 0;
}

export async function updateAdminPassword(
  id: string,
  passwordHash: string
): Promise<boolean> {
  const res = await queryWithSchema(
    `UPDATE admin_users SET password_hash = $1, updated_at = now() WHERE id = $2 RETURNING id`,
    [passwordHash, id]
  );
  return Boolean(res);
}

export async function updateLastLogin(id: string): Promise<void> {
  await queryWithSchema(
    `UPDATE admin_users SET last_login_at = now(), failed_attempts = 0, locked_until = NULL WHERE id = $1`,
    [id]
  );
}

export async function incrementFailedAttempts(id: string): Promise<void> {
  await queryWithSchema(
    `UPDATE admin_users SET failed_attempts = failed_attempts + 1, updated_at = now() WHERE id = $1`,
    [id]
  );
}

export async function lockAdmin(id: string, minutes: number): Promise<void> {
  await queryWithSchema(
    `UPDATE admin_users SET locked_until = now() + make_interval(mins => $1), updated_at = now() WHERE id = $2`,
    [minutes, id]
  );
}

export async function isAdminLocked(admin: AdminUser): Promise<boolean> {
  if (!admin.lockedUntil) return false;
  return new Date(admin.lockedUntil).getTime() > Date.now();
}