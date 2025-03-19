import {
  CreateDiagnosticTestInput,
  DiagnosticTestsResponse,
} from "@/types/diagnostics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UseDiagnosticTestsProps {
  hospitalId?: string;
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  diagnosticId?: string;
}

export function useDiagnosticTests({
  hospitalId,
  page = 1,
  limit = 10,
  search = "",
  categoryId,
  diagnosticId,
}: UseDiagnosticTestsProps = {}) {
  const queryClient = useQueryClient();

  // Fetch diagnostic tests
  const {
    data: diagnosticTests,
    isLoading: isLoadingTests,
    error: testsError,
  } = useQuery<DiagnosticTestsResponse>({
    queryKey: [
      "diagnostic-tests",
      hospitalId,
      page,
      limit,
      search,
      categoryId,
      diagnosticId,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(hospitalId && { hospitalId }),
        ...(search && { search }),
        ...(categoryId && { categoryId }),
        ...(diagnosticId && { diagnosticId }),
      });

      const { data } = await axios.get(
        `/api/hospitals/diagnostics/tests/get-all?${params}`,
      );
      return data;
    },
  });

  // Create diagnostic test
  const { mutateAsync: createTest, isPending: isCreating } = useMutation({
    mutationFn: async (input: CreateDiagnosticTestInput) => {
      const { data } = await axios.post(
        "/api/hospitals/diagnostics/tests/create",
        input,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic-tests"] });
      toast.success("Diagnostic test created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "Failed to create diagnostic test",
      );
    },
  });

  // Update diagnostic test
  const { mutateAsync: updateTest, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateDiagnosticTestInput>;
    }) => {
      const response = await axios.patch(
        `/api/hospitals/diagnostics/tests/update/${id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic-tests"] });
      toast.success("Diagnostic test updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "Failed to update diagnostic test",
      );
    },
  });

  // Delete diagnostic test
  const { mutateAsync: deleteTest, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `/api/hospitals/diagnostics/tests/delete/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnostic-tests"] });
      toast.success("Diagnostic test deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "Failed to delete diagnostic test",
      );
    },
  });

  return {
    diagnosticTests: diagnosticTests?.diagnosticTests || [],
    meta: diagnosticTests?.meta,
    isLoadingTests,
    testsError,
    createTest,
    updateTest,
    deleteTest,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
