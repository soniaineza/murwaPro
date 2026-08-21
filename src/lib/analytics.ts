export async function trackView(movieId?: string, userId?: string, metadata?: { progress?: number; position?: number }) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "view", movieId, userId, metadata }),
    });
  } catch {}
}

export async function trackRead(bookId: string, userId: string, metadata?: { currentPage?: number; percentage?: number }) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "read", bookId, userId, metadata }),
    });
  } catch {}
}

export async function trackDownload(movieId?: string, bookId?: string, userId?: string, quality?: string) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "download", movieId, bookId, userId, metadata: { quality } }),
    });
  } catch {}
}

export async function trackPageVisit(path: string, userId?: string) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page_visit", metadata: { path }, userId }),
    });
  } catch {}
}
