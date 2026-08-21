"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  User, List, Clock, Heart, Settings, Bell, Crown, LogOut, ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { label: "My List", href: "/my-list", icon: List },
  { label: "Continue Watching", href: "/continue-watching", icon: Clock },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Premium", href: "/premium", icon: Crown },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          {session?.user?.image ? (
            <img src={session.user.image} alt="" className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={28} className="text-primary" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {session?.user?.name || "Guest User"}
            </h1>
            <p className="text-sm text-muted">
              {session?.user?.email || "Sign in to access your profile"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">0</p>
            <p className="text-xs text-muted mt-1">Watched</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">0</p>
            <p className="text-xs text-muted mt-1">Read</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">0</p>
            <p className="text-xs text-muted mt-1">Saved</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-foreground hover:bg-surface-elevated transition-colors ${i < menuItems.length - 1 ? "border-b border-border" : ""}`}>
                <Icon size={18} className="text-muted-light" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight size={14} className="text-muted" />
              </Link>
            );
          })}
        </div>

        {/* Auth buttons */}
        {status === "loading" ? (
          <div className="mt-8 space-y-3">
            <div className="w-full h-12 skeleton rounded-lg" />
          </div>
        ) : session ? (
          <div className="mt-8">
            <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center justify-center gap-2 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-surface transition-colors">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            <Link href="/login" className="w-full flex items-center justify-center py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="w-full flex items-center justify-center py-3 border border-border text-foreground font-medium rounded-lg hover:bg-surface transition-colors">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
