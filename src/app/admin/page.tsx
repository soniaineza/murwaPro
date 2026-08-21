"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Film, BookOpen, Feather, Users, Eye, Crown, TrendingUp, Plus,
  BarChart3, Settings, Bell, LayoutDashboard
} from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
    ])
      .then(([s]) => { setStats(s); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Movies", value: stats?.movies || 0, icon: Film, color: "text-primary", href: "/admin/movies" },
    { label: "Books", value: stats?.books || 0, icon: BookOpen, color: "text-emerald-400", href: "/admin/books" },
    { label: "Inganzo", value: stats?.inganzo || 0, icon: Feather, color: "text-purple-400", href: "/admin/inganzo" },
    { label: "Users", value: stats?.users || 0, icon: Users, color: "text-blue-400", href: "/admin/users" },
    { label: "Premium Users", value: stats?.premiumUsers || 0, icon: Crown, color: "text-amber-400" },
    { label: "Total Views", value: stats?.totalViews || 0, icon: Eye, color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={28} className="text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted">Manage your MurwaPro content</p>
            </div>
          </div>
          <Link href="/" className="px-4 py-2 text-sm font-medium text-muted-light hover:text-foreground border border-border rounded-lg transition-colors">
            View Site
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            const content = (
              <div className="bg-surface border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-xs text-muted">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{loading ? "—" : stat.value}</p>
              </div>
            );
            return stat.href ? (
              <Link key={stat.label} href={stat.href}>{content}</Link>
            ) : (
              <div key={stat.label}>{content}</div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Content Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/admin/movies" className="flex items-center gap-4 p-5 bg-surface border border-border rounded-xl hover:border-primary/30 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Film size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">Movies</p>
                <p className="text-xs text-muted">Add, edit, delete movies</p>
              </div>
              <Plus size={16} className="text-muted" />
            </Link>

            <Link href="/admin/books" className="flex items-center gap-4 p-5 bg-surface border border-border rounded-xl hover:border-emerald-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <BookOpen size={24} className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-foreground group-hover:text-emerald-400 transition-colors">Books</p>
                <p className="text-xs text-muted">Add, edit, delete books</p>
              </div>
              <Plus size={16} className="text-muted" />
            </Link>

            <Link href="/admin/inganzo" className="flex items-center gap-4 p-5 bg-surface border border-border rounded-xl hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Feather size={24} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-foreground group-hover:text-purple-400 transition-colors">Inganzo</p>
                <p className="text-xs text-muted">Add, edit, delete literary works</p>
              </div>
              <Plus size={16} className="text-muted" />
            </Link>
          </div>
        </div>

        {/* Note */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <BarChart3 size={32} className="text-muted mx-auto mb-3" />
          <p className="text-sm text-muted-light">
            Full admin dashboard with CRUD operations. Content is managed through API routes connected to your Neon PostgreSQL database.
          </p>
        </div>
      </div>
    </div>
  );
}
