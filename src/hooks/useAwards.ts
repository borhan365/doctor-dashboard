import { ApiUrl } from "@/app/Variables";
import { DoctorAward } from "@/types/awards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAwards = (doctorId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: awards,
    isLoading: isLoadingAwards,
    error,
  } = useQuery<{ awards: DoctorAward[]; meta: any }>({
    queryKey: ["awards", doctorId],
    queryFn: async () => {
      const url = new URL(
        `${ApiUrl}/doctors/awards/get-all`,
        window.location.origin,
      );
      if (doctorId) url.searchParams.append("doctorId", doctorId);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch awards");
      return res.json();
    },
  });

  const { mutateAsync: createAward, isPending: isCreating } = useMutation({
    mutationFn: async (data: { doctorId: string; awards: any[] }) => {
      const res = await fetch(`${ApiUrl}/doctors/awards/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Failed to create award");
      }
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
      toast.success("Award created successfully");
    },
  });

  const { mutateAsync: updateAward, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { doctorId: string; awards: any[] };
    }) => {
      const res = await fetch(`${ApiUrl}/doctors/awards/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Failed to update award");
      }
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
      toast.success("Award updated successfully");
    },
  });

  const { mutateAsync: deleteAward, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${ApiUrl}/doctors/awards/delete/${id}`, {
        method: "DELETE",
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Failed to delete award");
      }
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["awards"] });
      toast.success("Award deleted successfully");
    },
  });

  return {
    awards: awards?.awards || [],
    meta: awards?.meta,
    isLoadingAwards,
    error,
    createAward,
    isCreating,
    updateAward,
    isUpdating,
    deleteAward,
    isDeleting,
  };
};
