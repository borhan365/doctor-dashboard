export interface Education {
  id?: string;
  instituteName: string;
  yearOfCompletion: number;
  degreeType: string;
  degreeTitle?: string;
  specialization: string;
  country?: string;
  isExpanded?: boolean;
}

export interface EducationFormData {
  doctorId: string;
  educations: Education[];
}

export interface EducationFormProps {
  formData: EducationFormData;
  setFormData: React.Dispatch<React.SetStateAction<EducationFormData>>;
  isEditing?: boolean;
}

export interface DoctorEducation {
  id: string;
  doctorId: string;
  instituteName: string;
  yearOfCompletion: number;
  degreeType: string;
  degreeTitle?: string;
  specialization: string;
  country?: string;
  doctor?: {
    id: string;
    name: string;
    bnName?: string;
    featuredImage?: {
      fileUrl?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
