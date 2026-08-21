"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-24 md:pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">{BRAND.name}</h1>
          <p className="text-sm text-muted mt-2">{BRAND.slogan}</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-muted mb-6">
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-muted-light mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-muted-light hover:text-primary transition-colors"
            >
              <ChevronLeft size={14} />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
