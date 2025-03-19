import { DiagnosticSearchResponse } from "@/types/diagnostics";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseDiagnosticsProps {
  searchTerm?: string;
  categoryId?: string;
  status?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export function useDiagnostics({
  searchTerm = "",
  categoryId,
  status,
  isFeatured,
  page = 1,
  limit = 10,
}: UseDiagnosticsProps = {}) {
  return useQuery({
    queryKey: [
      "diagnostics",
      searchTerm,
      categoryId,
      status,
      isFeatured,
      page,
      limit,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(categoryId && { categoryId }),
        ...(status && { status }),
        ...(isFeatured && { isFeatured: "true" }),
        page: page.toString(),
        limit: limit.toString(),
      });

      const { data } = await axios.get<{ data: DiagnosticSearchResponse }>(
        `/api/hospitals/diagnostics/search?${params}`,
      );
      return data.data;
    },
  });
}
