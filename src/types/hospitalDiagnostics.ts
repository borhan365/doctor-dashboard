import { UseMutationResult } from "@tanstack/react-query";

// Base Hospital Diagnostic Interface
export interface HospitalDiagnostic {
  id: string;
  name: string;
  bnName?: string;
  slug: string;
  bnSlug?: string;
  excerpt?: string;
  bnExcerpt?: string;
  description?: string;
  bnDescription?: string;
  price?: number;
  status: string;
  isFeatured: boolean;

  // Additional info
  sampleType?: string;
  sampleCollectionFee?: number;
  sampleCollectionTime?: string;
  sampleCollectionContactNumber?: string;
  fastingRequired?: boolean;
  fastingHours?: string;
  fastingBeforeHours?: string;

  // SEO Settings
  scheduleDate?: Date;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  redirectUrl?: string;
  redirectType?: number;
  isPublic: boolean;
  readingTime?: number;
  version: number;
  customData?: any;
  faqs: any[];

  // Relations
  featuredImage?: {
    fileUrl: string;
  };
  categories?: {
    id: string;
    name: string;
    bnName?: string;
  }[];
  hospitals?: {
    id: string;
    name: string;
    bnName?: string;
  }[];
  tests?: {
    id: string;
    name: string;
    price: number;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

// Response Types
export interface HospitalDiagnosticResponse {
  status: string;
  data: HospitalDiagnostic;
}

export interface HospitalDiagnosticsResponse {
  status: string;
  diagnostics: HospitalDiagnostic[];
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
  handleClearSearch: () => void;
  statusFilter: string;
  handleStatusFilter: (value: string) => void;
  isFilterFeatured: boolean;
  handleFeaturedFilter: (checked: boolean) => void;
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  refetch: () => void;
  categoryFilter: string;
  handleCategoryChange: (value: string) => void;
  priceSort: "asc" | "desc" | undefined;
  handlePriceSortChange: (value: "asc" | "desc" | undefined) => void;
  categoriesData?: Array<{ id: string; name: string }>;
}

export interface TableBodyProps {
  currentDiagnostics: HospitalDiagnostic[];
  selectedDiagnostics: string[];
  handleSelectAll: (checked: boolean) => void;
  handleSelectDiagnostic: (id: string, checked: boolean) => void;
  languageFilter: string;
  showDrawer: (diagnostic: HospitalDiagnostic | null) => void;
  handleDelete: (diagnostic: HospitalDiagnostic) => void;
  mutation: MutationType;
  deleteMutation: MutationType;
}

export interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedDiagnostic: HospitalDiagnostic | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: (value: string) => void;
  bnName: string;
  setBnName: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  bnExcerpt: string;
  setBnExcerpt: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  bnDescription: string;
  setBnDescription: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  sampleType: string;
  setSampleType: (value: string) => void;
  sampleCollectionFee: string;
  setSampleCollectionFee: (value: string) => void;
  sampleCollectionTime: string;
  setSampleCollectionTime: (value: string) => void;
  sampleCollectionContactNumber: string;
  setSampleCollectionContactNumber: (value: string) => void;
  fastingRequired: boolean;
  setFastingRequired: (value: boolean) => void;
  fastingHours: string;
  setFastingHours: (value: string) => void;
  fastingBeforeHours: string;
  setFastingBeforeHours: (value: string) => void;
  featuredImage: File | null;
  setFeaturedImage: (file: File | null) => void;
  status: string;
  setStatus: (value: string) => void;
  isFeatured: boolean;
  handleFormFeaturedChange: (checked: boolean) => void;
  mutation: MutationType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface MutationType extends UseMutationResult<any, Error, FormData> {
  isPending: boolean;
}
