"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  DonorCampaignDetails,
  type DonorCampaignDetailsData,
} from "@/components/donor/DonorCampaignDetails";

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

const campaignMap: Record<string, DonorCampaignDetailsData> = {
  "1": {
    id: 1,
    title: "Academic Support for 2023/2024 session",
    managedBy: "FabFour",
    status: "Active",
    studentName: "Mollie Hall",
    studentSubtitle: "100L student",
    school: "University of Nigeria Nsukka",
    department: "Chemical Eng",
    story:
      "I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.",
    raisedSoFar: 106.5,
    campaignGoal: 2654.68,
    donationsCount: 107,
    progress: 40,
    heroImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    studentAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    goalTags: ["Accommodation", "Tuition Fees", "Books and Learning Materials"],
    recentDonors: [
      { id: 1, name: "Anonymous", amount: 50.5 },
      { id: 2, name: "Anonymous", amount: 50.5 },
      { id: 3, name: "Anonymous", amount: 50.5 },
      { id: 4, name: "Anonymous", amount: 50.5 },
    ],
    comments: [
      {
        id: 1,
        name: "Katherine Moss",
        text: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        time: "Thursday 11:40am",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: 2,
        name: "Katherine Moss",
        text: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        time: "Thursday 11:40am",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  "2": {
    id: 2,
    title: "School Fees Support Campaign",
    managedBy: "FabFour",
    status: "Active",
    studentName: "Bamba Toure",
    studentSubtitle: "200L student",
    school: "University of Lagos",
    department: "Computer Science",
    story:
      "This campaign supports tuition, transport, and core academic needs so the student can stay focused on learning and growth.",
    raisedSoFar: 250.0,
    campaignGoal: 1200,
    donationsCount: 24,
    progress: 55,
    heroImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    studentAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    goalTags: ["Tuition Fees", "Transport", "Books"],
    recentDonors: [
      { id: 1, name: "Anonymous", amount: 30 },
      { id: 2, name: "Anonymous", amount: 50 },
      { id: 3, name: "Anonymous", amount: 25 },
    ],
    comments: [
      {
        id: 1,
        name: "Katherine Moss",
        text: "Thank you for supporting this student journey.",
        time: "Friday 9:10am",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
};

export default function DonorCampaignDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeSection, setActiveSection] =
    useState<DonorSection>("campaigns");
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

  const campaign = campaignMap[params.id] || campaignMap["1"];

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
            <DonorCampaignDetails campaign={campaign} />
          </div>
        </section>
      </div>
    </main>
  );
}