import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminFromRequest, isSameOrigin } from "@/lib/auth/auth";
import {
  getMessage,
  updateMessageStatus,
  deleteMessage,
  type MessageStatus,
} from "@/db/messages";
import { writeAuditLog } from "@/db/audit";

type Params = Promise<{ id: string }>;

const schema = z.object({
  status: z.enum(["unread", "read", "replied", "archived"]),
});

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const message = await getMessage(id);
  if (!message) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ message });
}

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const { id } = await params;
  let body: z.infer<typeof schema>;
  try {
    const raw = await request.json();
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    body = parsed.data;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = await updateMessageStatus(id, body.status as MessageStatus);
  if (!message) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "message.status",
    entityType: "message",
    entityId: id,
    meta: { status: body.status },
  });

  return NextResponse.json({ message });
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const { id } = await params;
  const ok = await deleteMessage(id);
  if (!ok) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await writeAuditLog({
    adminId: admin.id,
    adminEmail: admin.email,
    action: "message.delete",
    entityType: "message",
    entityId: id,
  });

  return NextResponse.json({ success: true });
}