import { ApiUrl } from "@/app/Variables";
import { HospitalDiagnosticTest } from "@/types/hospitalDiagnosticTests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UseDiagnosticTestsProps {
  hospitalId?: string;
  page?: number;
  limit?: number;
  search?: string;
}

interface DiagnosticTestsResponse {
  tests: HospitalDiagnosticTest[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function useDiagnosticTests({
  hospitalId,
  page = 1,
  limit = 10,
  search = "",
}: UseDiagnosticTestsProps) {
  return useQuery<DiagnosticTestsResponse>({
    queryKey: ["diagnostic-tests", hospitalId, page, limit, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(hospitalId && { hospitalId }),
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const { data } = await axios.get(
        `${ApiUrl}/hospitals/diagnostics/tests/get-all?${params}`,
      );
      return data;
    },
    enabled: !!hospitalId, // Only fetch if hospitalId is provided
  });
}

export function useDeleteDiagnosticTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testId: string) => {
      const response = await axios.delete(
        `${ApiUrl}/hospitals/diagnostics/tests/single-delete/${testId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch the tests list
      queryClient.invalidateQueries({ queryKey: ["diagnostic-tests"] });
    },
  });
}
