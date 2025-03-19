import { ApiUrl } from "@/app/Variables";
import { DoctorAffiliation } from "@/types/affiliations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAffiliations = (doctorId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: affiliations,
    isLoading: isLoadingAffiliations,
    error,
  } = useQuery<{ affiliations: DoctorAffiliation[]; meta: any }>({
    queryKey: ["affiliations", doctorId],
    queryFn: async () => {
      const url = new URL(
        `${ApiUrl}/doctors/affiliations/get-all`,
        window.location.origin,
      );
      if (doctorId) url.searchParams.append("doctorId", doctorId);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch affiliations");
      return res.json();
    },
  });

  const { mutateAsync: createAffiliation, isPending: isCreating } = useMutation(
    {
      mutationFn: async (data: { doctorId: string; affiliations: any[] }) => {
        const res = await fetch(`${ApiUrl}/doctors/affiliations/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error || "Failed to create affiliation");
        }
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["affiliations"] });
        toast.success("Affiliation created successfully");
      },
    },
  );

  const { mutateAsync: updateAffiliation, isPending: isUpdating } = useMutation(
    {
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: { doctorId: string; affiliations: any[] };
      }) => {
        const res = await fetch(`${ApiUrl}/doctors/affiliations/update/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error || "Failed to update affiliation");
        }
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["affiliations"] });
        toast.success("Affiliation updated successfully");
      },
    },
  );

  const { mutateAsync: deleteAffiliation, isPending: isDeleting } = useMutation(
    {
      mutationFn: async (id: string) => {
        const res = await fetch(`${ApiUrl}/doctors/affiliations/delete/${id}`, {
          method: "DELETE",
        });

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error || "Failed to delete affiliation");
        }
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["affiliations"] });
        toast.success("Affiliation deleted successfully");
      },
    },
  );

  return {
    affiliations: affiliations?.affiliations || [],
    meta: affiliations?.meta,
    isLoadingAffiliations,
    error,
    createAffiliation,
    isCreating,
    updateAffiliation,
    isUpdating,
    deleteAffiliation,
    isDeleting,
  };
};
