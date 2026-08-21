"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Search, Bell, User, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { useTranslation } from "@/i18n/TranslationProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.movies"), href: "/movies" },
    { label: t("nav.books"), href: "/books" },
    { label: t("nav.inganzo"), href: "/inganzo" },
  ];

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-gradient-to-b from-black/80 to-transparent")}>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-xl font-bold tracking-tight text-primary">{BRAND.name}</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={cn("px-3 py-2 text-sm font-medium rounded-md transition-colors", pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "text-primary" : "text-muted-light hover:text-foreground")}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              <Link href="/search" className="p-2 text-muted-light hover:text-foreground transition-colors rounded-md" aria-label={t("nav.search")}><Search size={18} /></Link>
              <Link href="/my-list" className="p-2 text-muted-light hover:text-foreground transition-colors rounded-md" aria-label={t("nav.myList")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </Link>
              <Link href="/notifications" className="p-2 text-muted-light hover:text-foreground transition-colors rounded-md relative" aria-label={t("nav.notifications")}>
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full" />
              </Link>

              {/* Profile / Sign In */}
              {!mounted ? (
                <Link href="/login" className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-black rounded-lg transition-colors">{t("nav.signIn")}</Link>
              ) : session ? (
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-surface transition-colors">
                    {session.user?.image ? <img src={session.user.image} alt="" className="w-7 h-7 rounded-full" /> : <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center"><User size={14} className="text-primary" /></div>}
                  </button>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-sm font-medium text-foreground truncate">{session.user?.name}</p>
                          <p className="text-xs text-muted truncate">{session.user?.email}</p>
                        </div>
                        <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-light hover:text-foreground hover:bg-surface-elevated transition-colors" onClick={() => setProfileOpen(false)}><User size={14} /> {t("nav.profile")}</Link>
                        <Link href="/my-list" className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-light hover:text-foreground hover:bg-surface-elevated transition-colors" onClick={() => setProfileOpen(false)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                          {t("nav.myList")}
                        </Link>
                        <Link href="/creator" className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-light hover:text-foreground hover:bg-surface-elevated transition-colors" onClick={() => setProfileOpen(false)}><User size={14} /> {t("nav.creatorStudio")}</Link>
                        <button onClick={() => { setProfileOpen(false); signOut({ callbackUrl: "/" }); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent hover:bg-accent/10 transition-colors"><LogOut size={14} /> {t("nav.signOut")}</button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/login" className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-black rounded-lg transition-colors">{t("nav.signIn")}</Link>
              )}
            </div>

            {/* Mobile Right */}
            <div className="flex md:hidden items-center gap-1">
              <LanguageSwitcher />
              <Link href="/search" className="p-2 text-muted-light hover:text-foreground transition-colors" aria-label={t("nav.search")}><Search size={20} /></Link>
              {!mounted ? (
                <Link href="/login" className="p-2 text-muted-light hover:text-foreground transition-colors"><User size={20} /></Link>
              ) : session ? (
                <Link href="/profile" className="p-2 text-muted-light hover:text-foreground transition-colors">
                  {session.user?.image ? <img src={session.user.image} alt="" className="w-5 h-5 rounded-full" /> : <User size={20} />}
                </Link>
              ) : (
                <Link href="/login" className="p-2 text-muted-light hover:text-foreground transition-colors"><User size={20} /></Link>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-muted-light hover:text-foreground transition-colors" aria-label="Menu">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-surface border-b border-border animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={cn("block px-4 py-3 text-base font-medium rounded-lg transition-colors", pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "text-primary bg-primary-dim" : "text-muted-light hover:text-foreground hover:bg-surface-elevated")}>
                  {link.label}
                </Link>
              ))}
              <Link href="/my-list" className="block px-4 py-3 text-base font-medium text-muted-light hover:text-foreground hover:bg-surface-elevated rounded-lg transition-colors">{t("nav.myList")}</Link>
              <Link href="/premium" className="block px-4 py-3 text-base font-medium text-primary hover:bg-primary-dim rounded-lg transition-colors">{t("nav.premium")}</Link>
              {mounted && session && (
                <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left px-4 py-3 text-base font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors">{t("nav.signOut")}</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
