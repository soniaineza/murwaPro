"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Book } from "@/data/types";

interface BookCardProps {
  book: Book;
  size?: "sm" | "md" | "lg";
}

export function BookCard({ book, size = "md" }: BookCardProps) {
  const sizeClasses = {
    sm: "w-[130px] sm:w-[150px]",
    md: "w-[150px] sm:w-[180px]",
    lg: "w-[180px] sm:w-[220px]",
  };

  return (
    <Link
      href={`/books/${book.slug}`}
      className={cn(
        "group relative shrink-0 flex flex-col",
        sizeClasses[size]
      )}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card shadow-lg shadow-black/20">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 130px, (max-width: 768px) 180px, 220px"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
              <BookOpen size={20} className="text-black" />
            </div>
          </div>
        </div>

        {/* Premium badge */}
        {book.access === "premium" && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-[10px] font-bold tracking-wider text-black rounded">
            PREMIUM
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
          <Star size={10} className="text-primary fill-primary" />
          <span className="text-foreground font-medium">{book.rating}</span>
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted mt-0.5 truncate">{book.author}</p>
        <p className="text-xs text-muted">{book.year} &middot; {book.genre}</p>
      </div>
    </Link>
  );
}
