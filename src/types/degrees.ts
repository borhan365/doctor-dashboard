export interface TableBodyProps {
  degrees: Degree[];
  selectedDegrees: string[];
  setSelectedDegrees: (ids: string[]) => void;
  handleDelete: (degree: Degree) => void;
  showDrawer: (degree: Degree | null) => void;
  languageFilter: string;
  hasActiveFilters: () => boolean;
  resetFilters: () => void;
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
  selectedDegree: Degree | null;
  handleSubmit: (e: React.FormEvent) => void;
  formData: CreateDegreeFormData;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface MutationType {
  isPending: boolean;
  mutate: (formData: FormData, options?: any) => void;
  // Add other properties as needed
}

export interface FAQ {
  question: string;
  bnQuestion?: string;
  answer: string;
  bnAnswer?: string;
}

export interface Degree {
  id: string;
  title: string;
  userId?: string | null;
  status?: string;
  language?: string;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
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

export interface DegreeResponse {
  status: string;
  data: Degree;
}

export interface DegreeFilters {
  search?: string;
  searchTerm: string;
  statusFilter: string;
  languageFilter: string;
  currentPage: number;
  isFilterFeatured: boolean;
}

export interface CreateDegreeFormData {
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

  // SEO Settings
  scheduleDate?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  redirectUrl?: string;
  redirectType?: number;
  isPublic?: boolean;
  readingTime?: number;
  faqs?: FAQ[];

  featuredImage?: File | null;
}
