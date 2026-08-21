"use client";

import { useTranslation } from "@/i18n/TranslationProvider";
import { MovieCard } from "./MovieCard";
import { BookCard } from "./BookCard";
import { InganzoCard } from "./InganzoCard";
import { ContinueWatchingCard } from "./ContinueWatchingCard";
import { ContentCarousel } from "./ContentCarousel";

interface HomePageContentProps {
  featuredMovies: any[];
  trendingMovies: any[];
  newReleases: any[];
  rwandanMovies: any[];
  freeMovies: any[];
  premiumMovies: any[];
  books: any[];
  inganzo: any[];
}

function mapMovie(m: any) {
  return { ...m, genres: m.genres?.map((mg: any) => mg.genre?.name || mg) || [] };
}

export function HomePageContent({
  trendingMovies, newReleases, rwandanMovies,
  freeMovies, premiumMovies, books, inganzo,
}: HomePageContentProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Continue Watching */}
      <ContentCarousel title={t("home.continueWatching")} viewAllHref="/continue-watching">
        <div className="flex gap-4">
          {trendingMovies.slice(0, 3).map((m, i) => (
            <ContinueWatchingCard key={m.id} movie={mapMovie(m)} progress={[67, 34, 89][i]} />
          ))}
        </div>
      </ContentCarousel>

      {/* Trending Now */}
      <ContentCarousel title={t("home.trending")} viewAllHref="/movies">
        {trendingMovies.map((m) => <MovieCard key={m.id} movie={mapMovie(m)} />)}
      </ContentCarousel>

      {/* Popular Movies */}
      <ContentCarousel title={t("home.popularMovies")} viewAllHref="/movies">
        {freeMovies.map((m) => <MovieCard key={m.id} movie={mapMovie(m)} />)}
      </ContentCarousel>

      {/* New Releases */}
      <ContentCarousel title={t("home.newReleases")} viewAllHref="/movies">
        {newReleases.map((m) => <MovieCard key={m.id} movie={mapMovie(m)} />)}
      </ContentCarousel>

      {/* Rwandan Cinema */}
      <ContentCarousel title={t("home.rwandanCinema")} subtitle={t("home.rwandanCinemaSub")} viewAllHref="/movies">
        {rwandanMovies.map((m) => <MovieCard key={m.id} movie={mapMovie(m)} size="lg" />)}
      </ContentCarousel>

      {/* Featured Books */}
      <ContentCarousel title={t("home.featuredBooks")} viewAllHref="/books">
        {books.map((b) => <BookCard key={b.id} book={b} />)}
      </ContentCarousel>

      {/* Inganzo */}
      <ContentCarousel title={t("home.inganzo")} subtitle={t("home.inganzoSub")} viewAllHref="/inganzo">
        {inganzo.map((w) => <InganzoCard key={w.id} work={w} />)}
      </ContentCarousel>

      {/* Premium */}
      <ContentCarousel title={t("home.premium")} subtitle={t("home.premiumSub")} viewAllHref="/premium">
        {premiumMovies.map((m) => <MovieCard key={m.id} movie={mapMovie(m)} size="lg" />)}
      </ContentCarousel>
    </>
  );
}
