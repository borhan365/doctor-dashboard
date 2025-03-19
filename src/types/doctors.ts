export interface Doctor {
  id: string;
  doctorId: string; // Required field
  bmdcNumber: string; // Required field

  // Basic Info
  name: string;
  bnName?: string;
  slug: string;
  bnSlug?: string;
  status: string;

  // Content fields
  excerpt?: string;
  bnExcerpt?: string;
  overview?: string;
  bnOverview?: string;
  highlights?: string;
  bnHighlights?: string;
  description?: string;
  bnDescription?: string;
  about?: string;

  // Medical Info
  gender?: string;
  experience?: number;
  discountForHealthaUser?: number;
  discountForHealthaUserNote?: string;
  discountForHealthaUserNoteBn?: string;

  // Contact Info
  phoneNumbers: string[];
  emailAddresses: string[];
  website?: string;
  videoUrl?: string;

  // SEO Settings
  scheduleDate?: Date | string;
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  redirectUrl?: string;
  redirectType?: number;
  isPublic?: boolean;
  readingTime?: number;
  version?: number;
  customData?: any;

  // Boolean fields
  isFeatured?: boolean;
  isVerified?: boolean;
  isSponsored?: boolean;
  isGovernment?: boolean;
  isMainBranch?: boolean;

  // Stats
  totalImpressions?: number;
  totalClicks?: number;
  clickRate?: number;

  // JSON fields
  faqs?: Array<{
    question: string;
    answer: string;
    bnQuestion?: string;
    bnAnswer?: string;
  }>;
  additionalInfo?: Array<{
    title: string;
    bnTitle?: string;
    description?: string;
    bnDescription?: string;
  }>;

  // Relations and Media
  featuredImage?: {
    fileUrl: string;
  } | null;
  banner?: {
    fileUrl: string;
  } | null;

  // Chambers
  chambers?: Array<{
    id: string;
    hospital?: {
      id: string;
      name: string;
      slug: string;
      address?: string;
      location?: {
        id: string;
        title: string;
        bnTitle?: string;
      };
      featuredImage?: {
        fileUrl: string;
      } | null;
    };
    floorNumber?: string;
    roomNumber?: string;
    customHospitalName?: string;
    customAddress?: string;
    customCity?: string;
    shift?: string;
    newPatientFee?: number;
    followUpFee?: number;
    contactNumbers?: string[];
    availableDays?: Array<{
      id: string;
      day: string;
      timeSlots?: Array<{
        id: string;
        startTime: string;
        endTime: string;
        maxPatients?: number;
      }>;
    }>;
  }>;

  // Specializations and qualifications
  specialists?: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
  treatments?: Array<{
    id: string;
    title: string;
    slug?: string;
  }>;
  degrees?: Array<{
    id: string;
    title: string;
    slug?: string;
  }>;
  prefix?: {
    id: string;
    title: string;
    slug?: string;
  };
  doctorType?: {
    id: string;
    title: string;
    slug?: string;
  };
  languages?: Array<{
    id: string;
    title: string;
    slug?: string;
  }>;

  // Education and experience
  educations?: Array<{
    id: string;
    degree: string;
    institution: string;
    year?: string;
  }>;
  experiences?: Array<{
    id: string;
    position: string;
    organization: string;
    duration?: string;
  }>;

  // Reviews
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user?: {
      id: string;
      name: string;
      image?: string;
    };
  }>;

  // User relations
  user?: {
    id: string;
    name: string;
    email?: string;
    image?: string;
  };

  // Timestamps
  createdAt?: string | Date;
  updatedAt?: string | Date;

  // Additional fields for payments
  payments?: Array<{
    id: string;
    amount: number;
    status: string;
    paymentType: string;
    createdAt: string | Date;
  }>;
}

export interface DoctorResponse {
  status: string;
  data: Doctor;
}

export interface DoctorsListResponse {
  status: string;
  doctors: Doctor[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    count: number;
  };
}

export interface DoctorFormData {
  // Basic Info
  prefixId: string | null;
  doctorTypeId: string | null;
  name: string;
  bnName: string;
  excerpt: string;
  bnExcerpt: string;
  overview: string;
  bnOverview: string;
  description: string;
  bnDescription: string;

  // Status and Features
  isFeatured: boolean;
  isVerified: boolean;
  isSponsored: boolean;
  status: string;

  // Medical Information
  bmdcNumber: string;
  discountForHealthaUser: number;
  discountForHealthaUserNote: string;
  discountForHealthaUserNoteBn: string;

  // Personal Info
  gender: string;
  experience: number;
  about: string;
  emailAddresses: string[];
  phoneNumbers: string[];
  website: string;
  videoUrl: string;

  // Location Info
  locationId: string | null;
  location?: {
    title?: string;
  };

  // Social Media
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  youtubeLink: string;
  linkedinLink: string;

  // Relations
  specialists: any[];
  treatments: any[];
  degrees: any[];
  languages: any[];
  adminId: string | null;
  userId: string | null;
  featuredImage: File | string | null;

  // FAQs
  faqs: {
    question: string;
    answer: string;
    bnQuestion: string;
    bnAnswer: string;
  }[];
}
