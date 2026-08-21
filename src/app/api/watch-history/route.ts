import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch watch history for a user
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const history = await prisma.watchHistory.findMany({
    where: { userId },
    include: { movie: true, episode: { include: { season: true } } },
    orderBy: { watchedAt: "desc" },
  });

  return NextResponse.json(history);
}

// POST: Save or update watch progress
export async function POST(request: Request) {
  const body = await request.json();
  const { userId, movieId, episodeId, progress, position } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const data = {
    userId,
    movieId: movieId || undefined,
    episodeId: episodeId || undefined,
    progress: progress || 0,
    position: position || 0,
    watchedAt: new Date(),
  };

  let record;
  if (movieId) {
    record = await prisma.watchHistory.upsert({
      where: { userId_movieId: { userId, movieId } },
      update: { progress, position, watchedAt: new Date() },
      create: data,
    });
  } else if (episodeId) {
    record = await prisma.watchHistory.upsert({
      where: { userId_episodeId: { userId, episodeId } },
      update: { progress, position, watchedAt: new Date() },
      create: data,
    });
  } else {
    return NextResponse.json({ error: "movieId or episodeId required" }, { status: 400 });
  }

  return NextResponse.json(record);
}
