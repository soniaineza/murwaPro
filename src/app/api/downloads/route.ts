import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch downloads for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const downloads = await prisma.download.findMany({
    where: { userId },
    include: { movie: true, book: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(downloads);
}

// POST: Create a download record
export async function POST(request: Request) {
  const body = await request.json();
  const { userId, movieId, bookId, quality } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const download = await prisma.download.create({
    data: {
      userId,
      movieId: movieId || undefined,
      bookId: bookId || undefined,
      quality: quality || "720p",
      status: "COMPLETED",
    },
    include: { movie: true, book: true },
  });

  return NextResponse.json(download, { status: 201 });
}

// DELETE: Remove a download
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  await prisma.download.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
