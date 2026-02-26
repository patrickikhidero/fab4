"use client";

import React from "react";
import { Users, Wallet } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

interface CampaignSummary {
  currentAmount: number;
  weekAmount: number;
  monthAmount: number;
  progress: number;
}

type DashboardSection = "application" | "status" | "campaign" | "wallet";

interface SidebarNavigationProps {
  currentStep: number;
  userData: UserData;
  onNavigationChange: (section: DashboardSection) => void;
  activeSection: DashboardSection;
  isVerified?: boolean;
  campaignSummary?: CampaignSummary | null;
}

export function SidebarNavigation({
  currentStep,
  userData,
  onNavigationChange,
  activeSection,
  isVerified = false,
  campaignSummary,
}: SidebarNavigationProps) {
  const imgLine1 = "/svg/navigation/nav-divider.svg";
  const defaultAvatar = "/images/avatars/default-avatar.png";
  const avatarSrc = userData.avatar ? userData.avatar : defaultAvatar;

  return (
    <div className="flex w-[300px] h-[1024px] items-start shrink-0 relative">
      <div className="basis-0 flex flex-col grow h-full items-start justify-start relative shrink-0">
        <div className="inline-grid place-items-start relative shrink-0 w-full">
          <div className="flex flex-col gap-6 items-start justify-start pt-16 w-[300px]">
            <div className="flex flex-col gap-10 items-start justify-center px-10 w-full">
              <div className="text-lg font-semibold tracking-wide text-[var(--color-primary-text)] opacity-60">
                LOGO
              </div>

              <div className="flex flex-col gap-4 items-start justify-start w-full">
                <div className="text-[#272635] text-[28px] w-full">
                  <p className="leading-[normal]">Welcome back,</p>
                  <p className="text-[rgba(39,38,53,0.5)]">{userData.name}!</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-start justify-start px-7 w-full mb-4">
              {/* Application - show only if NOT verified */}
              {!isVerified && (
                <NavItem
                  active={activeSection === "application"}
                  label="Your Application"
                  onClick={() => onNavigationChange("application")}
                  icon={<Wallet className="h-5 w-5" />}
                />
              )}
    

              {/* Campaign - show only if verified */}
              {isVerified && (
                <NavItem
                  active={activeSection === "campaign"}
                  label="Campaign"
                  onClick={() => onNavigationChange("campaign")}
                  icon={<Users className="h-5 w-5" />}
                />
              )}

              {/* Funds & Wallet - show only if verified */}
              {isVerified && (
                <NavItem
                  active={activeSection === "wallet"}
                  label="Funds & Wallet"
                  onClick={() => onNavigationChange("wallet")}
                  icon={<Wallet className="h-5 w-5" />}
                />
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-3 items-start justify-start mt-32 pb-16 px-10 w-[300px]">
            {/* Campaign summary card (only when verified and summary exists) */}
            {isVerified && campaignSummary && (
              <div className="w-[220px] h-[183px] flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[#272635] text-[14px] uppercase">
                      current campaign
                    </div>
                    <div className="text-[#198754] text-[28px]">
                      ${campaignSummary.currentAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="h-[41px] w-[41px] grid place-items-center rounded-full border border-[rgba(39,38,53,0.12)]">
                    <span className="text-[12px] text-[#272635]">
                      {campaignSummary.progress}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 h-[1px] w-full bg-[rgba(39,38,53,0.08)]" />

                <div className="mt-4 space-y-2">
                  <Row label="This week" value={`+$${campaignSummary.weekAmount.toLocaleString()}`} />
                  <Row label="This month" value={`+$${campaignSummary.monthAmount.toLocaleString()}`} />
                </div>

                <button className="mt-4 text-left text-[12px] text-[#272635] underline underline-offset-4">
                  View
                </button>
              </div>
            )}

            {/* User Profile */}
            <div className="w-[220px] h-[114px] flex flex-col">
              <div className="w-[220px] h-[40px] flex items-center gap-2">
                <div
                  className="w-[40px] h-[40px] rounded-[20px] bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url('${avatarSrc}')` }}
                />
                <div className="flex-1 flex flex-col gap-1">
                  <div className="text-[#272635] text-[14px]">
                    {userData.name}
                  </div>
                  <div className="text-[rgba(39,38,53,0.5)] text-[12px]">
                    {userData.email}
                  </div>
                </div>
              </div>

              <div className="w-[220px] h-[1px] mt-[20px]">
                <img alt="Divider" className="w-full h-full" src={imgLine1} />
              </div>

              <div className="w-[220px] h-[34px] mt-[20px] text-[rgba(39,38,53,0.5)] text-[14px]">
                © 2024 FabFour Foundation. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  active,
  label,
  onClick,
  icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={[
        "relative flex h-10 w-full cursor-pointer items-start justify-start rounded-tr-[12px] rounded-br-[12px] rounded-tl-[4px] rounded-bl-[4px]",
        active ? "bg-[#f9faf7]" : "bg-transparent",
      ].join(" ")}
    >
      {active && (
        <div
          aria-hidden="true"
          className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#198754] rounded-bl-[4px] rounded-tl-[4px]"
        />
      )}

      <div className="flex h-full w-full items-center gap-3 px-3 py-2">
        <div className="text-[#2f2b43] opacity-90">{icon}</div>
        <div className="text-[#2f2b43] text-[16px]">
          <p className="leading-[24px] whitespace-pre">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[#272635] text-[12px]">{label}</div>
      <div className="text-[#198754] text-[14px]">{value}</div>
    </div>
  );
}