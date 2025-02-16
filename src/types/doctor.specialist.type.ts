export interface Specialist {
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
}

export interface SpecialistsResponse {
  status: string;
  specialists: Specialist[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

export interface SpecialistsProps {
  selectedSpecialists: Specialist[];
  onChange: (specialists: Specialist[]) => void;
}
