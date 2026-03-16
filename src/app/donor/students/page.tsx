"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorStudentsList,
  type DonorStudentItem,
} from "@/components/donor/DonorStudentsList";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
};

const mockStudents: DonorStudentItem[] = [
  {
    id: 1,
    name: "Mollie Hall",
    level: "100L student",
    school: "University of Lagos",
    totalRaised: 15400.72,
    relationship: "guardian",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    countryFlag: "🇳🇬",
    status: "active",
  },
  {
    id: 2,
    name: "Mollie Hall",
    level: "100L student",
    school: "University of Lagos",
    totalRaised: 15400.72,
    relationship: "guardian",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    countryFlag: "🇳🇬",
    status: "active",
  },
  {
    id: 3,
    name: "Mollie Hall",
    level: "100L student",
    school: "University of Lagos",
    totalRaised: 15400.72,
    relationship: "good_samaritan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    countryFlag: "🇳🇬",
    status: "active",
  },
  {
    id: 4,
    name: "Mollie Hall",
    level: "100L student",
    school: "University of Lagos",
    totalRaised: 15400.72,
    relationship: "good_samaritan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    countryFlag: "🇳🇬",
    status: "active",
  },
  {
    id: 5,
    name: "Mollie Hall",
    level: "100L student",
    school: "University of Lagos",
    totalRaised: 15400.72,
    relationship: "good_samaritan",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    countryFlag: "🇳🇬",
    status: "active",
  },
];

export default function DonorStudentsPage() {
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
            <DonorStudentsList items={mockStudents} />
          </div>
        </section>
      </div>
    </main>
  );
}