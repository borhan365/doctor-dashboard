export interface FAQ {
  question: string;
  answer: string;
  bnQuestion?: string;
  bnAnswer?: string;
}

export interface HospitalFAQ extends FAQ {
  id?: string;
  hospitalId?: string;
  status?: 'draft' | 'published' | 'archived';
  createdAt?: Date;
  updatedAt?: Date;
}
