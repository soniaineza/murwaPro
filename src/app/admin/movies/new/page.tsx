"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2, Plus, X } from "lucide-react";

export default function NewMoviePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "", slug: "", tagline: "", description: "", poster: "", backdrop: "",
    trailerUrl: "", videoUrl: "", year: 2026, duration: 120, rating: 0,
    language: "Kinyarwanda", country: "Rwanda", ageRating: "", director: "",
    creator: "", access: "FREE", featured: false, trending: false, isNew: false,
    isRwandan: true, isAfrican: true, freeToWatch: false, published: true,
  });
  const [cast, setCast] = useState<string[]>([]);
  const [castInput, setCastInput] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((r) => r.json())
      .then((data) => {
        // Extract unique genres from movies
        const genreSet = new Set<string>();
        data.forEach((m: any) => m.genres?.forEach((mg: any) => genreSet.add(mg.genre.name)));
        setGenres(Array.from(genreSet).sort());
      });
  }, []);

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");

  const update = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }));

  const addCast = () => {
    if (castInput.trim() && !cast.includes(castInput.trim())) {
      setCast([...cast, castInput.trim()]);
      setCastInput("");
    }
  };

  const removeCast = (name: string) => setCast(cast.filter((c) => c !== name));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cast, genreIds: selectedGenres }),
      });
      if (res.ok) {
        router.push("/admin/movies");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create movie");
      }
    } catch {
      alert("Failed to create movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/admin/movies" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors mb-6">
          <ChevronLeft size={16} /> Back to Movies
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-6">Add New Movie</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Title *</label>
              <input type="text" required value={form.title} onChange={(e) => { update("title", e.target.value); update("slug", autoSlug(e.target.value)); }} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Slug *</label>
              <input type="text" required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-light mb-1.5 block">Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => update("tagline", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-light mb-1.5 block">Description *</label>
            <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none" />
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Poster URL *</label>
              <input type="url" required value={form.poster} onChange={(e) => update("poster", e.target.value)} placeholder="https://..." className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
              {form.poster && <img src={form.poster} alt="Preview" className="mt-2 w-20 h-28 object-cover rounded" />}
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Backdrop URL *</label>
              <input type="url" required value={form.backdrop} onChange={(e) => update("backdrop", e.target.value)} placeholder="https://..." className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
              {form.backdrop && <img src={form.backdrop} alt="Preview" className="mt-2 w-full h-20 object-cover rounded" />}
            </div>
          </div>

          {/* Video URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Trailer URL</label>
              <input type="url" value={form.trailerUrl} onChange={(e) => update("trailerUrl", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Video URL</label>
              <input type="url" value={form.videoUrl} onChange={(e) => update("videoUrl", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          {/* Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Year *</label>
              <input type="number" required value={form.year} onChange={(e) => update("year", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Duration (min) *</label>
              <input type="number" required value={form.duration} onChange={(e) => update("duration", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Rating</label>
              <input type="number" step="0.1" min="0" max="10" value={form.rating} onChange={(e) => update("rating", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Age Rating</label>
              <input type="text" value={form.ageRating} onChange={(e) => update("ageRating", e.target.value)} placeholder="PG-13" className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          {/* Language & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Language *</label>
              <input type="text" required value={form.language} onChange={(e) => update("language", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Country *</label>
              <input type="text" required value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          {/* Director & Creator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Director</label>
              <input type="text" value={form.director} onChange={(e) => update("director", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Creator</label>
              <input type="text" value={form.creator} onChange={(e) => update("creator", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
            </div>
          </div>

          {/* Cast */}
          <div>
            <label className="text-sm font-medium text-muted-light mb-1.5 block">Cast</label>
            <div className="flex gap-2">
              <input type="text" value={castInput} onChange={(e) => setCastInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCast(); } }} placeholder="Add cast member..." className="flex-1 px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" />
              <button type="button" onClick={addCast} className="px-3 py-2.5 bg-surface-elevated border border-border rounded-lg text-sm text-muted-light hover:text-foreground transition-colors">
                <Plus size={16} />
              </button>
            </div>
            {cast.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {cast.map((name) => (
                  <span key={name} className="flex items-center gap-1 px-2 py-1 bg-surface-elevated border border-border rounded text-xs text-foreground">
                    {name}
                    <button type="button" onClick={() => removeCast(name)} className="text-muted hover:text-accent"><X size={10} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Access & Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">Access</label>
              <select value={form.access} onChange={(e) => update("access", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50">
                <option value="FREE">Free</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              ["featured", "Featured"],
              ["trending", "Trending"],
              ["isNew", "New"],
              ["isRwandan", "Rwandan"],
              ["isAfrican", "African"],
              ["freeToWatch", "Free to Watch"],
              ["published", "Published"],
            ].map(([field, label]) => (
              <label key={field} className="flex items-center gap-2 text-sm text-muted-light cursor-pointer">
                <input type="checkbox" checked={(form as any)[field]} onChange={(e) => update(field, e.target.checked)} className="rounded border-border" />
                {label}
              </label>
            ))}
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={loading} className="px-6 py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
              {loading ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : ("Create Movie")}
            </button>
            <Link href="/admin/movies" className="px-6 py-3 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
