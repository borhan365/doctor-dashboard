import { ApiUrl } from "@/app/Variables";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Base Feature Interface
export interface Feature {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
}

// Response Types
export interface FeaturesResponse {
  status: string;
  features: Feature[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

interface UseHospitalFeaturesProps {
  page?: number;
  limit?: number;
  search?: string;
}

export const useHospitalFeatures = ({
  page = 1,
  limit = 100,
  search = "",
}: UseHospitalFeaturesProps = {}) => {
  const queryClient = useQueryClient();

  // Fetch features
  const { data, isLoading, error } = useQuery<FeaturesResponse>({
    queryKey: ["features", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const response = await axios.get(
        `${ApiUrl}/hospitals/features/get-all?${params}`,
      );
      return response.data;
    },
  });

  return {
    features: data?.features || [],
    meta: data?.meta,
    isLoading,
    error,
  };
};
