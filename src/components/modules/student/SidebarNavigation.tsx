"use client";

import React, { useEffect, useRef, useState } from "react";
import { Users, Wallet, ChevronDown, User as UserIcon, LogOut } from "lucide-react";

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

type DashboardSection = "application" | "status" | "campaign" | "wallet" | "conversations";

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
  const defaultAvatar = "/images/avatars/default-avatar.png";
  const avatarSrc = userData.avatar ? userData.avatar : defaultAvatar;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuOpen) return;
      const t = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(t)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const goProfile = () => {
    setMenuOpen(false);
    window.location.assign("/student/dashboard/profile");
  };

  const logout = () => {
    setMenuOpen(false);
    localStorage.removeItem("fab4_access");
    localStorage.removeItem("fab4_refresh");
    localStorage.removeItem("fab4_user");
    window.location.assign("/login");
  };

  return (
    <div className="flex w-[300px] h-[1024px] items-start shrink-0 relative">
      <div className="basis-0 flex flex-col grow h-full items-start justify-start relative shrink-0">
        <div className="inline-grid place-items-start relative shrink-0 w-full">
          <div className="flex flex-col gap-6 items-start justify-start pt-16 w-[300px]">
            <div className="flex flex-col gap-10 items-start justify-center px-10 w-full">
              {/* LOGO */}
              <img
                src="/assets/logo.svg"
                alt="FabFour Foundation"
                className="h-6 w-auto opacity-60"
              />

              <div className="flex flex-col gap-4 items-start justify-start w-full">
                <div className="text-[#272635] text-[28px] w-full">
                  <p className="leading-[normal]">Welcome back,</p>
                  <p className="text-[rgba(39,38,53,0.5)]">{userData.name}!</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-start justify-start px-7 w-full mb-4">
              {!isVerified && (
                <NavItem
                  active={activeSection === "application"}
                  label="Your Application"
                  onClick={() => onNavigationChange("application")}
                  icon={<Wallet className="h-5 w-5" />}
                />
              )}

              {isVerified && (
                <NavItem
                  active={activeSection === "campaign"}
                  label="Campaign"
                  onClick={() => onNavigationChange("campaign")}
                  icon={<Users className="h-5 w-5" />}
                />
              )}

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
            {isVerified && campaignSummary && (
              <div className="w-[220px] h-[183px] flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[#272635] text-[14px] uppercase">current campaign</div>
                    <div className="text-[#198754] text-[28px]">
                      ${campaignSummary.currentAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="h-[41px] w-[41px] grid place-items-center rounded-full border border-[rgba(39,38,53,0.12)]">
                    <span className="text-[12px] text-[#272635]">{campaignSummary.progress}%</span>
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

            {/* ✅ User Profile (OLD layout preserved; only dropdown behavior changed) */}
            <div className="w-[220px] h-[114px] flex flex-col relative" ref={menuRef}>
              <div className="w-[220px] h-[40px] flex items-center gap-2">
                <div
                  className="w-[40px] h-[40px] rounded-[20px] bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url('${avatarSrc}')` }}
                />

                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[#272635] text-[14px] truncate">{userData.name}</div>

                    <button
                      type="button"
                      onClick={() => setMenuOpen((v) => !v)}
                      className="shrink-0 h-7 w-7 grid place-items-center rounded-[8px] hover:bg-[#eceee4] transition-colors"
                      aria-label="Open profile menu"
                    >
                      <ChevronDown className="h-4 w-4 text-[#272635]" />
                    </button>
                  </div>

                  <div className="text-[rgba(39,38,53,0.5)] text-[12px] truncate">{userData.email}</div>
                </div>
              </div>

              {/* ✅ Bootstrap-like popup (absolute, overlays, opens upward) */}
              {menuOpen && (
                <div
                  className={[
                    "absolute right-0 bottom-full mb-2 w-[220px]",
                    "bg-white rounded-[12px] border border-[rgba(39,38,53,0.08)]",
                    "shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.18)] overflow-hidden",
                    "z-[9999]",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={goProfile}
                    className="w-full px-3 py-2 text-left text-[13px] text-[#272635] hover:bg-[#f9faf7] flex items-center gap-2"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>My Account</span>
                  </button>

                  <div className="h-px bg-[rgba(39,38,53,0.08)]" />

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full px-3 py-2 text-left text-[13px] text-[#272635] hover:bg-[#f9faf7] flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              {/* ✅ Divider (no svg, just a div) */}
              <div className="w-[220px] h-px mt-[20px] bg-[rgba(39,38,53,0.08)]" />

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