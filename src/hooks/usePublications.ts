import { ApiUrl } from "@/app/Variables";
import { DoctorPublication, PublicationFormData } from "@/types/publications";
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
        `${ApiUrl}/doctors/publications/get-all`,
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
      mutationFn: async (data: PublicationFormData) => {
        const response = await fetch(`${ApiUrl}/doctors/publications/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create publication");
        }

        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["publications"] });
        toast.success("Publication created successfully");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to create publication",
        );
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
        data: Partial<PublicationFormData>;
      }) => {
        const response = await fetch(
          `${ApiUrl}/doctors/publications/update/${id}`,
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
          throw new Error(errorData.error || "Failed to update publication");
        }

        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["publications"] });
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update publication",
        );
      },
    },
  );

  const { mutateAsync: deletePublication, isPending: isDeleting } = useMutation(
    {
      mutationFn: async (id: string) => {
        const res = await fetch(`${ApiUrl}/doctors/publications/delete/${id}`, {
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
