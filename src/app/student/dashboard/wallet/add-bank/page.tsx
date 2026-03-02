"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import {
  createWithdrawalMethod,
  mapProviderToApi,
} from "@/lib/student/wallet";

type PayoutMethod = "bank_transfer" | "mobile_money";

type MobileProvider = {
  id: string;
  label: string;
  icon: string;
};

export default function AddBankPage() {
  const router = useRouter();

  const [method, setMethod] = useState<PayoutMethod>("bank_transfer");

  // Bank transfer fields
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [currencyCode, setCurrencyCode] = useState("NGN");

  // Mobile money fields
  const providers: MobileProvider[] = useMemo(
    () => [
      { id: "mtn", label: "MTN", icon: "🟡" },
      { id: "airtel", label: "Airtel", icon: "🔴" },
      { id: "orange", label: "Orange", icon: "🟠" },
      { id: "moov", label: "Moov", icon: "⚫" },
    ],
    [],
  );

  const [provider, setProvider] = useState<string>("mtn");
  const [phoneCountry, setPhoneCountry] = useState<string>("+234");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSave =
    method === "bank_transfer"
      ? !!accountName.trim() &&
        !!bankName.trim() &&
        !!accountNumber.trim() &&
        !!countryCode.trim() &&
        !!currencyCode.trim()
      : !!provider && !!phoneCountry.trim() && !!phoneNumber.trim();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave || saving) return;

    try {
      setError(null);
      setSaving(true);

      if (method === "bank_transfer") {
        // NOTE: Swagger shows bank_name exists, but UI has no bank_name input.
        // We do NOT send bank_name (assumes backend allows null/blank).
        await createWithdrawalMethod({
          payment_type: "bank_transfer",
          account_name: accountName.trim(),
          bank_name: bankName.trim() || undefined,
          account_number: accountNumber.trim(),
          country_code: countryCode.trim(),
          currency: currencyCode.trim(),
          is_default: true,
        });
      } else {
        const apiProvider = mapProviderToApi(provider);

        // if backend enforces preferred_provider, fail early
        if (!apiProvider) {
          throw new Error("Invalid mobile money provider selected");
        }

        // UI has phone fields but swagger does not show phone fields on payload.
        // We can only send what API accepts (preferred_provider, country_code, currency, etc.)
        await createWithdrawalMethod({
          payment_type: "mobile_money",
          preferred_provider: apiProvider,
          country_code: phoneCountry.trim(),
          currency: currencyCode.trim(),
          is_default: true,
        });
      }

      router.push("/student/dashboard/wallet?toast=bank_saved");
    } catch (e: any) {
      // show DRF error nicely if it comes back as an object
      const msg =
        typeof e?.response?.data === "string"
          ? e.response.data
          : e?.response?.data
            ? JSON.stringify(e.response.data)
            : e?.message ?? "Failed to save payout method";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.10)] p-8">
          {/* top-right language */}
          <div className="flex items-center justify-end mb-6">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#f9faf7]">
              <span className="text-[14px] text-[#272635]">English</span>
              <ChevronDown className="size-4 text-[rgba(39,38,53,0.6)]" />
            </button>
          </div>

          {/* header */}
          <div className="flex items-start gap-4 pb-5 border-b border-[rgba(39,38,53,0.10)]">
            <button
              onClick={() => router.push("/student/dashboard/wallet")}
              className="size-10 rounded-full bg-[#eceee4] grid place-items-center hover:bg-[#dfe2d6] transition"
              aria-label="Back"
            >
              <ArrowLeft className="size-4 text-[#272635]" />
            </button>

            <div className="flex-1">
              <div className="text-[24px] text-[#272635]">Choose how to receive your funds</div>
              <div className="text-[14px] text-[rgba(39,38,53,0.5)] mt-1 max-w-[620px]">
                In order to process payouts to your local bank, we require you provide your bank details.
              </div>
            </div>
          </div>

          {/* Error (minimal, doesn’t change UI structure) */}
          {error ? (
            <div className="mt-6 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSave} className="mt-8">
            <div className="max-w-[560px] mx-auto space-y-4">
              {/* Select method */}
              <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-3">
                  Select preferred payout method
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod("bank_transfer")}
                    className={`h-12 rounded-[12px] border transition flex items-center justify-center gap-2 ${
                      method === "bank_transfer"
                        ? "bg-white border-[#273125]"
                        : "bg-white border-[rgba(39,38,53,0.10)] hover:border-[rgba(39,38,53,0.20)]"
                    }`}
                  >
                    <span className="text-[14px] text-[#272635]">Bank Transfer</span>
                    <span
                      className={`size-4 rounded-[4px] border grid place-items-center ${
                        method === "bank_transfer" ? "border-[#273125] bg-[#273125]" : "border-[rgba(39,38,53,0.25)]"
                      }`}
                    >
                      {method === "bank_transfer" ? <span className="text-white text-[10px]">✓</span> : null}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMethod("mobile_money")}
                    className={`h-12 rounded-[12px] border transition flex items-center justify-center gap-2 ${
                      method === "mobile_money"
                        ? "bg-white border-[#273125]"
                        : "bg-white border-[rgba(39,38,53,0.10)] hover:border-[rgba(39,38,53,0.20)]"
                    }`}
                  >
                    <span className="text-[14px] text-[#272635]">Mobile Money</span>
                    <span
                      className={`size-4 rounded-[4px] border grid place-items-center ${
                        method === "mobile_money" ? "border-[#273125] bg-[#273125]" : "border-[rgba(39,38,53,0.25)]"
                      }`}
                    >
                      {method === "mobile_money" ? <span className="text-white text-[10px]">✓</span> : null}
                    </span>
                  </button>
                </div>
              </div>

              {/* Bank transfer form */}
              {method === "bank_transfer" ? (
                <>
                  <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                    <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">Name on bank account</div>
                    <input
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                    />
                  </div>

                  <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                    <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">Bank Name</div>
                    <input
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                    />
                  </div>

                  <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                    <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">Account number</div>
                    <div className="text-[12px] text-[rgba(39,38,53,0.45)] mb-3">
                      This is usually a 10-digit number provided by your bank as your bank identification number.
                    </div>
                    <input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="xxxxxxxxxx"
                      className="w-full h-12 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                    />
                  </div>

                  <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                      <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">Currency code</div>
                      <div className="relative">
                        <select
                          value={currencyCode}
                          onChange={(e) => setCurrencyCode(e.target.value)}
                          className="w-full h-12 px-4 pr-10 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                        >
                          <option value="NGN">NGN</option>
                          <option value="KES">KES</option>
                          <option value="GHS">GHS</option>
                          <option value="XOF">XOF</option>
                        </select>
                        {/* <ChevronDown className="size-4 text-[rgba(39,38,53,0.45)] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" /> */}
                      </div>
                    </div>
                </>
              ) : (
                <>
                  <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                    <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-3">Select preferred provider</div>
                    <div className="flex items-center gap-3">
                      {providers.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setProvider(p.id)}
                          className={`size-10 rounded-[10px] bg-white border grid place-items-center transition ${
                            provider === p.id ? "border-[#198754]" : "border-[rgba(39,38,53,0.10)] hover:border-[rgba(39,38,53,0.20)]"
                          }`}
                          aria-label={p.label}
                          title={p.label}
                        >
                          <span className="text-[16px]">{p.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                    <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">Phone Number</div>
                    <div className="flex items-center gap-3">
                      <input
                        value={phoneCountry}
                        onChange={(e) => setPhoneCountry(e.target.value)}
                        className="w-[120px] h-12 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                      />
                      <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="874950345"
                        className="flex-1 h-12 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/student/dashboard/wallet")}
                  className="text-[14px] text-[#272635] underline"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!canSave || saving}
                  className={`h-12 px-6 rounded-[10px] text-[14px] text-white transition ${
                    canSave && !saving ? "bg-[#273125] hover:bg-[#1a2119]" : "bg-[#6c757d] cursor-not-allowed"
                  }`}
                >
                  {saving ? "Saving..." : "Save Details"}
                </button>
              </div>
            </div>
          </form>

          {/* footer links like design */}
          <div className="mt-10 flex items-center justify-end gap-5 text-[12px] text-[rgba(39,38,53,0.45)]">
            <span>Terms</span>
            <span>Legal</span>
            <span>Privacy policy</span>
            <span>Cookie policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}