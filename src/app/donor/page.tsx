"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorCampaignGrid,
  type DonorCampaignItem,
} from "@/components/donor/DonorCampaignGrid";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
  USER_TYPE?: string | null;
  user_type?: string | null;
};

const mockCampaigns: DonorCampaignItem[] = [
  {
    id: 1,
    name: "Bamba Toure",
    amountRaised: 50.5,
    progress: 40,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    tags: ["Tuition", "Learning materials"],
  },
  {
    id: 2,
    name: "Bamba Toure",
    amountRaised: 50.5,
    progress: 40,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    tags: ["Tuition", "Learning materials"],
  },
  {
    id: 3,
    name: "Bamba Toure",
    amountRaised: 50.5,
    progress: 40,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    tags: ["Tuition", "Learning materials"],
  },
  {
    id: 4,
    name: "Bamba Toure",
    amountRaised: 50.5,
    progress: 40,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    tags: ["Tuition", "Learning materials"],
  },
  {
    id: 5,
    name: "Bamba Toure",
    amountRaised: 50.5,
    progress: 40,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    tags: ["Tuition", "Learning materials"],
  },
  {
    id: 6,
    name: "Bamba Toure",
    amountRaised: 50.5,
    progress: 40,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    tags: ["Tuition", "Learning materials"],
  },
  {
    id: 7,
    name: "Aisha Bello",
    amountRaised: 90.0,
    progress: 65,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    tags: ["Books", "Tuition"],
  },
  {
    id: 8,
    name: "David Musa",
    amountRaised: 120.0,
    progress: 80,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    tags: ["Accommodation", "School fees"],
  },
];

export default function DonorPage() {
  const [activeSection, setActiveSection] = useState<DonorSection>("campaigns");
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("fab4_user");
    if (!rawUser) return;

    try {
      const parsed = JSON.parse(rawUser);
      setUser(parsed);
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

        <section className="flex-1 min-w-0 bg-[#efefe9] pt-[76px] lg:pt-7 px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="mx-auto max-w-[1200px] pb-8">
            {activeSection === "campaigns" && (
              <DonorCampaignGrid items={mockCampaigns} />
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