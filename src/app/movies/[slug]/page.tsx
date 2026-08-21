"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Download, Star, ChevronLeft } from "lucide-react";
import { ContentCarousel } from "@/components/content/ContentCarousel";
import { MovieCard } from "@/components/content/MovieCard";

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [movie, setMovie] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/movies/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
        // Fetch related by genre
        if (data.genres?.length > 0) {
          const genreName = data.genres[0]?.genre?.name;
          if (genreName) {
            fetch(`/api/movies?genre=${genreName}`)
              .then((r) => r.json())
              .then((movies) => {
                setRelated(
                  movies
                    .filter((m: any) => m.id !== data.id)
                    .slice(0, 6)
                    .map((m: any) => ({
                      ...m,
                      genres: m.genres?.map((mg: any) => mg.genre.name) || [],
                    }))
                );
              });
          }
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="aspect-[21/9] rounded-xl skeleton mb-8" />
          <div className="h-8 w-64 skeleton rounded mb-4" />
          <div className="h-4 w-96 skeleton rounded" />
        </div>
      </div>
    );
  }

  if (!movie || movie.error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-light mb-4">Movie not found</p>
          <Link href="/movies" className="text-primary hover:underline">Back to Movies</Link>
        </div>
      </div>
    );
  }

  const mappedMovie = {
    ...movie,
    genres: movie.genres?.map((mg: any) => mg.genre.name) || [],
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      {/* Backdrop */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] max-h-[700px]">
        <Image src={movie.backdrop} alt={movie.title} fill className="object-cover" priority sizes="100vw" />
        <div className="hero-gradient absolute inset-0" />
        <Link href="/movies" className="absolute top-20 left-4 sm:left-8 z-10 flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
          <ChevronLeft size={16} /> Back to Movies
        </Link>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-32 relative z-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          <div className="shrink-0 hidden sm:block">
            <div className="relative w-[200px] lg:w-[260px] aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
              <Image src={movie.poster} alt={movie.title} fill className="object-cover" sizes="260px" />
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-4 sm:pt-12">
            <div className="sm:hidden mb-4">
              <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
                <Image src={movie.poster} alt={movie.title} fill className="object-cover" sizes="128px" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-base text-muted-light italic mb-4">{movie.tagline}</p>}

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-light mb-4">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-primary fill-primary" />
                <span className="text-primary font-semibold">{movie.rating}</span>
              </span>
              <span>&middot;</span>
              <span>{movie.year}</span>
              <span>&middot;</span>
              <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
              <span>&middot;</span>
              <span>{movie.language}</span>
              <span>&middot;</span>
              <span>{movie.country}</span>
              {movie.ageRating && (<><span>&middot;</span><span className="px-1.5 py-0.5 border border-border rounded text-xs">{movie.ageRating}</span></>)}
              {movie.access === "PREMIUM" && (<><span>&middot;</span><span className="px-1.5 py-0.5 bg-primary text-[10px] font-bold text-black rounded">PREMIUM</span></>)}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {mappedMovie.genres.map((genre: string) => (
                <span key={genre} className="px-3 py-1 text-xs font-medium text-muted-light bg-surface border border-border rounded-full">{genre}</span>
              ))}
            </div>

            <p className="text-sm sm:text-base text-muted-light leading-relaxed mb-6">{movie.description}</p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link href={`/watch/${movie.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors">
                <Play size={18} fill="black" />
                {movie.access === "PREMIUM" ? "Watch Premium" : "Watch Now"}
              </Link>
              <button className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:bg-surface-elevated border border-border text-foreground font-medium rounded-lg transition-colors">
                <Plus size={16} /> Add to My List
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:bg-surface-elevated border border-border text-foreground font-medium rounded-lg transition-colors">
                <Download size={16} /> Download
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-8">
              {movie.director && (<div><span className="text-muted">Director</span><p className="text-foreground font-medium">{movie.director}</p></div>)}
              {movie.cast?.length > 0 && (<div><span className="text-muted">Cast</span><p className="text-foreground font-medium">{movie.cast.join(", ")}</p></div>)}
              {movie.creator && (<div><span className="text-muted">Creator</span><p className="text-foreground font-medium">{movie.creator}</p></div>)}
              <div><span className="text-muted">Language</span><p className="text-foreground font-medium">{movie.language}</p></div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <ContentCarousel title="You May Also Like" viewAllHref="/movies">
              {related.map((m) => (<MovieCard key={m.id} movie={m} />))}
            </ContentCarousel>
          </div>
        )}
      </div>
    </div>
  );
}
