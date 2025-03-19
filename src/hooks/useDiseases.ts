import { DiseasesResponse } from "@/types/diseases";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UseDiseasesProps {
  currentPage: number;
  search: string;
  statusFilter: string;
  isFilterFeatured: boolean;
  languageFilter: string;
  diseasesPerPage: number;
}

export function useDiseases({
  currentPage,
  search,
  statusFilter,
  isFilterFeatured,
  languageFilter,
  diseasesPerPage,
}: UseDiseasesProps) {
  const queryClient = useQueryClient();

  // Fetch diseases
  const { data, isLoading, error, isError, refetch } =
    useQuery<DiseasesResponse>({
      queryKey: [
        "diseases",
        currentPage,
        search,
        statusFilter,
        isFilterFeatured,
        languageFilter,
      ],
      queryFn: async () => {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: diseasesPerPage.toString(),
          ...(search && { search }),
          ...(statusFilter !== "All" && { status: statusFilter }),
          ...(isFilterFeatured && { isFeatured: "true" }),
          ...(languageFilter && { language: languageFilter }),
        });

        const response = await axios.get(
          `/api/medicines/diseases/get-all?${params}`,
        );
        return response.data;
      },
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const id = formData.get("id");
      if (id) {
        const response = await axios.patch(
          `/api/medicines/diseases/update/${id}`,
          formData,
        );
        return { data: response.data, isUpdate: true };
      }
      const response = await axios.post(
        "/api/medicines/diseases/create",
        formData,
      );
      return { data: response.data, isUpdate: false };
    },
    onSuccess: (result) => {
      toast.success(
        result.isUpdate
          ? "Disease updated successfully"
          : "Disease created successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong. Please try again later.",
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `/api/medicines/diseases/single-delete/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
      toast.success("Disease wise medicine deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong. Please try again later.",
      );
    },
  });

  // Delete multiple mutation
  const deleteMultipleMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await axios.delete(
        "/api/medicines/diseases/bulk-delete",
        {
          data: { ids },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
      toast.success("Selected disease wise medicines deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.error ||
          "Something went wrong. Please try again later.",
      );
    },
  });

  return {
    data,
    isLoading,
    error,
    isError,
    refetch,
    mutation,
    deleteMutation,
    deleteMultipleMutation,
  };
}
