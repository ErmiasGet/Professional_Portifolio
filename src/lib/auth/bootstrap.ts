import { createAdmin, countAdmins } from "./admin";
import { hashPassword } from "./password";
import { ensureSchema } from "../../db/migrate";

/**
 * Creates (or updates the password of) the admin user from environment
 * variables — ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME. Used by:
 *   - `npm run db:seed`
 *   - a one-time, guarded setup route when no admin exists yet
 *   - the login route as a fallback so a fresh deploy can always log in
 */
export async function bootstrapAdmin(input: {
  email?: string | null;
  password?: string | null;
  name?: string | null;
}): Promise<{ id: string; email: string } | null> {
  const email = input.email?.trim().toLowerCase();
  const password = input.password;
  if (!email || !password || password.length < 8) {
    return null;
  }

  const ready = await ensureSchema();
  if (!ready) return null;

  const passwordHash = await hashPassword(password);
  const admin = await createAdmin({
    email,
    passwordHash,
    name: input.name?.trim() || "Admin",
  });
  if (!admin) return null;
  return { id: admin.id, email: admin.email };
}

/** True when we should allow one-time admin bootstrap from env (no admin yet). */
export async function shouldAutoBootstrap(): Promise<boolean> {
  const ready = await ensureSchema();
  if (!ready) return false;
  const count = await countAdmins();
  return count === 0;
}