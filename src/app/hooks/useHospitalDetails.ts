import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Hospital } from "@/types/hospital";

interface UseHospitalOptions {
  enabled?: boolean;
}

export function useHospitalDetails(
  slug: string,
  options: UseHospitalOptions = {},
) {
  return useQuery<Hospital>({
    queryKey: ["hospital", slug],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`/api/hospitals/${slug}`);

        // Transform the data to match our Hospital interface
        const transformedData: Hospital = {
          ...data,
          // Transform locations to match the interface
          locations: data.locations?.map(
            (loc: { id: string; title: string }) => ({
              id: loc.id,
              title: loc.title,
              bnTitle: undefined,
            }),
          ),
          // Transform features to match the interface

          features: data.features?.map(
            (feat: { id: string; title: string }) => ({
              id: feat.id,
              title: feat.title,
              bnTitle: undefined,
            }),
          ),
          // Transform specialists to match the interface
          specialists: data.specialists?.map(
            (spec: { id: string; title: string }) => ({
              id: spec.id,
              title: spec.title,
              bnTitle: undefined,
            }),
          ),
          // Transform diagnostics to match the interface

          diagnostics: data.diagnostics?.map(
            (diag: { id: string; name: string }) => ({
              id: diag.id,
              name: diag.name,
              bnName: undefined,
            }),
          ),
          // Parse JSON strings if they're stored as strings

          faqs:
            typeof data.faqs === "string" ? JSON.parse(data.faqs) : data.faqs,
          floors:
            typeof data.floors === "string"
              ? JSON.parse(data.floors)
              : data.floors,
          healthPackages:
            typeof data.healthPackages === "string"
              ? JSON.parse(data.healthPackages)
              : data.healthPackages,
          priceCharts:
            typeof data.priceCharts === "string"
              ? JSON.parse(data.priceCharts)
              : data.priceCharts,
          additionalInfo:
            typeof data.additionalInfo === "string"
              ? JSON.parse(data.additionalInfo)
              : data.additionalInfo,
        };

        return transformedData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error || "Failed to fetch hospital";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    enabled: Boolean(slug) && options.enabled !== false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

// Export the Hospital type for use in other components
export type { Hospital };
