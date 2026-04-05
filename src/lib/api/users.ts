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

export type UpdateUserPayload = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  student_profile?: {
    phone_number?: string | null;
    country?: string | null;
    state?: string | null;
    residential_address?: string | null;
    institution?: string | null;
    course?: string | null;
    course_country?: string | null;
    course_state?: string | null;
  };
};

export async function getMe() {
  const res = await api.get<MeResponse>("/api/users/me/");
  console.log(res)
  console.log(res.data)
  return res.data;
}

export async function updateUser(userId: number, payload: UpdateUserPayload) {
  const res = await api.put<MeResponse>(`/api/users/${userId}/`, payload);
  return res.data;
}

export type PatchUserPayload = {
  first_name?: string;
  last_name?: string;
  user_type?: string;
  mfa_enabled?: boolean;
  photo?: string;
};

export async function patchUser(userId: number, payload: PatchUserPayload) {
  const res = await api.patch<MeResponse>(`/api/users/${userId}/`, payload);
  return res.data;
}

export async function patchUserWithPhoto(
  userId: number,
  payload: PatchUserPayload & { photoFile?: File }
) {
  const formData = new FormData();
  if (payload.first_name) formData.append("first_name", payload.first_name);
  if (payload.last_name) formData.append("last_name", payload.last_name);
  if (payload.user_type) formData.append("user_type", payload.user_type);
  if (payload.photoFile) formData.append("photo", payload.photoFile);

  const res = await api.patch<MeResponse>(`/api/users/${userId}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}