import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export function useHospitalBookmark(hospitalId: string) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Check if hospital is bookmarked
  const { data: isBookmarked } = useQuery({
    queryKey: ["hospitalBookmark", hospitalId],
    queryFn: async () => {
      if (!session?.user) return false;
      const { data } = await axios.get(
        `/api/bookmarks/check?hospitalId=${hospitalId}`,
      );
      return data.isBookmarked;
    },
    enabled: !!session?.user && !!hospitalId,
  });

  // Toggle bookmark mutation
  const toggleBookmark = useMutation({
    mutationFn: async () => {
      if (!session?.user) throw new Error("Please login to bookmark");
      
      if (isBookmarked) {
        await axios.delete("/api/bookmarks", {
          data: { hospitalId },
        });
      } else {
        await axios.post("/api/bookmarks", {
          hospitalId,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitalBookmark", hospitalId] });
      toast.success(
        isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      );
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    isBookmarked,
    toggleBookmark,
  };
} 