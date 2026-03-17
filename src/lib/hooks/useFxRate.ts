import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export type SupportedCurrency = "USD" | "KES" | "UGX" | "TZS" | "NGN" | "GHS" | "EGP";
export type FxSource = "exchangerate_api" | "backend";

type BackendFxResponse = { rate: number };

type ExchangeRateApiResponse = {
  result?: string;
  rates?: Record<string, number>;
};

async function fetchBackendFx(from: SupportedCurrency) {
  if (from === "USD") return 1;
  const res = await api.get<BackendFxResponse>(`/payments/fx/?from=${from}&to=USD`);
  const r = Number(res.data?.rate);
  if (!Number.isFinite(r) || r <= 0) throw new Error("Invalid FX rate from backend");
  return r;
}

async function fetchExchangeRateApiFx(from: SupportedCurrency) {
  if (from === "USD") return 1;

  // Free endpoint (no key): returns base USD rates.
  // Docs/behavior vary between domains; `open.er-api.com` is widely used for the free tier.
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("Failed to fetch FX rates");
  const data = (await res.json()) as ExchangeRateApiResponse;

  const rates = data?.rates;
  const usdToFrom = rates?.[from];
  const r = Number(usdToFrom);
  if (!Number.isFinite(r) || r <= 0) throw new Error("Missing FX rate for currency");

  // Convert USD->from into from->USD
  return 1 / r;
}

export function useFxRate({
  from,
  source,
}: {
  from: SupportedCurrency;
  source: FxSource;
}) {
  return useQuery({
    queryKey: ["fx", source, from, "USD"],
    queryFn: async () => {
      return source === "backend"
        ? await fetchBackendFx(from)
        : await fetchExchangeRateApiFx(from);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
  });
}

