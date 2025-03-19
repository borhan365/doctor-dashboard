import { ApiUrl } from "@/app/Variables";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Base Hospital Specialist Interface
export interface HospitalSpecialist {
  id: string;
  title: string;
  bnTitle?: string;
  status: string;
}

export interface HospitalSpecialistsResponse {
  status: string;
  specialists: HospitalSpecialist[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

interface UseHospitalSpecialistsProps {
  page?: number;
  limit?: number;
  search?: string;
}

export const useHospitalSpecialists = ({
  page = 1,
  limit = 100,
  search = "",
}: UseHospitalSpecialistsProps = {}) => {
  // Fetch hospital specialists
  const { data, isLoading, error } = useQuery<HospitalSpecialistsResponse>({
    queryKey: ["hospital-specialists", page, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const response = await axios.get(
        `${ApiUrl}/hospitals/specialists/get-all?${params}`,
      );
      return response.data;
    },
  });

  return {
    specialists: data?.specialists || [],
    meta: data?.meta,
    isLoading,
    error,
  };
};
