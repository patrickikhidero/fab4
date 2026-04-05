"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  Wallet,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";

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

type DashboardSection = "application" | "campaign" | "wallet" | "conversations";

interface SidebarNavigationProps {
  currentStep: number;
  userData: UserData;
  onNavigationChange: (section: DashboardSection) => void;
  activeSection: DashboardSection;
  isVerified?: boolean;
  campaignSummary?: CampaignSummary | null;
}

export function SidebarNavigation({
  userData,
  onNavigationChange,
  activeSection,
  isVerified = false,
  campaignSummary,
}: SidebarNavigationProps) {
  const defaultAvatar = "/images/avatars/default-avatar.png";
  const avatarSrc = userData.avatar ? userData.avatar : defaultAvatar;

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[60px] bg-white z-50 flex items-center justify-between px-4 border-b">
        <img
          src="/assets/fabfour-logo-.png"
          alt="logo"
          className="h-5 opacity-60"
        />

        <button onClick={() => setMobileOpen(true)}>
          <Menu className="w-6 h-6 text-[#272635]" />
        </button>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 h-screen z-50
        w-[300px] bg-[#eceee4]
        transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* CLOSE BUTTON (mobile) */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setMobileOpen(false)}>
            <X className="w-6 h-6 text-[#272635]" />
          </button>
        </div>

        <div className="h-full flex flex-col">
          {/* TOP */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-6 pt-10 lg:pt-16 w-[300px]">
              <div className="flex flex-col gap-10 items-start justify-center px-10 w-full">
                <img
                  src="/assets/fabfour-logo-.png"
                  alt="FabFour Foundation"
                  className="h-6 w-auto opacity-60"
                />

                <div className="flex flex-col gap-4 w-full">
                  <div className="text-[#272635] text-[28px]">
                    <p>Welcome back,</p>
                    <p className="text-[rgba(39,38,53,0.5)]">
                      {userData.name}!
                    </p>
                  </div>
                </div>
              </div>

              {/* NAV */}
              <div className="flex flex-col gap-1 px-7 mb-4">
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
          </div>

          {/* BOTTOM */}
          <div className="pb-10 px-10">
            {isVerified && campaignSummary && (
              <div className="w-[220px] mb-6">
                <div className="flex justify-between">
                  <div>
                    <div className="text-[14px] uppercase">
                      current campaign
                    </div>
                    <div className="text-[#198754] text-[28px]">
                      ${campaignSummary.currentAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="h-[41px] w-[41px] grid place-items-center rounded-full border">
                    {campaignSummary.progress}%
                  </div>
                </div>

                <div className="mt-4 h-[1px] bg-[rgba(39,38,53,0.08)]" />

                <div className="mt-4 space-y-2">
                  <Row
                    label="This week"
                    value={`+$${campaignSummary.weekAmount.toLocaleString()}`}
                  />
                  <Row
                    label="This month"
                    value={`+$${campaignSummary.monthAmount.toLocaleString()}`}
                  />
                </div>
              </div>
            )}

            {/* PROFILE */}
            <div className="w-[220px] flex flex-col relative" ref={menuRef}>
              <div className="flex items-center gap-2">
                <div
                  className="w-[40px] h-[40px] rounded-full bg-cover"
                  style={{ backgroundImage: `url('${avatarSrc}')` }}
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="text-[14px] truncate">
                      {userData.name}
                    </div>

                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="h-7 w-7 grid place-items-center rounded-[8px]"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-[12px] text-[rgba(39,38,53,0.5)] truncate">
                    {userData.email}
                  </div>
                </div>
              </div>

              {menuOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-[220px] bg-white rounded-[12px] border shadow-lg z-50">
                  <button
                    onClick={goProfile}
                    className="w-full px-3 py-2 text-left flex gap-2"
                  >
                    <UserIcon className="h-4 w-4" />
                    My Account
                  </button>

                  <div className="h-px bg-gray-200" />

                  <button
                    onClick={logout}
                    className="w-full px-3 py-2 text-left flex gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
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
      className={`relative flex h-10 cursor-pointer rounded-r-[12px] ${
        active ? "bg-[#f9faf7]" : ""
      }`}
    >
      {active && (
        <div className="absolute left-0 w-[2px] bg-[#198754] top-0 bottom-0" />
      )}

      <div className="flex items-center gap-3 px-3">
        {icon}
        <p>{label}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[12px]">
      <span>{label}</span>
      <span className="text-[#198754]">{value}</span>
    </div>
  );
}