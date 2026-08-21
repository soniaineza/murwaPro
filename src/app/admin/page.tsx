"use client";

import {
  Users,
  Film,
  BookOpen,
  Feather,
  Eye,
  Download,
  Crown,
  TrendingUp,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "0", icon: Users, color: "text-blue-400" },
  { label: "Movies", value: "0", icon: Film, color: "text-primary" },
  { label: "Books", value: "0", icon: BookOpen, color: "text-emerald-400" },
  { label: "Inganzo", value: "0", icon: Feather, color: "text-purple-400" },
  { label: "Premium Users", value: "0", icon: Crown, color: "text-primary" },
  { label: "Total Views", value: "0", icon: Eye, color: "text-blue-400" },
  { label: "Total Reads", value: "0", icon: BookOpen, color: "text-emerald-400" },
  { label: "Downloads", value: "0", icon: Download, color: "text-accent" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted mt-1">
              Manage your content and users.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-surface border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-xs text-muted">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:bg-surface-elevated transition-colors text-left">
              <Film size={20} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Add Movie</p>
                <p className="text-xs text-muted">Upload and publish a new movie</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:bg-surface-elevated transition-colors text-left">
              <BookOpen size={20} className="text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-foreground">Add Book</p>
                <p className="text-xs text-muted">Upload and publish a new book</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:bg-surface-elevated transition-colors text-left">
              <Feather size={20} className="text-purple-400" />
              <div>
                <p className="text-sm font-medium text-foreground">Add Inganzo</p>
                <p className="text-xs text-muted">Publish a new literary work</p>
              </div>
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <TrendingUp size={32} className="text-muted mx-auto mb-3" />
          <p className="text-sm text-muted-light">
            This is a placeholder dashboard. When connected to Payload CMS, this
            will show real analytics and content management tools.
          </p>
        </div>
      </div>
    </div>
  );
}
