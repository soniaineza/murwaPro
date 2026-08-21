import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch notifications for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const unreadCount = await prisma.notification.count({
    where: { userId, read: false },
  });

  return NextResponse.json({ notifications, unreadCount });
}

// PATCH: Mark notifications as read
export async function PATCH(request: Request) {
  const body = await request.json();
  const { userId, notificationIds } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  if (notificationIds && notificationIds.length > 0) {
    await prisma.notification.updateMany({
      where: { id: { in: notificationIds }, userId },
      data: { read: true },
    });
  } else {
    // Mark all as read
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  return NextResponse.json({ success: true });
}
