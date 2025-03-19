import { ApiUrl } from "@/app/Variables";
import { DoctorExperience, Experience } from "@/types/experiences";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useExperiences = (doctorId?: string) => {
  const queryClient = useQueryClient();

  // Fetch experiences
  const {
    data: experiences,
    isLoading: isLoadingExperiences,
    error,
  } = useQuery<{ experiences: DoctorExperience[]; meta: any }>({
    queryKey: ["experiences", doctorId],
    queryFn: async () => {
      const url = new URL(
        `${ApiUrl}/doctors/experiences/get-all`,
        window.location.origin,
      );
      if (doctorId) url.searchParams.append("doctorId", doctorId);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return res.json();
    },
  });

  // Create experience
  const { mutateAsync: createExperience, isPending: isCreating } = useMutation({
    mutationFn: async (data: Partial<Experience> & { doctorId: string }) => {
      const response = await fetch(`${ApiUrl}/doctors/experiences/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create experience");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience record created successfully");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create experience record",
      );
    },
  });

  // Update experience
  const { mutateAsync: updateExperience, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Experience> & { doctorId: string };
    }) => {
      const response = await fetch(
        `${ApiUrl}/doctors/experiences/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update experience");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update experience",
      );
    },
  });

  // Delete experience
  const { mutateAsync: deleteExperience, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${ApiUrl}/doctors/experiences/delete/${id}`, {
        method: "DELETE",
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to delete experience");
      }

      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience deleted successfully");
    },
  });

  return {
    experiences: experiences?.experiences || [],
    meta: experiences?.meta,
    isLoadingExperiences,
    error,
    createExperience,
    isCreating,
    updateExperience,
    isUpdating,
    deleteExperience,
    isDeleting,
  };
};
