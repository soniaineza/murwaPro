"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Trash2, Film, BookOpen, ChevronLeft, Wifi, WifiOff } from "lucide-react";

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo downloads - in production, fetch from /api/downloads?userId=xxx
    setLoading(false);
  }, []);

  const handleRemove = (id: string) => {
    if (!confirm("Remove this download?")) return;
    setDownloads((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors mb-6">
          <ChevronLeft size={16} /> Back to Profile
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Downloads</h1>
            <p className="text-muted mt-1">Your offline library</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <Wifi size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">Online</span>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 skeleton rounded-lg" />)}</div>
        ) : downloads.length === 0 ? (
          <div className="text-center py-20">
            <Download size={48} className="text-muted mx-auto mb-4" />
            <p className="text-lg text-muted-light mb-2">No downloads yet</p>
            <p className="text-sm text-muted mb-6">Download movies and books to watch or read offline.</p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/movies" className="px-4 py-2 bg-primary hover:bg-primary-hover text-black font-medium rounded-lg text-sm transition-colors">
                Browse Movies
              </Link>
              <Link href="/books" className="px-4 py-2 border border-border text-foreground font-medium rounded-lg text-sm hover:bg-surface transition-colors">
                Browse Books
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {downloads.map((dl) => (
              <div key={dl.id} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg">
                <div className="w-10 h-14 rounded overflow-hidden bg-card shrink-0">
                  {dl.movie?.poster || dl.book?.cover ? (
                    <img src={dl.movie?.poster || dl.book?.cover} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {dl.movie ? <Film size={16} className="text-primary" /> : <BookOpen size={16} className="text-emerald-400" />}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">{dl.movie?.title || dl.book?.title}</h3>
                  <p className="text-xs text-muted mt-0.5">
                    {dl.quality && `${dl.quality} • `}
                    {dl.movie ? "Movie" : "Book"} • Downloaded
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={dl.movie ? `/watch/${dl.movie.id}` : `/read/${dl.book?.id}`} className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-black text-xs font-medium rounded-lg transition-colors">
                    {dl.movie ? "Play" : "Read"}
                  </Link>
                  <button onClick={() => handleRemove(dl.id)} className="p-2 text-muted hover:text-accent rounded-md hover:bg-accent/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Data Saver info */}
        <div className="mt-12 p-6 bg-surface border border-border rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <WifiOff size={20} className="text-primary" />
            <h2 className="text-base font-bold text-foreground">Data Saver Mode</h2>
          </div>
          <p className="text-sm text-muted-light mb-4">
            When enabled, videos stream at lower quality to save data. Downloaded content plays at full quality regardless of this setting.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Auto", "360p", "480p", "720p", "1080p"].map((q) => (
              <button key={q} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${q === "Auto" ? "bg-primary text-black border-primary" : "bg-transparent text-muted-light border-border hover:border-primary/50"}`}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
