export type DaySchedule = {
  id?: string;
  day: string;
  fromTime: string;
  toTime: string;
  isAvailable: boolean;
  timeSlots?: TimeSlot[];
};

export type TimeSlot = {
  id?: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxPatients: number;
};

export type Chamber = {
  id?: string;
  hospital: string;
  floorNumber: string;
  roomNumber: string;
  shift: string;
  address: string;
  city: string;
  newPatientFee: number;
  oldPatientFee: number;
  followUpFee: number;
  followUpFeeNote?: string;
  followUpFeeNoteBn?: string;
  contactNumbers: string[];
  slotDuration: number;
  breakTime: number;
  maxPatients: number;
  availableDays: DaySchedule[];
};

export type Education = {
  id?: string;
  institute: string;
  passingYear: number;
  degreeType: string;
  subject: string;
};

export type Experience = {
  id?: string;
  hospital: string;
  designation: string;
  department: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isCurrent: boolean;
};

export type FAQ = {
  id?: string;
  question: string;
  answer: string;
};

export type Specialist = {
  id: string;
  name: string;
  title: string;
  slug: string;
};

export interface Treatment {
  id: string;
  name: string;
  title: string;
  slug: string;
}

export interface DoctorFormData {
  prefix: string;
  doctorType: string;
  name: string;
  bnName?: string;
  excerpt?: string;
  bnExcerpt?: string;
  overview?: string;
  bnOverview?: string;
  description?: string;
  bnDescription?: string;
  bmdcNumber: string;
  discountForHealthaUser: number;
  discountForHealthaUserNote?: string;
  discountForHealthaUserNoteBn?: string;
  isFeatured: boolean;
  isVerified: boolean;
  isSponsored: boolean;
  status: string;
  gender?: string;
  experience: number;
  division?: string;
  city?: string;
  area?: string;
  about?: string;
  emailAddresses: string[];
  phoneNumbers: string[];
  website?: string;
  videoUrl?: string;
  languages: string[];
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  linkedinLink?: string;
  specialists: string[];
  treatments: string[];
  degrees: string[];
  hospitals: string[];
  locations: string[];
  chambers: any[];
  educations: any[];
  experiences: any[];
  faqs: any[];
}

export interface Doctor extends DoctorFormData {
  id: string;
  featuredImage?: {
    id: string;
    fileUrl: string;
    fileKey: string;
  } | null;
  user?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LanguageSectionProps {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
}

export interface DegreeSectionProps {
  selectedDegrees: string[];
  onChange: (degrees: string[]) => void;
}

export interface SpecialistSectionProps {
  selectedSpecialists: string[];
  onChange: (specialists: string[]) => void;
}

export interface TreatmentSectionProps {
  selectedTreatments: string[];
  onChange: (treatments: string[]) => void;
}
