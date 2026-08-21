"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Feather, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewSection } from "@/components/content/ReviewSection";

const typeColors: Record<string, string> = {
  IBISIGO: "bg-primary/20 text-primary",
  IMIVUGO: "bg-accent/20 text-accent",
  POEM: "bg-emerald-500/20 text-emerald-400",
  SHORT_STORY: "bg-blue-500/20 text-blue-400",
  LITERATURE: "bg-purple-500/20 text-purple-400",
  TRADITIONAL: "bg-amber-500/20 text-amber-400",
  MODERN: "bg-teal-500/20 text-teal-400",
};

const typeLabels: Record<string, string> = {
  IBISIGO: "Ibisigo",
  IMIVUGO: "Imivugo",
  POEM: "Poem",
  SHORT_STORY: "Short Story",
  LITERATURE: "Literature",
  TRADITIONAL: "Traditional",
  MODERN: "Modern",
};

export default function InganzoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/inganzo/${slug}`)
      .then((r) => r.json())
      .then((data) => { setWork(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="h-6 w-32 skeleton rounded mb-8" />
          <div className="h-10 w-64 skeleton rounded mb-4" />
          <div className="h-40 w-full skeleton rounded" />
        </div>
      </div>
    );
  }

  if (!work || work.error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center"><p className="text-lg text-muted-light mb-4">Work not found</p><Link href="/inganzo" className="text-primary hover:underline">Back to Inganzo</Link></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/inganzo" className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors mb-8">
          <ChevronLeft size={16} /> Back to Inganzo
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={cn("px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full", typeColors[work.type] || "bg-muted/20 text-muted")}>
              {typeLabels[work.type] || work.type}
            </span>
            <span className="text-xs text-muted">{work.language}</span>
            <span className="text-xs text-muted">{new Date(work.date).toLocaleDateString()}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">{work.title}</h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center"><User size={18} className="text-muted-light" /></div>
            <div><p className="text-sm font-medium text-foreground">{work.author}</p></div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border" /><Feather size={16} className="text-primary" /><div className="flex-1 h-px bg-border" />
        </div>

        <article>
          <div className="whitespace-pre-wrap text-base sm:text-lg text-foreground/90 leading-relaxed font-serif">
            {work.content}
          </div>
        </article>

        <div className="flex items-center gap-4 mt-12">
          <div className="flex-1 h-px bg-border" /><Feather size={16} className="text-primary" /><div className="flex-1 h-px bg-border" />
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">Save to Library</button>
          <button className="px-4 py-2 text-sm font-medium text-muted-light border border-border rounded-lg hover:bg-surface transition-colors">Share</button>
        </div>

        <ReviewSection inganzoId={work.id} />
      </div>
    </div>
  );
}
