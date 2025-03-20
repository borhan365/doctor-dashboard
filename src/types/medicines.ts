export interface Medicine {
  id: string;
  medicineId: string;
  name: string;
  bnName?: string;
  customName?: string;
  bnCustomName?: string;
  slug: string;
  bnSlug?: string;
  excerpt?: string;
  bnExcerpt?: string;
  description?: string;
  bnDescription?: string;

  // Relations
  generic: {
    id: string;
    name: string;
  };
  manufacturer: {
    id: string;
    name: string;
  };
  medicineType: {
    id: string;
    name: string;
  };
  dosageForms: Array<{
    id: string;
    name: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
  diseases: Array<{
    id: string;
    name: string;
  }>;

  // Details
  details: Array<{
    id: string;
    stockQuantity: number;
    isActive: boolean;
    sku?: string;
    barCode?: string;
    expiryDate?: Date;
    discount?: number;
    isFeatured: boolean;
    isVerified: boolean;
    isSponsored: boolean;
    requiresPrescription: boolean;
    isGeneric: boolean;
    isOtc: boolean;
    isBranded: boolean;
    strength?: string;
    unitPrice?: number;
    stripPrice?: number;
    packPrice?: number;
    packageSize?: string;
    packageType?: string;
    shelfLife?: number;
    qualityGrade?: string;
    medicineDetails?: Record<string, any>;
    safetyAdvices?: Record<string, any>;
  }>;

  // Media
  featuredImage?: string;
  userManualGuide?: string;

  // Created by
  createdByDoctor?: {
    id: string;
    name: string;
  };
  createdByAdmin?: {
    id: string;
    name: string;
  };

  // Metrics
  totalImpressions: number;
  totalClicks: number;
  clickRate?: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface MedicineListItem {
  id: string;
  medicineId: string;
  name: string;
  slug: string;
  featuredImage?: string;
  generic: {
    id: string;
    name: string;
  };
  manufacturer: {
    id: string;
    name: string;
  };
  dosageForms: Array<{
    id: string;
    name: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
  details: Array<{
    stockQuantity: number;
    unitPrice?: number;
  }>;
}

export interface MedicineListResponse {
  medicines: MedicineListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MedicineFormData {
  medicineId?: string;
  name: string;
  bnName?: string;
  customName?: string;
  bnCustomName?: string;
  slug?: string;
  bnSlug?: string;
  excerpt?: string;
  bnExcerpt?: string;
  description?: string;
  bnDescription?: string;

  // Relations
  genericId: string;
  manufacturerId: string;
  medicineTypeId: string;
  dosageForms: string[];
  categories: string[];
  diseases: string[];

  // Status and flags
  status: "published" | "draft" | "archived";
  isActive: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  isSponsored: boolean;

  // Created by
  createdByDoctorId?: string;
  createdByAdminId?: string;

  // Media
  featuredImage?: File | null;
  userManualGuide?: File | null;
  userManualGuideUrl?: string;

  // Details array
  details: {
    stockQuantity: number;
    isActive: boolean;
    sku?: string;
    barCode?: string;
    expiryDate?: Date;
    discount?: number;
    isFeatured: boolean;
    isVerified: boolean;
    isSponsored: boolean;
    requiresPrescription: boolean;
    isGeneric: boolean;
    isOtc: boolean;
    isBranded: boolean;
    strength?: string;
    unitPrice?: number;
    stripPrice?: number;
    packPrice?: number;
    packageSize?: string;
    packageType?: string;
    shelfLife?: number;
    qualityGrade?: string;
    medicineDetails: {
      indications?: string;
      pharmacology?: string;
      dosageAndAdministration?: string;
      interaction?: string;
      contraindications?: string;
      sideEffects?: string;
      pregnancyAndLactation?: string;
      precautionsAndWarnings?: string;
      useInSpecialPopulations?: string;
      overdoseEffects?: string;
      therapeuticClass?: string;
      storageConditions?: string;
      chemicalStructure?: string;
    };
    safetyAdvices: {
      caution?: string;
      pregnancy?: string;
      breastfeeding?: string;
      children?: string;
      elderly?: string;
      driving?: string;
      kidney?: string;
      liver?: string;
      contraindications?: string;
      warnings?: string;
      interactions?: string;
      other?: string;
    };
  }[];

  // SEO fields
  scheduleDate?: string | Date | null;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  metaImage?: string;
  canonicalUrl?: string;
  redirectUrl?: string;
  redirectType?: number;
  isPublic?: boolean;
  readingTime?: number;
  customData?: Record<string, any>;
  faqs: any[];

  // Add missing fields from your schema
  medicineId: string;

  // Add fields for tracking metrics
  totalImpressions?: number;
  totalClicks?: number;
  clickRate?: number;
}

export const initialFormData: MedicineFormData = {
  medicineId: "",
  name: "",
  bnName: "",
  customName: "",
  bnCustomName: "",
  excerpt: "",
  bnExcerpt: "",
  description: "",
  bnDescription: "",
  genericId: "",
  manufacturerId: "",
  medicineTypeId: "",
  dosageForms: [],
  categories: [],
  diseases: [],
  status: "draft",
  isFeatured: false,
  isVerified: false,
  isSponsored: false,
  isActive: true,
  details: [
    {
      stockQuantity: 0,
      isActive: true,
      isFeatured: false,
      isVerified: false,
      isSponsored: false,
      requiresPrescription: false,
      isGeneric: false,
      isOtc: false,
      isBranded: false,
      medicineDetails: {
        indications: "",
        pharmacology: "",
        dosageAndAdministration: "",
        interaction: "",
        contraindications: "",
        sideEffects: "",
        pregnancyAndLactation: "",
        precautionsAndWarnings: "",
        useInSpecialPopulations: "",
        overdoseEffects: "",
        therapeuticClass: "",
        storageConditions: "",
        chemicalStructure: "",
      },
      safetyAdvices: {
        caution: "",
        pregnancy: "",
        breastfeeding: "",
        children: "",
        elderly: "",
        driving: "",
        kidney: "",
        liver: "",
        contraindications: "",
        warnings: "",
        interactions: "",
        other: "",
      },
    },
  ],
  faqs: [],
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  totalImpressions: 0,
  totalClicks: 0,
};
