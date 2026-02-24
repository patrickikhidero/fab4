import { api } from "@/lib/api/client";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Campaign = {
  id: number;
  title?: string;
  amount_target?: number;
  amount_raised?: number; // sometimes backend uses this
  raised_amount?: number; // sometimes backend uses this
  created_at?: string;
  updated_at?: string;
  [k: string]: any;
};

export type CampaignOverview = {
  // backend may return different keys, keep flexible
  current_campaign_amount?: number;
  this_week?: number;
  this_month?: number;
  progress_percent?: number;

  // sometimes they return totals like:
  total_raised?: number;
  week_raised?: number;
  month_raised?: number;

  [k: string]: any;
};

export async function listMyCampaigns() {
  const res = await api.get<Paginated<Campaign>>("/students/campaign/list_my_campaigns/");
  return res.data;
}

export async function getCampaignOverview() {
  const res = await api.get<CampaignOverview>("/students/campaign/overview/");
  return res.data;
}