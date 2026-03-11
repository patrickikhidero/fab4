"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Search, ChevronDown } from "lucide-react";

export interface DonorCampaignItem {
  id: number;
  name: string;
  amountRaised: number;
  progress: number;
  image: string;
  tags: string[];
}

interface DonorCampaignGridProps {
  items: DonorCampaignItem[];
}

export function DonorCampaignGrid({ items }: DonorCampaignGridProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const goPrev = () => setPage((prev) => Math.max(1, prev - 1));
  const goNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="w-full bg-white rounded-[24px] border border-[rgba(39,38,53,0.06)] shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* TOP BAR */}
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-10 lg:py-6 border-b border-[rgba(39,38,53,0.06)]">
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="flex items-center gap-1 text-[12px] text-[rgba(39,38,53,0.72)]"
          >
            <span>English</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="relative w-full lg:max-w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(39,38,53,0.3)]" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search campaign, and more"
              className="h-11 w-full rounded-full border border-[rgba(39,38,53,0.08)] bg-[#fafaf8] pl-10 pr-4 text-[14px] outline-none placeholder:text-[rgba(39,38,53,0.35)]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-6">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-full border border-[rgba(39,38,53,0.08)] px-4 text-[13px] text-[rgba(39,38,53,0.75)]"
            >
              <MapPin className="h-4 w-4" />
              <span>Select location</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-full border border-[rgba(39,38,53,0.08)] px-4 text-[13px] text-[rgba(39,38,53,0.75)]"
            >
              <span>Preferred gender</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="mb-8">
          <h1 className="text-[24px] md:text-[32px] leading-tight text-[#272635] font-medium">
            Discover <span className="text-[rgba(39,38,53,0.45)]">smart minds</span> in need of your support
          </h1>
          <p className="mt-2 text-[14px] text-[rgba(39,38,53,0.7)]">
            Be part of the story. We rise by lifting others
          </p>
        </div>

        {paginatedItems.length === 0 ? (
          <div className="py-16 text-center text-[rgba(39,38,53,0.6)]">
            No campaigns found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <CampaignCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[13px] text-[rgba(39,38,53,0.55)]">
            Showing {paginatedItems.length} of {filteredItems.length} campaigns
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={safePage === 1}
              className="h-9 w-9 grid place-items-center rounded-[10px] border border-[rgba(39,38,53,0.12)] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }).slice(0, 5).map((_, index) => {
              const pageNumber = index + 1;
              const active = pageNumber === safePage;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`h-9 min-w-9 px-3 rounded-[10px] text-[13px] ${
                    active
                      ? "bg-[#eceee4] text-[#272635]"
                      : "text-[rgba(39,38,53,0.75)]"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              onClick={goNext}
              disabled={safePage === totalPages}
              className="h-9 w-9 grid place-items-center rounded-[10px] border border-[rgba(39,38,53,0.12)] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* FOOTER LINKS */}
        <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-end gap-x-6 gap-y-2 text-[12px] text-[rgba(39,38,53,0.5)]">
          <button type="button">Terms</button>
          <button type="button">Legal</button>
          <button type="button">Privacy policy</button>
          <button type="button">Cookie policy</button>
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ item }: { item: DonorCampaignItem }) {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-[24px] bg-[#f4f4f1]">
        <img
          src={item.image}
          alt={item.name}
          className="h-[220px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[28px] leading-none font-normal text-[#272635] tracking-[-0.02em] md:text-[20px]">
            {item.name}
          </h3>
          <p className="mt-2 text-[11px] uppercase tracking-wide text-[rgba(39,38,53,0.45)]">
            Raising
          </p>
          <p className="text-[16px] text-[#272635]">${item.amountRaised.toFixed(2)}</p>
        </div>

        <ProgressRing value={item.progress} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-[rgba(39,38,53,0.08)] px-2.5 py-1 text-[11px] text-[rgba(39,38,53,0.5)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const radius = 16;
  const stroke = 3;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-10 w-10 shrink-0">
      <svg height="40" width="40" className="-rotate-90">
        <circle
          stroke="rgba(39,38,53,0.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="20"
          cy="20"
        />
        <circle
          stroke="#1f5c46"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          r={normalizedRadius}
          cx="20"
          cy="20"
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center text-[10px] text-[#272635]">
        {value}%
      </div>
    </div>
  );
}