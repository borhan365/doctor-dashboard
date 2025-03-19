export interface Experience {
  id?: string;
  hospitalName: string; // Hospital/organization name
  designation: string; // Job designation
  department: string; // Department name
  startDate: Date | string; // Start date of the job
  endDate?: Date | string | null; // End date (null if current job)
  description?: string; // Description of the job
  isCurrent: boolean; // Whether the job is current
  isExpanded?: boolean; // UI state
}

export interface DoctorExperience extends Experience {
  id: string;
  doctorId: string;
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

export interface ExperienceFormData {
  doctorId: string;
  experiences: Experience[];
}

export interface ExperienceFormProps {
  formData: ExperienceFormData;
  setFormData: React.Dispatch<React.SetStateAction<ExperienceFormData>>;
  isEditing?: boolean;
}
