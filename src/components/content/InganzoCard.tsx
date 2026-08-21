"use client";

import Link from "next/link";
import { Feather } from "lucide-react";
import { cn } from "@/lib/utils";
import { Inganzo } from "@/data/types";

interface InganzoCardProps {
  work: Inganzo;
  size?: "sm" | "md" | "lg";
}

const typeColors: Record<string, string> = {
  ibisigo: "bg-primary/20 text-primary",
  imivugo: "bg-accent/20 text-accent",
  poem: "bg-emerald-500/20 text-emerald-400",
  "short-story": "bg-blue-500/20 text-blue-400",
  literature: "bg-purple-500/20 text-purple-400",
  traditional: "bg-amber-500/20 text-amber-400",
  modern: "bg-teal-500/20 text-teal-400",
};

export function InganzoCard({ work, size = "md" }: InganzoCardProps) {
  const sizeClasses = {
    sm: "w-[180px] sm:w-[200px]",
    md: "w-[240px] sm:w-[280px]",
    lg: "w-[300px] sm:w-[360px]",
  };

  return (
    <Link
      href={`/inganzo/${work.slug}`}
      className={cn(
        "group relative shrink-0 flex flex-col rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300",
        sizeClasses[size]
      )}
    >
      {/* Decorative top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />

      <div className="p-4 flex flex-col flex-1">
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full",
              typeColors[work.type] || "bg-muted/20 text-muted"
            )}
          >
            {work.type}
          </span>
          <span className="text-[10px] text-muted">{work.language}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {work.title}
        </h3>

        {/* Author */}
        <p className="text-xs text-muted-light mb-3">{work.author}</p>

        {/* Excerpt */}
        <p className="text-sm text-muted leading-relaxed line-clamp-3 flex-1 italic">
          &ldquo;{work.excerpt}&rdquo;
        </p>

        {/* Read button */}
        <div className="mt-4 flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <Feather size={12} />
          <span className="font-medium">Read</span>
        </div>
      </div>
    </Link>
  );
}
