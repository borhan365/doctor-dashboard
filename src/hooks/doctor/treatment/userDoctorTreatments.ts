import { Treatment, TreatmentsResponse } from "@/types/doctor.treatment.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

// Get all treatments
export const useTreatments = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  return useQuery<TreatmentsResponse>({
    queryKey: ["doctor-treatments", params],
    queryFn: async () => {
      try {
        const searchParams = new URLSearchParams({
          page: params?.page?.toString() || "1",
          limit: params?.limit?.toString() || "10",
          ...(params?.search && { search: params.search }),
          ...(params?.status && { status: params.status }),
        });

        const response = await axios.get(`/api/doctors/treatments?${searchParams}`);
        return response.data;
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "Failed to fetch doctor treatments";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
  });
};

// Get single treatment
export const useTreatment = (id: string) => {
  return useQuery<{ status: string; data: Treatment }>({
    queryKey: ["doctor-treatment", id],
    queryFn: async () => {
      const response = await axios.get(`/api/doctors/treatments/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create treatment
export const useCreateTreatment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/doctors/treatments", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-treatments"] });
      toast.success("Treatment created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create treatment");
    },
  });
};

// Update treatment
export const useUpdateTreatment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.patch(`/api/doctors/treatments/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-treatments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-treatment", id] });
      toast.success("Treatment updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update treatment");
    },
  });
};

// Delete treatment
export const useDeleteTreatment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/doctors/treatments/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-treatments"] });
      toast.success("Treatment deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete treatment");
    },
  });
};
