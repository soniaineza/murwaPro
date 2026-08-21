import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Track an analytics event
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, movieId, bookId, inganzoId, userId, metadata } = body;

    // type: "view" | "read" | "download" | "search" | "page_visit"
    if (!type) {
      return NextResponse.json({ error: "type required" }, { status: 400 });
    }

    // Store in watchHistory for movies, readingProgress for books
    if (type === "view" && movieId) {
      // Update or create watch history entry
      if (userId) {
        await prisma.watchHistory.upsert({
          where: { userId_movieId: { userId, movieId } },
          update: { watchedAt: new Date(), progress: metadata?.progress || 0, position: metadata?.position || 0 },
          create: { userId, movieId, progress: metadata?.progress || 0, position: metadata?.position || 0 },
        });
      }
    }

    if (type === "read" && bookId && userId) {
      await prisma.readingProgress.upsert({
        where: { userId_bookId: { userId, bookId } },
        update: { lastReadAt: new Date(), currentPage: metadata?.currentPage || 1, percentage: metadata?.percentage || 0 },
        create: { userId, bookId, currentPage: metadata?.currentPage || 1, percentage: metadata?.percentage || 0 },
      });
    }

    if (type === "download" && userId) {
      if (movieId || bookId) {
        await prisma.download.create({
          data: {
            userId,
            movieId: movieId || undefined,
            bookId: bookId || undefined,
            quality: metadata?.quality || "720p",
            status: "COMPLETED",
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
