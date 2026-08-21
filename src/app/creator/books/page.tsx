"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Star, BookOpen, ArrowLeft } from "lucide-react";

export default function CreatorBooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books").then((r) => r.json()).then((d) => { setBooks(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/admin/books/${id}`, { method: "DELETE" });
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link href="/creator" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-emerald-400 transition-colors mb-6"><ArrowLeft size={16} /> Back to Creator Studio</Link>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3"><BookOpen size={24} className="text-emerald-400" /><div><h1 className="text-2xl font-bold text-foreground">My Books</h1><p className="text-sm text-muted">{books.length} uploaded</p></div></div>
          <Link href="/creator/books/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors text-sm"><Plus size={16} /> Upload Book</Link>
        </div>
        {loading ? <div className="space-y-3">{Array.from({length:3}).map((_,i)=><div key={i} className="h-20 skeleton rounded-lg"/>)}</div>
        : books.length === 0 ? <div className="text-center py-20"><BookOpen size={48} className="text-muted mx-auto mb-4"/><p className="text-lg text-muted-light mb-2">No books yet</p><Link href="/creator/books/new" className="text-emerald-400 hover:underline">Upload your first book</Link></div>
        : <div className="space-y-2">{books.map((book) => (
          <div key={book.id} className="flex items-center gap-4 p-4 bg-surface border border-border rounded-lg hover:border-emerald-500/20 transition-colors">
            <div className="w-10 h-14 rounded overflow-hidden bg-card shrink-0">{book.cover && <img src={book.cover} alt="" className="w-full h-full object-cover" />}</div>
            <div className="flex-1 min-w-0"><h3 className="text-sm font-medium text-foreground truncate">{book.title}</h3><p className="text-xs text-muted mt-0.5">{book.author} &middot; {book.year} &middot; <Star size={10} className="inline text-primary"/> {book.rating}</p></div>
            <div className="flex items-center gap-1 shrink-0">
              <Link href={`/books/${book.slug}`} target="_blank" className="p-2 text-muted hover:text-foreground rounded-md hover:bg-surface-elevated transition-colors"><Eye size={14}/></Link>
              <Link href={`/creator/books/edit/${book.id}`} className="p-2 text-muted hover:text-emerald-400 rounded-md hover:bg-emerald-500/10 transition-colors"><Pencil size={14}/></Link>
              <button onClick={() => handleDelete(book.id, book.title)} className="p-2 text-muted hover:text-accent rounded-md hover:bg-accent/10 transition-colors"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}</div>}
      </div>
    </div>
  );
}
