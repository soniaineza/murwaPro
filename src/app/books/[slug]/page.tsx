"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Plus, Download, Star, ChevronLeft, User } from "lucide-react";
import { ContentCarousel } from "@/components/content/ContentCarousel";
import { BookCard } from "@/components/content/BookCard";

export default function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [book, setBook] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/books/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
        if (data.genre) {
          fetch(`/api/books?genre=${data.genre}`)
            .then((r) => r.json())
            .then((books) => setRelated(books.filter((b: any) => b.id !== data.id).slice(0, 6)));
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex gap-8"><div className="w-64 aspect-[2/3] skeleton rounded-lg" /><div className="flex-1 space-y-4"><div className="h-8 w-64 skeleton rounded" /><div className="h-4 w-32 skeleton rounded" /><div className="h-20 w-full skeleton rounded" /></div></div>
        </div>
      </div>
    );
  }

  if (!book || book.error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center"><p className="text-lg text-muted-light mb-4">Book not found</p><Link href="/books" className="text-primary hover:underline">Back to Books</Link></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link href="/books" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors mb-8">
          <ChevronLeft size={16} /> Back to Books
        </Link>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="shrink-0">
            <div className="relative w-48 sm:w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-black/50 mx-auto sm:mx-0">
              <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="(max-width: 640px) 192px, 256px" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{book.title}</h1>
            <p className="text-base text-primary mb-4">{book.author}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-light mb-4">
              <span className="flex items-center gap-1"><Star size={14} className="text-primary fill-primary" /><span className="text-primary font-semibold">{book.rating}</span></span>
              <span>&middot;</span><span>{book.year}</span><span>&middot;</span><span>{book.pages} pages</span><span>&middot;</span><span>{book.language}</span><span>&middot;</span><span>{book.genre}</span>
              {book.access === "PREMIUM" && (<><span>&middot;</span><span className="px-1.5 py-0.5 bg-primary text-[10px] font-bold text-black rounded">PREMIUM</span></>)}
            </div>
            <p className="text-sm sm:text-base text-muted-light leading-relaxed mb-6">{book.description}</p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link href={`/read/${book.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors">
                <BookOpen size={18} /> Read Now
              </Link>
              <button className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:bg-surface-elevated border border-border text-foreground font-medium rounded-lg transition-colors">
                <Plus size={16} /> Add to Library
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 bg-surface hover:bg-surface-elevated border border-border text-foreground font-medium rounded-lg transition-colors">
                <Download size={16} /> Download
              </button>
            </div>
            {book.authorBio && (
              <div className="p-4 bg-surface border border-border rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center"><User size={18} className="text-muted-light" /></div>
                  <div><p className="text-sm font-medium text-foreground">{book.author}</p><p className="text-xs text-muted">Author</p></div>
                </div>
                <p className="text-sm text-muted-light leading-relaxed">{book.authorBio}</p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <ContentCarousel title="You May Also Like" viewAllHref="/books">
              {related.map((b) => (<BookCard key={b.id} book={b} />))}
            </ContentCarousel>
          </div>
        )}
      </div>
    </div>
  );
}
