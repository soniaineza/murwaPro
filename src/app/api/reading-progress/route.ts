import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch reading progress for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const progress = await prisma.readingProgress.findMany({
    where: { userId },
    include: { book: true },
    orderBy: { lastReadAt: "desc" },
  });

  return NextResponse.json(progress);
}

// POST: Save or update reading progress
export async function POST(request: Request) {
  const body = await request.json();
  const { userId, bookId, currentPage, percentage } = body;

  if (!userId || !bookId) {
    return NextResponse.json({ error: "userId and bookId required" }, { status: 400 });
  }

  const record = await prisma.readingProgress.upsert({
    where: { userId_bookId: { userId, bookId } },
    update: {
      currentPage: currentPage || 1,
      percentage: percentage || 0,
      lastReadAt: new Date(),
    },
    create: {
      userId,
      bookId,
      currentPage: currentPage || 1,
      percentage: percentage || 0,
    },
  });

  return NextResponse.json(record);
}
