import axios from "axios";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ReviewFormProps {
  hospitalId?: string;
  articleId?: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({
  hospitalId,
  articleId,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (comment.length < 10) {
      toast.error("Comment must be at least 10 characters long");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/reviews", {
        hospitalId,
        articleId,
        rating,
        comment,
      });

      setComment("");
      setRating(0);
      onReviewSubmitted();
      toast.success("Review submitted successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Error submitting review";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label className="mb-2 block">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                rating >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-2 block">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded border p-4 text-lg font-normal text-slate-700"
          rows={4}
          required
          minLength={10}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !rating || comment.length < 10}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
