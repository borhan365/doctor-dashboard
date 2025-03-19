import { DoctorEducation } from "@/types/educations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useEducations = (doctorId?: string) => {
  const queryClient = useQueryClient();

  // Fetch educations
  const {
    data: educations,
    isLoading: isLoadingEducations,
    error,
  } = useQuery<{ educations: DoctorEducation[]; meta: any }>({
    queryKey: ["educations", doctorId],
    queryFn: async () => {
      const url = new URL(
        "/api/doctors/educations/get-all",
        window.location.origin,
      );
      if (doctorId) url.searchParams.append("doctorId", doctorId);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch educations");
      return res.json();
    },
  });

  // Create education
  const { mutateAsync: createEducation, isPending: isCreating } = useMutation({
    mutationFn: async (data: { doctorId: string; educations: any[] }) => {
      const res = await fetch("/api/doctors/educations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to create education");
      }

      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      toast.success("Education created successfully");
    },
  });

  // Update education
  const { mutateAsync: updateEducation, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { doctorId: string; educations: any[] };
    }) => {
      const res = await fetch(`/api/doctors/educations/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to update education");
      }

      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      toast.success("Education updated successfully");
    },
  });

  // Delete education
  const { mutateAsync: deleteEducation, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/doctors/educations/delete/${id}`, {
        method: "DELETE",
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to delete education");
      }

      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      toast.success("Education deleted successfully");
    },
  });

  return {
    educations: educations?.educations || [],
    meta: educations?.meta,
    isLoadingEducations,
    error,
    createEducation,
    isCreating,
    updateEducation,
    isUpdating,
    deleteEducation,
    isDeleting,
  };
};
