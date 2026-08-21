"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { BookCard } from "@/components/content/BookCard";
import { ContentCarousel } from "@/components/content/ContentCarousel";
import { GenreChip } from "@/components/content/GenreChip";

const BOOK_GENRES = ["Fiction", "Poetry", "Science Fiction", "Romance", "Literary Fiction", "Folklore", "Short Stories"];

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAccess, setSelectedAccess] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "rating">("newest");

  useEffect(() => {
    fetch("/api/books")
      .then((r) => r.json())
      .then((data) => { setBooks(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    const matchesAccess =
      !selectedAccess ||
      (selectedAccess === "free" && book.access === "FREE") ||
      (selectedAccess === "premium" && book.access === "PREMIUM");
    return matchesSearch && matchesGenre && matchesAccess;
  });

  const sorted = [...filteredBooks].sort((a, b) =>
    sortBy === "newest" ? b.year - a.year : b.rating - a.rating
  );

  const hasActiveFilters = searchQuery || selectedGenres.length > 0 || selectedAccess;

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Books</h1>
          <p className="text-muted mt-2">Discover stories worth reading.</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input type="text" placeholder="Search books or authors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "newest" | "rating")} className="px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50">
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {BOOK_GENRES.map((genre) => (
            <GenreChip key={genre} label={genre} active={selectedGenres.includes(genre)} onClick={() => setSelectedGenres((prev) => prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre])} />
          ))}
          <GenreChip label="Free" active={selectedAccess === "free"} onClick={() => setSelectedAccess((p) => (p === "free" ? "" : "free"))} />
          <GenreChip label="Premium" active={selectedAccess === "premium"} onClick={() => setSelectedAccess((p) => (p === "premium" ? "" : "premium"))} />
          {hasActiveFilters && (
            <button onClick={() => { setSearchQuery(""); setSelectedGenres([]); setSelectedAccess(""); }} className="flex items-center gap-1 px-3 py-1.5 text-xs text-accent border border-accent/30 rounded-full hover:bg-accent/10 transition-colors">
              <X size={10} /> Clear
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (<div key={i}><div className="aspect-[2/3] rounded-lg skeleton" /><div className="mt-2 h-4 w-3/4 skeleton rounded" /></div>))}
          </div>
        ) : hasActiveFilters ? (
          <div>
            <p className="text-sm text-muted mb-4">{sorted.length} book{sorted.length !== 1 ? "s" : ""} found</p>
            {sorted.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sorted.map((book) => (<BookCard key={book.id} book={book} />))}
              </div>
            ) : (
              <div className="text-center py-20"><p className="text-lg text-muted-light mb-2">No books found</p><p className="text-sm text-muted">Try adjusting your filters.</p></div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <ContentCarousel title="Featured Books" viewAllHref="/books">
              {books.filter((b) => b.featured).map((book) => (<BookCard key={book.id} book={book} size="lg" />))}
            </ContentCarousel>
            <ContentCarousel title="New Books" viewAllHref="/books">
              {books.filter((b) => b.isNew).map((book) => (<BookCard key={book.id} book={book} />))}
            </ContentCarousel>
            <ContentCarousel title="Popular Books" viewAllHref="/books">
              {books.sort((a, b) => b.rating - a.rating).slice(0, 6).map((book) => (<BookCard key={book.id} book={book} />))}
            </ContentCarousel>
            <ContentCarousel title="Rwandan Authors" subtitle="Stories from Rwanda" viewAllHref="/books">
              {books.filter((b) => b.isRwandan).map((book) => (<BookCard key={book.id} book={book} size="lg" />))}
            </ContentCarousel>
            <ContentCarousel title="African Literature" viewAllHref="/books">
              {books.filter((b) => b.isAfrican).map((book) => (<BookCard key={book.id} book={book} />))}
            </ContentCarousel>
          </div>
        )}
      </div>
    </div>
  );
}
