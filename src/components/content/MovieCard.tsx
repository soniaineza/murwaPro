"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Movie } from "@/data/types";

interface MovieCardProps {
  movie: Movie;
  size?: "sm" | "md" | "lg";
}

export function MovieCard({ movie, size = "md" }: MovieCardProps) {
  const sizeClasses = {
    sm: "w-[140px] sm:w-[160px]",
    md: "w-[160px] sm:w-[200px]",
    lg: "w-[200px] sm:w-[260px]",
  };

  return (
    <Link
      href={`/movies/${movie.slug}`}
      className={cn(
        "group relative shrink-0 flex flex-col",
        sizeClasses[size]
      )}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 140px, (max-width: 768px) 200px, 260px"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
              <Play size={20} fill="black" className="text-black ml-0.5" />
            </div>
          </div>
        </div>

        {/* Premium badge */}
        {movie.access === "premium" && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-[10px] font-bold tracking-wider text-black rounded">
            PREMIUM
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
          <Star size={10} className="text-primary fill-primary" />
          <span className="text-foreground font-medium">{movie.rating}</span>
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-muted mt-0.5">
          {movie.year} &middot; {movie.genres[0]}
        </p>
      </div>
    </Link>
  );
}
