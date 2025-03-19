import { DoctorPublication } from "@/types/publications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const usePublications = (doctorId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: publications,
    isLoading: isLoadingPublications,
    error,
  } = useQuery<{ publications: DoctorPublication[]; meta: any }>({
    queryKey: ["publications", doctorId],
    queryFn: async () => {
      const url = new URL(
        "/api/doctors/publications/get-all",
        window.location.origin,
      );
      if (doctorId) url.searchParams.append("doctorId", doctorId);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch publications");
      return res.json();
    },
  });

  const { mutateAsync: createPublication, isPending: isCreating } = useMutation(
    {
      mutationFn: async (data: { doctorId: string; publications: any[] }) => {
        const res = await fetch("/api/doctors/publications/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error || "Failed to create publication");
        }
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["publications"] });
        toast.success("Publication created successfully");
      },
    },
  );

  const { mutateAsync: updatePublication, isPending: isUpdating } = useMutation(
    {
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: { doctorId: string; publications: any[] };
      }) => {
        const res = await fetch(`/api/doctors/publications/update/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error || "Failed to update publication");
        }
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["publications"] });
        toast.success("Publication updated successfully");
      },
    },
  );

  const { mutateAsync: deletePublication, isPending: isDeleting } = useMutation(
    {
      mutationFn: async (id: string) => {
        const res = await fetch(`/api/doctors/publications/delete/${id}`, {
          method: "DELETE",
        });

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error || "Failed to delete publication");
        }
        return responseData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["publications"] });
        toast.success("Publication deleted successfully");
      },
    },
  );

  return {
    publications: publications?.publications || [],
    meta: publications?.meta,
    isLoadingPublications,
    error,
    createPublication,
    isCreating,
    updatePublication,
    isUpdating,
    deletePublication,
    isDeleting,
  };
};
