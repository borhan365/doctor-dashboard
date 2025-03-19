import { ApiUrl } from "@/app/Variables";
import { Specialist, SpecialistFilters } from "@/types/doctorSpecialists";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useSpecialists = (initialFilters: SpecialistFilters) => {
  const [filters, setFilters] = useState<SpecialistFilters>(initialFilters);
  const [selectedSpecialists, setSelectedSpecialists] = useState<string[]>([]);
  const [selectedSpecialist, setSelectedSpecialist] =
    useState<Specialist | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMultiDeleteModalOpen, setIsMultiDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const specialistsPerPage = 10;

  // Sync filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Fetch specialists
  const fetchSpecialists = async () => {
    const params = new URLSearchParams();

    // Add all filters to the query params
    if (filters.search) params.append("search", filters.search);
    if (filters.statusFilter !== "All")
      params.append("status", filters.statusFilter);
    if (filters.languageFilter)
      params.append("language", filters.languageFilter);
    if (filters.isFilterFeatured) params.append("isFeatured", "true");
    params.append("page", filters.currentPage.toString());

    const response = await axios.get(
      `${ApiUrl}/doctors/specialists/get-all?${params.toString()}`,
    );
    return response.data;
  };

  // Make sure the query is properly invalidated when filters change
  const queryKey = [
    "specialists",
    filters.search,
    filters.statusFilter,
    filters.languageFilter,
    filters.isFilterFeatured,
    filters.currentPage,
  ];

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey,
    queryFn: fetchSpecialists,
    staleTime: 0, // Don't cache the data
  });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (selectedSpecialist) {
        return axios.patch(
          `${ApiUrl}/doctors/specialists/update/${selectedSpecialist.id}`,
          formData,
        );
      } else {
        return axios.post(`${ApiUrl}/doctors/specialists/create`, formData);
      }
    },
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["specialists"] });

      // Show success message
      toast.success(
        selectedSpecialist
          ? "Specialist updated successfully!"
          : "Specialist created successfully!",
      );
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);

      // Show error message
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.details?.message ||
          "An error occurred. Please try again.",
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`${ApiUrl}/doctors/specialists/single-delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
      setIsDeleteModalOpen(false);
      toast.success("Specialist deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to delete specialist. Please try again.",
      );
    },
  });

  // Delete selected mutation
  const deleteSelectedMutation = useMutation({
    mutationFn: (ids: string[]) => {
      return axios.post(`${ApiUrl}/doctors/specialists/bulk-delete`, { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
      setSelectedSpecialists([]);
      setIsDeleteModalOpen(false);
      toast.success("Selected specialists deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Bulk delete error:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to delete specialists. Please try again.",
      );
    },
  });

  // Filter handlers
  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: prev.searchTerm,
      currentPage: 1,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, statusFilter: value, currentPage: 1 }));
  };

  const handleLanguageChange = (value: string) => {
    setFilters((prev) => ({ ...prev, languageFilter: value, currentPage: 1 }));
  };

  const handleFeaturedFilterChange = (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      isFilterFeatured: checked,
      currentPage: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  };

  const resetFilters = () => {
    setFilters({
      ...initialFilters,
      currentPage: 1,
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.search !== "" ||
      filters.statusFilter !== "All" ||
      filters.isFilterFeatured
    );
  };

  // Delete handlers
  const handleDelete = (specialist: Specialist) => {
    if (deleteMutation.isPending) return;
    setSelectedSpecialist(specialist);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedSpecialists.length === 0) {
      toast.error("Please select specialists to delete");
      return;
    }
    setSelectedSpecialist(null);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedSpecialist) {
      deleteMutation.mutate(selectedSpecialist.id);
    } else if (selectedSpecialists.length > 0) {
      deleteSelectedMutation.mutate(selectedSpecialists);
    }
  };

  return {
    // Data
    specialists: data?.specialists || [],
    meta: data?.meta,
    isLoading,
    error,
    isError,

    // State
    filters,
    setFilters,
    selectedSpecialists,
    setSelectedSpecialists,
    selectedSpecialist,
    setSelectedSpecialist,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isMultiDeleteModalOpen,
    setIsMultiDeleteModalOpen,

    // Mutations
    mutation,
    isSubmitting: mutation.isPending,
    deleteMutation,
    deleteSelectedMutation,

    // Handlers
    handleSearch,
    handleStatusChange,
    handleLanguageChange,
    handleFeaturedFilterChange,
    handlePageChange,
    resetFilters,
    hasActiveFilters,
    handleDelete,
    handleDeleteSelected,
    confirmDelete,
    refetch,
  };
};
