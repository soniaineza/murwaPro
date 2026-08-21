"use client";

import { Check, Crown } from "lucide-react";
import { BRAND } from "@/lib/constants";

const freeFeatures = [
  "Access to free movies",
  "Access to free books",
  "Access to free inganzo",
  "Basic streaming quality",
  "Basic reading experience",
];

const premiumFeatures = [
  "Premium movies & series",
  "Premium books",
  "Premium inganzo",
  "Offline downloads",
  "Highest streaming quality (1080p)",
  "Ad-free experience",
  "Exclusive content",
  "Priority support",
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Crown size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Go Premium
          </h1>
          <p className="text-muted max-w-lg mx-auto">
            Unlock the full {BRAND.name} experience with premium access to all
            content, offline downloads and the highest quality.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-1">Free</h2>
            <p className="text-3xl font-bold text-foreground mb-1">$0</p>
            <p className="text-sm text-muted mb-6">Forever</p>
            <ul className="space-y-3 mb-8">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted-light">
                  <Check size={16} className="text-muted shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 border border-border text-foreground font-medium rounded-lg hover:bg-surface-elevated transition-colors">
              Current Plan
            </button>
          </div>

          {/* Premium */}
          <div className="bg-surface border-2 border-primary rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-[10px] font-bold text-black rounded-full tracking-wider">
              RECOMMENDED
            </div>
            <h2 className="text-lg font-bold text-foreground mb-1">
              {BRAND.name} Premium
            </h2>
            <p className="text-3xl font-bold text-primary mb-1">$9.99</p>
            <p className="text-sm text-muted mb-6">per month</p>
            <ul className="space-y-3 mb-8">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted-light">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
