"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Movie } from "@/data/types";

interface ContinueWatchingCardProps {
  movie: Movie;
  progress: number; // 0-100
}

export function ContinueWatchingCard({ movie, progress }: ContinueWatchingCardProps) {
  return (
    <Link
      href={`/watch/${movie.id}`}
      className="group relative shrink-0 w-[240px] sm:w-[280px] flex flex-col"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-card">
        <Image
          src={movie.backdrop}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 240px, 280px"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
              <Play size={16} fill="black" className="text-black ml-0.5" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
          <div
            className="h-full progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-muted mt-0.5">{progress}% watched</p>
      </div>
    </Link>
  );
}
