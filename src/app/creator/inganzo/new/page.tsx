"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Feather } from "lucide-react";

const TYPES = ["IBISIGO", "IMIVUGO", "POEM", "SHORT_STORY", "LITERATURE", "TRADITIONAL", "MODERN"];

export default function CreatorNewInganzoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", author: "", authorBio: "", type: "POEM",
    language: "Kinyarwanda", date: new Date().toISOString().split("T")[0],
    excerpt: "", content: "", access: "FREE", published: false,
  });

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
  const update = (f: string, v: any) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/inganzo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/creator/inganzo");
    else alert("Failed to publish");
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/creator/inganzo" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-purple-400 transition-colors mb-6"><ArrowLeft size={16} /> Back to My Inganzo</Link>
        <h1 className="text-2xl font-bold text-foreground mb-2">Publish New Inganzo</h1>
        <p className="text-sm text-muted mb-8">Share your poetry, stories, and literary works.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Title *</label><input type="text" required value={form.title} onChange={(e) => { update("title", e.target.value); update("slug", autoSlug(e.target.value)); }} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Author *</label><input type="text" required value={form.author} onChange={(e) => update("author", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Type *</label><select value={form.type} onChange={(e) => update("type", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground">{TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}</select></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Language *</label><input type="text" required value={form.language} onChange={(e) => update("language", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Date *</label><input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Excerpt *</label><textarea required rows={3} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="A short preview of your work..." className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground resize-none" /></div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Full Content *</label><textarea required rows={14} value={form.content} onChange={(e) => update("content", e.target.value)} placeholder="Write your full literary work here..." className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground resize-none font-serif leading-relaxed" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Access</label><select value={form.access} onChange={(e) => update("access", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground"><option value="FREE">Free</option><option value="PREMIUM">Premium</option></select></div>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-light cursor-pointer"><input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="rounded border-border" />Publish now</label>
          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={loading} className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">{loading ? <><Loader2 size={16} className="animate-spin" /> Publishing...</> : <><Feather size={16} /> Publish Work</>}</button>
            <Link href="/creator/inganzo" className="px-6 py-3 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
