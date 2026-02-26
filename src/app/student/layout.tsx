"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { SidebarNavigation } from "@/components/modules/student/SidebarNavigation";

import { getStoredUser, getUserIdFromToken } from "@/lib/auth/storage";
import { getStudentProfile, type StudentProfileResponse } from "@/lib/student/application";
import { getCampaignOverview, listMyCampaigns } from "@/lib/student/campaign";

type DashboardSection = "application" | "status" | "campaign" | "wallet";

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

  // prefer accepted + not drafted
  const preferred =
    results.find((c) => c.accepted === true && c.drafted === false) ??
    results.find((c) => c.drafted === false) ??
    results[0];

  return preferred ?? null;
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
  // you can adjust these if you have different routes
  if (pathname.startsWith("/student/dashboard/wallet")) return "wallet";
  if (pathname.startsWith("/student/dashboard/campaign")) return "campaign";
//   if (pathname.startsWith("/student/application-status")) return "status";
  if (pathname.startsWith("/student/dashboard/application")) return "application";

  // fallback: keep user in application section
  return "application";
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

  // If your SidebarNavigation expects currentStep always, keep 1.
  // (You can later wire this from a store if you want.)
  const currentStep = 1;

  useEffect(() => {
    const run = async () => {
      try {
        setIsLoadingSidebar(true);

        // Resolve user
        const storedUser = getStoredUser();

        let userId: number | null = storedUser?.id ?? null;
        if (!userId) userId = getUserIdFromToken();

        // OPTIONAL dev fallback (same as your old component)
        if (!userId) {
          console.warn("No user ID found, using default 224 for demo");
          userId = 224;
        }

        // Fetch student profile
        const profile = await getStudentProfile(userId);
        setStudentProfile(profile ?? null);

        const verified = !!profile?.is_verified;
        setIsVerified(verified);

        // Resolve sidebar userData (prefer storedUser, fallback to profile)
        const nameFromUser = `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`.trim();
        const nameFromProfile = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim();

        setUserData({
          name: nameFromUser || nameFromProfile || "User",
          email: storedUser?.email || profile?.email || "",
          avatar: storedUser?.photo || "",
        });

        // Only load campaign summary when verified (your rule)
        if (!verified) {
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
            toNum(overview?.current_campaign_amount) ||
            toNum(overview?.total_raised) ||
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

        // Still try to show stored user
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
    // You said:
    // 1) wallet route is /student/dashboard/wallet
    // Campaign + Wallet should only be meaningful when verified (Sidebar can disable/hide),
    // but we still route if clicked (your choice).
    switch (section) {
      case "application":
        router.push("/student/dashboard/application/profile");
        break;
    //   case "status":
    //     router.push("/student/application-status");
    //     break;
      case "campaign":
        router.push("/student/dashboard/campaign");
        break;
      case "wallet":
        router.push("/student/dashboard/wallet");
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

      <div className="flex-1 p-8">
        {/* Optional: if you want a loader overlay for the sidebar data */}
        {isLoadingSidebar ? (
          <div className="text-[#272635]">Loading...</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}