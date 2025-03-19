import { Category } from "@/types/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data: categoriesData, isLoading } = useQuery<{
    categories: Category[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  }>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/api/articles/categories/get-all");
      return response.data;
    },
  });

  const categories = categoriesData?.categories || [];

  const { data: allCategoriesData } = useQuery<{
    categories: Category[];
  }>({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await axios.get("/api/articles/categories/get-all", {
        params: {
          limit: 1000, // Get all categories
          page: 1,
        },
      });
      return {
        categories: response.data.categories,
      };
    },
  });

  const allCategories = allCategoriesData?.categories || [];

  const createCategoryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(
        "/api/articles/categories/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create category");
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({
      slug,
      formData,
    }: {
      slug: string;
      formData: FormData;
    }) => {
      const response = await axios.put(
        `/api/articles/categories/update/${slug}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update category");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `/api/articles/categories/single-delete/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const bulkDeleteCategoriesMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await axios.post(
        "/api/articles/categories/bulk-delete",
        {
          ids,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "/api/articles/categories/uploads",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    },
  });

  return {
    categories,
    allCategories,
    isLoading,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
    bulkDeleteCategoriesMutation,
    uploadFileMutation,
  };
};

export const prepareCategoryFormData = (data: Category): FormData => {
  const formData = new FormData();

  // Append all text and number fields
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === "customData" && value) {
        formData.append(key, JSON.stringify(value));
      } else if (key === "parentCategoryId") {
        // Explicitly handle parentCategoryId
        formData.append(key, value === null ? "" : String(value));
      } else if (typeof value !== "object") {
        formData.append(key, String(value));
      }
    }
  });

  // Handle file uploads if needed
  if (data.featuredImage && data.featuredImage instanceof File) {
    formData.append("featuredImage", data.featuredImage);
  }

  return formData;
};
