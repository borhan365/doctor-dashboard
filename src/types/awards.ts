export interface Award {
  id?: string;
  title: string;
  bnTitle?: string;
  awardYear: number;
  awardedBy: string;
  category?: string;
  description?: string;
  bnDescription?: string;
  isExpanded?: boolean;
}

export interface AwardFormData {
  doctorId: string;
  awards: Award[];
}

export interface AwardFormProps {
  formData: AwardFormData;
  setFormData: React.Dispatch<React.SetStateAction<AwardFormData>>;
  isEditing?: boolean;
}

export interface DoctorAward {
  id: string;
  doctorId: string;
  awards: Award[];
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
