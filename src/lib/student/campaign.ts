import { api } from "@/lib/api/client";


export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Campaign = {
  id: number;
  description?: string;
  name?: string;
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  goal?: number | string;
  currency?: string;
  academic_needs?: string[];
  cover_photo?: string;
  academic_session?: string;
  drafted?: boolean;

  // optional server extras
  accepted?: boolean;
  goal_achieved?: boolean;
  status?: string | null;
  created_at?: string;
  updated_at?: string;

  [k: string]: any;
};

export type CampaignOverview = {
  current_campaign_amount?: number;
  this_week?: number;
  this_month?: number;
  progress_percent?: number;
  total_raised?: number;
  week_raised?: number;
  month_raised?: number;
  weekly_growth?: number;
  monthly_growth?: number;
  [k: string]: any;
};

export async function getCampaign(id: number) {
  const res = await api.get<Campaign>(`/students/campaign/${id}/`);
  return res.data;
}


export async function deleteCampaign(id: number) {
  const res = await api.delete(`/students/campaign/${id}/`);
  return res.data;
}

export async function createCampaignDocuments(
  campaignId: number,
  files: File[],
  extra?: Record<string, any>
) {
  const fd = new FormData();

  // support both common backend keys
  fd.append("campaign", String(campaignId));
  fd.append("campaign_id", String(campaignId));

  files.forEach((f) => {
    fd.append("documents", f);
    fd.append("document", f); // some backends use singular
  });

  if (extra) {
    Object.entries(extra).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      fd.append(k, String(v));
    });
  }

  const res = await api.post(`/students/campaign-documents/`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function listCampaignDocuments() {
  const res = await api.get("/students/campaign-documents/");
  return res.data;
}

export async function getCampaignDocument(id: number) {
  const res = await api.get(`/students/campaign-documents/${id}/`);
  return res.data;
}

export async function updateCampaignDocument(id: number, payload: FormData | Record<string, any>) {
  const res = await api.patch(`/students/campaign-documents/${id}/`, payload);
  return res.data;
}

export async function deleteCampaignDocument(id: number) {
  const res = await api.delete(`/students/campaign-documents/${id}/`);
  return res.data;
}



// ✅ MATCH YOUR BACKEND (from your swagger sample + validation error)
export type CreateCampaignPayload = {
  description: string;
  name: string;
  start_date: string; // "2026-02-25"
  end_date: string;   // "2026-02-25"
  goal: number | string; // backend accepts string sometimes, but we send number
  currency: string;
  academic_needs: string[]; // e.g. ["ACCOMMODATION"]
  academic_session: string;
  cover_photo?: string;
  drafted?: boolean;
};

export async function listCampaigns() {
  const res = await api.get<Paginated<Campaign>>("/students/campaign/");
  return res.data;
}

export async function listMyCampaigns() {
  const res = await api.get<Paginated<Campaign>>("/students/campaign/list_my_campaigns/");
  return res.data;
}

export async function getCampaignOverview() {
  const res = await api.get<CampaignOverview>("/students/campaign/overview/");
  return res.data;
}

// ✅ POST create campaign
export async function createCampaign(payload: CreateCampaignPayload) {
  const res = await api.post<Campaign>("/students/campaign/", payload);
  return res.data;
}

// ✅ PATCH update campaign (step-by-step)
export async function updateCampaign(id: number, payload: Partial<CreateCampaignPayload>) {
  const res = await api.patch<Campaign>(`/students/campaign/${id}/`, payload);
  return res.data;
}

// ✅ Upload docs for campaign
export async function createCampaignDocument(campaignId: number, files: File[]) {
  const form = new FormData();
  // adjust key if backend expects "document" instead of "documents"
  files.forEach((f) => form.append("documents", f));

  const res = await api.post(`/students/campaign/${campaignId}/create_document/`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}