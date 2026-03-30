"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { FooterLinks } from "@/components/shared/FooterLinks";

export interface DonorDonationCheckoutData {
  id: number;
  title: string;
  studentName: string;
  studentSubtitle: string;
  studentSchool: string;
  heroAvatar: string;
}

interface DonorDonationCheckoutProps {
  campaign: DonorDonationCheckoutData;
  currency?: string;
  onDonate: (payload: {
    amount: number;
    paymentMethod: "paystack" | "googlepay" | "stripe";
    anonymous: boolean;
  }) => Promise<void>;
}

const PRESET_AMOUNTS = [10, 20, 30, 40, 50, 60, 70];

type PaymentMethod = "paystack" | "googlepay" | "stripe";

export function DonorDonationCheckout({
  campaign,
  currency = "USD",
  onDonate,
}: DonorDonationCheckoutProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState<string>("20");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("googlepay");
  const [anonymous, setAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const numericAmount = useMemo(() => {
    const parsed = Number(customAmount);
    if (Number.isNaN(parsed) || parsed <= 0) return 0;
    return parsed;
  }, [customAmount]);

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
  };

  const handleDonate = async () => {
    if (!numericAmount || numericAmount <= 0 || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await onDonate({
        amount: numericAmount,
        paymentMethod,
        anonymous,
      });
    } catch (err: any) {
      console.error("Donation checkout failed", err);
      setSubmitError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to start donation checkout."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(39,38,53,0.06)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex items-center gap-1 text-[12px] text-[rgba(39,38,53,0.72)]"
        >
          <span>English</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-[620px]">
          <div className="flex items-center gap-3">
            <Link
              href={`/donor/campaigns/${campaign.id}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f2f3ec] text-[#272635]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <h1 className="text-[24px] text-[#272635] sm:text-[28px]">
              Your donation matters!
            </h1>
          </div>

          <div className="mt-6 h-px w-full bg-[rgba(39,38,53,0.08)]" />

          <div className="mt-6 flex items-start gap-3 rounded-[16px] bg-[#fbfbf8] p-4">
            <img
              src={campaign.heroAvatar}
              alt={campaign.studentName}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h2 className="text-[16px] text-[#272635]">{campaign.title}</h2>
              <p className="mt-1 text-[12px] leading-5 text-[rgba(39,38,53,0.55)]">
                Hello family, My name is {campaign.studentName} a student of{" "}
                {campaign.studentSchool} who’s currently a recipient in the
                FabFour Foundation support program.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-[10px] bg-[#153f30] px-3 py-2 text-[12px] text-white">
                  Good Samaritan
                </span>
                <span className="inline-flex items-center rounded-[10px] bg-[#f2f3ec] px-3 py-2 text-[12px] text-[rgba(39,38,53,0.55)]">
                  Guardian
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[13px] text-[rgba(39,38,53,0.75)]">
              Enter a one-time donation amount
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {PRESET_AMOUNTS.map((amount) => {
                const active = selectedAmount === amount;

                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePresetClick(amount)}
                    className={`h-10 min-w-[52px] rounded-[10px] border px-4 text-[14px] transition ${
                      active
                        ? "border-[#272635] bg-[#272635] text-white"
                        : "border-[rgba(39,38,53,0.08)] bg-white text-[#272635]"
                    }`}
                  >
                    ${amount}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-[#fafaf8] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-[18px] text-[rgba(39,38,53,0.45)]">$</span>
                <input
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    const parsed = Number(e.target.value);
                    if (!Number.isNaN(parsed)) {
                      setSelectedAmount(parsed);
                    }
                  }}
                  inputMode="decimal"
                  className="w-full bg-transparent text-[34px] leading-none text-[#272635] outline-none"
                />
              </div>

              <div className="ml-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(39,38,53,0.08)] bg-white px-3 py-2 text-[12px] text-[rgba(39,38,53,0.7)]">
                <span>🇺🇸</span>
                <span>{currency}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PaymentOption
              label="Paystack"
              active={paymentMethod === "paystack"}
              onClick={() => setPaymentMethod("paystack")}
            />

            <PaymentOption
              label="G Pay / Stripe"
              active={paymentMethod === "googlepay"}
              onClick={() => setPaymentMethod("googlepay")}
            />

            <PaymentOption
              label="Stripe"
              active={paymentMethod === "stripe"}
              onClick={() => setPaymentMethod("stripe")}
            />
          </div>

          <label className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[rgba(39,38,53,0.2)]"
            />

            <span className="text-[12px] leading-5 text-[rgba(39,38,53,0.65)]">
              Don&apos;t display my name publicly on the fundraiser.
              <br />
              By checking this box, I will appear as &quot;Anonymous&quot; to
              other FabFour donors. However, organizers, their team members, the
              beneficiary and others will receive information about me as
              described in our{" "}
              <span className="text-[#198754]">Privacy Notice</span>.
            </span>
          </label>

          {submitError ? (
            <p className="mt-4 text-[13px] text-red-600">{submitError}</p>
          ) : null}

          <button
            type="button"
            onClick={handleDonate}
            disabled={numericAmount <= 0 || isSubmitting}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-[10px] bg-[#153f30] text-[14px] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Processing..."
              : paymentMethod === "googlepay"
              ? `Pay with GooglePay`
              : paymentMethod === "stripe"
              ? "Continue with Stripe"
              : "Continue to Paystack"}
          </button>

          <div className="mt-6 rounded-[14px] border border-[rgba(39,38,53,0.08)] bg-[#fbfbf8] px-4 py-4 text-[12px] leading-5 text-[rgba(39,38,53,0.6)]">
            FabFour has a 0% platform fee for organizers. By choosing the
            payment method above, you agree to the FabFour{" "}
            <span className="text-[#198754]">Terms of Service</span> and
            acknowledge the <span className="text-[#198754]">Privacy Notice</span>.
          </div>
        </div>

        <FooterLinks className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[rgba(39,38,53,0.5)] lg:justify-end" />
      </div>
    </div>
  );
}

function PaymentOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[54px] items-center justify-between rounded-[12px] border px-4 text-left transition ${
        active
          ? "border-[#272635] bg-white"
          : "border-[rgba(39,38,53,0.08)] bg-white"
      }`}
    >
      <span className="text-[14px] text-[#272635]">{label}</span>

      <span
        className={`grid h-4 w-4 place-items-center rounded-[4px] border ${
          active
            ? "border-[#272635] bg-[#272635] text-white"
            : "border-[rgba(39,38,53,0.2)] bg-white"
        }`}
      >
        {active ? "✓" : ""}
      </span>
    </button>
  );
}