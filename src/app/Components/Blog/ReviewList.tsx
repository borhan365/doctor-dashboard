"use client";

import { ArrowRight, Star } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

interface ReviewListProps {
  reviews: Review[];
  userReview: Review | null;
  showStatus?: boolean;
  hospitalSlug?: string;
  showAll?: boolean;
}

interface ReviewWithExpand extends Review {
  isExpanded?: boolean;
}

export default function ReviewList({
  reviews,
  userReview,
  showStatus,
  hospitalSlug,
  showAll = false,
}: ReviewListProps) {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const displayReviews = showAll ? reviews : reviews.slice(0, 5);
  const hasMoreReviews = !showAll && reviews.length > 5;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const toggleComment = (reviewId: string) => {
    setExpandedComments((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  const renderComment = (comment: string, reviewId: string) => {
    const isExpanded = expandedComments.includes(reviewId);
    const shouldTruncate = comment.length > 280;

    if (!shouldTruncate) {
      return <p className="text-slate-700">{comment}</p>;
    }

    return (
      <div>
        <p className="text-slate-700">
          {isExpanded ? comment : `${comment.slice(0, 280)}...`}
        </p>
        <button
          onClick={() => toggleComment(reviewId)}
          className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {isExpanded ? "Show Less" : "Read More..."}
        </button>
      </div>
    );
  };

  const renderUserReview = () => {
    if (!userReview) return null;

    return (
      <div className="mb-8 rounded-md bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">Your Review</h3>
          <span
            className={`rounded px-2 py-1 text-xs ${
              userReview.status === "approved"
                ? "bg-green-100 text-green-800"
                : userReview.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {userReview.status}
          </span>
        </div>
        <div className="mb-2 flex items-center">
          <div className="flex">
            {[...Array(userReview.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-slate-500">
            {moment(userReview.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-slate-700">{userReview.comment}</p>
      </div>
    );
  };

  if (!reviews?.length && !userReview) {
    return (
      <div className="rounded-lg bg-slate-50 p-4 text-center text-slate-600">
        No reviews available yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {userReview && renderUserReview()}

      {displayReviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-slate-200 pb-6 last:border-b-0"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <div>
                {review.user.image ? (
                  <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-sm">
                    <Image
                      src={review.user.image || "/default-avatar.png"}
                      alt={review.user.name}
                      width={40}
                      height={40}
                    />
                  </div>
                ) : (
                  <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-sm">
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-full text-center text-xs text-white ${["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"][Math.floor(Math.random() * 5)]}`}
                    >
                      {review.user.name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-3">
                <h4 className="mb-[2px] font-medium text-slate-900">
                  {review.user.name}
                </h4>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-slate-500">
                    {moment(review.createdAt).fromNow()}
                  </span>
                  {showStatus && (
                    <span
                      className={`ml-2 rounded px-2 py-1 text-xs capitalize ${getStatusBadgeClass(
                        review.status,
                      )}`}
                    >
                      {review.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {renderComment(review.comment, review.id)}
        </div>
      ))}

      {hasMoreReviews && hospitalSlug && (
        <div className="mt-6 text-center">
          <Link
            href={`/hospitals/${hospitalSlug}/reviews`}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            View All Reviews ({reviews.length})
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
