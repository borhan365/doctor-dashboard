"use client";

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
    image: string;
  };
  votes: {
    type: 'LIKE' | 'DISLIKE';
    userId: number;
  }[];
  createdAt: string;
}

export default function ReviewSection({ articleId }: { articleId: number }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [articleId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews?articleId=${articleId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      setLoading(true);
      await axios.post('/api/reviews', {
        articleId,
        rating,
        comment
      });
      setComment('');
      setRating(0);
      await fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (reviewId: number, type: 'LIKE' | 'DISLIKE') => {
    if (!session) return;

    try {
      await axios.post('/api/votes', {
        reviewId,
        type
      });
      await fetchReviews();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <section className="mt-12">
      <h3 className="mb-4 text-2xl font-bold">Reviews</h3>
      
      {session && (
        <form onSubmit={handleSubmitReview} className="mb-8">
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${
                  star <= rating ? 'fill-yellow-400' : 'fill-gray-200'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write your review..."
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <Image
                src={review.user.image || '/default-avatar.png'}
                alt={review.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-2">
                <h4 className="font-semibold">{review.user.name}</h4>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="fill-yellow-400 w-4 h-4" />
                  ))}
                </div>
              </div>
            </div>
            <p className="mb-2">{review.comment}</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleVote(review.id, 'LIKE')}
                className="flex items-center space-x-1"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{review.votes.filter(v => v.type === 'LIKE').length}</span>
              </button>
              <button
                onClick={() => handleVote(review.id, 'DISLIKE')}
                className="flex items-center space-x-1"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{review.votes.filter(v => v.type === 'DISLIKE').length}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}