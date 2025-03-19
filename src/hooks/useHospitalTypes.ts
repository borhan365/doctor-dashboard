import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base Hospital Type Interface
export interface HospitalType {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
}

// Response Types
export interface HospitalTypesResponse {
  status: string;
  types: HospitalType[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

interface UseHospitalTypesProps {
  page?: number;
  limit?: number;
  search?: string;
}

export const useHospitalTypes = ({
  page = 1,
  limit = 100,
  search = "",
}: UseHospitalTypesProps = {}) => {
  // Fetch hospital types
  const { data, isLoading, error } = useQuery<HospitalTypesResponse>({
    queryKey: ["hospital-types", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const response = await axios.get(
        `${ApiUrl}/hospitals/types/get-all?${params}`,
      );
      return response.data;
    },
  });

  return {
    types: data?.types || [],
    meta: data?.meta,
    isLoading,
    error,
  };
};
