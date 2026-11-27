"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type ProductReviewsSectionProps = {
  productName: string;
  description: string;
};

export default function ProductReviewsSection({
  productName,
  description,
}: ProductReviewsSectionProps) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !review.trim() || !name.trim() || !email.trim()) {
      setError("Please fill in all required fields and select a rating.");
      return;
    }
    setError(null);
    setSubmitted(true);
    setRating(0);
    setReview("");
    setName("");
    setEmail("");
    setSaveInfo(false);
  };

  return (
    <div className="mx-auto max-w-[1800px] px-6 sm:px-10">
      <div className="flex items-center gap-8 border-b border-ink/10">
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`border-b-2 py-4 text-sm font-semibold tracking-[0.05em] transition-colors ${
            activeTab === "description"
              ? "border-ink text-ink"
              : "border-transparent text-ink/50 hover:text-ink"
          }`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`border-b-2 py-4 text-sm font-semibold tracking-[0.05em] transition-colors ${
            activeTab === "reviews"
              ? "border-ink text-ink"
              : "border-transparent text-ink/50 hover:text-ink"
          }`}
        >
          Reviews (0)
        </button>
      </div>

      {activeTab === "description" ? (
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/60">{description}</p>
      ) : (
        <div className="mt-8 max-w-2xl">
          <p className="text-sm text-ink/60">There are no reviews yet.</p>

          <div className="mt-10 border border-ink/10 bg-white p-8">
            <h3 className="font-display text-xl text-ink">
              Be the first to review &ldquo;{productName}&rdquo;
            </h3>
            <p className="mt-2 text-xs text-ink/50">
              Your email address will not be published. Required fields are marked *
            </p>

            {submitted ? (
              <p className="mt-6 text-sm text-ink">
                Thank you! Your review has been submitted for approval.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6">
                <p className="text-sm text-ink">Your rating *</p>
                <div
                  className="mt-2 flex gap-1"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                      onMouseEnter={() => setHoverRating(value)}
                      onClick={() => setRating(value)}
                      className="text-gold transition-transform hover:scale-110"
                    >
                      <Star
                        size={22}
                        strokeWidth={1.5}
                        className={
                          value <= (hoverRating || rating) ? "fill-gold" : "fill-transparent"
                        }
                      />
                    </button>
                  ))}
                </div>

                <label htmlFor="review" className="mt-6 block text-sm text-ink">
                  Your review *
                </label>
                <textarea
                  id="review"
                  required
                  rows={5}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="mt-2 w-full resize-y border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reviewer-name" className="block text-sm text-ink">
                      Name *
                    </label>
                    <input
                      id="reviewer-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="reviewer-email" className="block text-sm text-ink">
                      Email *
                    </label>
                    <input
                      id="reviewer-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>

                <label className="mt-6 flex items-start gap-2 text-sm text-ink/60">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="mt-0.5"
                  />
                  Save my name, email, and website in this browser for the next time I comment.
                </label>

                {error && <p className="mt-4 text-xs text-red-700/80">{error}</p>}

                <button
                  type="submit"
                  className="mt-6 w-fit bg-ink px-10 py-3.5 text-xs font-semibold tracking-[0.2em] text-cream transition-opacity hover:opacity-80"
                >
                  SUBMIT
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
