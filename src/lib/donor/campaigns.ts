import { api } from "@/lib/api/client";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type DonorCampaign = {
  id: number;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  goal?: string | number;
  currency?: string;
  academic_needs?: string[];
  cover_photo?: string;
  academic_session?: string;
  drafted?: boolean;
  accepted?: boolean;
  goal_achieved?: boolean;
  percentage?: number;
  student?: number;
  created_at?: string;
  updated_at?: string;
  review_notes?: string;
  status?: string | null;
};

export async function listDonorCampaigns(params?: {
  limit?: number;
  offset?: number;
  academic_session?: string;
  accepted?: boolean;
  drafted?: boolean;
  end_date?: string;
}) {
  const res = await api.get<Paginated<DonorCampaign>>("/ff-admin/campaigns/", {
    params,
  });
  return res.data;
}

export async function listStudentCampaigns(studentId: number, params?: {
  limit?: number;
  offset?: number;
}) {
  const res = await api.get<Paginated<DonorCampaign>>(
    `/ff-admin/student-campaigns/${studentId}/`,
    { params }
  );
  return res.data;
}

export async function getDonorCampaign(id: number) {
  const firstPage = await listDonorCampaigns({ limit: 100, offset: 0 });
  const found = firstPage.results.find((item) => Number(item.id) === Number(id));
  if (found) return found;

  throw new Error("Campaign not found");
}