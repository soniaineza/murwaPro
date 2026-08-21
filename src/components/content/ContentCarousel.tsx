"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentCarouselProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  viewAllHref?: string;
}

export function ContentCarousel({ title, subtitle, children, className, viewAllHref }: ContentCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <section className={cn("py-6", className)}>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {viewAllHref && (
            <a href={viewAllHref} className="text-xs text-primary hover:text-primary-hover font-medium transition-colors">View All</a>
          )}
          <button onClick={() => scroll("left")} className="p-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary-dim text-muted-light hover:text-primary transition-all" aria-label="Scroll left">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scroll("right")} className="p-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary-dim text-muted-light hover:text-primary transition-all" aria-label="Scroll right">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
        {children}
      </div>
    </section>
  );
}
