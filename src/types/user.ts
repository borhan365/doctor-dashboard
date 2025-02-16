export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin' | 'superadmin';
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
  password?: string;
  bio?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  settings?: {
    notifications?: boolean;
    newsletter?: boolean;
    theme?: 'light' | 'dark' | 'system';
  };
} 