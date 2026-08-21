"use client";

import { ContentCarousel } from "@/components/content/ContentCarousel";
import { ContinueWatchingCard } from "@/components/content/ContinueWatchingCard";
import { movies } from "@/data/movies";

export default function ContinueWatchingPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Continue Watching
        </h1>

        {/* Placeholder progress entries */}
        <div className="flex flex-wrap gap-4">
          {movies.slice(0, 4).map((movie, i) => (
            <ContinueWatchingCard
              key={movie.id}
              movie={movie}
              progress={[67, 34, 89, 12][i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
