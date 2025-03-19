export interface Affiliation {
  id?: string;
  title: string;
  hospitalName: string;
  bnTitle?: string;
  role?: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  isCurrent?: boolean; // UI state
}

export interface AffiliationFormData {
  doctorId: string;
  title: string;
  hospitalName: string;
  bnTitle?: string;
  role?: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  isCurrent?: boolean;
}

export interface AffiliationFormProps {
  formData: AffiliationFormData;
  setFormData: React.Dispatch<React.SetStateAction<AffiliationFormData>>;
  isEditing?: boolean;
}

export interface DoctorAffiliation extends Affiliation {
  doctorId: string;
  doctor?: {
    id: string;
    name: string;
    bnName?: string;
    featuredImage?: {
      fileUrl?: string;
    };
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
