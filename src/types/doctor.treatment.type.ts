export interface Treatment {
  id: string;
  title: string;
  bnTitle?: string;
  subtitle?: string;
  bnSubtitle?: string;
  description?: string;
  bnDescription?: string;
  excerpt?: string;
  bnExcerpt?: string;
  overview?: string;
  bnOverview?: string;
  status: string;
  isFeatured: boolean;
  featuredImage?: {
    fileUrl: string;
  };
  selected?: boolean;
  userId?: string;
}

export interface TreatmentsResponse {
  status: string;
  treatments: Treatment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

export interface TreatmentsProps {
  selectedTreatments: Treatment[];
  onChange: (treatments: Treatment[]) => void;
} 