import { HospitalType, HospitalTypesResponse } from "@/types/hospitalTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UseHospitalTypesProps {
  page: number;
  limit?: number;
  search?: string;
  status?: string;
  isFeatured?: boolean;
}

export const useHospitalTypes = ({
  page,
  limit = 10,
  search = "",
  status,
  isFeatured,
}: UseHospitalTypesProps) => {
  const queryClient = useQueryClient();

  // Fetch hospital types
  const { data, isLoading, error, refetch } = useQuery<HospitalTypesResponse>({
    queryKey: ["hospital-types", page, search, status, isFeatured],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status && status !== "All" && { status }),
        ...(isFeatured && { isFeatured: "true" }),
      });

      const response = await axios.get(
        `/api/hospitals/types/get-all?${params}`,
      );
      return response.data;
    },
  });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const id = formData.get("id") as string | null;
      if (id) {
        return axios.patch(`/api/hospitals/types/update/${id}`, formData);
      }
      return axios.post("/api/hospitals/types/create", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-types"] });
      toast.success("Hospital type saved successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error saving hospital type",
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`/api/hospitals/types/single-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-types"] });
      toast.success("Hospital type deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error deleting hospital type",
      );
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      return axios.post("/api/hospitals/types/bulk-delete", { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-types"] });
      toast.success("Selected hospital types deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error deleting hospital types",
      );
    },
  });

  // Get single hospital type
  const getSingleType = async (id: string): Promise<HospitalType> => {
    const response = await axios.get(`/api/hospitals/types/get-single/${id}`);
    return response.data.data;
  };

  return {
    types: data?.types || [],
    meta: data?.meta,
    isLoading,
    error,
    refetch,
    mutation,
    deleteMutation,
    bulkDeleteMutation,
    getSingleType,
  };
};
