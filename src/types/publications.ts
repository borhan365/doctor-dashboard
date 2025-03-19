export interface Publication {
  id?: string;
  title: string;
  bnTitle?: string;
  url: string;
  description?: string;
  bnDescription?: string;
  isExpanded?: boolean;
}

export interface PublicationFormData {
  doctorId: string;
  publications: Publication[];
}

export interface PublicationFormProps {
  formData: PublicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<PublicationFormData>>;
  isEditing?: boolean;
}

export interface DoctorPublication {
  id: string;
  doctorId: string;
  publications: Publication[];
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
