"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface DonorStudentItem {
  id: number;
  name: string;
  level: string;
  school: string;
  totalRaised: number;
  relationship: "guardian" | "good_samaritan";
  avatar: string;
  countryFlag?: string;
  status?: "active" | "paused";
}

interface DonorStudentsListProps {
  items: DonorStudentItem[];
}

export function DonorStudentsList({ items }: DonorStudentsListProps) {
  const [tab, setTab] = useState<"all" | "guardian" | "good_samaritan">("all");
  const [statusFilter, setStatusFilter] = useState<"active" | "paused" | "all">(
    "active"
  );
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesTab =
        tab === "all" ? true : item.relationship === tab;

      const matchesStatus =
        statusFilter === "all" ? true : (item.status || "active") === statusFilter;

      return matchesTab && matchesStatus;
    });
  }, [items, statusFilter, tab]);

  const guardianCount = items.filter(
    (item) => item.relationship === "guardian"
  ).length;
  const samaritanCount = items.filter(
    (item) => item.relationship === "good_samaritan"
  ).length;

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const paginatedItems = filteredItems.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

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
        <div className="max-w-[960px]">
          <h1 className="text-[26px] text-[#272635] sm:text-[32px]">
            Manage Student Beneficiaries
          </h1>
          <p className="mt-2 text-[14px] leading-6 text-[rgba(39,38,53,0.55)]">
            Clearly provide details to help us understand and process your fund request.
          </p>

          <div className="mt-6 h-px w-full bg-[rgba(39,38,53,0.08)]" />

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <TabButton
                active={tab === "all"}
                label="All"
                onClick={() => {
                  setTab("all");
                  setPage(1);
                }}
              />

              <TabButton
                active={tab === "guardian"}
                label="Guardians"
                badge={guardianCount}
                onClick={() => {
                  setTab("guardian");
                  setPage(1);
                }}
              />

              <TabButton
                active={tab === "good_samaritan"}
                label="Good samaritans"
                badge={samaritanCount}
                onClick={() => {
                  setTab("good_samaritan");
                  setPage(1);
                }}
              />
            </div>

            <div className="relative w-fit">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as "active" | "paused" | "all");
                  setPage(1);
                }}
                className="h-10 rounded-[10px] border border-[rgba(39,38,53,0.08)] bg-white px-3 pr-8 text-[13px] text-[#272635] outline-none"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="all">All</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(39,38,53,0.5)]" />
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[2.2fr_1.4fr_1fr_1fr] rounded-[10px] bg-[#f7f7f4] px-4 py-3 text-[12px] text-[rgba(39,38,53,0.45)]">
                <div>Names</div>
                <div>School</div>
                <div>Total raised</div>
                <div></div>
              </div>

              <div className="divide-y divide-[rgba(39,38,53,0.08)]">
                {paginatedItems.map((student) => (
                  <div
                    key={student.id}
                    className="grid grid-cols-[2.2fr_1.4fr_1fr_1fr] items-center px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[14px] text-[#272635]">
                          {student.name}
                        </p>
                        <p className="text-[12px] text-[rgba(39,38,53,0.45)]">
                          {student.level}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[13px] text-[#272635]">
                      <span>{student.school}</span>
                      {student.countryFlag ? (
                        <span className="text-[14px]">{student.countryFlag}</span>
                      ) : null}
                    </div>

                    <div className="text-[13px] text-[#272635]">
                      ${student.totalRaised.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>

                    <div className="flex justify-end">
                      <Link
                        href={`/donor/students/${student.id}`}
                        className="inline-flex items-center gap-2 text-[13px] text-[#272635] underline"
                      >
                        <span>View profile</span>
                        <span className="text-[#198754]">↗</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="grid h-9 w-9 place-items-center rounded-[10px] border border-[rgba(39,38,53,0.08)] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="grid h-9 w-9 place-items-center rounded-[10px] border border-[rgba(39,38,53,0.08)] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
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

function TabButton({
  active,
  label,
  badge,
  onClick,
}: {
  active: boolean;
  label: string;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="relative pb-2 text-[13px]">
      <span className={active ? "text-[#272635]" : "text-[rgba(39,38,53,0.45)]"}>
        {label}
      </span>
      {typeof badge === "number" ? (
        <span className="ml-2 rounded-full bg-[#f2f3ec] px-1.5 py-0.5 text-[11px] text-[rgba(39,38,53,0.65)]">
          {badge}
        </span>
      ) : null}
      {active ? (
        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#198754]" />
      ) : null}
    </button>
  );
}