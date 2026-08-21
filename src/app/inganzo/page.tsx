"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { InganzoCard } from "@/components/content/InganzoCard";
import { GenreChip } from "@/components/content/GenreChip";
import { INGANZO_TYPES } from "@/lib/constants";

export default function InganzoPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/inganzo")
      .then((r) => r.json())
      .then((data) => { setWorks(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = works.filter((work) => {
    const matchesSearch =
      !searchQuery ||
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(work.type);
    return matchesSearch && matchesType;
  });

  const hasActiveFilters = searchQuery || selectedTypes.length > 0;

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Inganzo</h1>
          <p className="text-muted mt-2">Rwandan &amp; African literary works — ibisigo, imivugo, poems, short stories.</p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input type="text" placeholder="Search works, authors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {INGANZO_TYPES.map((type) => (
            <GenreChip key={type.value} label={type.label} active={selectedTypes.includes(type.value)} onClick={() => setSelectedTypes((prev) => prev.includes(type.value) ? prev.filter((t) => t !== type.value) : [...prev, type.value])} />
          ))}
          {hasActiveFilters && (
            <button onClick={() => { setSearchQuery(""); setSelectedTypes([]); }} className="flex items-center gap-1 px-3 py-1.5 text-xs text-accent border border-accent/30 rounded-full hover:bg-accent/10 transition-colors">
              <X size={10} /> Clear
            </button>
          )}
        </div>

        <p className="text-sm text-muted mb-4">{filtered.length} work{filtered.length !== 1 ? "s" : ""}</p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (<div key={i} className="rounded-xl skeleton h-64" />))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((work) => (<InganzoCard key={work.id} work={work} size="lg" />))}
          </div>
        ) : (
          <div className="text-center py-20"><p className="text-lg text-muted-light mb-2">No works found</p><p className="text-sm text-muted">Try adjusting your search or filters.</p></div>
        )}
      </div>
    </div>
  );
}
