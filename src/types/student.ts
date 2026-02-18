// Student-specific types
import { User } from './common'

export interface Student extends User {
  role: 'student';
  studentId: string;
  institution: string;
  course: string;
  yearOfStudy: number;
  guarantors: Guarantor[];
  documents: StudentDocument[];
  campaigns: Campaign[];
}

export interface Guarantor {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  isVerified: boolean;
}

export interface StudentDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  isVerified: boolean;
}

export type DocumentType = 
  | 'admission_letter'
  | 'student_id'
  | 'national_id'
  | 'passport'
  | 'birth_certificate'
  | 'other';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  category: CampaignCategory;
  targetAmount: number;
  currentAmount: number;
  status: CampaignStatus;
  createdAt: Date;
  endDate: Date;
}

export type CampaignCategory = 
  | 'tuition'
  | 'housing'
  | 'books'
  | 'transportation'
  | 'other';

export type CampaignStatus = 
  | 'draft'
  | 'pending'
  | 'active'
  | 'funded'
  | 'closed';
