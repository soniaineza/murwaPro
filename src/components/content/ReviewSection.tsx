"use client";

import { useState, useEffect } from "react";
import { Star, Send, Trash2, User } from "lucide-react";
import { useTranslation } from "@/i18n/TranslationProvider";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { id: string; firstName: string; lastName: string; avatar: string | null };
}

interface ReviewSectionProps {
  movieId?: string;
  bookId?: string;
  inganzoId?: string;
}

export function ReviewSection({ movieId, bookId, inganzoId }: ReviewSectionProps) {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userId] = useState("demo-user"); // In production, get from session

  useEffect(() => {
    const params = new URLSearchParams();
    if (movieId) params.set("movieId", movieId);
    if (bookId) params.set("bookId", bookId);
    if (inganzoId) params.set("inganzoId", inganzoId);

    fetch(`/api/reviews?${params}`)
      .then((r) => r.json())
      .then((data) => { setReviews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [movieId, bookId, inganzoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, movieId, bookId, inganzoId, rating, comment: comment || null }),
      });
      if (res.ok) {
        const review = await res.json();
        setReviews((prev) => {
          const existing = prev.findIndex((r) => r.user.id === userId);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = review;
            return updated;
          }
          return [review, ...prev];
        });
        setRating(0);
        setComment("");
      }
    } catch {}
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0.0";

  return (
    <div className="mt-10 p-6 bg-surface border border-border rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className={s <= Math.round(Number(avgRating)) ? "text-primary fill-primary" : "text-muted"} />
              ))}
            </div>
            <span className="text-sm text-muted">{avgRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-surface-elevated rounded-lg">
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button" onClick={() => setRating(s)} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} className="p-0.5">
              <Star size={24} className={`transition-colors ${(hoverRating || rating) >= s ? "text-primary fill-primary" : "text-muted"}`} />
            </button>
          ))}
          <span className="text-sm text-muted ml-2">{rating > 0 ? `${rating}/5` : ""}</span>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review (optional)..."
          rows={3}
          className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 resize-none mb-3"
        />
        <button type="submit" disabled={submitting || rating === 0} className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
          <Send size={14} />
          {submitting ? t("generic.loading") : "Submit Review"}
        </button>
      </form>

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 skeleton rounded-lg" />)}</div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted text-center py-6">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-surface-elevated rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {review.user.avatar ? (
                    <img src={review.user.avatar} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={14} className="text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.user.firstName} {review.user.lastName}</p>
                    <p className="text-xs text-muted">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} className={s <= review.rating ? "text-primary fill-primary" : "text-muted"} />
                  ))}
                </div>
              </div>
              {review.comment && <p className="text-sm text-muted-light">{review.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
