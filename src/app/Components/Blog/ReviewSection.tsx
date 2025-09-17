"use client";

import { Hospital } from "@/types/hospital";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import ReviewSummary from "./ReviewSummary";

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

interface ReviewSectionProps {
  hospitalId?: string;
  articleId?: string;
  hospital?: Hospital;
}

export default function ReviewSection({
  hospitalId,
  articleId,
  hospital,
}: ReviewSectionProps) {
  // Static data for demo purposes
  const session = { user: { id: "demo-user-id" } };
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      // First, check if user has any review (including pending)
      if (session?.user?.id) {
        const userReviewResponse = await axios.get(
          `/api/reviews/user/current?${
            hospitalId ? `hospitalId=${hospitalId}` : `articleId=${articleId}`
          }`,
        );
        if (userReviewResponse.data.review) {
          setUserReview(userReviewResponse.data.review);
        }
      }

      // Then fetch approved reviews
      const response = await axios.get(
        `/api/reviews?${
          hospitalId ? `hospitalId=${hospitalId}` : `articleId=${articleId}`
        }`,
      );
      const allReviews = response.data.data;

      // Filter reviews: show only approved reviews from other users
      const otherReviews = allReviews.filter(
        (review: Review) =>
          review.user.id !== session?.user?.id && review.status === "approved",
      );
      setReviews(otherReviews);
    } catch (error) {
      setError("Failed to load reviews");
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    if (hospitalId || articleId) {
      fetchReviews();
    }
  }, [hospitalId, articleId, session]);

  return (
    <section id="reviews" className="mt-12 rounded-lg bg-white p-6 shadow-sm">
      {/* Pass all approved reviews to ReviewSummary */}
      <ReviewSummary
        reviews={[...reviews, ...(userReview ? [userReview] : [])]}
      />

      {session?.user ? (
        userReview ? (
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Your Review
            </h3>
            <ReviewList
              reviews={[userReview]}
              userReview={userReview}
              showStatus
              hospitalSlug={hospital?.slug}
            />
          </div>
        ) : (
          <ReviewForm
            hospitalId={hospitalId}
            articleId={articleId}
            onReviewSubmitted={fetchReviews}
          />
        )
      ) : (
        <div className="mb-8 rounded-md bg-gray-50 p-4 text-center">
          Please{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            login
          </Link>{" "}
          to submit a review
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            Other Reviews
          </h3>
          <ReviewList
            reviews={reviews}
            userReview={null}
            hospitalSlug={hospital?.slug}
            showAll={false}
          />
        </div>
      )}
    </section>
  );
}
