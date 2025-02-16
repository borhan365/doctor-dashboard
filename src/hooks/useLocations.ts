import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Location {
  id: string;
  title: string;
  bnTitle?: string;
  description?: string;
  bnDescription?: string;
  featuredImage?: { fileUrl: string } | null;
  subLocations?: Location[];
}

export interface LocationsResponse {
  status: string;
  data: {
    locations: Location[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export function useLocations(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  language?: string;
  isFeatured?: boolean;
}) {
  return useQuery<LocationsResponse>({
    queryKey: ["locations", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.search) searchParams.set("search", params.search);
      if (params?.status) searchParams.set("status", params.status);
      if (params?.language) searchParams.set("language", params.language);
      if (params?.isFeatured) searchParams.set("isFeatured", "true");

      const { data } = await axios.get(`/api/locations?${searchParams.toString()}`);
      return data;
    },
  });
}

export function useLocation(slug: string) {
  return useQuery({
    queryKey: ["location", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/locations/${slug}`);
      return data;
    },
  });
}

// location wise hospitals
export function useHospitalsByLocation(slug: string, params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["locationHospitals", slug, params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.set("slug", slug);
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.search) searchParams.set("search", params.search);

      const { data } = await axios.get(
        `/api/locations/frontend/hospitals?${searchParams.toString()}`
      );
      return data;
    },
    enabled: !!slug,
  });
}