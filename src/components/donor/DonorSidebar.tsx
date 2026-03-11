"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LogOut,
  Menu,
  User as UserIcon,
  Users,
  X,
  Megaphone,
} from "lucide-react";

type DonorSection = "campaigns" | "students";

interface DonorUserData {
  name: string;
  email: string;
  avatar?: string;
}

interface DonorSidebarProps {
  userData: DonorUserData;
  activeSection: DonorSection;
  onNavigationChange: (section: DonorSection) => void;
}

export function DonorSidebar({
  userData,
  activeSection,
  onNavigationChange,
}: DonorSidebarProps) {
  const defaultAvatar = "/images/avatars/default-avatar.png";
  const avatarSrc = userData.avatar || defaultAvatar;

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuOpen) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  const goProfile = () => {
    setMenuOpen(false);
    window.location.assign("/donor/profile");
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
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[60px] bg-white z-50 flex items-center justify-between px-4 border-b border-[rgba(39,38,53,0.08)]">
        <img
          src="/assets/logo.svg"
          alt="FabFour Foundation"
          className="h-5 w-auto opacity-60"
        />

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="h-10 w-10 grid place-items-center rounded-xl"
        >
          <Menu className="w-6 h-6 text-[#272635]" />
        </button>
      </div>

      {/* MOBILE OVERLAY */}
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
        {/* MOBILE CLOSE */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="h-10 w-10 grid place-items-center rounded-xl"
          >
            <X className="w-6 h-6 text-[#272635]" />
          </button>
        </div>

        <div className="h-full flex flex-col">
          {/* TOP */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-6 pt-10 lg:pt-16 w-[300px]">
              <div className="flex flex-col gap-10 items-start justify-center px-10 w-full">
                <img
                  src="/assets/logo.svg"
                  alt="FabFour Foundation"
                  className="h-6 w-auto opacity-60"
                />

                <div className="flex flex-col gap-4 w-full">
                  <div className="text-[#272635] text-[28px] leading-[1.15]">
                    <p>Welcome back,</p>
                    <p className="text-[rgba(39,38,53,0.5)] break-words">
                      {userData.name}!
                    </p>
                  </div>

                  <p className="text-[14px] text-[#272635] leading-6">
                    FabFour Foundation scholarship recipient
                  </p>
                </div>
              </div>

              {/* NAV */}
              <div className="flex flex-col gap-1 px-7 mb-4">
                <NavItem
                  active={activeSection === "campaigns"}
                  label="Campaign"
                  onClick={() => {
                    onNavigationChange("campaigns");
                    setMobileOpen(false);
                  }}
                  icon={<Megaphone className="h-4 w-4" />}
                />

                <NavItem
                  active={activeSection === "students"}
                  label="Students"
                  onClick={() => {
                    onNavigationChange("students");
                    setMobileOpen(false);
                  }}
                  icon={<Users className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="pb-10 px-10">
            <div className="w-[220px] flex flex-col relative" ref={menuRef}>
              <div className="flex items-center gap-2">
                <div
                  className="w-[40px] h-[40px] rounded-full bg-cover bg-center bg-no-repeat bg-[#d9d9d9]"
                  style={{ backgroundImage: `url('${avatarSrc}')` }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="text-[14px] truncate">{userData.name}</div>

                    <button
                      type="button"
                      onClick={() => setMenuOpen((prev) => !prev)}
                      className="h-7 w-7 shrink-0 grid place-items-center rounded-[8px]"
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
                <div className="absolute right-0 bottom-full mb-2 w-[220px] bg-white rounded-[12px] border border-[rgba(39,38,53,0.08)] shadow-lg z-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={goProfile}
                    className="w-full px-3 py-3 text-left flex items-center gap-2 hover:bg-[#f7f7f4]"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>My Account</span>
                  </button>

                  <div className="h-px bg-[rgba(39,38,53,0.08)]" />

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full px-3 py-3 text-left flex items-center gap-2 hover:bg-[#f7f7f4]"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 h-px w-[220px] bg-[rgba(39,38,53,0.08)]" />

            <p className="mt-5 text-[11px] leading-4 text-[rgba(39,38,53,0.45)] w-[220px]">
              © 2024 FabFour Foundation. All rights reserved.
            </p>
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
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-10 w-full items-center rounded-r-[12px] text-left ${
        active ? "bg-[#f9faf7]" : ""
      }`}
    >
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#198754]" />
      )}

      <div className="flex items-center gap-3 px-3 text-[#272635]">
        {icon}
        <p className="text-[14px]">{label}</p>
      </div>
    </button>
  );
}