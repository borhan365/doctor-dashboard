export interface Award {
  id?: string;
  title: string;
  bnTitle?: string;
  awardYear: number;
  awardedBy: string;
  category?: string;
  description?: string;
  bnDescription?: string;
}

export interface AwardFormData {
  doctorId: string;
  title: string;
  bnTitle?: string;
  awardYear: number;
  awardedBy: string;
  category?: string;
  description?: string;
  bnDescription?: string;
}

export interface AwardFormProps {
  formData: AwardFormData;
  setFormData: React.Dispatch<React.SetStateAction<AwardFormData>>;
  isEditing?: boolean;
}

export interface DoctorAward {
  id: string;
  doctorId: string;
  title: string;
  bnTitle?: string;
  awardYear: number;
  awardedBy: string;
  category?: string;
  description?: string;
  bnDescription?: string;
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
