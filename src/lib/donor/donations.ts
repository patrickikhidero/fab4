import { api } from "@/lib/api/client";

export type PaymentProvider = "STRIPE" | "PAYSTACK";
export type DonorType = "GOOD_SAMARITAN" | "GUARDIAN";

export type DonationSessionDetails = {
  id?: string;
  client_secret?: string;
  mode?: string;
  payment_status?: string;
  status?: string;
  subscription?: Record<string, unknown>;
  url?: string;
  metadata?: Record<string, unknown>;
};

export type Donation = {
  id: number;
  session_details?: DonationSessionDetails | null;
  created_at?: string;
  updated_at?: string;
  amount: string | number;
  status?: string;
  payment_providers?: string;
  payment_id?: string;
  session_id?: string;
  credited?: boolean;
  credited_at?: string | null;
  currency?: string;
  donor_type?: string;
  campaign?: number;
  wallet?: number;
  user?: number;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type DonationListItem = {
  id: number;
  name?: string;
  donation?: string | number;
  date?: string;
  status?: string;
  donor_type?: string;
};

export type CreateDonationPayload = {
  amount: number | string;
  payment_providers: PaymentProvider;
  currency: string;
  donor_type: DonorType;
  campaign: number;
  wallet?: number;
};

export type CreateDonationParams = {
  return_url: string;
  success_url: string;
  ui_mode?: string;
};

export async function createDonation(
  payload: CreateDonationPayload,
  params: CreateDonationParams
) {
  const res = await api.post<Donation>("/donations/", payload, {
    params,
  });
  return res.data;
}

export async function getDonationIntentById(donationId: number) {
  const res = await api.get<Donation>(`/donations/donation_intent/${donationId}/`);
  return res.data;
}

export async function getDonationIntentBySession(sessionId: string) {
  const res = await api.get<Donation>(
    `/donations/donation_intent/${encodeURIComponent(sessionId)}/`
  );
  return res.data;
}

export async function listMyDonations(params?: {
  donor_type?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
  ordering?: string;
  start_date?: string;
  status?: string;
}) {
  const res = await api.get<Paginated<DonationListItem>>("/donations/donation_list/", {
    params,
  });
  return res.data;
}

export async function listCampaignDonations(
  campaignId: number,
  params?: {
    limit?: number;
    offset?: number;
    status?: string;
  }
) {
  const res = await api.get<Paginated<Donation>>(
    `/donations/donations_list/${campaignId}/`,
    { params }
  );
  return res.data;
}

export async function listDonorDonations() {
  const res = await api.get("/donors/donations/");
  return res.data;
}