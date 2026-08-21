import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const movie = await prisma.movie.findUnique({
    where: { slug },
    include: {
      genres: { include: { genre: true } },
      episodes: true,
    },
  });

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}
