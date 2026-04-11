"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorCampaignGrid,
  type DonorCampaignItem,
} from "@/components/donor/DonorCampaignGrid";
import { getStoredUser } from "@/lib/auth/storage";
import { listDonorCampaigns, type DonorCampaign } from "@/lib/donor/campaigns";

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

function mapNeedsToTags(needs?: string[]) {
  if (!Array.isArray(needs)) return [];
  return needs.map((item) =>
    item
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function mapCampaignToGridItem(campaign: DonorCampaign): DonorCampaignItem {
  return {
    id: campaign.id,
    name: campaign.name || `Campaign #${campaign.id}`,
    amountRaised: 0,
    progress: toNumber(campaign.percentage),
    image:
      campaign.cover_photo ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    tags: mapNeedsToTags(campaign.academic_needs),
  };
}

export default function DonorPage() {
  const [activeSection, setActiveSection] = useState<DonorSection>("campaigns");
  const [user, setUser] = useState<StoredUser | null>(null);
  const [campaigns, setCampaigns] = useState<DonorCampaignItem[]>([]);
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

        const res = await listDonorCampaigns({
          limit: 100,
          offset: 0,
          accepted: true,
          drafted: false,
        });

        setCampaigns(
          res.results
            .filter((c) => c.accepted === true && c.drafted === false)
            .map(mapCampaignToGridItem)
        );
      } catch (err: any) {
        console.error("Failed to load donor campaigns", err);
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Unable to load campaigns."
        );
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

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

        <section className="flex-1 min-w-0 bg-[#efefe9] pt-[76px] lg:pt-7 px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="mx-auto max-w-[1200px] pb-8">
            {activeSection === "campaigns" && (
              <>
                {isLoading ? (
                  <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(39,38,53,0.06)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                    <div className="flex flex-col gap-4 border-b border-[rgba(39,38,53,0.06)] px-4 py-4 sm:px-6 lg:px-10 lg:py-6">
                      <div className="flex items-center justify-end">
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                      </div>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="h-11 w-full lg:max-w-[360px] animate-pulse rounded-full bg-gray-200" />
                        <div className="flex gap-3 lg:gap-6">
                          <div className="h-11 w-36 animate-pulse rounded-full bg-gray-200" />
                          <div className="h-11 w-36 animate-pulse rounded-full bg-gray-200" />
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
                      <div className="mb-8">
                        <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
                        <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                      </div>

                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i}>
                            <div className="h-[220px] w-full animate-pulse rounded-[24px] bg-gray-200" />
                            <div className="mt-3 flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                                <div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-200" />
                                <div className="mt-1 h-4 w-20 animate-pulse rounded bg-gray-200" />
                              </div>
                              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                            </div>
                            <div className="mt-3 flex gap-2">
                              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
                              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                        <div className="flex gap-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-9 w-9 animate-pulse rounded-[10px] bg-gray-200" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="min-h-[calc(100vh-120px)] rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                    <h2 className="text-[28px] text-[#272635]">Campaigns</h2>
                    <p className="mt-2 text-[14px] text-red-600">{error}</p>
                  </div>
                ) : (
                  <DonorCampaignGrid items={campaigns} />
                )}
              </>
            )}

            {activeSection === "students" && (
              <div className="rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <h2 className="text-[28px] text-[#272635]">Students</h2>
                <p className="mt-2 text-[14px] text-[rgba(39,38,53,0.65)]">
                  Students list UI will go here next.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}