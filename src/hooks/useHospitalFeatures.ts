import { FeaturesResponse } from "@/types/hospitalFeatures";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UseHospitalFeaturesProps {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  isFeatured?: boolean;
}

export const useHospitalFeatures = ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  isFeatured = false,
}: UseHospitalFeaturesProps = {}) => {
  const queryClient = useQueryClient();

  // Fetch features
  const { data, isLoading, error, refetch } = useQuery<FeaturesResponse>({
    queryKey: ["features", page, search, status, isFeatured],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status && status !== "All" && { status }),
        ...(isFeatured && { isFeatured: "true" }),
      });
      const response = await axios.get(
        `/api/hospitals/features/get-all?${params}`,
      );
      return response.data;
    },
  });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id?: string;
      formData: FormData;
    }) => {
      if (id) {
        return axios.patch(`/api/hospitals/features/update/${id}`, formData);
      }
      return axios.post("/api/hospitals/features/create", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast.success("Feature saved successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to save feature");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`/api/hospitals/features/single-delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast.success("Feature deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to delete feature");
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) =>
      axios.post("/api/hospitals/features/bulk-delete", { ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast.success("Features deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Failed to delete features");
    },
  });

  const createFeature = (formData: FormData) => {
    mutation.mutate({ formData });
  };

  const updateFeature = (id: string, formData: FormData) => {
    mutation.mutate({ id, formData });
  };

  const deleteFeature = (id: string) => {
    deleteMutation.mutate(id);
  };

  const bulkDeleteFeatures = (ids: string[]) => {
    bulkDeleteMutation.mutate(ids);
  };

  return {
    features: data?.features || [],
    meta: data?.meta,
    isLoading,
    error,
    refetch,
    createFeature,
    updateFeature,
    deleteFeature,
    bulkDeleteFeatures,
    mutation,
    deleteMutation,
    bulkDeleteMutation,
  };
};
