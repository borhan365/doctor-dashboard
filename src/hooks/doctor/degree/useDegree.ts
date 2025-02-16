import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Degree, DegreeResponse, DegreesResponse } from "@/types/degree";

// Get all degrees
export const useDegrees = (params?: {
  status?: string;
  search?: string;
}) => {
  return useQuery<DegreesResponse>({
    queryKey: ["degrees", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.append("status", params.status);
      if (params?.search) searchParams.append("search", params.search);
      
      const response = await axios.get(`/api/doctors/degrees?${searchParams}`);
      return response.data;
    },
  });
};

// Get single degree
export const useGetDegree = (id: string) => {
  return useQuery<DegreeResponse>({
    queryKey: ["degree", id],
    queryFn: async () => {
      const response = await axios.get(`/api/doctors/degrees/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create degree
export const useCreateDegree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/doctors/degrees", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
      toast.success("Degree created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create degree");
    },
  });
};

// Update degree
export const useUpdateDegree = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.patch(`/api/doctors/degrees/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
      queryClient.invalidateQueries({ queryKey: ["degree", id] });
      toast.success("Degree updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update degree");
    },
  });
};

// Delete single degree
export const useDeleteDegree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/doctors/degrees/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
      toast.success("Degree deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete degree");
    },
  });
};

// Delete multiple degrees
export const useDeleteDegrees = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await axios.delete("/api/doctors/degrees/delete-all", {
        data: { ids },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
      toast.success("Selected degrees deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete degrees");
    },
  });
};