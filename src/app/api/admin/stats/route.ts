import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [movies, books, inganzo, users, premiumUsers, watchHistory] = await Promise.all([
    prisma.movie.count(),
    prisma.book.count(),
    prisma.inganzo.count(),
    prisma.user.count(),
    prisma.subscription.count({ where: { plan: "PREMIUM" } }),
    prisma.watchHistory.count(),
  ]);

  return NextResponse.json({
    movies,
    books,
    inganzo,
    users,
    premiumUsers,
    totalViews: watchHistory,
  });
}
