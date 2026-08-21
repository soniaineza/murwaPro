import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch reviews for a movie, book, or inganzo
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");
  const bookId = searchParams.get("bookId");
  const inganzoId = searchParams.get("inganzoId");

  const where: any = {};
  if (movieId) where.movieId = movieId;
  if (bookId) where.bookId = bookId;
  if (inganzoId) where.inganzoId = inganzoId;

  const reviews = await prisma.review.findMany({
    where,
    include: { user: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

// POST: Create a review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, movieId, bookId, inganzoId, rating, comment } = body;

    if (!userId || !rating) {
      return NextResponse.json({ error: "userId and rating required" }, { status: 400 });
    }

    // Check if user already reviewed this content
    const existing = await prisma.review.findFirst({
      where: {
        userId,
        ...(movieId && { movieId }),
        ...(bookId && { bookId }),
        ...(inganzoId && { inganzoId }),
      },
    });

    if (existing) {
      // Update existing review
      const updated = await prisma.review.update({
        where: { id: existing.id },
        data: { rating, comment },
        include: { user: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
      });
      return NextResponse.json(updated);
    }

    const review = await prisma.review.create({
      data: {
        userId,
        movieId: movieId || undefined,
        bookId: bookId || undefined,
        inganzoId: inganzoId || undefined,
        rating,
        comment,
      },
      include: { user: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
    });

    // Update average rating on the content
    if (movieId) await updateMovieRating(movieId);
    if (bookId) await updateBookRating(bookId);

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a review
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.review.delete({ where: { id } });

  // Update average rating
  if (review.movieId) await updateMovieRating(review.movieId);
  if (review.bookId) await updateBookRating(review.bookId);

  return NextResponse.json({ success: true });
}

async function updateMovieRating(movieId: string) {
  const result = await prisma.review.aggregate({
    where: { movieId },
    _avg: { rating: true },
    _count: { rating: true },
  });
  const avg = result._avg.rating || 0;
  await prisma.movie.update({ where: { id: movieId }, data: { rating: Math.round(avg * 10) / 10 } });
}

async function updateBookRating(bookId: string) {
  const result = await prisma.review.aggregate({
    where: { bookId },
    _avg: { rating: true },
    _count: { rating: true },
  });
  const avg = result._avg.rating || 0;
  await prisma.book.update({ where: { id: bookId }, data: { rating: Math.round(avg * 10) / 10 } });
}
