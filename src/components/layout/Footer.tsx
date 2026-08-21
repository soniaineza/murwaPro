import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-primary">
              {BRAND.name}
            </Link>
            <p className="mt-2 text-sm text-muted-light italic">
              {BRAND.slogan}
            </p>
            <p className="mt-1 text-sm text-muted">
              {BRAND.sloganEn}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/movies" className="text-sm text-muted-light hover:text-primary transition-colors">Movies</Link></li>
              <li><Link href="/books" className="text-sm text-muted-light hover:text-primary transition-colors">Books</Link></li>
              <li><Link href="/inganzo" className="text-sm text-muted-light hover:text-primary transition-colors">Inganzo</Link></li>
              <li><Link href="/premium" className="text-sm text-muted-light hover:text-primary transition-colors">Premium</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-light hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/help" className="text-sm text-muted-light hover:text-primary transition-colors">Help</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-light hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-light hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-light hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted italic">
            {BRAND.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
