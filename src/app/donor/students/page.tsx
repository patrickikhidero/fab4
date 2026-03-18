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
              <div className="rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <h2 className="text-[28px] text-[#272635]">Students</h2>
                <p className="mt-2 text-[14px] text-[rgba(39,38,53,0.65)]">
                  Loading students...
                </p>
              </div>
            ) : error ? (
              <div className="rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
                <h2 className="text-[28px] text-[#272635]">Students</h2>
                <p className="mt-2 text-[14px] text-red-600">{error}</p>
              </div>
            ) : students.length === 0 ? (
              <div className="rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-10 lg:px-10">
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