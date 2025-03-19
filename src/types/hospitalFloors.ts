export interface Floor {
  id: string;
  name: string;
  bnName?: string;
  description?: string;
  bnDescription?: string;
  services: string[];
  bnServices?: string[];
  isExpanded?: boolean;
}

export interface FormData {
  hospitalId: string;
  floors: Floor[];
}

export interface FloorProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
