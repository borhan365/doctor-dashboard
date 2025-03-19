export interface DiseaseWiseMedicine {
  id: string;
  name: string;
  customName?: string | null;
  slug: string;
  bnSlug?: string | null;
  description?: string | null;
  bnDescription?: string | null;
  excerpt?: string | null;
  bnExcerpt?: string | null;
  isFeatured: boolean;
  featuredImage?: {
    fileUrl: string;
  };
  medicines?: any[]; // Array of related medicines

  // SEO fields
  scheduleDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaImage?: string | null;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;
  redirectUrl?: string | null;
  redirectType?: number | null;
  isPublic: boolean;
  readingTime?: number | null;
  version: number;
  customData?: any;

  createdAt: string;
  updatedAt: string;
}

export interface DiseasesResponse {
  status: string;
  diseases: DiseaseWiseMedicine[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

export interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: () => void;
  setSearch: (value: string) => void;
  refetch: () => void;
  statusFilter: string;
  handleStatusChange: (value: string) => void;
  languageFilter: string;
  handleLanguageChange: (value: string) => void;
  isFilterFeatured: boolean;
  handleFeaturedFilterChange: (checked: boolean) => void;
  hasActiveFilters: () => boolean;
  resetFilters: () => void;
}

export interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedDisease: DiseaseWiseMedicine | null;
  handleSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (value: string) => void;
  customName: string;
  setCustomName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  bnDescription: string;
  setBnDescription: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  bnExcerpt: string;
  setBnExcerpt: (value: string) => void;
  featuredImage: File | null;
  setFeaturedImage: (file: File | null) => void;
  isFeatured: boolean;
  setIsFeatured: (value: boolean) => void;
  metaTitle: string;
  setMetaTitle: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  metaKeywords: string;
  setMetaKeywords: (value: string) => void;
  canonicalUrl: string;
  setCanonicalUrl: (value: string) => void;
  redirectUrl: string;
  setRedirectUrl: (value: string) => void;
  redirectType: number;
  setRedirectType: (value: number) => void;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  readingTime: number;
  setReadingTime: (value: number) => void;
  mutation?: any;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export interface TableBodyProps {
  diseases: DiseaseWiseMedicine[];
  selectedDiseases: string[];
  setSelectedDiseases: (ids: string[]) => void;
  handleDelete: (disease: DiseaseWiseMedicine) => void;
  showDrawer: (disease: DiseaseWiseMedicine | null) => void;
  languageFilter: string;
  hasActiveFilters: () => boolean;
  resetFilters: () => void;
}
