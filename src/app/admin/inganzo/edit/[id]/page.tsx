"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

const TYPES = ["IBISIGO", "IMIVUGO", "POEM", "SHORT_STORY", "LITERATURE", "TRADITIONAL", "MODERN"];

export default function EditInganzoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch("/api/inganzo").then((r) => r.json()).then((works) => {
      const work = works.find((w: any) => w.id === id);
      if (work) {
        setForm({
          title: work.title, slug: work.slug, author: work.author, authorBio: work.authorBio || "",
          type: work.type, language: work.language, date: work.date?.split("T")[0] || "",
          excerpt: work.excerpt || "", content: work.content || "", access: work.access, published: work.published,
        });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const update = (f: string, v: any) => setForm((p: any) => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/admin/inganzo/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/admin/inganzo");
    else alert("Failed to update work");
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen pt-20 pb-12"><div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"><div className="space-y-4">{Array.from({length:6}).map((_,i)=><div key={i} className="h-12 skeleton rounded"/>)}</div></div></div>;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/admin/inganzo" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-purple-400 transition-colors mb-6"><ChevronLeft size={16} /> Back to Inganzo</Link>
        <h1 className="text-2xl font-bold text-foreground mb-6">Edit Inganzo</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Title *</label><input type="text" required value={form.title || ""} onChange={(e) => update("title", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Author *</label><input type="text" required value={form.author || ""} onChange={(e) => update("author", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Type *</label><select value={form.type || "POEM"} onChange={(e) => update("type", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground">{TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}</select></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Language *</label><input type="text" required value={form.language || ""} onChange={(e) => update("language", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground" /></div>
            <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Access</label><select value={form.access || "FREE"} onChange={(e) => update("access", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground"><option value="FREE">Free</option><option value="PREMIUM">Premium</option></select></div>
          </div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Excerpt *</label><textarea required rows={3} value={form.excerpt || ""} onChange={(e) => update("excerpt", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground resize-none" /></div>
          <div><label className="text-sm font-medium text-muted-light mb-1.5 block">Full Content *</label><textarea required rows={12} value={form.content || ""} onChange={(e) => update("content", e.target.value)} className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground resize-none font-serif leading-relaxed" /></div>
          <label className="flex items-center gap-2 text-sm text-muted-light cursor-pointer"><input type="checkbox" checked={form.published || false} onChange={(e) => update("published", e.target.checked)} className="rounded border-border" />Published</label>
          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">{saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : "Update Work"}</button>
            <Link href="/admin/inganzo" className="px-6 py-3 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
