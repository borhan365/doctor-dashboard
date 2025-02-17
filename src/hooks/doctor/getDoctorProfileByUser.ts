import { Doctor } from "@/types/doctor";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDoctorProfileByUser = (userId?: string) => {
  return useQuery<{ doctorProfile: Doctor | null }>({
    queryKey: ["doctorProfile", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor profile");
      }
      return response.json();
    },
    enabled: !!userId,
    onError: (error: Error) => {
      console.error("Error fetching doctor profile:", error);
      toast.error("Failed to load doctor profile");
    },
  });
};
