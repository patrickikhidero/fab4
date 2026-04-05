"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorCampaignDetails,
  type DonorCampaignDetailsData,
} from "@/components/donor/DonorCampaignDetails";
import { getStoredUser } from "@/lib/auth/storage";
import { getDonorCampaign } from "@/lib/donor/campaigns";
import { listCampaignDonations } from "@/lib/donor/donations";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
  photo?: string | null;
  user_type?: string | null;
};

function toNumber(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function prettifyNeed(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DonorCampaignDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeSection, setActiveSection] =
    useState<DonorSection>("campaigns");
  const [user, setUser] = useState<StoredUser | null>(null);
  const [campaign, setCampaign] = useState<DonorCampaignDetailsData | null>(null);
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

        let donationsRes: { count: number; results: any[] } = { count: 0, results: [] };
        try {
          donationsRes = await listCampaignDonations(campaignId, { limit: 20, offset: 0 });
        } catch {
          console.warn("Could not load donation history for campaign", campaignId);
        }

        const mapped: DonorCampaignDetailsData = {
          id: campaignRes.id,
          title: campaignRes.name || `Campaign #${campaignRes.id}`,
          managedBy: "FabFour",
          status: campaignRes.accepted ? "Active" : campaignRes.drafted ? "Draft" : "Pending",
          studentName: "Student",
          studentSubtitle: campaignRes.academic_session || "Student campaign",
          school: campaignRes.academic_session || "Academic Session",
          department: "Student Campaign",
          story: campaignRes.description || "No campaign description available.",
          raisedSoFar: 0,
          campaignGoal: toNumber(campaignRes.goal),
          donationsCount: donationsRes.count ?? donationsRes.results.length,
          progress: toNumber(campaignRes.percentage),
          heroImage:
            campaignRes.cover_photo ||
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
          studentAvatar:
            campaignRes.cover_photo ||
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          goalTags: (campaignRes.academic_needs || []).map(prettifyNeed),
          recentDonors: donationsRes.results.slice(0, 6).map((item, index) => ({
            id: item.id ?? index + 1,
            name: "Anonymous",
            amount: toNumber(item.amount),
          })),
          comments: [],
        };

        setCampaign(mapped);
      } catch (err: any) {
        console.error("Failed to load donor campaign details", err);
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Unable to load campaign details."
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
              <div className="rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <p className="text-[14px] text-[rgba(39,38,53,0.65)]">
                  Loading campaign...
                </p>
              </div>
            ) : error ? (
              <div className="rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <p className="text-[14px] text-red-600">{error}</p>
              </div>
            ) : campaign ? (
              <DonorCampaignDetails campaign={campaign} />
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}