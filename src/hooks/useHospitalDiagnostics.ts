import { ApiUrl } from "@/app/Variables";
import {
  HospitalDiagnostic,
  HospitalDiagnosticsResponse,
} from "@/types/hospitalDiagnostics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UseHospitalDiagnosticsProps {
  page: number;
  limit?: number;
  search?: string;
  status?: string;
  isFeatured?: boolean;
  categoryId?: string;
  priceSort?: "asc" | "desc";
}

export const useHospitalDiagnostics = ({
  page,
  limit = 10,
  search = "",
  status,
  isFeatured,
  categoryId,
  priceSort,
}: UseHospitalDiagnosticsProps) => {
  const queryClient = useQueryClient();

  // Fetch hospital diagnostics
  const { data, isLoading, error, refetch } =
    useQuery<HospitalDiagnosticsResponse>({
      queryKey: [
        "hospital-diagnostics",
        page,
        search,
        status,
        isFeatured,
        categoryId,
        priceSort,
      ],
      queryFn: async () => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(status && status !== "All" && { status }),
          ...(isFeatured && { isFeatured: "true" }),
          ...(categoryId && categoryId !== "All" && { categoryId }),
          ...(priceSort && { priceSort }),
        });

        const response = await axios.get(
          `${ApiUrl}/hospitals/diagnostics/get-all?${params}`,
        );
        return response.data;
      },
    });

  // Create/Update mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const id = formData.get("id") as string | null;
      if (id) {
        const slug = formData.get("slug") as string;
        return axios.patch(
          `${ApiUrl}/hospitals/diagnostics/update/${slug}`,
          formData,
        );
      }
      return axios.post(`${ApiUrl}/hospitals/diagnostics/create`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-diagnostics"] });
      toast.success("Hospital diagnostic saved successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error saving hospital diagnostic",
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (diagnostic: HospitalDiagnostic) => {
      return axios.delete(
        `${ApiUrl}/hospitals/diagnostics/single-delete/${diagnostic.slug}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-diagnostics"] });
      toast.success("Hospital diagnostic deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error deleting hospital diagnostic",
      );
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      return axios.post(`${ApiUrl}/hospitals/diagnostics/bulk-delete`, { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospital-diagnostics"] });
      toast.success("Selected hospital diagnostics deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error deleting hospital diagnostics",
      );
    },
  });

  // Get single hospital diagnostic
  const getSingleDiagnostic = async (
    slug: string,
  ): Promise<HospitalDiagnostic> => {
    const response = await axios.get(
      `${ApiUrl}/hospitals/diagnostics/get-single/${slug}`,
    );
    return response.data.data;
  };

  return {
    diagnostics: data?.diagnostics || [],
    meta: data?.meta,
    isLoading,
    error,
    refetch,
    mutation,
    deleteMutation,
    bulkDeleteMutation,
    getSingleDiagnostic,
  };
};
