"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SidebarNavigation } from "@/components/modules/student/SidebarNavigation";

import { getStoredUser, getUserIdFromToken } from "@/lib/auth/storage";
import { getStudentProfile, type StudentProfileResponse } from "@/lib/student/application";
import { getCampaignOverview, listMyCampaigns } from "@/lib/student/campaign";

type DashboardSection = "application" | "campaign" | "wallet" | "status" | "conversations";

type UserData = {
  name: string;
  email: string;
  avatar: string;
};

type CampaignListItem = {
  id: number;
  goal?: number | string | null;
  amount_target?: number | string | null;
  amount?: number | string | null;
  amount_raised?: number | string | null;
  raised_amount?: number | string | null;
  drafted?: boolean;
  accepted?: boolean;
  [k: string]: any;
};

type CampaignSummary = {
  currentAmount: number;
  weekAmount: number;
  monthAmount: number;
  progress: number;
};

function toNum(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function pickCurrentCampaign(results: CampaignListItem[]): CampaignListItem | null {
  if (!results?.length) return null;
  return (
    results.find((c) => c.accepted === true && c.drafted === false) ??
    results.find((c) => c.drafted === false) ??
    results[0] ??
    null
  );
}

function mapCampaignRaised(c: CampaignListItem | null) {
  if (!c) return 0;
  return toNum(c.amount_raised) || toNum(c.raised_amount) || toNum(c.amount) || 0;
}

function mapCampaignGoal(c: CampaignListItem | null) {
  if (!c) return 0;
  return toNum(c.goal) || toNum(c.amount_target) || 0;
}

function resolveActiveSection(pathname: string): DashboardSection {
  if (pathname.startsWith("/student/dashboard/conversations")) return "conversations";
  if (pathname.startsWith("/student/dashboard/wallet")) return "wallet";
  if (pathname.startsWith("/student/dashboard/campaign")) return "campaign";
  if (pathname.startsWith("/student/dashboard/application")) return "application";
  return "application";
}

function TopRightHeader({
  onConversations,
}: {
  onConversations: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        onClick={onConversations}
        className="h-9 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.08)] text-[13px] text-[#272635] inline-flex items-center gap-2"
      >
        <span className="text-[14px]">💬</span>
        <span>Conversations</span>
      </button>

      <button className="h-9 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.08)] text-[13px] text-[#272635] inline-flex items-center gap-2">
        <span className="text-[14px]">🌐</span>
        <span>English</span>
        <span className="opacity-60">▾</span>
      </button>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="mt-10 flex justify-end gap-6 text-[12px] text-[rgba(39,38,53,0.5)]">
      <span>Terms</span>
      <span>Legal</span>
      <span>Privacy policy</span>
      <span>Cookie policy</span>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeSection = useMemo(() => resolveActiveSection(pathname), [pathname]);

  const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfileResponse | null>(null);

  const [userData, setUserData] = useState<UserData>({
    name: "User",
    email: "",
    avatar: "",
  });

  const [campaignSummary, setCampaignSummary] = useState<CampaignSummary | null>(null);

  const currentStep = 1;

  useEffect(() => {
    const run = async () => {
      try {
        setIsLoadingSidebar(true);

        const storedUser = getStoredUser();
        let userId: number | null = storedUser?.id ?? null;
        if (!userId) userId = getUserIdFromToken();

        if (!userId) {
          console.warn("No user ID found, using default 224 for demo");
          userId = 224;
        }

        const profile = await getStudentProfile(userId);
        setStudentProfile(profile ?? null);

        const verified = !!profile?.is_verified;
        setIsVerified(verified);

        const nameFromUser = `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`.trim();
        const nameFromProfile = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim();

        setUserData({
          name: nameFromUser || nameFromProfile || "User",
          email: storedUser?.email || profile?.email || "",
          avatar: storedUser?.photo || "",
        });

        if (!verified) {
          setCampaignSummary(null);
          return;
        }

        try {
          const [overview, myCampaigns] = await Promise.all([getCampaignOverview(), listMyCampaigns()]);

          const results: CampaignListItem[] = myCampaigns?.results ?? [];
          const current = pickCurrentCampaign(results);

          const currentAmount =
            toNum(overview?.current_campaign) ||
            toNum(overview?.overall_stats.total_amount_raised) ||
            mapCampaignRaised(current);

          const weekAmount =
            toNum(overview?.this_week) || toNum(overview?.week_raised) || toNum(overview?.weekly_growth) || 0;

          const monthAmount =
            toNum(overview?.this_month) || toNum(overview?.month_raised) || toNum(overview?.monthly_growth) || 0;

          const goal = mapCampaignGoal(current);

          const progress =
            toNum(overview?.progress_percent) ||
            (goal > 0 ? Math.round((currentAmount / goal) * 100) : 0);

          setCampaignSummary({ currentAmount, weekAmount, monthAmount, progress });
        } catch (err) {
          console.error("Failed to fetch campaign summary", err);
          setCampaignSummary(null);
        }
      } catch (err) {
        console.error("Sidebar bootstrap failed", err);

        const storedUser = getStoredUser();
        const nameFromUser = `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`.trim();

        setUserData({
          name: nameFromUser || storedUser?.email || "User",
          email: storedUser?.email || "",
          avatar: storedUser?.photo || "",
        });

        setIsVerified(false);
        setCampaignSummary(null);
      } finally {
        setIsLoadingSidebar(false);
      }
    };

    run();
  }, []);

  const onNavigationChange = (section: DashboardSection) => {
    switch (section) {
      case "application":
        router.push("/student/dashboard/application/profile");
        break;
      case "campaign":
        router.push("/student/dashboard/campaign");
        break;
      case "wallet":
        router.push("/student/dashboard/wallet");
        break;
      case "conversations":
        router.push("/student/dashboard/conversations");
        break;
      default:
        router.push("/student/dashboard/application/profile");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#eceee4]">
      <SidebarNavigation
        currentStep={currentStep}
        userData={userData}
        onNavigationChange={onNavigationChange}
        activeSection={activeSection}
        isVerified={isVerified}
        campaignSummary={isVerified ? campaignSummary : null}
      />

      {/* Main */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-[24px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.12)] min-h-[calc(100vh-64px)] p-8">
          <TopRightHeader onConversations={() => router.push("/student/dashboard/conversations")} />

          <div className="mt-8">
            {isLoadingSidebar ? <div className="text-[#272635]">Loading...</div> : children}
          </div>

          <FooterLinks />
        </div>
      </div>
    </div>
  );
}