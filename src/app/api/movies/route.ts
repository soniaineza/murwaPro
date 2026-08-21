import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const year = searchParams.get("year");
  const language = searchParams.get("language");
  const access = searchParams.get("access");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const trending = searchParams.get("trending");
  const isNew = searchParams.get("new");
  const rwandan = searchParams.get("rwandan");
  const african = searchParams.get("african");
  const sort = searchParams.get("sort") || "newest";
  const limit = searchParams.get("limit");

  const where: Record<string, unknown> = {};

  if (genre) {
    where.genres = { some: { genre: { name: genre } } };
  }
  if (year) where.year = Number(year);
  if (language) where.language = language;
  if (access) where.access = access.toUpperCase();
  if (featured) where.featured = true;
  if (trending) where.trending = true;
  if (isNew) where.isNew = true;
  if (rwandan) where.isRwandan = true;
  if (african) where.isAfrican = true;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { director: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy =
    sort === "rating"
      ? { rating: "desc" as const }
      : sort === "popular"
      ? { rating: "desc" as const }
      : { year: "desc" as const };

  const movies = await prisma.movie.findMany({
    where,
    include: { genres: { include: { genre: true } } },
    orderBy,
    ...(limit ? { take: Number(limit) } : {}),
  });

  return NextResponse.json(movies);
}
