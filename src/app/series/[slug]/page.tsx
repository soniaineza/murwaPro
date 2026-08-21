"use client";

import { Film } from "lucide-react";

export default function SeriesPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Series</h1>
        <p className="text-muted mb-8">Binge-worthy shows from Africa and beyond.</p>

        <div className="text-center py-20">
          <Film size={48} className="text-muted mx-auto mb-4" />
          <p className="text-lg text-muted-light mb-2">Coming Soon</p>
          <p className="text-sm text-muted">
            Series support will be added when content is connected via Payload CMS.
          </p>
        </div>
      </div>
    </div>
  );
}
