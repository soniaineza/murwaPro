import { prisma } from "@/lib/prisma";
import { HeroBanner } from "@/components/content/HeroBanner";
import { ParticleBackground } from "@/components/content/ParticleBackground";
import { HomePageContent } from "@/components/content/HomePageContent";

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  const data = await getData();
  const heroMovie = data.featuredMovies[0]
    ? { ...data.featuredMovies[0], genres: data.featuredMovies[0].genres?.map((mg: any) => mg.genre.name) || [] }
    : null;

  return (
    <div className="relative">
      {/* Three.js Particle Background */}
      <ParticleBackground />

      {/* Hero Section */}
      {heroMovie && <HeroBanner content={heroMovie} />}

      {/* Content Sections */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-10">
        <HomePageContent
          featuredMovies={data.featuredMovies}
          trendingMovies={data.trendingMovies}
          newReleases={data.newReleases}
          rwandanMovies={data.rwandanMovies}
          freeMovies={data.freeMovies}
          premiumMovies={data.premiumMovies}
          books={data.books}
          inganzo={data.inganzo}
        />
      </div>
    </div>
  );
}
