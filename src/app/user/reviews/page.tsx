"use client";

import ConfirmModal from "@/components/common/ConfirmModal";
import { useUserReviews } from "@/hooks/useUserReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Star } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

export default function UserReviews() {
  const { data: reviews = [], isLoading, error } = useUserReviews();
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await axios.delete(`/api/reviews/${reviewId}`);
      if (!response.data.success) {
        throw new Error("Failed to delete review");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      toast.success("Review deleted successfully");
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
    },
    onError: (error: any) => {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.error || "Failed to delete review");
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
    },
  });

  const handleDeleteClick = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete) {
      deleteMutation.mutate(reviewToDelete);
    }
  };

  const filteredReviews = reviews
    .filter((review) =>
      statusFilter === "all" ? true : review.status === statusFilter,
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return b.rating - a.rating;
    });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error instanceof Error ? error.message : "Error loading reviews"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-1 text-3xl font-bold text-slate-800">My Reviews</h1>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-slate-600">{filteredReviews.length} reviews</p>
        <div className="flex space-x-4">
          <select
            className="rounded-md bg-white px-4 py-2 shadow-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "rating")}
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <select
            className="rounded-md bg-white px-4 py-2 shadow-sm"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "all" | "pending" | "approved" | "rejected",
              )
            }
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="rounded-lg bg-white py-10 text-center shadow">
          <p className="text-slate-500">No reviews found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="rounded bg-white p-6 shadow-1">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md shadow-sm">
                    {review.featuredImage ? (
                      <Image
                        src={review.featuredImage}
                        alt={review.hospital?.name || ""}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-slate-200 text-center text-sm shadow-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex w-full flex-col">
                    <Link
                      href={
                        review.hospital
                          ? `/hospitals/${review.hospital.slug}`
                          : `/blog/${review.article?.slug}`
                      }
                      className="text-xl font-semibold text-slate-800 hover:text-blue-600"
                    >
                      {review.hospital
                        ? review.hospital.name
                        : review.article?.title}
                    </Link>
                    <div className="mt-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`mr-1 ${
                            i < review.rating
                              ? "fill-current text-yellow-500"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-slate-500">
                        {moment(review.createdAt).fromNow()}
                      </span>
                      <span
                        className={`ml-2 rounded px-2 py-1 text-xs ${
                          review.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : review.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {review.status}
                      </span>
                    </div>
                    <p className="mt-4 leading-relaxed text-slate-700">
                      {review.comment}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(review.id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                  disabled={deleteMutation.isPending}
                >
                  <BsTrash />
                  <span>
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
      />
    </div>
  );
}
