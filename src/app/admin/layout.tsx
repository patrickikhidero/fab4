"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getStoredUser } from "@/lib/auth/storage";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      router.replace("/login");
      return;
    }
    const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
    setName(fullName || user.email || "Admin");
    setEmail(user.email || "");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#eceee4] lg:flex">
      <AdminSidebar name={name} email={email} />

      <div className="flex-1 min-w-0 pt-[80px] lg:pt-0 lg:p-8">
        <div className="px-4 pb-4 lg:px-0 lg:pb-0">
          <div className="bg-white rounded-[20px] lg:rounded-[24px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.12)] min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-64px)] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
