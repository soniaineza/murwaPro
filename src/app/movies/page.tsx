"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { MovieCard } from "@/components/content/MovieCard";
import { GenreChip } from "@/components/content/GenreChip";
import { cn } from "@/lib/utils";
import { GENRES } from "@/lib/constants";

type SortOption = "newest" | "popular" | "rating";

interface DbMovie {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  duration: number;
  language: string;
  country: string;
  rating: number;
  access: string;
  featured: boolean;
  trending: boolean;
  isNew: boolean;
  isRwandan: boolean;
  isAfrican: boolean;
  freeToWatch: boolean;
  genres: { genre: { name: string } }[];
}

function mapMovie(m: DbMovie) {
  return {
    ...m,
    genres: m.genres?.map((mg) => mg.genre.name) || [],
  };
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedAccess, setSelectedAccess] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/movies")
      .then((r) => r.json())
      .then((data) => {
        setMovies(data.map(mapMovie));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const years = [...new Set(movies.map((m) => m.year))].sort((a, b) => b - a);
  const languages = [...new Set(movies.map((m) => m.language))].sort();

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some((g: string) =>
        g.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((g) => movie.genres.includes(g));
    const matchesYear = !selectedYear || movie.year === Number(selectedYear);
    const matchesLanguage =
      !selectedLanguage || movie.language === selectedLanguage;
    const matchesAccess =
      !selectedAccess ||
      (selectedAccess === "free" && movie.freeToWatch) ||
      (selectedAccess === "premium" && movie.access === "PREMIUM");

    return matchesSearch && matchesGenre && matchesYear && matchesLanguage && matchesAccess;
  });

  const sorted = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.year - a.year;
      case "popular":
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedYear("");
    setSelectedLanguage("");
    setSelectedAccess("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchQuery || selectedGenres.length > 0 || selectedYear || selectedLanguage || selectedAccess;

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Movies</h1>
          <p className="text-muted mt-2">Discover stories worth watching.</p>
        </div>

        {/* Search & Filter Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-2.5 rounded-lg border transition-colors",
              showFilters ? "bg-primary/10 border-primary/50 text-primary" : "bg-surface border-border text-muted-light hover:text-foreground"
            )}
          >
            <SlidersHorizontal size={18} />
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-surface border border-border rounded-xl p-4 mb-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-light mb-2 block">Genres</label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <GenreChip
                    key={genre}
                    label={genre}
                    active={selectedGenres.includes(genre)}
                    onClick={() =>
                      setSelectedGenres((prev) =>
                        prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-light mb-2 block">Year</label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50">
                  <option value="">All Years</option>
                  {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-light mb-2 block">Language</label>
                <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="w-full px-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50">
                  <option value="">All Languages</option>
                  {languages.map((l) => (<option key={l} value={l}>{l}</option>))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-light mb-2 block">Access</label>
                <select value={selectedAccess} onChange={(e) => setSelectedAccess(e.target.value)} className="w-full px-3 py-2 bg-surface-elevated border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50">
                  <option value="">All</option>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors">
                <X size={12} />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-[2/3] rounded-lg skeleton" />
                <div className="mt-2 h-4 w-3/4 skeleton rounded" />
                <div className="mt-1 h-3 w-1/2 skeleton rounded" />
              </div>
            ))}
          </div>
        ) : sorted.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sorted.map((movie) => (
              <MovieCard key={movie.id} movie={movie} size="md" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-light mb-2">No movies found</p>
            <p className="text-sm text-muted">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
