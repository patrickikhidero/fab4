"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorStudentsList,
  type DonorStudentItem,
} from "@/components/donor/DonorStudentsList";
import { getStoredUser } from "@/lib/auth/storage";
import { listMyDonations, type DonationListItem } from "@/lib/donor/donations";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
  photo?: string | null;
};

function toNumber(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function mapRelationship(value?: string): "guardian" | "good_samaritan" {
  return value?.toUpperCase() === "GUARDIAN" ? "guardian" : "good_samaritan";
}

function mapStatus(value?: string): "active" | "paused" | undefined {
  const normalized = value?.toUpperCase();
  if (normalized === "SUCCESS" || normalized === "PENDING") return "active";
  return "paused";
}

function mapDonationToStudentItem(item: DonationListItem): DonorStudentItem {
  return {
    id: item.id,
    name: item.name || "Student",
    level: "Student beneficiary",
    school: "FabFour Foundation",
    totalRaised: toNumber(item.donation),
    relationship: mapRelationship(item.donor_type),
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    countryFlag: "🇳🇬",
    status: mapStatus(item.status),
  };
}

export default function DonorStudentsPage() {
  const [activeSection, setActiveSection] = useState<DonorSection>("students");
  const [user, setUser] = useState<StoredUser | null>(null);
  const [students, setStudents] = useState<DonorStudentItem[]>([]);
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

        const res = await listMyDonations({
          limit: 100,
          offset: 0,
        });

        const mapped = res.results.map(mapDonationToStudentItem);
        setStudents(mapped);
      } catch (err: any) {
        console.error("Failed to load donor students", err);
        setError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            err?.message ||
            "Unable to load students."
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

        <section className="min-w-0 flex-1 bg-[#efefe9] px-3 pt-[76px] sm:px-4 lg:px-6 lg:pt-7 xl:px-8">
          <div className="mx-auto max-w-[1250px] pb-8">
            {isLoading ? (
              <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(39,38,53,0.06)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
                  <div className="max-w-[960px]">
                    <div className="h-8 w-72 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />

                    <div className="mt-6 h-px w-full bg-[rgba(39,38,53,0.08)]" />

                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-5">
                        <div className="h-5 w-10 animate-pulse rounded bg-gray-200" />
                        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                      </div>
                      <div className="h-10 w-24 animate-pulse rounded-[10px] bg-gray-200" />
                    </div>

                    <div className="mt-4 overflow-x-auto">
                      <div className="min-w-[720px]">
                        <div className="grid grid-cols-[2.2fr_1.4fr_1fr_1fr] rounded-[10px] bg-[#f7f7f4] px-4 py-3">
                          <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
                          <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
                          <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                          <div />
                        </div>

                        <div className="divide-y divide-[rgba(39,38,53,0.08)]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-[2.2fr_1.4fr_1fr_1fr] items-center px-4 py-4"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200" />
                                <div className="flex-1">
                                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                                  <div className="mt-1 h-3 w-20 animate-pulse rounded bg-gray-200" />
                                </div>
                              </div>
                              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                              <div className="flex justify-end">
                                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-2">
                      <div className="h-9 w-9 animate-pulse rounded-[10px] bg-gray-200" />
                      <div className="h-9 w-9 animate-pulse rounded-[10px] bg-gray-200" />
                    </div>
                  </div>

                  <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-end">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                    ))}
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="min-h-[calc(100vh-120px)] rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <h2 className="text-[28px] text-[#272635]">Students</h2>
                <p className="mt-2 text-[14px] text-red-600">{error}</p>
              </div>
            ) : students.length === 0 ? (
              <div className="min-h-[calc(100vh-120px)] rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <h2 className="text-[28px] text-[#272635]">Students</h2>
                <p className="mt-2 text-[14px] text-[rgba(39,38,53,0.65)]">
                  No supported students found yet.
                </p>
              </div>
            ) : (
              <DonorStudentsList items={students} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}