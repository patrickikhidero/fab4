"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorDonationCheckout,
  type DonorDonationCheckoutData,
} from "@/components/donor/DonorDonationCheckout";
import { getStoredUser } from "@/lib/auth/storage";
import { getDonorCampaign } from "@/lib/donor/campaigns";
import {
  createDonation,
  type Donation,
} from "@/lib/donor/donations";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
  photo?: string | null;
};

export default function DonorDonatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeSection, setActiveSection] = useState<DonorSection>("campaigns");
  const [user, setUser] = useState<StoredUser | null>(null);
  const [campaign, setCampaign] = useState<DonorDonationCheckoutData | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredUser() as StoredUser | null;
    setUser(stored ?? null);
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const campaignId = Number(id);
        const campaignRes = await getDonorCampaign(campaignId);

        setCurrency(campaignRes.currency || "USD");

        setCampaign({
          id: campaignRes.id,
          title: campaignRes.name || `Campaign #${campaignRes.id}`,
          studentName: "Student",
          studentSubtitle: campaignRes.academic_session || "Student campaign",
          studentSchool: campaignRes.academic_session || "Academic Session",
          heroAvatar:
            campaignRes.cover_photo ||
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        });
      } catch (err: any) {
        console.error("Failed to load donation checkout", err);
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Unable to load donation checkout."
        );
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [id]);

  const userData = useMemo(() => {
    const firstName = user?.first_name?.trim() || "";
    const lastName = user?.last_name?.trim() || "";
    const fullName = `${firstName} ${lastName}`.trim();

    return {
      name: fullName || "Influence",
      email: user?.email || "talktome@example.com",
      avatar: user?.photo || user?.profile_image || user?.avatar || "",
    };
  }, [user]);

  const handleCreateDonation = async (payload: {
    amount: number;
    paymentMethod: "paystack" | "googlepay" | "stripe";
    anonymous: boolean;
  }) => {
    if (!campaign) throw new Error("Campaign is missing.");

    const provider =
      payload.paymentMethod === "paystack" ? "PAYSTACK" : "STRIPE";

    const donorType = payload.anonymous ? "GOOD_SAMARITAN" : "GUARDIAN";

    const effectiveCurrency = provider === "STRIPE" ? "USD" : currency;

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";

    const donation: Donation = await createDonation(
      {
        amount: payload.amount,
        payment_providers: provider,
        currency: effectiveCurrency,
        donor_type: donorType,
        campaign: campaign.id,
      },
      {
        return_url: `${origin}/donor/campaigns/${campaign.id}/donate`,
        success_url: `${origin}/donor/campaigns/${campaign.id}/success`,
        ui_mode: "hosted",
      }
    );

    const checkoutUrl = donation?.session_details?.url;
    if (checkoutUrl && typeof window !== "undefined") {
      window.location.href = checkoutUrl;
      return;
    }

    throw new Error("Checkout URL was not returned by the backend.");
  };

  return (
    <main className="min-h-screen bg-[#1f1f1f]">
      <div className="flex min-h-screen">
        <DonorSidebar
          userData={userData}
          activeSection={activeSection}
          onNavigationChange={setActiveSection}
        />

        <section className="min-w-0 flex-1 bg-[#efefe9] px-3 pt-[76px] sm:px-4 lg:px-6 lg:pt-7 xl:px-8">
          <div className="mx-auto max-w-[1250px] pb-8">
            {isLoading ? (
              <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(39,38,53,0.06)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-200" />
                    <div>
                      <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
                      <div className="mt-2 h-4 w-28 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="mt-8 max-w-[480px]">
                    <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="mt-4 flex flex-wrap gap-3">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="h-11 w-16 animate-pulse rounded-full bg-gray-200" />
                      ))}
                    </div>
                    <div className="mt-6 h-12 w-full animate-pulse rounded-[12px] bg-gray-200" />
                    <div className="mt-6 h-5 w-36 animate-pulse rounded bg-gray-200" />
                    <div className="mt-3 space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-14 w-full animate-pulse rounded-[12px] bg-gray-200" />
                      ))}
                    </div>
                    <div className="mt-6 h-5 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="mt-8 h-12 w-full animate-pulse rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="min-h-[calc(100vh-120px)] rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <p className="text-[14px] text-red-600">{error}</p>
              </div>
            ) : campaign ? (
              <DonorDonationCheckout
                campaign={campaign}
                onDonate={handleCreateDonation}
                currency="USD"
              />
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}