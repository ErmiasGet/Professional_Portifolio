import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth/auth";
import { listMessages, countMessages } from "@/db/messages";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? "all";
  const search = url.searchParams.get("search") ?? undefined;
  const limit = Number(url.searchParams.get("limit") ?? 50);
  const offset = Number(url.searchParams.get("offset") ?? 0);

  const [rows, total, unread] = await Promise.all([
    listMessages({
      status: (status as "unread" | "read" | "replied" | "archived" | "all") ?? "all",
      search,
      limit,
      offset,
    }),
    countMessages(status as "unread" | "read" | "replied" | "archived" | "all"),
    countMessages("unread"),
  ]);

  return NextResponse.json({
    rows: rows ?? [],
    total: total ?? 0,
    unread: unread ?? 0,
  });
}