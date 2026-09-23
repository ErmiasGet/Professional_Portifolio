import { NextRequest } from "next/server";
import {
  getAdminFromToken,
  SESSION_COOKIE,
} from "./session";
import type { AdminUser } from "./admin";
import { isDatabaseConfigured } from "../../db/client";

export const ADMIN_ROLE = "admin";

export interface AuthContext {
  admin: AdminUser;
}

/**
 * Server-side guard for server components. Reads the session cookie from
 * the incoming request via next/headers and resolves the admin (Admin role).
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const { cookies } = await import("next/headers");
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!token) return null;
    return getAdminFromToken(token);
  } catch {
    return null;
  }
}

/** Extract the admin from a NextRequest's cookies. */
export async function getAdminFromRequest(
  request: NextRequest
): Promise<AdminUser | null> {
  if (!isDatabaseConfigured()) return null;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return getAdminFromToken(token);
}

/** Friendly client IP from standard headers. */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function getSessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    // Keep in sync with SESSION_DURATION_MS in session.ts
    maxAge: 7 * 24 * 60 * 60,
  };
}

/** Reject requests with a cross-origin Origin header (CSRF hardening). */
export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients / same-origin fetches without Origin
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (!host) return false;
    const url = new URL(origin);
    return url.host === host;
  } catch {
    return false;
  }
}