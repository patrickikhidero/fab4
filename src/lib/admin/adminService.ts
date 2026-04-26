import { api } from "@/lib/api/client";

// ── Types ────────────────────────────────────────────────────────────────────

export type AdminStudentProfile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  is_verified: boolean;
  student_entry?: string;
  institution?: string;
  course?: string;
  level?: string;
  created_at: string;
  updated_at: string;
  profile_documents?: StudentDocument[];
};

export type StudentDocument = {
  id: number;
  document_type?: string;
  file?: string;
  verification?: DocumentVerification | null;
};

export type DocumentVerification = {
  id?: number;
  status: "PENDING" | "VERIFIED" | "FLAGGED";
  notes?: string;
  verified_at?: string;
};

export type AdminCampaign = {
  id: number;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  goal?: number;
  currency?: string;
  academic_needs?: string[];
  cover_photo?: string;
  academic_session?: string;
  drafted: boolean;
  accepted: boolean;
  review_notes?: string;
  goal_achieved?: boolean;
  campaign_documents?: CampaignDocument[];
  percentage?: number;
  student?: number;
  created_at: string;
  updated_at: string;
};

export type CampaignDocument = {
  id: number;
  document_type?: string;
  file?: string;
  verification?: DocumentVerification | null;
};

export type AdminFundsRequest = {
  id: number;
  student?: number;
  amount?: number;
  currency?: string;
  status: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
};

// ── Students ─────────────────────────────────────────────────────────────────

export async function getStudents(filters?: {
  verification_status?: boolean;
  start_date?: string;
  end_date?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.verification_status !== undefined)
    params.set("verification_status", String(filters.verification_status));
  if (filters?.start_date) params.set("start_date", filters.start_date);
  if (filters?.end_date) params.set("end_date", filters.end_date);

  const qs = params.toString();
  const res = await api.get<PaginatedResponse<AdminStudentProfile>>(
    `/ff-admin/students-profile/${qs ? `?${qs}` : ""}`
  );
  return res.data;
}

export async function getStudent(id: number | string) {
  const res = await api.get<AdminStudentProfile>(`/ff-admin/student-profile/${id}/`);
  return res.data;
}

export async function updateStudent(
  id: number | string,
  data: Partial<AdminStudentProfile>
) {
  const res = await api.patch<AdminStudentProfile>(
    `/ff-admin/student-profile/${id}/update/`,
    data
  );
  return res.data;
}

export async function getStudentDocuments(studentId: number | string) {
  const res = await api.get<StudentDocument[] | PaginatedResponse<StudentDocument>>(
    `/ff-admin/student-documents/${studentId}/`
  );
  return res.data;
}

export async function verifyDocument(
  studentId: number | string,
  documentId: number | string,
  data: { status: "PENDING" | "VERIFIED" | "FLAGGED"; notes?: string }
) {
  const res = await api.patch<DocumentVerification>(
    `/ff-admin/student-document/${studentId}/${documentId}/verify/`,
    data
  );
  return res.data;
}

export async function getStudentCampaigns(studentId: number | string) {
  const res = await api.get<PaginatedResponse<AdminCampaign>>(
    `/ff-admin/student-campaigns/${studentId}/`
  );
  return res.data;
}

export async function reviewCampaign(
  studentId: number | string,
  campaignId: number | string,
  data: { accepted: boolean; notes?: string }
) {
  const res = await api.patch<AdminCampaign>(
    `/ff-admin/student-campaign/${studentId}/${campaignId}/review/`,
    data
  );
  return res.data;
}

export async function getStudentFundsRequests(studentId: number | string) {
  const res = await api.get<PaginatedResponse<AdminFundsRequest>>(
    `/ff-admin/student-funds-requests/${studentId}/`
  );
  return res.data;
}

export async function updateFundsRequest(
  studentId: number | string,
  fundsRequestId: number | string,
  data: { status: string }
) {
  const res = await api.patch<AdminFundsRequest>(
    `/ff-admin/students-funds-requests/${studentId}/${fundsRequestId}/update/`,
    data
  );
  return res.data;
}

// ── Campaigns ────────────────────────────────────────────────────────────────

export async function getCampaigns(filters?: {
  drafted?: boolean;
  accepted?: boolean;
  academic_session?: string;
  start_date?: string;
  end_date?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.drafted !== undefined) params.set("drafted", String(filters.drafted));
  if (filters?.accepted !== undefined) params.set("accepted", String(filters.accepted));
  if (filters?.academic_session) params.set("academic_session", filters.academic_session);
  if (filters?.start_date) params.set("start_date", filters.start_date);
  if (filters?.end_date) params.set("end_date", filters.end_date);

  const qs = params.toString();
  const res = await api.get<PaginatedResponse<AdminCampaign>>(
    `/ff-admin/campaigns/${qs ? `?${qs}` : ""}`
  );
  return res.data;
}

export async function verifyCampaignDocument(
  campaignId: number | string,
  documentId: number | string,
  data: { status: "PENDING" | "VERIFIED" | "FLAGGED"; notes?: string }
) {
  const res = await api.patch<DocumentVerification>(
    `/ff-admin/campaign-document/${campaignId}/${documentId}/verify/`,
    data
  );
  return res.data;
}

// ── Funds Requests ───────────────────────────────────────────────────────────

export async function getFundsRequests(filters?: {
  status?: string;
  start_date?: string;
  end_date?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.status) params.set("status", filters.status);
  if (filters?.start_date) params.set("start_date", filters.start_date);
  if (filters?.end_date) params.set("end_date", filters.end_date);

  const qs = params.toString();
  const res = await api.get<PaginatedResponse<AdminFundsRequest>>(
    `/ff-admin/funds-requests/${qs ? `?${qs}` : ""}`
  );
  return res.data;
}
