import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all movies for admin
export async function GET() {
  const movies = await prisma.movie.findMany({
    include: { genres: { include: { genre: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(movies);
}

// POST create movie
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { genreIds, ...movieData } = body;

    const movie = await prisma.movie.create({
      data: {
        ...movieData,
        genres: genreIds?.length
          ? { create: genreIds.map((id: string) => ({ genreId: id })) }
          : undefined,
      },
      include: { genres: { include: { genre: true } } },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
