import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface HospitalSpecialist {
  id: string;
  title: string;
  bnTitle?: string;
  slug: string;
  bnSlug?: string;
  description?: string;
  bnDescription?: string;
  featuredImage?: { fileUrl: string } | null;
  hospitals?: Array<{
    id: string;
    name: string;
    address: string;
    image: string;
    rating: number;
    reviewCount: number;
    features: string[];
    doctors: number;
  }>;
}

export interface HospitalSpecialistsResponse {
  status: string;
  data: {
    specialists: HospitalSpecialist[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export function useHospitalSpecialists(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery<HospitalSpecialistsResponse>({
    queryKey: ["hospitalSpecialists", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.search) searchParams.set("search", params.search);

      const { data } = await axios.get(
        `/api/hospitals/specialists/frontend?${searchParams.toString()}`
      );
      return data;
    },
  });
}

export function useHospitalSpecialist(id: string) {
  return useQuery({
    queryKey: ["hospitalSpecialist", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/hospitals/specialists/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useSpecialistBySlug(slug: string) {
  return useQuery({
    queryKey: ["specialist", slug],
    queryFn: async () => {
      const { data } = await axios.get(`/api/hospitals/specialists/single/${slug}`);
      return data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}