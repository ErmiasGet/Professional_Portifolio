import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, SESSION_COOKIE } from "@/lib/auth/session";
import {
  getAdminByEmail,
  isAdminLocked,
  incrementFailedAttempts,
  lockAdmin,
  updateLastLogin,
} from "@/lib/auth/admin";
import { bootstrapAdmin, shouldAutoBootstrap } from "@/lib/auth/bootstrap";
import {
  getClientIp,
  getSessionCookieOptions,
  isSameOrigin,
} from "@/lib/auth/auth";
import { ensureSchema } from "@/db/migrate";
import { writeAuditLog } from "@/db/audit";
import { isDatabaseConfigured } from "@/db/client";

const loginSchema = z.object({
  email: z.string().trim().email().max(120),
  password: z.string().min(1).max(256),
});

const MAX_FAILED_ATTEMPTS = 6;
const LOCK_MINUTES = 15;

export async function POST(request: NextRequest) {
  if (!(await isDatabaseConfigured())) {
    return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
  }

  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let body: z.infer<typeof loginSchema>;
  try {
    const raw = await request.json();
    const parsed = loginSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
    }
    body = parsed.data;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const email = body.email.toLowerCase();

  const ready = await ensureSchema();
  if (!ready) {
    return NextResponse.json({ error: "Database migration failed." }, { status: 503 });
  }

  // One-time bootstrap from ADMIN_* env vars when no admin exists yet.
  if (await shouldAutoBootstrap()) {
    await bootstrapAdmin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: process.env.ADMIN_NAME,
    });
  }

  const admin = await getAdminByEmail(email);
  if (!admin) {
    // Indistinguishable from a wrong password to avoid user enumeration.
    await writeAuditLog({
      adminEmail: email,
      action: "login.failed",
      entityType: "admin",
      meta: { reason: "no_account", ip },
    });
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  if (await isAdminLocked(admin)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const valid = await verifyPassword(body.password, admin.passwordHash);
  if (!valid) {
    await incrementFailedAttempts(admin.id);
    if (admin.failedAttempts + 1 >= MAX_FAILED_ATTEMPTS) {
      await lockAdmin(admin.id, LOCK_MINUTES);
      await writeAuditLog({
        adminId: admin.id,
        adminEmail: admin.email,
        action: "login.locked",
        entityType: "admin",
        entityId: admin.id,
        meta: { ip },
      });
      return NextResponse.json(
        { error: "Too many failed attempts. Account locked for 15 minutes." },
        { status: 429 }
      );
    }
    await writeAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: "login.failed",
      entityType: "admin",
      entityId: admin.id,
      meta: { ip },
    });
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = await createSession({ userId: admin.id, userAgent, ip });
  if (!session) {
    return NextResponse.json({ error: "Could not create a session." }, { status: 500 });
  }

  await updateLastLogin(admin.id);
  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "login.success",
    entityType: "admin",
    entityId: admin.id,
    meta: { ip },
  });

  const response = NextResponse.json({
    admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
  });
  response.cookies.set(SESSION_COOKIE, session.token, getSessionCookieOptions());
  return response;
}