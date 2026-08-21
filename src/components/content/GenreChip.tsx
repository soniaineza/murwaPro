"use client";

import { cn } from "@/lib/utils";

interface GenreChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function GenreChip({ label, active, onClick }: GenreChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-xs font-medium rounded-full border transition-all shrink-0",
        active
          ? "bg-primary text-black border-primary"
          : "bg-transparent text-muted-light border-border hover:border-primary/50 hover:text-primary"
      )}
    >
      {label}
    </button>
  );
}
