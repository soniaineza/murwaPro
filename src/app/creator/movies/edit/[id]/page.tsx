"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, X, Save } from "lucide-react";

export default function CreatorEditMoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});
  const [cast, setCast] = useState<string[]>([]);
  const [castInput, setCastInput] = useState("");

  useEffect(() => {
    fetch("/api/movies").then((r) => r.json()).then((movies) => {
      const m = movies.find((mv: any) => mv.id === id);
      if (m) { setForm({ title: m.title, slug: m.slug, tagline: m.tagline || "", description: m.description, poster: m.poster, backdrop: m.backdrop, trailerUrl: m.trailerUrl || "", videoUrl: m.videoUrl || "", year: m.year, duration: m.duration, rating: m.rating, language: m.language, country: m.country, ageRating: m.ageRating || "", director: m.director || "", creator: m.creator || "", access: m.access, featured: m.featured, trending: m.trending, isNew: m.isNew, isRwandan: m.isRwandan, isAfrican: m.isAfrican, freeToWatch: m.freeToWatch, published: m.published }); setCast(m.cast || []); }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const update = (f: string, v: any) => setForm((p: any) => ({ ...p, [f]: v }));
  const addCast = () => { if (castInput.trim()) { setCast([...cast, castInput.trim()]); setCastInput(""); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/movies/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, cast }) });
    if (res.ok) router.push("/creator/movies");
    else alert("Failed to update");
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen pt-20 pb-12"><div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"><div className="space-y-4">{Array.from({length:6}).map((_,i)=><div key={i} className="h-12 skeleton rounded"/>)}</div></div></div>;

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/creator/movies" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors mb-6"><ArrowLeft size={16} /> Back to My Movies</Link>
        <h1 className="text-2xl font-bold text-foreground mb-6">Edit Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Title *</label><input type="text" required value={form.title || ""} onChange={(e) => update("title", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Tagline</label><input type="text" value={form.tagline || ""} onChange={(e) => update("tagline", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Description *</label><textarea required rows={4} value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground resize-none" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Poster URL *</label><input type="url" required value={form.poster || ""} onChange={(e) => update("poster", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" />{form.poster && <img src={form.poster} alt="" className="mt-2 w-20 h-28 object-cover rounded" />}</div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Backdrop URL *</label><input type="url" required value={form.backdrop || ""} onChange={(e) => update("backdrop", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Trailer URL</label><input type="url" value={form.trailerUrl || ""} onChange={(e) => update("trailerUrl", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Video URL</label><input type="url" value={form.videoUrl || ""} onChange={(e) => update("videoUrl", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Year *</label><input type="number" required value={form.year || 2026} onChange={(e) => update("year", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Duration (min) *</label><input type="number" required value={form.duration || 120} onChange={(e) => update("duration", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Language *</label><input type="text" required value={form.language || ""} onChange={(e) => update("language", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Access</label><select value={form.access || "FREE"} onChange={(e) => update("access", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground"><option value="FREE">Free</option><option value="PREMIUM">Premium</option></select></div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-light mb-1.5 block">Cast</label>
            <div className="flex gap-2"><input type="text" value={castInput} onChange={(e) => setCastInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCast(); } }} placeholder="Add cast member..." className="flex-1 px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /><button type="button" onClick={addCast} className="px-3 py-2.5 bg-surface-elevated border border-border rounded-lg text-sm text-muted-light hover:text-foreground"><Plus size={16} /></button></div>
            {cast.length > 0 && <div className="flex flex-wrap gap-2 mt-2">{cast.map((n) => <span key={n} className="flex items-center gap-1 px-2 py-1 bg-surface-elevated border border-border rounded text-xs text-foreground">{n}<button type="button" onClick={() => setCast(cast.filter((c) => c !== n))} className="text-muted hover:text-accent"><X size={10} /></button></span>)}</div>}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[["isRwandan","Rwandan"],["isAfrican","African"],["published","Published"]].map(([f,l]) => <label key={f} className="flex items-center gap-2 text-sm text-muted-light cursor-pointer"><input type="checkbox" checked={form[f] || false} onChange={(e) => update(f, e.target.checked)} className="rounded border-border" />{l}</label>)}
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">{saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}</button>
            <Link href="/creator/movies" className="px-6 py-3 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
