import { api } from "@/lib/api/client";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type FundsRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type FundsRequest = {
  id: number;
  amount: number | string;
  currency: string;
  purpose: string;
  deadline: string;
  requested_date?: string;
  description?: string;
  status: FundsRequestStatus;
  created_at?: string;
  updated_at?: string;

  student?: { id?: number; [k: string]: any };

  // backend may include these (optional)
  withdrawal?: {
    id: number;
    status: string;
    failure_reason?: string | null;
    payment_method?: any;
    [k: string]: any;
  } | null;

  [k: string]: any;
};

export type CreateFundsRequestPayload = {
  amount: number | string;
  currency: string;
  purpose: string[];
  deadline: string;
  description: string;
};

export type UpdateFundsRequestPayload = Partial<CreateFundsRequestPayload>;

export type ListFundsRequestsParams = {
  limit?: number;
  offset?: number;
  status?: FundsRequestStatus | "all";
};

function cleanParams(params?: Record<string, any>) {
  if (!params) return undefined;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "" || v === "all") continue;
    out[k] = v;
  }
  return out;
}

/**
 * Normalizes API response to a flat list.
 * Backend can return:
 * - FundsRequest[]
 * - Paginated<FundsRequest>
 */
export function unwrapList<T>(data: any): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && Array.isArray(data.results)) return data.results as T[];
  return [];
}

// Admin-ish: list all funds requests in system
export async function listFundsRequests(params?: ListFundsRequestsParams) {
  const res = await api.get<any>("/students/funds-requests/", {
    params: cleanParams(params),
  });
  return {
    raw: res.data,
    results: unwrapList<FundsRequest>(res.data),
  };
}

// Student: list only my requests
export async function listMyFundsRequests(params?: ListFundsRequestsParams) {
  const res = await api.get<any>("/students/funds-requests/my-requests/", {
    params: cleanParams(params),
  });
  return {
    raw: res.data,
    results: unwrapList<FundsRequest>(res.data),
  };
}

export async function createFundsRequest(payload: CreateFundsRequestPayload) {
  const res = await api.post<FundsRequest>("/students/funds-requests/", payload);
  return res.data;
}

export async function getFundsRequest(id: number | string) {
  const res = await api.get<FundsRequest>(`/students/funds-requests/${id}/`);
  return res.data;
}

export async function updateFundsRequest(id: number | string, payload: UpdateFundsRequestPayload) {
  const res = await api.put<FundsRequest>(`/students/funds-requests/${id}/`, payload);
  return res.data;
}

export async function patchFundsRequest(id: number | string, payload: UpdateFundsRequestPayload) {
  const res = await api.patch<FundsRequest>(`/students/funds-requests/${id}/`, payload);
  return res.data;
}

export async function deleteFundsRequest(id: number | string) {
  const res = await api.delete<void>(`/students/funds-requests/${id}/`);
  return res.data;
}