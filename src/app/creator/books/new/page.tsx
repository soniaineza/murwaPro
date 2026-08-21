"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Upload } from "lucide-react";

export default function CreatorNewBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", author: "", authorBio: "", cover: "", description: "",
    genre: "Fiction", language: "English", year: 2026, pages: 200, rating: 0,
    access: "FREE", featured: false, isNew: true, isRwandan: false, isAfrican: true, published: false,
  });

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
  const update = (f: string, v: any) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/books", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/creator/books");
    else alert("Failed to upload book");
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/creator/books" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-emerald-400 transition-colors mb-6"><ArrowLeft size={16} /> Back to My Books</Link>
        <h1 className="text-2xl font-bold text-foreground mb-2">Upload New Book</h1>
        <p className="text-sm text-muted mb-8">Share your literary work with readers.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-emerald-500/50 transition-colors">
            <p className="text-sm font-medium text-foreground mb-1">Book Cover</p>
            <input type="url" value={form.cover} onChange={(e) => update("cover", e.target.value)} placeholder="Paste cover image URL..." className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs text-foreground" />
            {form.cover && <img src={form.cover} alt="" className="mt-3 w-20 h-28 object-cover rounded mx-auto" />}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Title *</label><input type="text" required value={form.title} onChange={(e) => { update("title", e.target.value); update("slug", autoSlug(e.target.value)); }} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Author *</label><input type="text" required value={form.author} onChange={(e) => update("author", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Description *</label><textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground resize-none" /></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Genre *</label><input type="text" required value={form.genre} onChange={(e) => update("genre", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Language *</label><input type="text" required value={form.language} onChange={(e) => update("language", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Year *</label><input type="number" required value={form.year} onChange={(e) => update("year", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Pages *</label><input type="number" required value={form.pages} onChange={(e) => update("pages", Number(e.target.value))} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Access</label><select value={form.access} onChange={(e) => update("access", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground"><option value="FREE">Free</option><option value="PREMIUM">Premium</option></select></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[["isRwandan","Rwandan"],["isAfrican","African"],["published","Publish now"]].map(([f,l]) => <label key={f} className="flex items-center gap-2 text-sm text-muted-light cursor-pointer"><input type="checkbox" checked={(form as any)[f]} onChange={(e) => update(f, e.target.checked)} className="rounded border-border" />{l}</label>)}
          </div>
          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={loading} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">{loading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Upload Book</>}</button>
            <Link href="/creator/books" className="px-6 py-3 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
