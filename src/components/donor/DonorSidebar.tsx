"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
    router.push("/donor/profile");
  };

  const logout = () => {
    setMenuOpen(false);
    localStorage.removeItem("fab4_access");
    localStorage.removeItem("fab4_refresh");
    localStorage.removeItem("fab4_user");
    router.push("/login");
  };

  const goToSection = (section: DonorSection) => {
    onNavigationChange(section);
    setMobileOpen(false);

    if (section === "campaigns") {
      router.push("/donor");
      return;
    }

    if (section === "students") {
      router.push("/donor/students");
    }
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-[rgba(39,38,53,0.08)] bg-white px-4 lg:hidden">
        <img
          src="/assets/logo.jpg"
          alt="FabFour Foundation"
          className="h-5 w-auto opacity-60"
        />

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-xl"
        >
          <Menu className="h-6 w-6 text-[#272635]" />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-[300px] transform bg-[#eceee4] transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:translate-x-0
        `}
      >
        <div className="flex justify-end p-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-xl"
          >
            <X className="h-6 w-6 text-[#272635]" />
          </button>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="flex w-[300px] flex-col gap-6 pt-10 lg:pt-16">
              <div className="flex w-full flex-col items-start justify-center gap-10 px-10">
                <img
                  src="/assets/logo.svg"
                  alt="FabFour Foundation"
                  className="h-6 w-auto opacity-60"
                />

                <div className="flex w-full flex-col gap-4">
                  <div className="text-[28px] leading-[1.15] text-[#272635]">
                    <p>Welcome back,</p>
                    <p className="break-words text-[rgba(39,38,53,0.5)]">
                      {userData.name}!
                    </p>
                  </div>

                  <p className="text-[14px] leading-6 text-[#272635]">
                    FabFour Foundation scholarship recipient
                  </p>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-1 px-7">
                <NavItem
                  active={activeSection === "campaigns"}
                  label="Campaign"
                  onClick={() => goToSection("campaigns")}
                  icon={<Megaphone className="h-4 w-4" />}
                />

                <NavItem
                  active={activeSection === "students"}
                  label="Students"
                  onClick={() => goToSection("students")}
                  icon={<Users className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>

          <div className="px-10 pb-10">
            <div className="relative flex w-[220px] flex-col" ref={menuRef}>
              <div className="flex items-center gap-2">
                <div
                  className="h-[40px] w-[40px] rounded-full bg-[#d9d9d9] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${avatarSrc}')` }}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate text-[14px]">{userData.name}</div>

                    <button
                      type="button"
                      onClick={() => setMenuOpen((prev) => !prev)}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px]"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="truncate text-[12px] text-[rgba(39,38,53,0.5)]">
                    {userData.email}
                  </div>
                </div>
              </div>

              {menuOpen && (
                <div className="absolute bottom-full right-0 z-50 mb-2 w-[220px] overflow-hidden rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={goProfile}
                    className="flex w-full items-center gap-2 px-3 py-3 text-left hover:bg-[#f7f7f4]"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>My Account</span>
                  </button>

                  <div className="h-px bg-[rgba(39,38,53,0.08)]" />

                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-3 py-3 text-left hover:bg-[#f7f7f4]"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 h-px w-[220px] bg-[rgba(39,38,53,0.08)]" />

            <p className="mt-5 w-[220px] text-[11px] leading-4 text-[rgba(39,38,53,0.45)]">
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
        <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-[#198754]" />
      )}

      <div className="flex items-center gap-3 px-3 text-[#272635]">
        {icon}
        <p className="text-[14px]">{label}</p>
      </div>
    </button>
  );
}