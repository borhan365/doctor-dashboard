import { Upload } from "@prisma/client";

export interface Degree {
  id: string;
  title: string;
  bnTitle?: string | null;
  subtitle?: string | null;
  bnSubtitle?: string | null;
  description?: string | null;
  bnDescription?: string | null;
  excerpt?: string | null;
  bnExcerpt?: string | null;
  overview?: string | null;
  bnOverview?: string | null;
  status: "published" | "draft" | "archived";
  isFeatured: boolean;
  slug: string;
  bnSlug?: string | null;
  featuredImage?: {
    fileUrl: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  userId?: string | null;
}

export interface DegreeResponse {
  status: string;
  data: Degree;
}

export interface DegreesResponse {
  status: string;
  degrees: Degree[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}
