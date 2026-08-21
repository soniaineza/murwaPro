"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, X, Upload, Film, Image, Video } from "lucide-react";

export default function CreatorNewMoviePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", tagline: "", description: "", poster: "", backdrop: "",
    trailerUrl: "", videoUrl: "", year: 2026, duration: 120, rating: 0,
    language: "Kinyarwanda", country: "Rwanda", ageRating: "", director: "",
    creator: "", access: "FREE", featured: false, trending: false, isNew: true,
    isRwandan: true, isAfrican: true, freeToWatch: false, published: false,
  });
  const [cast, setCast] = useState<string[]>([]);
  const [castInput, setCastInput] = useState("");

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
  const update = (f: string, v: any) => setForm((p) => ({ ...p, [f]: v }));
  const addCast = () => { if (castInput.trim()) { setCast([...cast, castInput.trim()]); setCastInput(""); } };
  const removeCast = (name: string) => setCast(cast.filter((c) => c !== name));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/movies", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, cast }),
    });
    if (res.ok) router.push("/creator/movies");
    else alert("Failed to upload movie");
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/creator/movies" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors mb-6">
          <ArrowLeft size={16} /> Back to My Movies
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-2">Upload New Movie</h1>
        <p className="text-sm text-muted mb-8">Share your film with MurwaPro audiences.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Upload Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <Image size={32} className="text-muted mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">Poster Image</p>
              <p className="text-xs text-muted mb-3">Upload or paste URL</p>
              <input type="url" value={form.poster} onChange={(e) => update("poster", e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary/50" />
              {form.poster && <img src={form.poster} alt="Poster preview" className="mt-3 w-20 h-28 object-cover rounded mx-auto" />}
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <Image size={32} className="text-muted mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">Backdrop Image</p>
              <p className="text-xs text-muted mb-3">16:9 widescreen</p>
              <input type="url" value={form.backdrop} onChange={(e) => update("backdrop", e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary/50" />
              {form.backdrop && <img src={form.backdrop} alt="Backdrop preview" className="mt-3 w-full h-16 object-cover rounded" />}
            </div>
          </div>

          {/* Video Upload */}
          <div className="border-2 border-dashed border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <Video size={24} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Video Files</p>
                <p className="text-xs text-muted">Paste URLs to your movie, trailer, and other video files</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-light mb-1 block">Trailer URL</label>
                <input type="url" value={form.trailerUrl} onChange={(e) => update("trailerUrl", e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-light mb-1 block">Full Movie URL *</label>
                <input type="url" required value={form.videoUrl} onChange={(e) => update("videoUrl", e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-primary/50" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Title *</label><input type="text" required value={form.title} onChange={(e) => { update("title", e.target.value); update("slug", autoSlug(e.target.value)); }} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Tagline</label><input type="text" value={form.tagline} onChange={(e) => update("tagline", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50" /></div>
          </div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Description *</label><textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50 resize-none" /></div>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Year *</label><input type="number" required value={form.year} onChange={(e) => update("year", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Duration (min) *</label><input type="number" required value={form.duration} onChange={(e) => update("duration", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Language *</label><input type="text" required value={form.language} onChange={(e) => update("language", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Country *</label><input type="text" required value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Director</label><input type="text" value={form.director} onChange={(e) => update("director", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Age Rating</label><input type="text" value={form.ageRating} onChange={(e) => update("ageRating", e.target.value)} placeholder="PG-13" className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Access</label><select value={form.access} onChange={(e) => update("access", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground"><option value="FREE">Free</option><option value="PREMIUM">Premium</option></select></div>
          </div>

          {/* Cast */}
          <div>
            <label className="text-sm font-medium text-muted-light mb-1.5 block">Cast</label>
            <div className="flex gap-2"><input type="text" value={castInput} onChange={(e) => setCastInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCast(); } }} placeholder="Type name and press Enter..." className="flex-1 px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /><button type="button" onClick={addCast} className="px-3 py-2.5 bg-surface-elevated border border-border rounded-lg text-sm text-muted-light hover:text-foreground"><Plus size={16} /></button></div>
            {cast.length > 0 && <div className="flex flex-wrap gap-2 mt-2">{cast.map((n) => <span key={n} className="flex items-center gap-1 px-2 py-1 bg-surface-elevated border border-border rounded text-xs text-foreground">{n}<button type="button" onClick={() => removeCast(n)} className="text-muted hover:text-accent"><X size={10} /></button></span>)}</div>}
          </div>

          {/* Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[["isRwandan", "Rwandan content"], ["isAfrican", "African content"], ["published", "Publish now"]].map(([f, l]) => (
              <label key={f} className="flex items-center gap-2 text-sm text-muted-light cursor-pointer"><input type="checkbox" checked={(form as any)[f]} onChange={(e) => update(f, e.target.checked)} className="rounded border-border" />{l}</label>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={loading} className="px-6 py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">{loading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Upload Movie</>}</button>
            <Link href="/creator/movies" className="px-6 py-3 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
