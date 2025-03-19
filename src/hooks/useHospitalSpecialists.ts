import {
  HospitalSpecialist,
  HospitalSpecialistsResponse,
} from "@/types/hospitalSpecialists";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UseHospitalSpecialistsProps {
  page: number;
  limit?: number;
  search?: string;
  status?: string;
  isFeatured?: boolean;
}

export const useHospitalSpecialists = ({
  page,
  limit = 10,
  search = "",
  status,
  isFeatured,
}: UseHospitalSpecialistsProps) => {
  const queryClient = useQueryClient();

  // Fetch hospital specialists
  const { data, isLoading, error, refetch } =
    useQuery<HospitalSpecialistsResponse>({
      queryKey: ["hospital-specialists", page, search, status, isFeatured],
      queryFn: async () => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(status && status !== "All" && { status }),
          ...(isFeatured && { isFeatured: "true" }),
        });

        const response = await axios.get(
          `/api/hospitals/specialists/get-all?${params}`,
        );
        return response.data;
      },
    });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const id = formData.get("id") as string | null;
      if (id) {
        return axios.patch(`/api/hospitals/specialists/update/${id}`, formData);
      }
      return axios.post("/api/hospitals/specialists/create", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-specialists"] });
      toast.success("Hospital specialist saved successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error saving hospital specialist",
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`/api/hospitals/specialists/single-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-specialists"] });
      toast.success("Hospital specialist deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error deleting hospital specialist",
      );
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      return axios.post("/api/hospitals/specialists/bulk-delete", { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-specialists"] });
      toast.success("Selected hospital specialists deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error deleting hospital specialists",
      );
    },
  });

  // Get single hospital specialist
  const getSingleSpecialist = async (
    id: string,
  ): Promise<HospitalSpecialist> => {
    const response = await axios.get(
      `/api/hospitals/specialists/get-single/${id}`,
    );
    return response.data.data;
  };

  return {
    specialists: data?.specialists || [],
    meta: data?.meta,
    isLoading,
    error,
    refetch,
    mutation,
    deleteMutation,
    bulkDeleteMutation,
    getSingleSpecialist,
  };
};
