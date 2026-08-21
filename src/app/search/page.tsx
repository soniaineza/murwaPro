"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { MovieCard } from "@/components/content/MovieCard";
import { BookCard } from "@/components/content/BookCard";
import { InganzoCard } from "@/components/content/InganzoCard";
import { SectionHeader } from "@/components/content/SectionHeader";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [inganzo, setInganzo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setBooks([]);
      setInganzo([]);
      return;
    }

    setLoading(true);
    const q = query.trim();
    Promise.all([
      fetch(`/api/movies?search=${encodeURIComponent(q)}`).then((r) => r.json()),
      fetch(`/api/books?search=${encodeURIComponent(q)}`).then((r) => r.json()),
      fetch(`/api/inganzo?search=${encodeURIComponent(q)}`).then((r) => r.json()),
    ])
      .then(([m, b, i]) => {
        setMovies(m.map((mv: any) => ({ ...mv, genres: mv.genres?.map((mg: any) => mg.genre.name) || [] })));
        setBooks(b);
        setInganzo(i);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  const hasResults = movies.length > 0 || books.length > 0 || inganzo.length > 0;

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Search</h1>
          <div className="relative">
            <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input type="text" placeholder="Search movies, books, authors, inganzo..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-xl text-base text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
        </div>

        {!query.trim() ? (
          <div className="text-center py-20"><p className="text-lg text-muted-light mb-2">Start typing to search</p><p className="text-sm text-muted">Search across movies, books, inganzo and more.</p></div>
        ) : loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (<div key={i}><div className="h-6 w-32 skeleton rounded mb-4" /><div className="flex gap-4">{[1, 2, 3].map((j) => (<div key={j} className="w-40 aspect-[2/3] skeleton rounded-lg" />))}</div></div>))}
          </div>
        ) : !hasResults ? (
          <div className="text-center py-20"><p className="text-lg text-muted-light mb-2">No results for &ldquo;{query}&rdquo;</p><p className="text-sm text-muted">Try different keywords or check your spelling.</p></div>
        ) : (
          <div className="space-y-10">
            {movies.length > 0 && (
              <div><SectionHeader title="Movies" /><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{movies.map((m) => (<MovieCard key={m.id} movie={m} />))}</div></div>
            )}
            {books.length > 0 && (
              <div><SectionHeader title="Books" /><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{books.map((b) => (<BookCard key={b.id} book={b} />))}</div></div>
            )}
            {inganzo.length > 0 && (
              <div><SectionHeader title="Inganzo" /><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{inganzo.map((w) => (<InganzoCard key={w.id} work={w} />))}</div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
