"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface StudentExpenseItem {
  label: string;
  amountKES: number;
  amountUSD: number;
}

export interface StudentAcademicItem {
  label: string;
  value: string;
}

export interface DonorStudentProfileData {
  id: number;
  name: string;
  level: string;
  school: string;
  department: string;
  avatar: string;
  about: string;
  raisedSoFar: number;
  campaignGoal: number;
  donations: number;
  progress: number;
  goalTags: string[];
  expenseItems: StudentExpenseItem[];
  academicItems: StudentAcademicItem[];
}

interface DonorStudentProfileProps {
  student: DonorStudentProfileData;
  initialTab?: "expense" | "academic";
}

export function DonorStudentProfile({
  student,
  initialTab = "expense",
}: DonorStudentProfileProps) {
  const [tab, setTab] = useState<"expense" | "academic">(initialTab);

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
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <div className="flex flex-col gap-4 border-b border-[rgba(39,38,53,0.08)] pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h1 className="text-[28px] text-[#272635]">{student.name}</h1>
                  <p className="text-[12px] text-[rgba(39,38,53,0.45)]">{student.level}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Tag>{student.school}</Tag>
                    <Tag>{student.department}</Tag>
                  </div>
                </div>
              </div>

              <Link
                href={`/donor/students/${student.id}/flag`}
                className="inline-flex items-center mt-20 gap-2 text-[13px] text-[rgba(39,38,53,0.7)]"
              >
                <span>▷</span>
                <span>Flag this student</span>
              </Link>
            </div>

            <div className="mt-6">
              <p className="text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
                About this student
              </p>
              <p className="mt-3 max-w-[500px] text-[14px] leading-7 text-[rgba(39,38,53,0.8)]">
                {student.about}
              </p>
            </div>

            <div className="mt-6 border-b max-w-[500px] border-[rgba(39,38,53,0.08)]">
              <div className="flex flex-wrap gap-6 ">
                <button
                  type="button"
                  onClick={() => setTab("expense")}
                  className={`relative w-[200px] pb-3 text-[13px] ${
                    tab === "expense"
                      ? "text-[#272635]"
                      : "text-[rgba(39,38,53,0.45)]"
                  }`}
                >
                  Expense tracker
                  {tab === "expense" ? (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#198754]" />
                  ) : null}
                </button>

                <button
                  type="button"
                  onClick={() => setTab("academic")}
                  className={`relative pb-3 text-[13px] ${
                    tab === "academic"
                      ? "text-[#272635]"
                      : "text-[rgba(39,38,53,0.45)]"
                  }`}
                >
                  Academic performance
                  <span className="ml-2 rounded-full bg-[#f2f3ec] px-1.5 py-0.5 text-[11px] text-[rgba(39,38,53,0.65)]">
                    2
                  </span>
                  {tab === "academic" ? (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#198754]" />
                  ) : null}
                </button>
              </div>
            </div>

            {tab === "expense" ? (
              <div className="mt-5 max-w-[620px] space-y-4">
                {student.expenseItems.map((item) => (
                  <div key={item.label} className="grid grid-cols-[1fr_auto] items-start gap-4">
                    <Tag>{item.label}</Tag>
                    <div className="text-right">
                      <div className="text-[24px] font-['Neue_Montreal:Regular',_sans-serif] leading-none text-[#272635]">
                        {item.amountKES.toLocaleString()} <span className="text-[18px]">KES</span>
                      </div>
                      <div className="mt-1 font-['Neue_Montreal:Regular',_sans-serif] text-[12px] text-[rgba(39,38,53,0.45)]">
                        ${item.amountUSD.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 max-w-[620px] space-y-4">
                {student.academicItems.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-[12px] border border-[rgba(39,38,53,0.06)] px-4 py-3"
                  >
                    <div className="text-[14px] text-[rgba(39,38,53,0.65)]">
                      {item.label}
                    </div>
                    <div className="text-[14px] text-[#272635]">{item.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="rounded-[24px] mt-35 bg-[#f7f7f4] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
                    Raised so far
                  </p>
                  <p className="mt-2 text-[36px] leading-none text-[#272635]">
                    ${student.raisedSoFar.toFixed(2)}
                  </p>
                </div>

                <ProgressRing value={student.progress} />
              </div>

              <div className="mt-5 space-y-3 text-[12px]">
                <InfoRow
                  label="Campaign goal"
                  value={`$${student.campaignGoal.toLocaleString()}`}
                />
                <InfoRow label="Donations" value={`${student.donations}`} />
              </div>

              <div className="mt-6">
                <p className="text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
                  Breakdown of the goal
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {student.goalTags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>

              <Link
                href={`/donor/campaigns/${student.id}/donate`}
                className="mt-6 flex h-11 w-full items-center justify-center rounded-[10px] bg-[#198754] text-[14px] text-white transition hover:opacity-95"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[rgba(39,38,53,0.5)] lg:justify-end">
          <button type="button">Terms</button>
          <button type="button">Legal</button>
          <button type="button">Privacy policy</button>
          <button type="button">Cookie policy</button>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex font-['Neue_Montreal:Regular',_sans-serif] items-center rounded-full border border-[rgba(39,38,53,0.08)] bg-white px-3 py-1 text-[11px] text-[rgba(39,38,53,0.65)]">
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