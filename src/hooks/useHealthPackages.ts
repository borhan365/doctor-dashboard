import {
  CreateHealthPackageInput,
  HealthPackagesResponse,
} from "@/types/healthPackage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface UseHealthPackagesParams {
  page?: number;
  limit?: number;
  hospitalId?: string;
}

export const useHealthPackages = ({
  page = 1,
  limit = 10,
  hospitalId,
}: UseHealthPackagesParams = {}) => {
  const queryClient = useQueryClient();

  // Fetch health packages
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<HealthPackagesResponse>({
    queryKey: ["healthPackages", { page, limit, hospitalId }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(hospitalId && { hospitalId }),
      });

      const response = await fetch(
        `/api/hospitals/health-packages/get-all?${params}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch health packages");
      }
      return response.json();
    },
  });

  // Create health package
  const { mutateAsync: createHealthPackage, isPending: isCreating } =
    useMutation({
      mutationFn: async (data: CreateHealthPackageInput) => {
        const response = await fetch("/api/hospitals/health-packages/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to create health package");
        }

        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["healthPackages"] });
        toast.success("Health package created successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  // Update health package
  const { mutateAsync: updateHealthPackage, isPending: isUpdating } =
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: Partial<CreateHealthPackageInput>;
      }) => {
        const response = await fetch(
          `/api/hospitals/health-packages/update/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to update health package");
        }

        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["healthPackages"] });
        toast.success("Health package updated successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  // Delete health package
  const { mutateAsync: deleteHealthPackage, isPending: isDeleting } =
    useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(
          `/api/hospitals/health-packages/delete/${id}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to delete health package");
        }

        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["healthPackages"] });
        toast.success("Health package deleted successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  return {
    healthPackages: response?.healthPackages || [],
    meta: response?.meta,
    isLoading,
    error,
    createHealthPackage,
    updateHealthPackage,
    deleteHealthPackage,
    isCreating,
    isUpdating,
    isDeleting,
  };
};
