export interface TableBodyProps {
  specialists: Specialist[];
  selectedSpecialists: string[];
  setSelectedSpecialists: (ids: string[]) => void;
  handleDelete: (specialist: Specialist) => void;
  showDrawer: (specialist: Specialist | null) => void;
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
  selectedSpecialist: Specialist | null;
  handleSubmit: (e: React.FormEvent) => void;
  formData: CreateSpecialistFormData;
  handleFormChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formErrors?: Record<string, string>;
  isSubmitting?: boolean;
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

export interface Specialist {
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
  slug: string;
  bnSlug?: string | null;
  status: "published" | "draft" | "archived";
  isFeatured: boolean;

  // SEO Settings
  scheduleDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaImage?: string | null;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;
  redirectUrl?: string | null;
  redirectType?: number | null;
  isPublic?: boolean;
  readingTime?: number | null;
  version?: number;
  customData?: any;
  faqs?: FAQ[];

  featuredImageId?: string | null;
  featuredImage?:
    | {
        fileUrl: string;
      }
    | string
    | null;
  createdAt: string;
  updatedAt: string;
  doctors?: any[];
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

export interface SpecialistResponse {
  status: string;
  data: Specialist;
}

export interface SpecialistFilters {
  searchTerm: string;
  search: string;
  statusFilter: string;
  languageFilter: string;
  currentPage: number;
  isFilterFeatured: boolean;
}

export interface CreateSpecialistFormData {
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
