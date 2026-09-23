import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminFromRequest, isSameOrigin } from "@/lib/auth/auth";
import { verifyPassword } from "@/lib/auth/password";
import { hashPassword } from "@/lib/auth/password";
import { updateAdminPassword } from "@/lib/auth/admin";
import { writeAuditLog } from "@/db/audit";

const schema = z.object({
  currentPassword: z.string().min(1).max(256),
  newPassword: z.string().min(8).max(256),
});

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let body: z.infer<typeof schema>;
  try {
    const raw = await request.json();
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }
    body = parsed.data;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.currentPassword === body.newPassword) {
    return NextResponse.json(
      { error: "New password must be different." },
      { status: 400 }
    );
  }

  const valid = await verifyPassword(body.currentPassword, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 403 });
  }

  const hashed = await hashPassword(body.newPassword);
  const ok = await updateAdminPassword(admin.id, hashed);
  if (!ok) {
    return NextResponse.json({ error: "Could not update password." }, { status: 500 });
  }

  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "password.change",
    entityType: "admin",
    entityId: admin.id,
  });

  return NextResponse.json({ success: true });
}