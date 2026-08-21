"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch("/api/books").then((r) => r.json()).then((books) => {
      const book = books.find((b: any) => b.id === id);
      if (book) setForm({ title: book.title, slug: book.slug, author: book.author, authorBio: book.authorBio || "", cover: book.cover, description: book.description, genre: book.genre, language: book.language, year: book.year, pages: book.pages, rating: book.rating, access: book.access, featured: book.featured, isNew: book.isNew, isRwandan: book.isRwandan, isAfrican: book.isAfrican, published: book.published });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const update = (f: string, v: any) => setForm((p: any) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/books/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/admin/books");
    else alert("Failed to update book");
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen pt-20 pb-12"><div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"><div className="space-y-4">{Array.from({length:6}).map((_,i)=><div key={i} className="h-12 skeleton rounded" />)}</div></div></div>;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/admin/books" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-emerald-400 transition-colors mb-6"><ChevronLeft size={16} /> Back to Books</Link>
        <h1 className="text-2xl font-bold text-foreground mb-6">Edit Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Title *</label><input type="text" required value={form.title || ""} onChange={(e) => update("title", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Author *</label><input type="text" required value={form.author || ""} onChange={(e) => update("author", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Description *</label><textarea required rows={4} value={form.description || ""} onChange={(e) => update("description", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground resize-none" /></div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Cover URL *</label><input type="url" required value={form.cover || ""} onChange={(e) => update("cover", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" />{form.cover && <img src={form.cover} alt="" className="mt-2 w-20 h-28 object-cover rounded" />}</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Year *</label><input type="number" required value={form.year || 2026} onChange={(e) => update("year", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Pages *</label><input type="number" required value={form.pages || 200} onChange={(e) => update("pages", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Rating</label><input type="number" step="0.1" min="0" max="5" value={form.rating || 0} onChange={(e) => update("rating", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Access</label><select value={form.access || "FREE"} onChange={(e) => update("access", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground"><option value="FREE">Free</option><option value="PREMIUM">Premium</option></select></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[["featured","Featured"],["isNew","New"],["isRwandan","Rwandan"],["isAfrican","African"],["published","Published"]].map(([f,l]) => (
              <label key={f} className="flex items-center gap-2 text-sm text-muted-light cursor-pointer"><input type="checkbox" checked={form[f] || false} onChange={(e) => update(f, e.target.checked)} className="rounded border-border" />{l}</label>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">{saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : "Update Book"}</button>
            <Link href="/admin/books" className="px-6 py-3 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
