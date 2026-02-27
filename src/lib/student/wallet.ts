import { api } from "@/lib/api/client";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
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
 * Backend sometimes returns:
 * - T[]
 * - Paginated<T> { results: [...] }
 */
export function unwrapList<T>(data: any): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && Array.isArray(data.results)) return data.results as T[];
  return [];
}

/* -----------------------------
 * Wallet
 * ---------------------------- */

export type WalletStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | string;

export type StudentWallet = {
  id: number;
  student?: number | { id?: number; [k: string]: any };
  balance?: number | string;
  status?: WalletStatus;
  currency?: string;
  created_at?: string;
  updated_at?: string;
  [k: string]: any;
};

export type CreateWalletPayload = {
  status?: WalletStatus; // swagger shows status + currency on POST example
  currency: string;
};

export type UpdateWalletPayload = Partial<CreateWalletPayload> & {
  balance?: number | string;
};

const WALLET_BASE = "/students/wallet/";

export async function listWallets(params?: { limit?: number; offset?: number }) {
  const res = await api.get<any>(WALLET_BASE, { params: cleanParams(params) });
  return { raw: res.data, results: unwrapList<StudentWallet>(res.data) };
}

export async function createWallet(payload: CreateWalletPayload) {
  const res = await api.post<StudentWallet>(WALLET_BASE, payload);
  return res.data;
}

export async function getWallet(id: number | string) {
  const res = await api.get<StudentWallet>(`${WALLET_BASE}${id}/`);
  return res.data;
}

export async function updateWallet(id: number | string, payload: UpdateWalletPayload) {
  const res = await api.put<StudentWallet>(`${WALLET_BASE}${id}/`, payload);
  return res.data;
}

export async function patchWallet(id: number | string, payload: UpdateWalletPayload) {
  const res = await api.patch<StudentWallet>(`${WALLET_BASE}${id}/`, payload);
  return res.data;
}

export async function deleteWallet(id: number | string) {
  const res = await api.delete<void>(`${WALLET_BASE}${id}/`);
  return res.data;
}

/* -----------------------------
 * Withdrawal Methods
 * ---------------------------- */

export type WithdrawalPaymentType = "bank_transfer" | "mobile_money" | string;

export type PreferredProvider =
  | "MTN_MOMO"
  | "AIRTEL_MONEY"
  | "ORANGE_MONEY"
  | "MOOV_MONEY"
  | string;

export type WithdrawalMethod = {
  id: number;
  payment_type: WithdrawalPaymentType;

  // bank_transfer
  account_name?: string | null;
  account_number?: string | null;
  bank_name?: string | null;

  // shared
  country_code?: string | null;
  currency?: string | null;

  // mobile_money
  preferred_provider?: PreferredProvider | null;

  is_default?: boolean;

  created_at?: string;
  updated_at?: string;

  [k: string]: any;
};

export type CreateWithdrawalMethodPayload = {
  payment_type: "bank_transfer" | "mobile_money";

  // bank_transfer
  account_name?: string;
  account_number?: string;
  bank_name?: string;

  // mobile_money
  preferred_provider?: PreferredProvider;

  // shared
  country_code?: string;
  currency?: string;
  is_default?: boolean;
};

export type UpdateWithdrawalMethodPayload = Partial<CreateWithdrawalMethodPayload>;

const WITHDRAWAL_BASE = "/students/withdrawal-methods/";

export async function listWithdrawalMethods(params?: { limit?: number; offset?: number }) {
  const res = await api.get<any>(WITHDRAWAL_BASE, { params: cleanParams(params) });
  return { raw: res.data, results: unwrapList<WithdrawalMethod>(res.data) };
}

export async function createWithdrawalMethod(payload: CreateWithdrawalMethodPayload) {
  const res = await api.post<WithdrawalMethod>(WITHDRAWAL_BASE, payload);
  return res.data;
}

export async function getWithdrawalMethod(id: number | string) {
  const res = await api.get<WithdrawalMethod>(`${WITHDRAWAL_BASE}${id}/`);
  return res.data;
}

export async function updateWithdrawalMethod(id: number | string, payload: UpdateWithdrawalMethodPayload) {
  const res = await api.put<WithdrawalMethod>(`${WITHDRAWAL_BASE}${id}/`, payload);
  return res.data;
}

export async function patchWithdrawalMethod(id: number | string, payload: UpdateWithdrawalMethodPayload) {
  const res = await api.patch<WithdrawalMethod>(`${WITHDRAWAL_BASE}${id}/`, payload);
  return res.data;
}

export async function deleteWithdrawalMethod(id: number | string) {
  const res = await api.delete<void>(`${WITHDRAWAL_BASE}${id}/`);
  return res.data;
}

/* -----------------------------
 * Helpers
 * ---------------------------- */

export function mapProviderToApi(providerId: string): PreferredProvider | undefined {
  const key = providerId?.toLowerCase?.() ?? "";
  if (key === "mtn") return "MTN_MOMO";
  if (key === "airtel") return "AIRTEL_MONEY";
  if (key === "orange") return "ORANGE_MONEY";
  if (key === "moov") return "MOOV_MONEY";
  return undefined;
}