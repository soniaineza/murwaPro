import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT update movie
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { genreIds, ...movieData } = body;

    // Update genres if provided
    if (genreIds) {
      await prisma.movieGenre.deleteMany({ where: { movieId: id } });
      if (genreIds.length > 0) {
        await prisma.movieGenre.createMany({
          data: genreIds.map((genreId: string) => ({ movieId: id, genreId })),
        });
      }
    }

    const movie = await prisma.movie.update({
      where: { id },
      data: movieData,
      include: { genres: { include: { genre: true } } },
    });

    return NextResponse.json(movie);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE movie
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.movie.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
