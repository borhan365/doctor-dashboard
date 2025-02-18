import { useQuery } from "@tanstack/react-query";

export const useDoctorProfileByUser = (userId?: string) => {
  return useQuery({
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
  });
};
