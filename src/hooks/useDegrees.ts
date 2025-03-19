import { ApiUrl } from "@/app/Variables";
import { Degree, DegreeFilters } from "@/types/degrees";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useDegrees = (initialFilters: DegreeFilters) => {
  const [filters, setFilters] = useState<DegreeFilters>(initialFilters);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMultiDeleteModalOpen, setIsMultiDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const degreesPerPage = 10;

  // Sync filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Fetch degrees
  const fetchDegrees = async () => {
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
      `${ApiUrl}/doctors/degrees/get-all?${params.toString()}`,
    );
    return response.data;
  };

  // Make sure the query is properly invalidated when filters change
  const queryKey = [
    "degrees",
    filters.search,
    filters.statusFilter,
    filters.languageFilter,
    filters.isFilterFeatured,
    filters.currentPage,
  ];

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey,
    queryFn: fetchDegrees,
    staleTime: 0, // Don't cache the data
  });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (selectedDegree) {
        return axios.patch(
          `${ApiUrl}/doctors/degrees/update/${selectedDegree.id}`,
          formData,
        );
      }
      return axios.post(`${ApiUrl}/doctors/degrees/create`, formData);
    },
    onSuccess: () => {
      toast.success(
        selectedDegree
          ? "Degree updated successfully"
          : "Degree created successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
      setSelectedDegree(null);
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
        `${ApiUrl}/doctors/degrees/single-delete/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
      setIsDeleteModalOpen(false);
      setSelectedDegree(null);
      toast.success("Degree deleted successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Error deleting degree";
      toast.error(errorMessage);
      setIsDeleteModalOpen(false);
    },
  });

  // Delete selected mutation
  const deleteSelectedMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await axios.post(
        `${ApiUrl}/doctors/degrees/bulk-delete`,
        {
          ids,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
      setIsDeleteModalOpen(false);
      setSelectedDegrees([]);
      toast.success("Selected degrees deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "Error deleting selected degrees",
      );
      setIsDeleteModalOpen(false);
    },
  });

  // Filter handlers
  const handleSearch = () => {
    setFilters({
      ...filters,
      search: filters.searchTerm,
      currentPage: 1,
    });
  };

  const handleStatusChange = (value: string) => {
    setFilters({
      ...filters,
      statusFilter: value,
      currentPage: 1,
    });
  };

  const handleLanguageChange = (value: string) => {
    setFilters({
      ...filters,
      languageFilter: value,
      currentPage: 1,
    });
  };

  const handleFeaturedFilterChange = (checked: boolean) => {
    setFilters({
      ...filters,
      isFilterFeatured: checked,
      currentPage: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      currentPage: page,
    });
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      search: "",
      statusFilter: "All",
      languageFilter: "en",
      isFilterFeatured: false,
      currentPage: 1,
    });
    refetch();
  };

  const hasActiveFilters = () => {
    return (
      filters.search !== "" ||
      filters.statusFilter !== "All" ||
      filters.languageFilter !== "en" ||
      filters.isFilterFeatured
    );
  };

  // Delete handlers
  const handleDelete = (degree: Degree) => {
    if (deleteMutation.isPending) return;
    setSelectedDegree(degree);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedDegrees.length === 0) {
      toast.error("Please select degrees to delete");
      return;
    }
    setSelectedDegree(null);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDegree) {
      deleteMutation.mutate(selectedDegree.id);
    } else if (selectedDegrees.length > 0) {
      deleteSelectedMutation.mutate(selectedDegrees);
    }
  };

  return {
    // Data
    degrees: data?.degrees || [],
    meta: data?.meta,
    isLoading,
    error,
    isError,

    // State
    filters,
    setFilters,
    selectedDegrees,
    setSelectedDegrees,
    selectedDegree,
    setSelectedDegree,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isMultiDeleteModalOpen,
    setIsMultiDeleteModalOpen,

    // Mutations
    mutation,
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

// Export these hooks for direct use in components
export const useCreateDegree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
      token,
    }: {
      formData: FormData;
      token: string;
    }) => {
      const response = await axios.post(
        "/api/doctors/degrees/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
    },
  });
};

export const useUpdateDegree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const degreeId = formData.get("id");
      const response = await axios.patch(
        `${ApiUrl}/doctors/degrees/update/${degreeId}`,
        formData,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
    },
  });
};

export const useDeleteDegree = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `${ApiUrl}/doctors/degrees/single-delete/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degrees"] });
    },
  });
};
