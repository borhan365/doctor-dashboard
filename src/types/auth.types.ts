export interface Role {
  id: string;
  name: "DOCTOR";
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  bloodGroup: string | null;
  gender: string | null;
  designation: string | null;
  address: string | null;
  location: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
  photo: string | null;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  experience: string | null;
  qualifications: string[];
  languages: string[];
  website: string | null;
  linkedIn: string | null;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  contactNumber: string | null;
  emailAddress: string | null;
  maritalStatus: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  status: string;
  isVerified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  image?: string | null;
  isVerified: boolean;
  verifiedAt?: string | null;
  profile: Profile;
  doctorSlug: string | null;
  doctorName: string | null;
  doctorFeaturedImage: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  hospital: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

export interface AuthResponse {
  status: string;
  data: {
    user: User;
    doctor: Doctor;
  };
}
