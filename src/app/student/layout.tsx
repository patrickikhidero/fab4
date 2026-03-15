"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SidebarNavigation } from "@/components/modules/student/SidebarNavigation";
import { FooterLinks } from "@/components/shared/FooterLinks";

import { getStoredUser, setAuthTokens } from "@/lib/auth/storage";
import { getMe, type MeResponse } from "@/lib/api/users";
import { getCampaignOverview, listMyCampaigns } from "@/lib/student/campaign";

type DashboardSection = "application" | "campaign" | "wallet" | "conversations";

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
    <div className="flex flex-wrap items-center justify-end gap-3">
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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeSection = useMemo(() => resolveActiveSection(pathname), [pathname]);

  const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [me, setMe] = useState<MeResponse | null>(null);

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

        const meRes = await getMe();
        setMe(meRes);

        setAuthTokens({
          user: meRes,
        });

        const hasStudentProfile = !!meRes?.student_profile;
        const verified = !!meRes?.student_profile?.is_verified;

        setIsVerified(verified);

        const fullName = `${meRes?.first_name ?? ""} ${meRes?.last_name ?? ""}`.trim();
        const profileName = `${meRes?.student_profile?.first_name ?? ""} ${meRes?.student_profile?.last_name ?? ""}`.trim();

        setUserData({
          name: fullName || profileName || meRes?.email || "User",
          email: meRes?.email || "",
          avatar: meRes?.photo || "",
        });

        if (!hasStudentProfile || !verified) {
          setCampaignSummary(null);
          return;
        }

        try {
          const [overview, myCampaigns] = await Promise.all([
            getCampaignOverview(),
            listMyCampaigns(),
          ]);

          const results: CampaignListItem[] = myCampaigns?.results ?? [];
          const current = pickCurrentCampaign(results);

          const currentAmount =
            toNum(overview?.current_campaign) ||
            toNum(overview?.overall_stats?.total_amount_raised) ||
            mapCampaignRaised(current);

          const weekAmount =
            toNum(overview?.this_week) ||
            toNum(overview?.week_raised) ||
            toNum(overview?.weekly_growth) ||
            0;

          const monthAmount =
            toNum(overview?.this_month) ||
            toNum(overview?.month_raised) ||
            toNum(overview?.monthly_growth) ||
            0;

          const goal = mapCampaignGoal(current);

          const progress =
            toNum(overview?.progress_percent) ||
            (goal > 0 ? Math.round((currentAmount / goal) * 100) : 0);

          setCampaignSummary({
            currentAmount,
            weekAmount,
            monthAmount,
            progress,
          });
        } catch (err) {
          console.error("Failed to fetch campaign summary", err);
          setCampaignSummary(null);
        }
      } catch (err) {
        console.error("Sidebar bootstrap failed", err);

        const storedUser = getStoredUser() as any;
        const nameFromUser = `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`.trim();
        const nameFromProfile = `${storedUser?.student_profile?.first_name ?? ""} ${storedUser?.student_profile?.last_name ?? ""}`.trim();

        setUserData({
          name: nameFromUser || nameFromProfile || storedUser?.email || "User",
          email: storedUser?.email || "",
          avatar: storedUser?.photo || "",
        });

        setIsVerified(!!storedUser?.student_profile?.is_verified);
        setCampaignSummary(null);

        if (!storedUser) {
          router.replace("/login");
        }
      } finally {
        setIsLoadingSidebar(false);
      }
    };

    run();
  }, [router]);

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
    <div className="min-h-screen bg-[#eceee4] lg:flex">
      <SidebarNavigation
        currentStep={currentStep}
        userData={userData}
        onNavigationChange={onNavigationChange}
        activeSection={activeSection}
        isVerified={isVerified}
        campaignSummary={isVerified ? campaignSummary : null}
      />

      <div className="flex-1 min-w-0 pt-[80px] lg:pt-0 lg:p-8">
        <div className="px-4 pb-4 lg:px-0 lg:pb-0">
          <div className="bg-white rounded-[20px] lg:rounded-[24px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.12)] min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-64px)] p-4 sm:p-6 lg:p-8">
            <TopRightHeader
              onConversations={() => router.push("/student/dashboard/conversations")}
            />

            <div className="mt-6 lg:mt-8 min-w-0">
              {isLoadingSidebar ? <div className="text-[#272635]">Loading...</div> : children}
            </div>

            <FooterLinks />
          </div>
        </div>
      </div>
    </div>
  );
}