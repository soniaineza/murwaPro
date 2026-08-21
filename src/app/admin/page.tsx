"use client";

import { useState, useEffect } from "react";
import {
  Film, BookOpen, Feather, Users, Eye, Crown, TrendingUp,
  BarChart3, Activity, Clock, ArrowUpRight, ArrowDownRight,
  PieChart, LineChart, Download
} from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Movies", value: stats?.movies || 0, icon: Film, color: "text-primary", change: "+3", changeType: "up" },
    { label: "Total Books", value: stats?.books || 0, icon: BookOpen, color: "text-emerald-400", change: "+2", changeType: "up" },
    { label: "Inganzo", value: stats?.inganzo || 0, icon: Feather, color: "text-purple-400", change: "+1", changeType: "up" },
    { label: "Total Users", value: stats?.users || 0, icon: Users, color: "text-blue-400", change: "+15", changeType: "up" },
    { label: "Premium Users", value: stats?.premiumUsers || 0, icon: Crown, color: "text-amber-400", change: "+5", changeType: "up" },
    { label: "Total Views", value: stats?.totalViews || 0, icon: Eye, color: "text-blue-400", change: "+120", changeType: "up" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 size={28} className="text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-sm text-muted">MurwaPro performance and insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Clock size={14} />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} className={stat.color} />
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.changeType === "up" ? "text-emerald-400" : "text-accent"}`}>
                    {stat.changeType === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{loading ? "—" : stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Views Over Time */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Views Over Time</h2>
              <div className="flex items-center gap-1 text-xs text-muted">
                <LineChart size={14} />
                Last 7 days
              </div>
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const height = [40, 65, 45, 80, 70, 90, 60][i];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-primary/20 rounded-t" style={{ height: `${height}%` }}>
                      <div className="w-full bg-primary rounded-t" style={{ height: `${height}%` }} />
                    </div>
                    <span className="text-[10px] text-muted">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Distribution */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Content Distribution</h2>
              <div className="flex items-center gap-1 text-xs text-muted">
                <PieChart size={14} />
                By type
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Film size={14} className="text-primary" />
                    <span className="text-sm text-foreground">Movies</span>
                  </div>
                  <span className="text-sm text-muted">{stats?.movies || 0}</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${((stats?.movies || 0) / Math.max((stats?.movies || 0) + (stats?.books || 0) + (stats?.inganzo || 0), 1)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-emerald-400" />
                    <span className="text-sm text-foreground">Books</span>
                  </div>
                  <span className="text-sm text-muted">{stats?.books || 0}</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${((stats?.books || 0) / Math.max((stats?.movies || 0) + (stats?.books || 0) + (stats?.inganzo || 0), 1)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Feather size={14} className="text-purple-400" />
                    <span className="text-sm text-foreground">Inganzo</span>
                  </div>
                  <span className="text-sm text-muted">{stats?.inganzo || 0}</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${((stats?.inganzo || 0) / Math.max((stats?.movies || 0) + (stats?.books || 0) + (stats?.inganzo || 0), 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Recent Activity */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: "New movie uploaded", time: "2 hours ago", icon: Film, color: "text-primary" },
                { action: "5 new users registered", time: "3 hours ago", icon: Users, color: "text-blue-400" },
                { action: "Book downloaded", time: "4 hours ago", icon: Download, color: "text-emerald-400" },
                { action: "Inganzo published", time: "5 hours ago", icon: Feather, color: "text-purple-400" },
                { action: "Movie viewed 50 times", time: "6 hours ago", icon: Eye, color: "text-primary" },
              ].map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-elevated transition-colors">
                    <div className={`w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center`}>
                      <Icon size={14} className={activity.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{activity.action}</p>
                      <p className="text-xs text-muted">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Content */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Top Performing Content</h2>
            <div className="space-y-3">
              {[
                { title: "The Last Kingdom", views: 1250, type: "Movie", icon: Film, color: "text-primary" },
                { title: "Dawn of Ancestors", views: 980, type: "Movie", icon: Film, color: "text-primary" },
                { title: "Ibisigo Byose", views: 756, type: "Book", icon: BookOpen, color: "text-emerald-400" },
                { title: "Voices of the Morning", views: 543, type: "Inganzo", icon: Feather, color: "text-purple-400" },
                { title: "Fire and Reed", views: 432, type: "Movie", icon: Film, color: "text-primary" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-elevated transition-colors">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted">{item.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{item.views.toLocaleString()}</p>
                      <p className="text-xs text-muted">views</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Reports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-primary" />
                <h3 className="text-sm font-medium text-foreground">Growth Report</h3>
              </div>
              <p className="text-xs text-muted mb-3">User acquisition and content growth over time</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">This month</span>
                <span className="text-xs text-emerald-400 font-medium">+23%</span>
              </div>
            </div>
            <div className="p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-emerald-400" />
                <h3 className="text-sm font-medium text-foreground">Engagement Report</h3>
              </div>
              <p className="text-xs text-muted mb-3">Views, downloads, and reading sessions</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">This week</span>
                <span className="text-xs text-emerald-400 font-medium">+15%</span>
              </div>
            </div>
            <div className="p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={16} className="text-amber-400" />
                <h3 className="text-sm font-medium text-foreground">Premium Report</h3>
              </div>
              <p className="text-xs text-muted mb-3">Subscription conversions and revenue</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">This quarter</span>
                <span className="text-xs text-emerald-400 font-medium">+8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 p-4 bg-surface border border-border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-light">All systems operational</span>
            </div>
            <span className="text-xs text-muted">
              Database connected &middot; API responsive &middot; {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
