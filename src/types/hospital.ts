export interface Hospital {
  // Required fields
  name: string; // Required
  address: string; // Required

  // Optional fields with proper types
  bnName?: string;
  bnAddress?: string;
  excerpt?: string;
  bnExcerpt?: string;
  overview: string;
  bnOverview: string;
  highlights: string;
  bnHighlights: string;
  description: string;
  bnDescription: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaImage: string;

  // Common Info
  emailAddresses: string[];
  establishedYear: number;
  website: string;
  phoneNumbers: string[];
  numberOfAmbulance: number;
  numberOfWards: number;
  numberOfCabins: number;
  numberOfICUs: number;
  numberOfBeds: number;
  googleMapURL: string;

  // Social Media
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  youtubeLink: string;
  linkedinLink: string;
  websiteLink: string;

  // Related Entities
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    bnQuestion?: string;
    bnAnswer?: string;
  }> | null;

  floors: Array<{
    id: string;
    title: string;
    bnTitle?: string;
    description: string;
    bnDescription?: string;
  }> | null;

  branches: string[] | null;

  healthPackages: Array<{
    id: string;
    name: string;
    bnName?: string;
    price: number;
    description?: string;
    bnDescription?: string;
    services?: string[];
    bnServices?: string[];
  }> | null;

  priceCharts: Array<{
    id: string;
    title: string;
    bnTitle: string;
    description?: string;
    bnDescription?: string;
    items: Array<{
      id: string;
      title: string;
      bnTitle?: string;
      price: number;
    }>;
  }> | null;

  // Media
  featuredImage: File | null;
  banner: File | null;
  gallery: Array<{
    file?: File;
    preview?: string;
    fileUrl?: string | null;
  }> | null;
  certificates: Array<{
    file?: File;
    preview?: string;
    fileUrl?: string | null;
  }> | null;

  // Status
  status: "draft" | "published" | "archived";

  // Relations
  hospitalTypes: string[];
  features: string[];
  services: string[];
  diagnostics: string[];
  specialists: string[];
  locations: Array<{ id: string } | string>;

  // Additional Info
  additionalInfo: Array<{
    id: string;
    title: string;
    bnTitle?: string;
    description: string;
    bnDescription?: string;
  }> | null;

  // Slugs
  slug: string;
  bnSlug: string;

  // Boolean fields
  isFeatured: boolean;
  isVerified: boolean;
  isSponsored: boolean;

  userId: string | null;
}
