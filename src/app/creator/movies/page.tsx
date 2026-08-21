"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Star, Film, ArrowLeft } from "lucide-react";

export default function CreatorMoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/movies").then((r) => r.json()).then((d) => { setMovies(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/movies/${id}`, { method: "DELETE" });
    setMovies((prev) => prev.filter((m) => m.id !== id));
    setDeleting(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link href="/creator" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Creator Studio
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Film size={24} className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Movies</h1>
              <p className="text-sm text-muted">{movies.length} uploaded</p>
            </div>
          </div>
          <Link href="/creator/movies/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors text-sm">
            <Plus size={16} /> Upload Movie
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 skeleton rounded-lg" />)}</div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <Film size={48} className="text-muted mx-auto mb-4" />
            <p className="text-lg text-muted-light mb-2">No movies uploaded yet</p>
            <p className="text-sm text-muted mb-6">Start sharing your films with the world.</p>
            <Link href="/creator/movies/new" className="px-4 py-2 bg-primary hover:bg-primary-hover text-black font-medium rounded-lg text-sm transition-colors">
              Upload Your First Movie
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {movies.map((movie) => (
              <div key={movie.id} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-primary/20 transition-colors">
                <div className="w-10 h-14 rounded overflow-hidden bg-card shrink-0">
                  {movie.poster && <img src={movie.poster} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground truncate">{movie.title}</h3>
                    {movie.access === "PREMIUM" && <span className="px-1.5 py-0.5 bg-primary text-[9px] font-bold text-black rounded">PREMIUM</span>}
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {movie.year} &middot; {movie.language} &middot; {movie.duration}min &middot; <Star size={10} className="inline text-primary" /> {movie.rating}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/movies/${movie.slug}`} target="_blank" className="p-2 text-muted hover:text-foreground rounded-md hover:bg-surface-elevated transition-colors" title="View"><Eye size={14} /></Link>
                  <Link href={`/creator/movies/edit/${movie.id}`} className="p-2 text-muted hover:text-primary rounded-md hover:bg-primary/10 transition-colors" title="Edit"><Pencil size={14} /></Link>
                  <button onClick={() => handleDelete(movie.id, movie.title)} disabled={deleting === movie.id} className="p-2 text-muted hover:text-accent rounded-md hover:bg-accent/10 transition-colors disabled:opacity-50" title="Delete"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
