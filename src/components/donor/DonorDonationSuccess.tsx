"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { FooterLinks } from "@/components/shared/FooterLinks";

export interface DonorDonationSuccessData {
  id: number;
  title: string;
  studentName: string;
  studentLevel: string;
  studentSchool: string;
  avatar: string;
}

interface DonorDonationSuccessProps {
  campaign: DonorDonationSuccessData;
  amount: number;
}

export function DonorDonationSuccess({
  campaign,
  amount,
}: DonorDonationSuccessProps) {
  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(39,38,53,0.06)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex items-center gap-1 text-[12px] text-[rgba(39,38,53,0.72)]"
        >
          <span>English</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-[620px] text-center">
          <div className="mx-auto flex max-w-[320px] flex-col items-center">
            <div className="text-[12px] uppercase tracking-[0.18em] text-[rgba(39,38,53,0.35)]">
              Your donation of
            </div>

            <div className="mt-2 text-[46px] leading-none text-[#272635]">
              ${amount.toFixed(2)}
            </div>

            <CheckCircle2 className="mt-6 h-10 w-10 text-[#19a55a]" />

            <p className="mt-6 text-[14px] leading-6 text-[rgba(39,38,53,0.7)]">
              has been credited to{" "}
              <span className="text-[#198754]">{campaign.studentName}</span> a{" "}
              {campaign.studentLevel} student of {campaign.studentSchool} for
              her 2024/2025 academic session
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-[500px] items-start gap-3 rounded-[16px] bg-[#fbfbf8] p-4 text-left">
            <img
              src={campaign.avatar}
              alt={campaign.studentName}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h2 className="text-[16px] text-[#272635]">{campaign.title}</h2>
              <p className="mt-1 text-[12px] leading-5 text-[rgba(39,38,53,0.55)]">
                Hello family, My name is {campaign.studentName} a student of{" "}
                {campaign.studentSchool} who&apos;s currently a recipient in the
                FabFour Foundation support program.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-[500px] rounded-[14px] border border-[rgba(39,38,53,0.08)] bg-[#fbfbf8] px-4 py-4 text-left text-[12px] leading-5 text-[rgba(39,38,53,0.6)]">
            To see how your donation is put to use we provide a transparent
            expense report from our dashboard.{" "}
            <span className="text-[#198754]">Log in</span> or{" "}
            <span className="text-[#198754]">Create an account</span> to access it.
          </div>

          <Link
            href="/donor"
            className="mx-auto mt-8 flex h-12 w-full max-w-[280px] items-center justify-center rounded-[10px] bg-[#153f30] text-[14px] text-white transition hover:opacity-95"
          >
            Explore more students fundraising
          </Link>
        </div>

        <FooterLinks className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[rgba(39,38,53,0.5)] lg:justify-end" />
      </div>
    </div>
  );
}