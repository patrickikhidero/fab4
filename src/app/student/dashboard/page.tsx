"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth/storage";

export default function DashboardEntryPage() {
  const router = useRouter();

  useEffect(() => {
    const user = getStoredUser() as any;

    const hasStudentProfile = !!user?.student_profile;
    const isVerified = !!user?.student_profile?.is_verified;

    if (hasStudentProfile && isVerified) {
      router.replace("/student/dashboard/campaign");
      return;
    }

    router.replace("/student/dashboard/application/profile");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#eceee4] flex items-center justify-center">
      <div className="text-[#272635]">Loading...</div>
    </div>
  );
}
