"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, BookOpen, PenTool, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Books", href: "/books", icon: BookOpen },
  { label: "Inganzo", href: "/inganzo", icon: PenTool },
  { label: "Profile", href: "/profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 text-[10px] font-medium transition-colors min-w-[48px]",
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-muted-light"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
