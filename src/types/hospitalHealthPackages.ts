export interface CreateHealthPackageInput {
  title: string;
  bnTitle?: string;
  price: number;
  description?: string;
  bnDescription?: string;
  additionalNotes?: string;
  bnAdditionalNotes?: string;
  services: string[];
  hospitalId: string;
  discountEnabled: boolean;
  discountPercentage: number;
  discountCode: string;
}

export interface HealthPackage {
  id: string;
  title: string;
  bnTitle?: string;
  price: number;
  description?: string;
  bnDescription?: string;
  additionalNotes?: string;
  bnAdditionalNotes?: string;
  services: string[];
  hospitalId: string;
  hospital: {
    id: string;
    name: string;
    address: string;
    featuredImage?: string | null;
  };
  discountEnabled: boolean;
  discountPercentage?: number | null;
  discountCode?: string | null;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface HealthPackagesResponse {
  packages: HealthPackage[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Package {
  id: string;
  title: string;
  bnTitle?: string;
  price: number;
  bnPrice?: number;
  description?: string;
  bnDescription?: string;
  services: string[];
  bnServices?: string[];
  isExpanded?: boolean;
}

export interface Discount {
  isActive: boolean;
  discountPercentage: number;
  discountCode: string;
  discountValidity?: string;
}

export interface FormData {
  hospitalId: string;
  packages: Package[];
  discount: Discount;
}

export interface HealthPackageProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
