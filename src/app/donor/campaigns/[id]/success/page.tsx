"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorDonationSuccess,
  type DonorDonationSuccessData,
} from "@/components/donor/DonorDonationSuccess";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
};

const campaignMap: Record<string, DonorDonationSuccessData> = {
  "1": {
    id: 1,
    title: "Academic Support for 2023/2024 session",
    studentName: "Mollie Hall",
    studentLevel: "100L",
    studentSchool: "University of Lagos",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  "2": {
    id: 2,
    title: "School Fees Support Campaign",
    studentName: "Bamba Toure",
    studentLevel: "200L",
    studentSchool: "University of Lagos",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
};

export default function DonorDonationSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();

  const [activeSection, setActiveSection] = useState<DonorSection>("campaigns");
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("fab4_user");
    if (!rawUser) return;

    try {
      setUser(JSON.parse(rawUser));
    } catch (error) {
      console.error("Failed to parse fab4_user", error);
    }
  }, []);

  const userData = useMemo(() => {
    const firstName = user?.first_name?.trim() || "";
    const lastName = user?.last_name?.trim() || "";
    const fullName = `${firstName} ${lastName}`.trim();

    return {
      name: fullName || "Influence",
      email: user?.email || "talktome@example.com",
      avatar: user?.profile_image || user?.avatar || "",
    };
  }, [user]);

  const campaign = campaignMap[id] || campaignMap["1"];
  const amount = Number(searchParams.get("amount") || "106.5");

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
            <DonorDonationSuccess campaign={campaign} amount={amount} />
          </div>
        </section>
      </div>
    </main>
  );
}