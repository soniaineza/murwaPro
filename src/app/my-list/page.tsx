"use client";

import { useState } from "react";
import { MovieCard } from "@/components/content/MovieCard";
import { BookCard } from "@/components/content/BookCard";
import { InganzoCard } from "@/components/content/InganzoCard";
import { cn } from "@/lib/utils";

type Tab = "movies" | "books" | "inganzo";

export default function MyListPage() {
  const [activeTab, setActiveTab] = useState<Tab>("movies");

  const tabs: { value: Tab; label: string }[] = [
    { value: "movies", label: "Movies" },
    { value: "books", label: "Books" },
    { value: "inganzo", label: "Inganzo" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          My List
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-surface rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                activeTab === tab.value
                  ? "bg-primary text-black"
                  : "text-muted-light hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div className="text-center py-20">
          <p className="text-lg text-muted-light mb-2">Your list is empty</p>
          <p className="text-sm text-muted">
            Start adding movies, books and inganzo to see them here.
          </p>
        </div>
      </div>
    </div>
  );
}
