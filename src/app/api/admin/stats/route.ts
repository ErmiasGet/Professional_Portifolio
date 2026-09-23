import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth/auth";
import { CONTENT_TYPES, CONTENT_CONFIG } from "@/lib/data/registry";
import { countContent } from "@/db/content";
import { countMessages } from "@/db/messages";
import { listAuditLog } from "@/db/audit";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const counters = await Promise.all(
    CONTENT_TYPES.map(async (type) => {
      const [published, drafts, total] = await Promise.all([
        countContent(type, { status: "published" }),
        countContent(type, { status: "draft" }),
        countContent(type),
      ]);
      return {
        type,
        label: CONTENT_CONFIG[type].label,
        published: published ?? 0,
        drafts: drafts ?? 0,
        total: total ?? 0,
      };
    })
  );

  const [messages, unreadMessages, audit] = await Promise.all([
    countMessages(),
    countMessages("unread"),
    listAuditLog(8),
  ]);

  return NextResponse.json({
    content: counters,
    messages: messages ?? 0,
    unreadMessages: unreadMessages ?? 0,
    recentActivity: audit ?? [],
  });
}