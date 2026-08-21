import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const language = searchParams.get("language");
  const access = searchParams.get("access");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const sort = searchParams.get("sort") || "newest";
  const limit = searchParams.get("limit");

  const where: Record<string, unknown> = {};

  if (genre) where.genre = genre;
  if (language) where.language = language;
  if (access) where.access = access.toUpperCase();
  if (featured) where.featured = true;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy =
    sort === "rating"
      ? { rating: "desc" as const }
      : { year: "desc" as const };

  const books = await prisma.book.findMany({
    where,
    orderBy,
    ...(limit ? { take: Number(limit) } : {}),
  });

  return NextResponse.json(books);
}
