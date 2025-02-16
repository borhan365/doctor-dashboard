"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ReviewSummaryProps {
  reviews: Array<{
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
  }>;
}

// Define a type for valid rating numbers
type RatingNumber = 1 | 2 | 3 | 4 | 5;

// Define the stats type
interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  satisfactionRate: number;
  ratingDistribution: Record<RatingNumber, { count: number; percentage: number }>;
}

export default function ReviewSummary({ reviews }: ReviewSummaryProps) {
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    satisfactionRate: 0,
    ratingDistribution: {
      1: { count: 0, percentage: 0 },
      2: { count: 0, percentage: 0 },
      3: { count: 0, percentage: 0 },
      4: { count: 0, percentage: 0 },
      5: { count: 0, percentage: 0 },
    },
  });

  useEffect(() => {
    if (!reviews?.length) return;

    try {
      const totalReviews = reviews.length;
      const distribution: Record<RatingNumber, { count: number; percentage: number }> = {
        1: { count: 0, percentage: 0 },
        2: { count: 0, percentage: 0 },
        3: { count: 0, percentage: 0 },
        4: { count: 0, percentage: 0 },
        5: { count: 0, percentage: 0 },
      };

      // Calculate distribution
      reviews.forEach((review) => {
        const rating = review.rating as RatingNumber;
        if (rating >= 1 && rating <= 5) {
          distribution[rating].count += 1;
        }
      });

      // Calculate percentages
      Object.keys(distribution).forEach((rating) => {
        const key = Number(rating) as RatingNumber;
        distribution[key].percentage = (distribution[key].count / totalReviews) * 100;
      });

      // Calculate average rating
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = Number((totalRating / totalReviews).toFixed(1));

      // Calculate satisfaction rate (4 and 5 star reviews)
      const satisfiedReviews = reviews.filter((review) => review.rating >= 4).length;
      const satisfactionRate = Number(((satisfiedReviews / totalReviews) * 100).toFixed(0));

      setStats({
        averageRating,
        totalReviews,
        satisfactionRate,
        ratingDistribution: distribution,
      });
    } catch (error) {
      console.error("Error calculating review stats:", error);
    }
  }, [reviews]);

  if (!reviews?.length) {
    return (
      <div className="rounded-lg bg-slate-50 p-4 text-center text-slate-600">
        No reviews available yet.
      </div>
    );
  }

  return (
    <div className="mb-8 border-b border-slate-100 pb-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">Review Summary</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400" fill="currentColor" />
            <span className="text-4xl font-bold text-slate-800">
              {stats.averageRating}
            </span>
          </div>
          <span className="text-sm text-slate-600">Overall Rating</span>
        </div>

        {/* Total Reviews */}
        <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-4">
          <span className="text-4xl font-bold text-slate-800">
            {stats.totalReviews}
          </span>
          <span className="text-sm text-slate-600">Total Reviews</span>
        </div>

        {/* Satisfaction Rate */}
        <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-4">
          <span className="text-4xl font-bold text-green-600">
            {stats.satisfactionRate}%
          </span>
          <span className="text-sm text-slate-600">Satisfaction Rate</span>
        </div>
      </div>

      {/* Star Ratings */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Rating Distribution
        </h3>
        {([5, 4, 3, 2, 1] as const).map((stars) => (
          <div key={stars} className="mb-2 flex items-center">
            <div className="flex w-28 items-center text-base font-medium text-slate-600">
              <p className="w-16">{stars} {stars === 1 ? "Star" : "Stars"}</p>
              <Star className="ml-1 h-4 w-4 fill-yellow-400 stroke-yellow-400" />
            </div>
            <div className="flex-grow">
              <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-yellow-400"
                  style={{
                    width: `${stats.ratingDistribution[stars].percentage}%`,
                  }}
                ></div>
              </div>
            </div>
            <span className="w-16 text-right text-base font-medium text-slate-600">
              {stats.ratingDistribution[stars].count} (
              {Math.round(stats.ratingDistribution[stars].percentage)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
