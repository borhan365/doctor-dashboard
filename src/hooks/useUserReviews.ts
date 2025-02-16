import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  article?: {
    title: string;
    slug: string;
  };
  hospital?: {
    name: string;
    slug: string;
  };
}

export function useUserReviews() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["userReviews"],
    queryFn: async () => {
      const { data } = await axios.get("/api/reviews/user");
      return data.data as Review[];
    },
    enabled: !!session?.user,
  });
}
