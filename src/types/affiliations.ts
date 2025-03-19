export interface Affiliation {
  id?: string;
  title: string;
  hospitalName: string;
  bnTitle?: string;
  role?: string;
  startDate: Date;
  endDate?: Date;
  isExpanded?: boolean; // UI state
}

export interface AffiliationFormData {
  doctorId: string;
  affiliations: Affiliation[];
}

export interface AffiliationFormProps {
  formData: AffiliationFormData;
  setFormData: React.Dispatch<React.SetStateAction<AffiliationFormData>>;
  isEditing?: boolean;
}

export interface DoctorAffiliation {
  id: string;
  doctorId: string;
  affiliations: Affiliation[];
  doctor?: {
    id: string;
    name: string;
    featuredImage?: {
      fileUrl?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
