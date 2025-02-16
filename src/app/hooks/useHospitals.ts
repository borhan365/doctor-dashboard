import { Hospital } from "@/types/hospital";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UseHospitalsOptions {
  enabled?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  type?: string;
  department?: string;
  rating?: string;
  bedCapacity?: string;
  services?: string;
  sortBy?: string;
}

interface HospitalsResponse {
  hospitals: Hospital[];
  totalPages: number;
  currentPage: number;
  totalHospitals: number;
}

export function useHospitals(options: UseHospitalsOptions = {}) {
  const {
    page = 1,
    limit = 10,
    search = "",
    location = "",
    type = "",
    department = "",
    rating = "",
    bedCapacity = "",
    services = "",
    sortBy = "",
    enabled = true,
  } = options;

  return useQuery<HospitalsResponse>({
    queryKey: [
      "hospitals",
      {
        page,
        limit,
        search,
        location,
        type,
        department,
        rating,
        bedCapacity,
        services,
        sortBy,
      },
    ],
    queryFn: async () => {
      try {
        // Build query parameters
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(search && { search }),
          ...(location && { location }),
          ...(type && { type }),
          ...(department && { department }),
          ...(rating && { rating }),
          ...(bedCapacity && { bedCapacity }),
          ...(services && { services }),
          ...(sortBy && { sortBy }),
        });

        const { data } = await axios.get(`/api/hospitals?${params.toString()}`);

        // Transform the data to match our Hospital interface
        const transformedHospitals = data.hospitals.map((hospital: any) => ({
          ...hospital,
          // Transform locations to match the interface
          locations: hospital.locations?.map(
            (loc: { id: string; title: string }) => ({
              id: loc.id,
              title: loc.title,
              bnTitle: undefined,
            }),
          ),
          // Transform features to match the interface
          features: hospital.features?.map(
            (feat: { id: string; title: string }) => ({
              id: feat.id,
              title: feat.title,
              bnTitle: undefined,
            }),
          ),
          // Transform specialists to match the interface
          specialists: hospital.specialists?.map(
            (spec: { id: string; title: string }) => ({
              id: spec.id,
              title: spec.title,
              bnTitle: undefined,
            }),
          ),
          // Transform diagnostics to match the interface
          diagnostics: hospital.diagnostics?.map(
            (diag: { id: string; name: string }) => ({
              id: diag.id,
              name: diag.name,
              bnName: undefined,
            }),
          ),
          // Parse JSON strings if they're stored as strings
          faqs:
            typeof hospital.faqs === "string"
              ? JSON.parse(hospital.faqs)
              : hospital.faqs,
          floors:
            typeof hospital.floors === "string"
              ? JSON.parse(hospital.floors)
              : hospital.floors,
          healthPackages:
            typeof hospital.healthPackages === "string"
              ? JSON.parse(hospital.healthPackages)
              : hospital.healthPackages,
          priceCharts:
            typeof hospital.priceCharts === "string"
              ? JSON.parse(hospital.priceCharts)
              : hospital.priceCharts,
          additionalInfo:
            typeof hospital.additionalInfo === "string"
              ? JSON.parse(hospital.additionalInfo)
              : hospital.additionalInfo,
        }));

        return {
          hospitals: transformedHospitals,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
          totalHospitals: data.totalHospitals,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error || "Failed to fetch hospitals";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

// Export types
export type { HospitalsResponse, UseHospitalsOptions };
