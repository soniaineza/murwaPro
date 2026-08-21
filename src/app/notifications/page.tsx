"use client";

import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Notifications
        </h1>

        <div className="text-center py-20">
          <Bell size={48} className="text-muted mx-auto mb-4" />
          <p className="text-lg text-muted-light mb-2">No notifications yet</p>
          <p className="text-sm text-muted">
            We&apos;ll let you know when new content is added or there are updates
            to your account.
          </p>
        </div>
      </div>
    </div>
  );
}
