export interface Publication {
  id?: string;
  title: string;
  bnTitle?: string;
  url: string;
  description?: string;
  bnDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DoctorPublication extends Publication {
  doctorId: string;
  doctor?: {
    id: string;
    name: string;
    bnName?: string;
    featuredImage?: {
      fileUrl?: string;
    };
  };
}

export interface PublicationFormData {
  doctorId: string;
  title: string;
  bnTitle?: string;
  url: string;
  description?: string;
  bnDescription?: string;
}

export interface PublicationFormProps {
  formData: PublicationFormData;
  setFormData: React.Dispatch<React.SetStateAction<PublicationFormData>>;
  isEditing?: boolean;
}
