import { prisma } from "@/lib/prisma";
import { HeroBanner } from "@/components/content/HeroBanner";
import { MovieCard } from "@/components/content/MovieCard";
import { BookCard } from "@/components/content/BookCard";
import { InganzoCard } from "@/components/content/InganzoCard";
import { ContinueWatchingCard } from "@/components/content/ContinueWatchingCard";
import { ContentCarousel } from "@/components/content/ContentCarousel";

export const dynamic = 'force-dynamic'; // Always render on the server

async function getData() {
  const [featuredMovies, trendingMovies, newReleases, rwandanMovies, freeMovies, premiumMovies, books, inganzo] = await Promise.all([
    prisma.movie.findMany({ where: { featured: true }, include: { genres: { include: { genre: true } } }, orderBy: { rating: "desc" } }),
    prisma.movie.findMany({ where: { trending: true }, include: { genres: { include: { genre: true } } }, orderBy: { rating: "desc" } }),
    prisma.movie.findMany({ where: { isNew: true }, include: { genres: { include: { genre: true } } }, orderBy: { year: "desc" } }),
    prisma.movie.findMany({ where: { isRwandan: true }, include: { genres: { include: { genre: true } } }, orderBy: { rating: "desc" } }),
    prisma.movie.findMany({ where: { freeToWatch: true }, include: { genres: { include: { genre: true } } }, orderBy: { rating: "desc" }, take: 8 }),
    prisma.movie.findMany({ where: { access: "PREMIUM" }, include: { genres: { include: { genre: true } } }, orderBy: { rating: "desc" } }),
    prisma.book.findMany({ orderBy: { rating: "desc" }, take: 8 }),
    prisma.inganzo.findMany({ orderBy: { date: "desc" }, take: 8 }),
  ]);

  return { featuredMovies, trendingMovies, newReleases, rwandanMovies, freeMovies, premiumMovies, books, inganzo };
}

function mapMovie(m: any) {
  return {
    ...m,
    genres: m.genres?.map((mg: any) => mg.genre.name) || [],
  };
}

export default async function HomePage() {
  const data = await getData();
  const heroMovie = data.featuredMovies[0] ? mapMovie(data.featuredMovies[0]) : null;

  return (
    <div>
      {/* Hero Section */}
      {heroMovie && <HeroBanner content={heroMovie} />}

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-10 space-y-8">
        {/* Continue Watching placeholder */}
        <ContentCarousel title="Continue Watching" viewAllHref="/continue-watching">
          <div className="flex gap-4">
            {data.trendingMovies.slice(0, 3).map((m, i) => (
              <ContinueWatchingCard
                key={m.id}
                movie={mapMovie(m)}
                progress={[67, 34, 89][i]}
              />
            ))}
          </div>
        </ContentCarousel>

        {/* Trending Now */}
        <ContentCarousel title="Trending Now" viewAllHref="/movies">
          {data.trendingMovies.map((m) => (
            <MovieCard key={m.id} movie={mapMovie(m)} />
          ))}
        </ContentCarousel>

        {/* Popular Movies */}
        <ContentCarousel title="Popular Movies" viewAllHref="/movies">
          {data.freeMovies.map((m) => (
            <MovieCard key={m.id} movie={mapMovie(m)} />
          ))}
        </ContentCarousel>

        {/* New Releases */}
        <ContentCarousel title="New Releases" viewAllHref="/movies">
          {data.newReleases.map((m) => (
            <MovieCard key={m.id} movie={mapMovie(m)} />
          ))}
        </ContentCarousel>

        {/* Rwandan Cinema */}
        <ContentCarousel title="Rwandan Cinema" subtitle="Stories from the heart of Africa" viewAllHref="/movies">
          {data.rwandanMovies.map((m) => (
            <MovieCard key={m.id} movie={mapMovie(m)} size="lg" />
          ))}
        </ContentCarousel>

        {/* Featured Books */}
        <ContentCarousel title="Featured Books" viewAllHref="/books">
          {data.books.map((b) => (
            <BookCard key={b.id} book={b as any} />
          ))}
        </ContentCarousel>

        {/* Inganzo */}
        <ContentCarousel title="Inganzo" subtitle="Rwandan & African literary works" viewAllHref="/inganzo">
          {data.inganzo.map((w) => (
            <InganzoCard key={w.id} work={w as any} />
          ))}
        </ContentCarousel>

        {/* Premium Content */}
        <ContentCarousel title="Premium" subtitle="Exclusive content" viewAllHref="/premium">
          {data.premiumMovies.map((m) => (
            <MovieCard key={m.id} movie={mapMovie(m)} size="lg" />
          ))}
        </ContentCarousel>
      </div>
    </div>
  );
}
