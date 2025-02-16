import { Specialist, SpecialistsResponse } from "@/types/doctor.specialist.type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

// Get all specialists
export const useSpecialists = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  return useQuery<SpecialistsResponse>({
    queryKey: ["doctor-specialists", params],
    queryFn: async () => {
      try {
        const searchParams = new URLSearchParams({
          page: params?.page?.toString() || "1",
          limit: params?.limit?.toString() || "10",
          ...(params?.search && { search: params.search }),
          ...(params?.status && { status: params.status }),
        });

        const response = await axios.get(`/api/doctors/specialists?${searchParams}`);
        return response.data;
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "Failed to fetch doctor specialists";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
  });
};

// Get single specialist
export const useSpecialist = (id: string) => {
  return useQuery<{ status: string; data: Specialist }>({
    queryKey: ["doctor-specialist", id],
    queryFn: async () => {
      const response = await axios.get(`/api/doctors/specialists/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create specialist
export const useCreateSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/doctors/specialists", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-specialists"] });
      toast.success("Specialist created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create specialist");
    },
  });
};

// Update specialist
export const useUpdateSpecialist = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.patch(`/api/doctors/specialists/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-specialists"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-specialist", id] });
      toast.success("Specialist updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update specialist");
    },
  });
};

// Delete specialist
export const useDeleteSpecialist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/doctors/specialists/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-specialists"] });
      toast.success("Specialist deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete specialist");
    },
  });
};
