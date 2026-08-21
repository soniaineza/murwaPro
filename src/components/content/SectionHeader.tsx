"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

export function SectionHeader({ title, subtitle, viewAllHref }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover font-medium transition-colors shrink-0"
        >
          View All
          <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}
