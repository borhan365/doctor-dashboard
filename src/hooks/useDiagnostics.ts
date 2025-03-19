import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface DiagnosticSearchResponse {
  diagnostics: HospitalDiagnosticTest[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface HospitalDiagnosticTest {
  id?: string;
  name: string;
  bnName?: string;
  price: number;
  description?: string;
  bnDescription?: string;
  hospitalId: string;
  categoryId?: string;
  diagnosticId?: string;
  category?: {
    id: string;
    name: string;
    bnName?: string;
  };
  diagnostic?: {
    id: string;
    name: string;
    bnName?: string;
  };
  isExisting?: boolean;
}

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
    queryFn: async (): Promise<DiagnosticSearchResponse> => {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(categoryId && { categoryId }),
        ...(status && { status }),
        ...(isFeatured && { isFeatured: "true" }),
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await axios.get(
        `${ApiUrl}/hospitals/diagnostics/search?${params}`,
      );
      return response.data.data;
    },
  });
}
