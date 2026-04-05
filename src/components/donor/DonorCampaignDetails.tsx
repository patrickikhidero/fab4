"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FooterLinks } from "@/components/shared/FooterLinks";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ExternalLink,
  Flag,
} from "lucide-react";

export interface CampaignComment {
  id: number;
  name: string;
  text: string;
  time: string;
  avatar: string;
}

export interface RecentDonor {
  id: number;
  name: string;
  amount: number;
}

export interface DonorCampaignDetailsData {
  id: number;
  title: string;
  managedBy: string;
  status: string;
  studentName: string;
  studentSubtitle: string;
  school: string;
  department: string;
  story: string;
  raisedSoFar: number;
  campaignGoal: number;
  donationsCount: number;
  progress: number;
  heroImage: string;
  studentAvatar: string;
  goalTags: string[];
  recentDonors: RecentDonor[];
  comments: CampaignComment[];
}

interface DonorCampaignDetailsProps {
  campaign: DonorCampaignDetailsData;
}

export function DonorCampaignDetails({
  campaign,
}: DonorCampaignDetailsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/donor/campaigns/${campaign.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: campaign.title, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(39,38,53,0.06)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
      {/* TOP BAR */}
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
        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <Link
              href="/donor"
              className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f2f3ec] text-[#272635]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[24px] leading-tight text-[#272635] lg:text-[36px]">
                  {campaign.title}
                </h1>

                <span className="rounded-full bg-[#dff3e7] px-2 py-1 text-[11px] text-[#1f8a4c]">
                  {campaign.status}
                </span>
              </div>

              <p className="mt-2 text-[13px] text-[rgba(39,38,53,0.55)]">
                This campaign is managed by{" "}
                <span className="text-[#198754]">{campaign.managedBy}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 self-start text-[13px] text-[rgba(39,38,53,0.7)] hover:text-[#198754] transition-colors"
          >
            <span>{copied ? "Link Copied!" : "Share Campaign"}</span>
            {copied ? (
              <Check className="h-4 w-4 text-[#198754]" />
            ) : (
              <ExternalLink className="h-4 w-4 text-[#198754]" />
            )}
          </button>
        </div>

        {/* BODY */}
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/* LEFT */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-[24px]">
              <img
                src={campaign.heroImage}
                alt={campaign.studentName}
                className="h-[220px] w-full object-cover sm:h-[280px] lg:h-[340px]"
              />

              <button
                type="button"
                className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow"
              >
                <span className="text-[#198754] text-lg">⤴</span>
              </button>
            </div>

            <div className="-mt-0 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-3 pl-3 sm:pl-4">
                <div className="h-[56px] w-[56px] overflow-hidden rounded-full border-4 border-white bg-[#efefef] shadow">
                  <img
                    src={campaign.studentAvatar}
                    alt={campaign.studentName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-[22px] text-[#272635]">
                    {campaign.studentName}
                  </h2>
                  <p className="text-[12px] text-[rgba(39,38,53,0.5)]">
                    {campaign.studentSubtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>{campaign.school}</Tag>
              <Tag>{campaign.department}</Tag>
            </div>

            <div className="mt-8">
              <p className="text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
                About this campaign
              </p>

              <p className="mt-4 max-w-[680px] text-[14px] leading-7 text-[rgba(39,38,53,0.8)]">
                {campaign.story}
              </p>
            </div>

            <div className="mt-10">
              <div className="border-b border-[rgba(39,38,53,0.1)]">
                <div className="inline-flex border-b-2 border-[#198754] pb-2 text-[13px] text-[#272635]">
                  Comments
                </div>
              </div>

              <div className="mt-5 space-y-5">
                {campaign.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      className="mt-1 h-8 w-8 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[13px] text-[#272635]">
                          {comment.name}
                        </p>
                        <p className="text-[11px] text-[rgba(39,38,53,0.45)]">
                          {comment.time}
                        </p>
                      </div>

                      <div className="max-w-[520px] rounded-[12px] bg-[#f7f7f4] px-4 py-3 text-[13px] leading-6 text-[rgba(39,38,53,0.75)]">
                        {comment.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-8 inline-flex items-center gap-2 text-[12px] text-[rgba(39,38,53,0.7)]"
              >
                <Flag className="h-3.5 w-3.5" />
                <span>Report student</span>
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="min-w-0">
            <div className="rounded-[24px] bg-[#f7f7f4] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
                    Raised so far
                  </p>
                  <p className="mt-2 text-[36px] leading-none text-[#272635]">
                    ${campaign.raisedSoFar.toFixed(2)}
                  </p>
                </div>

                <ProgressRing value={campaign.progress} />
              </div>

              <div className="mt-5 space-y-3 text-[12px]">
                <InfoRow
                  label="Campaign goal"
                  value={`$${campaign.campaignGoal.toLocaleString()}`}
                />
                <InfoRow
                  label="Donations"
                  value={`${campaign.donationsCount}`}
                />
              </div>

              <div className="mt-6">
                <p className="text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
                  Breakdown of the goal
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {campaign.goalTags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>

              <Link
                href={`/donor/campaigns/${campaign.id}/donate`}
                className="mt-6 flex h-11 w-full items-center justify-center rounded-[10px] bg-[#198754] text-[14px] text-white transition hover:opacity-95"
              >
                Donate Now
              </Link>

              <div className="mt-6">
                <p className="text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
                  Recent donors
                </p>

                <div className="mt-4 space-y-3">
                  {campaign.recentDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-[2px] text-[#1db56b]">
                          <Check className="h-4 w-4" />
                        </span>

                        <div>
                          <p className="text-[13px] text-[rgba(39,38,53,0.8)]">
                            {donor.name}
                          </p>
                          <p className="text-[12px] text-[rgba(39,38,53,0.45)]">
                            ${donor.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] text-[rgba(39,38,53,0.7)]"
                >
                  <span>See All Donors</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#198754]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <FooterLinks />
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(39,38,53,0.08)] bg-white px-3 py-1 text-[11px] text-[rgba(39,38,53,0.65)]">
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[rgba(39,38,53,0.45)]">{label}</span>
      <span className="text-[#272635]">{value}</span>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const radius = 18;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg height="44" width="44" className="-rotate-90">
        <circle
          stroke="rgba(39,38,53,0.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="22"
          cy="22"
        />
        <circle
          stroke="#1f5c46"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          r={normalizedRadius}
          cx="22"
          cy="22"
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center text-[10px] text-[#272635]">
        {value}%
      </div>
    </div>
  );
}