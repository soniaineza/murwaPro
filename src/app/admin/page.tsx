"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Film, BookOpen, Feather, Users, Eye, Crown, TrendingUp,
  BarChart3, Activity, Clock, ArrowUpRight, Download, Star
} from "lucide-react";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/stats")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const counts = data?.counts || {};

  const statCards = [
    { label: "Total Movies", value: counts.movies || 0, icon: Film, color: "text-primary" },
    { label: "Total Books", value: counts.books || 0, icon: BookOpen, color: "text-emerald-400" },
    { label: "Inganzo", value: counts.inganzo || 0, icon: Feather, color: "text-purple-400" },
    { label: "Total Users", value: counts.users || 0, icon: Users, color: "text-blue-400" },
    { label: "Premium Users", value: counts.premiumUsers || 0, icon: Crown, color: "text-amber-400" },
    { label: "Total Views", value: counts.totalViews || 0, icon: Eye, color: "text-blue-400" },
    { label: "Total Reads", value: counts.totalReads || 0, icon: BookOpen, color: "text-emerald-400" },
    { label: "Downloads", value: counts.totalDownloads || 0, icon: Download, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 size={28} className="text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-sm text-muted">Real-time MurwaPro performance</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Clock size={14} />
            Live data
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-xs text-muted">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{loading ? "—" : stat.value.toLocaleString()}</p>
              </div>
            );
          })}
        </div>

        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Top Rated Movies</h2>
            {loading ? (
              <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 skeleton rounded" />)}</div>
            ) : (
              <div className="space-y-3">
                {data?.topContent?.movies?.slice(0, 8).map((movie: any, i: number) => (
                  <Link key={movie.id} href={`/movies/${movie.slug}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-elevated transition-colors">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{i + 1}</div>
                    <div className="w-8 h-11 rounded overflow-hidden bg-card shrink-0">{movie.poster && <img src={movie.poster} alt="" className="w-full h-full object-cover" />}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{movie.title}</p>
                      <p className="text-xs text-muted">Rating: {movie.rating}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Star size={10} className="text-primary fill-primary" />
                      {movie.rating}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
            {loading ? (
              <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 skeleton rounded" />)}</div>
            ) : (
              <div className="space-y-3">
                {data?.recentActivity?.watches?.slice(0, 5).map((w: any) => (
                  <div key={w.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-elevated transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Eye size={14} className="text-primary" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{w.user?.firstName} {w.user?.lastName} watched {w.movie?.title}</p>
                      <p className="text-xs text-muted">{new Date(w.watchedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {data?.recentActivity?.reads?.slice(0, 5).map((r: any) => (
                  <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-elevated transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center"><BookOpen size={14} className="text-emerald-400" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{r.user?.firstName} {r.user?.lastName} read {r.book?.title}</p>
                      <p className="text-xs text-muted">{new Date(r.lastReadAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {(!data?.recentActivity?.watches?.length && !data?.recentActivity?.reads?.length) && (
                  <p className="text-sm text-muted text-center py-4">No activity yet</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reports */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Reports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-primary" /><h3 className="text-sm font-medium text-foreground">Content Report</h3></div>
              <p className="text-xs text-muted mb-3">{counts.movies} movies, {counts.books} books, {counts.inganzo} inganzo</p>
            </div>
            <div className="p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-center gap-2 mb-2"><Activity size={16} className="text-emerald-400" /><h3 className="text-sm font-medium text-foreground">Engagement Report</h3></div>
              <p className="text-xs text-muted mb-3">{counts.totalViews} views, {counts.totalReads} reads, {counts.totalDownloads} downloads</p>
            </div>
            <div className="p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-center gap-2 mb-2"><Crown size={16} className="text-amber-400" /><h3 className="text-sm font-medium text-foreground">User Report</h3></div>
              <p className="text-xs text-muted mb-3">{counts.users} total users, {counts.premiumUsers} premium</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-surface border border-border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-light">All systems operational — Live data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
