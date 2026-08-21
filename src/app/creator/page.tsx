"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Film, BookOpen, Feather, Plus, TrendingUp, Eye, Upload } from "lucide-react";

export default function CreatorDashboard() {
  const [stats, setStats] = useState({ movies: 0, books: 0, inganzo: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/movies").then((r) => r.json()),
      fetch("/api/books").then((r) => r.json()),
      fetch("/api/inganzo").then((r) => r.json()),
    ]).then(([movies, books, inganzo]) => {
      setStats({ movies: movies.length, books: books.length, inganzo: inganzo.length });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const contentTypes = [
    {
      title: "Movies & Series",
      description: "Upload films, trailers, and video content",
      icon: Film,
      color: "text-primary",
      bg: "bg-primary/10",
      href: "/creator/movies",
      count: stats.movies,
    },
    {
      title: "Books",
      description: "Upload ebooks, PDFs, and literary works",
      icon: BookOpen,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      href: "/creator/books",
      count: stats.books,
    },
    {
      title: "Inganzo",
      description: "Publish poems, ibisigo, short stories",
      icon: Feather,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      href: "/creator/inganzo",
      count: stats.inganzo,
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Upload size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Creator Studio</h1>
            <p className="text-muted mt-1">Upload and manage your content on MurwaPro</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {contentTypes.map((ct) => {
            const Icon = ct.icon;
            return (
              <Link key={ct.title} href={ct.href} className="bg-surface border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={ct.color} />
                  <span className="text-xs text-muted">{ct.title}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{loading ? "—" : ct.count}</p>
              </Link>
            );
          })}
        </div>

        {/* Quick Upload */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Upload</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contentTypes.map((ct) => {
              const Icon = ct.icon;
              return (
                <Link key={ct.title} href={`${ct.href}/new`} className="flex items-center gap-4 p-5 bg-surface border border-border rounded-xl hover:border-primary/30 transition-colors group">
                  <div className={`w-12 h-12 rounded-lg ${ct.bg} flex items-center justify-center`}>
                    <Icon size={24} className={ct.color} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{ct.title}</p>
                    <p className="text-xs text-muted">{ct.description}</p>
                  </div>
                  <Plus size={16} className="text-muted" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold mb-2">1</div>
              <h3 className="text-sm font-medium text-foreground mb-1">Upload Your Content</h3>
              <p className="text-xs text-muted">Add movies, books, or inganzo with titles, descriptions, and media files.</p>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold mb-2">2</div>
              <h3 className="text-sm font-medium text-foreground mb-1">Set Access Level</h3>
              <p className="text-xs text-muted">Choose if your content is free for everyone or premium for subscribers.</p>
            </div>
            <div>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold mb-2">3</div>
              <h3 className="text-sm font-medium text-foreground mb-1">Publish & Reach Audience</h3>
              <p className="text-xs text-muted">Your content goes live on MurwaPro for audiences across Africa and beyond.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
