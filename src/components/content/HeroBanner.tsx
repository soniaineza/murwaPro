"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Star } from "lucide-react";
import { useTranslation } from "@/i18n/TranslationProvider";

interface HeroBannerProps {
  content: any;
}

export function HeroBanner({ content }: HeroBannerProps) {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px]">
      <Image src={content.backdrop} alt={content.title} fill className="object-cover" priority sizes="100vw" />
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-16">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 text-glow">
            {content.title}
          </h1>

          {content.tagline && (
            <p className="text-base sm:text-lg text-white/80 mb-4 max-w-lg italic">{content.tagline}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mb-4">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-primary font-semibold">{content.rating}</span>
            </span>
            <span>&middot;</span>
            <span>{content.year}</span>
            <span>&middot;</span>
            <span>{Math.floor(content.duration / 60)}h {content.duration % 60}m</span>
            <span>&middot;</span>
            <span>{content.language}</span>
            {content.access === "PREMIUM" && (
              <>
                <span>&middot;</span>
                <span className="px-1.5 py-0.5 bg-primary text-[10px] font-bold text-black rounded">PREMIUM</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {content.genres?.map((genre: string) => (
              <span key={genre} className="px-2.5 py-1 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                {genre}
              </span>
            ))}
          </div>

          <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-3 max-w-lg">{content.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/watch/${content.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-all hover:scale-105 glow-primary">
              <Play size={18} fill="black" />
              {t("movies.watchNow")}
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition-all hover:scale-105 border border-white/10">
              <Plus size={18} />
              {t("movies.addToMyList")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
