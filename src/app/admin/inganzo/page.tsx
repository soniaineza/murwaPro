"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Feather } from "lucide-react";

export default function AdminInganzoPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/inganzo").then((r) => r.json()).then((d) => { setWorks(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    await fetch(`/api/admin/inganzo/${id}`, { method: "DELETE" });
    setWorks((prev) => prev.filter((w) => w.id !== id));
    setDeleting(null);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3"><Feather size={24} className="text-purple-400" /><div><h1 className="text-2xl font-bold text-foreground">Inganzo</h1><p className="text-sm text-muted">{works.length} total</p></div></div>
          <Link href="/admin/inganzo/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors text-sm"><Plus size={16} /> Add Work</Link>
        </div>
        {loading ? <div className="space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="h-20 skeleton rounded-lg"/>)}</div>
        : works.length === 0 ? <div className="text-center py-20"><Feather size={48} className="text-muted mx-auto mb-4"/><p className="text-lg text-muted-light">No works yet</p><Link href="/admin/inganzo/new" className="text-purple-400 hover:underline mt-2 inline-block">Add your first work</Link></div>
        : <div className="space-y-2">{works.map((work) => (
          <div key={work.id} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-purple-500/20 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-foreground truncate">{work.title}</h3>
                <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-[9px] font-bold rounded">{work.type}</span>
              </div>
              <p className="text-xs text-muted mt-0.5">{work.author} &middot; {work.language}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Link href={`/inganzo/${work.slug}`} target="_blank" className="p-2 text-muted hover:text-foreground rounded-md hover:bg-surface-elevated transition-colors"><Eye size={14}/></Link>
              <Link href={`/admin/inganzo/edit/${work.id}`} className="p-2 text-muted hover:text-purple-400 rounded-md hover:bg-purple-500/10 transition-colors"><Pencil size={14}/></Link>
              <button onClick={() => handleDelete(work.id, work.title)} disabled={deleting===work.id} className="p-2 text-muted hover:text-accent rounded-md hover:bg-accent/10 transition-colors disabled:opacity-50"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}</div>}
      </div>
    </div>
  );
}
