"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorStudentProfile,
  type DonorStudentProfileData,
} from "@/components/donor/DonorStudentProfile";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
};

const studentMap: Record<string, DonorStudentProfileData> = {
  "1": {
    id: 1,
    name: "Mollie Hall",
    level: "100L student",
    school: "University of Nigeria Nsukka",
    department: "Chemical Eng",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    about:
      "I’m a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.",
    raisedSoFar: 106.5,
    campaignGoal: 2654.68,
    donations: 107,
    progress: 40,
    goalTags: ["Accommodation", "Tuition Fees", "Books and Learning Materials"],
    expenseItems: [
      { label: "Accommodation", amountKES: 1200, amountUSD: 36.89 },
      { label: "Tuition Fees", amountKES: 875, amountUSD: 36.89 },
      { label: "Books and Learning Materials", amountKES: 2760, amountUSD: 36.89 },
    ],
    academicItems: [
      { label: "Current GPA", value: "4.61 / 5.00" },
      { label: "Attendance", value: "92%" },
    ],
  },
};

export default function DonorStudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<DonorSection>("students");
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("fab4_user");
    if (!rawUser) return;

    try {
      setUser(JSON.parse(rawUser));
    } catch (error) {
      console.error("Failed to parse fab4_user from localStorage", error);
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

  const student = studentMap[params.id] || studentMap["1"];
  const view = searchParams.get("view");
  const initialTab = view === "academic" ? "academic" : "expense";

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
            <DonorStudentProfile student={student} initialTab={initialTab} />
          </div>
        </section>
      </div>
    </main>
  );
}