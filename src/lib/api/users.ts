import { api } from "./client";

export type StudentProfile = {
  id: number;
  is_flagged: boolean;
  flag_count: number;
  created_at: string;
  updated_at: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  date_of_birth?: string;
  country?: string;
  state?: string;
  residential_address?: string;
  verification_means?: string;
  is_verified?: boolean;
  student_entry?: string;
  institution?: string;
  course?: string;
  course_duration?: string;
  level?: string;
  course_state?: string;
  course_country?: string;
  user?: number;
};

export type WalletInfo = {
  id: number;
  student: number;
  balance: string;
  status: string;
  currency: string;
  created_at: string;
  updated_at: string;
};

export type MeResponse = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  last_login?: string;
  user_type?: string;
  mfa_enabled?: boolean;
  photo?: string | null;
  student_profile?: StudentProfile | null;
  wallet?: WalletInfo | null;
};

export async function getMe() {
  const res = await api.get<MeResponse>("/api/users/me");
  return res.data;
}