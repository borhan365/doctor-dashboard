import { Doctor } from "@/types/doctor";
import { useQuery } from "@tanstack/react-query";

interface DoctorResponse {
  status: string;
  data: Doctor[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

interface UseGetDoctorsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  locationId?: string;
  specialistId?: string;
  isFeatured?: boolean;
  isVerified?: boolean;
}

export const useGetDoctors = ({
  page = 1,
  limit = 10,
  search,
  status,
  locationId,
  specialistId,
  isFeatured,
  isVerified,
}: UseGetDoctorsParams = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && status !== "All" && { status }),
    ...(locationId && locationId !== "All" && { locationId }),
    ...(specialistId && specialistId !== "All" && { specialistId }),
    ...(isFeatured && { isFeatured: "true" }),
    ...(isVerified && { isVerified: "true" }),
  });

  return useQuery<DoctorResponse>({
    queryKey: ["doctors", { page, limit, search, status, locationId, specialistId, isFeatured, isVerified }],
    queryFn: async () => {
      const response = await fetch(`/api/doctors/doctor/get-all?${queryParams}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    },
  });
}; 