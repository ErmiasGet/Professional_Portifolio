import { NextRequest, NextResponse } from "next/server";
import { deleteSessionByToken, SESSION_COOKIE } from "@/lib/auth/session";
import { getAdminFromRequest } from "@/lib/auth/auth";
import { writeAuditLog } from "@/db/audit";

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) await deleteSessionByToken(token);
  if (admin) {
    await writeAuditLog({
      adminId: admin.id,
      adminEmail: admin.email,
      action: "logout",
      entityType: "admin",
      entityId: admin.id,
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}