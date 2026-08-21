"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "@/i18n/TranslationProvider";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en" as const, label: "English", flag: "🇺🇸" },
  { code: "rw" as const, label: "Kinyarwanda", flag: "🇷🇼" },
  { code: "fr" as const, label: "Français", flag: "🇫🇷" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === locale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-sm text-muted-light hover:text-foreground rounded-md hover:bg-surface transition-colors"
        title="Language"
      >
        <Globe size={14} />
        <span className="text-xs">{current.flag}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLocale(lang.code); setOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                  locale === lang.code
                    ? "bg-primary/10 text-primary"
                    : "text-muted-light hover:text-foreground hover:bg-surface-elevated"
                )}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
