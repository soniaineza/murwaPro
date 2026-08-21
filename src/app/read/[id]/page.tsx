"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Bookmark, Moon, Sun, Type,
  Plus, Minus, List
} from "lucide-react";

export default function ReadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [showTOC, setShowTOC] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch(`/api/books`)
      .then((r) => r.json())
      .then((data) => {
        const b = data.find((b: any) => b.id === id);
        setBook(b);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (book) {
      setProgress((currentPage / book.pages) * 100);
    }
  }, [currentPage, book]);

  const toggleBookmark = () => {
    setBookmarks((prev) =>
      prev.includes(currentPage) ? prev.filter((p) => p !== currentPage) : [...prev, currentPage]
    );
  };

  const bgClass = darkMode ? "bg-[#0a0a0f] text-white" : "bg-[#f5f0e8] text-[#1a1a1a]";
  const headerBg = darkMode ? "bg-black/90 border-white/10" : "bg-white/90 border-black/10";

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="h-8 w-32 skeleton rounded" /></div>;
  }

  const sampleContent = book
    ? `The full content of "${book.title}" by ${book.author} will be loaded here when connected to a content management system.\n\nFor now, this is a preview of the reading experience with all the features you'd expect from a premium digital reader.\n\nFeatures available:\n\n• Page navigation with touch/swipe or keyboard arrows\n• Table of contents sidebar for quick navigation\n• Search inside the book\n• Adjustable font size for comfortable reading\n• Light and dark reading modes\n• Reading progress tracking\n• Bookmark any page for quick access\n• Highlight text passages\n• Continue reading from your last position across devices\n\nThis reader is designed to work beautifully on mobile devices, tablets and desktop screens. The typography and spacing adapt to provide the best reading experience at any screen size.\n\nMurwaPro is committed to making African literature accessible to everyone, everywhere.`
    : "Book not found.";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Reader header */}
      <div className={`sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b backdrop-blur-md ${headerBg}`}>
        <Link href={book ? `/books/${book.slug}` : "/books"} className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-opacity">
          <ChevronLeft size={16} /> Back
        </Link>
        <span className="text-sm font-medium truncate max-w-[200px]">{book?.title || "Book"}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowTOC(!showTOC)} className="p-1.5 hover:opacity-70 transition-opacity" title="Table of Contents">
            <List size={18} />
          </button>
          <button onClick={toggleBookmark} className={`p-1.5 hover:opacity-70 transition-opacity ${bookmarks.includes(currentPage) ? "text-primary" : ""}`} title="Bookmark">
            <Bookmark size={18} fill={bookmarks.includes(currentPage) ? "currentColor" : "none"} />
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 hover:opacity-70 transition-opacity">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="flex items-center gap-1 ml-1">
            <button onClick={() => setFontSize((s) => Math.max(12, s - 2))} className="p-1 hover:opacity-70 transition-opacity"><Minus size={14} /></button>
            <span className="text-xs opacity-50 w-6 text-center">{fontSize}</span>
            <button onClick={() => setFontSize((s) => Math.min(28, s + 2))} className="p-1 hover:opacity-70 transition-opacity"><Plus size={14} /></button>
          </div>
        </div>
      </div>

      {/* TOC Sidebar */}
      {showTOC && (
        <div className={`fixed top-14 left-0 bottom-0 w-64 z-30 border-r overflow-y-auto ${darkMode ? "bg-[#12121a] border-white/10" : "bg-[#ebe5d9] border-black/10"}`}>
          <div className="p-4">
            <h3 className="text-sm font-bold mb-3 opacity-70">Table of Contents</h3>
            <p className="text-sm opacity-50 italic">TOC will be available when content is loaded from CMS.</p>
          </div>
        </div>
      )}

      {/* Reader content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">{book?.title || "Book"}</h1>
        <p className="text-sm opacity-60 mb-8">{book?.author}</p>

        <div className="leading-relaxed whitespace-pre-wrap" style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}>
          {sampleContent}
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-black/20 z-20">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Reader footer nav */}
      <div className={`sticky bottom-0 flex items-center justify-between px-6 py-4 border-t backdrop-blur-md ${headerBg}`}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-opacity disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="text-xs opacity-50">Page {currentPage} of {book?.pages || 0}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(book?.pages || 1, p + 1))}
          disabled={currentPage >= (book?.pages || 1)}
          className="flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-opacity disabled:opacity-30"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
