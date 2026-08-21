import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Get real counts
  const [movieCount, bookCount, inganzoCount, userCount, premiumCount, watchHistoryCount, readingProgressCount, downloadCount] = await Promise.all([
    prisma.movie.count(),
    prisma.book.count(),
    prisma.inganzo.count(),
    prisma.user.count(),
    prisma.subscription.count({ where: { plan: "PREMIUM" } }),
    prisma.watchHistory.count(),
    prisma.readingProgress.count(),
    prisma.download.count(),
  ]);

  // Get views per movie (top 10)
  const topMovies = await prisma.movie.findMany({
    select: { id: true, title: true, slug: true, poster: true, rating: true },
    orderBy: { rating: "desc" },
    take: 10,
  });

  // Get movie view counts
  const movieViews = await prisma.watchHistory.groupBy({
    by: ["movieId"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 10,
  });

  const movieViewMap = new Map(movieViews.map((v) => [v.movieId, v._count.id]));

  // Get book read counts
  const bookReads = await prisma.readingProgress.groupBy({
    by: ["bookId"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 10,
  });

  const bookReadMap = new Map(bookReads.map((r) => [r.bookId, r._count.id]));

  // Get download counts by movie
  const movieDownloads = await prisma.download.groupBy({
    by: ["movieId"],
    _count: { id: true },
    where: { movieId: { not: null } },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  // Get download counts by book
  const bookDownloads = await prisma.download.groupBy({
    by: ["bookId"],
    _count: { id: true },
    where: { bookId: { not: null } },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  // Recent activity
  const recentWatches = await prisma.watchHistory.findMany({
    take: 5,
    orderBy: { watchedAt: "desc" },
    include: { movie: { select: { title: true } }, user: { select: { firstName: true, lastName: true } } },
  });

  const recentReads = await prisma.readingProgress.findMany({
    take: 5,
    orderBy: { lastReadAt: "desc" },
    include: { book: { select: { title: true } }, user: { select: { firstName: true, lastName: true } } },
  });

  // Users per day (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const newUsersPerDay = await prisma.user.groupBy({
    by: ["createdAt"],
    _count: { id: true },
    where: { createdAt: { gte: sevenDaysAgo } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({
    counts: {
      movies: movieCount,
      books: bookCount,
      inganzo: inganzoCount,
      users: userCount,
      premiumUsers: premiumCount,
      totalViews: watchHistoryCount,
      totalReads: readingProgressCount,
      totalDownloads: downloadCount,
    },
    topContent: {
      movies: topMovies.map((m) => ({ ...m, views: movieViewMap.get(m.id) || 0 })),
    },
    downloads: {
      movies: movieDownloads,
      books: bookDownloads,
    },
    recentActivity: {
      watches: recentWatches,
      reads: recentReads,
    },
    growth: {
      newUsersPerDay: newUsersPerDay.map((d) => ({ date: d.createdAt, count: d._count.id })),
    },
  });
}
