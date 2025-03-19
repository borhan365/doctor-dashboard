import {
  CreateDiagnosticCategoryInput,
  DiagnosticCategoryResponse,
  UpdateDiagnosticCategoryInput,
} from "@/types/diagnosticCategories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useDiagnosticCategories = (page: number, search: string) => {
  const queryClient = useQueryClient();

  // Fetch categories
  const { data, isLoading, error } = useQuery<DiagnosticCategoryResponse>({
    queryKey: ["diagnostic-categories", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
      });
      const response = await axios.get(
        `/api/hospitals/diagnostics/categories/get-all?${params}`,
      );
      return response.data;
    },
  });

  // Create category
  const createMutation = useMutation({
    mutationFn: async (data: CreateDiagnosticCategoryInput) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      return axios.post(
        "/api/hospitals/diagnostics/categories/create",
        formData,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic-categories"] });
      toast.success("Category created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error creating category");
    },
  });

  // Update category
  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdateDiagnosticCategoryInput) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      return axios.patch(
        `/api/hospitals/diagnostics/categories/update/${id}`,
        formData,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic-categories"] });
      toast.success("Category updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error updating category");
    },
  });

  // Delete category
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`/api/hospitals/diagnostics/categories/single-delete/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic-categories"] });
      toast.success("Category deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error deleting category");
    },
  });

  // Bulk delete categories
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: string[]) =>
      axios.post("/api/hospitals/diagnostics/categories/bulk-delete", { ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic-categories"] });
      toast.success("Categories deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error deleting categories");
    },
  });

  return {
    categories: data?.categories || [],
    meta: data?.meta,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    bulkDeleteMutation,
  };
};
