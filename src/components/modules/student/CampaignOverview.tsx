"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCampaignOverview, listMyCampaigns } from "@/lib/student/campaign";
import { listDonationsByCampaign } from "@/lib/student/donations";

const imgArrow = "/29a615b320e09cd458090219f8e83fd794a5404f.svg";
const imgArrow1 = "/1763841bb245d3b7f2dc8db8079ee0686b7664af.svg";
const imgArrow2 = "/405a8c19d5f6673a8a5391077b715ebb72246911.svg";
const imgUsers = "/77732e3e998572eabf9798e67462c7ef2ca5f194.svg";
const imgCaretLeft = "/56081696a1312ef9611e978678f37ddf156bff77.svg";
const imgCaretRight = "/5bdd3bf8706f1d9ca913b8414ffc8824726bba6b.svg";

interface CampaignMetrics {
  goal: number;
  raised: number;
  academicSessions: number;
  status: "active" | "under-review" | "completed" | "paused";
  academicYear: string;
}

interface Donor {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "guardian" | "good-samaritan" | "anonymous";
  status: "completed" | "pending" | "failed";
}

type CampaignStatus = CampaignMetrics["status"];

type CampaignListItem = {
  id: number;
  goal?: number | string | null;
  amount?: number | string | null;
  raised_amount?: number | string | null;
  amount_raised?: number | string | null;
  currency?: string | null;
  academic_session?: string | null;
  drafted?: boolean;
  accepted?: boolean;
  status?: string | null;
};

export default function CampaignPage() {
  return <CampaignOverview />;
}

export function CampaignOverview() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"all" | "guardians" | "good-samaritans">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [donors, setDonors] = useState<Donor[]>([]);
  const [campaignMetrics, setCampaignMetrics] = useState<CampaignMetrics | null>(null);
  const [currentCampaignId, setCurrentCampaignId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const toNum = (v: any) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const mapStatus = (raw: any): CampaignStatus => {
    const s = String(raw ?? "").toLowerCase();
    if (s.includes("pause")) return "paused";
    if (s.includes("complete") || s.includes("achieved")) return "completed";
    if (s.includes("active") || s.includes("accept")) return "active";
    return "under-review";
  };

  const pickCurrentCampaign = (results: CampaignListItem[]): CampaignListItem | null => {
    if (!results?.length) return null;
    return (
      results.find((c) => c.accepted === true && c.drafted === false) ??
      results.find((c) => c.drafted === false) ??
      results[0] ??
      null
    );
  };

  const mapDonationRows = (rows: any[]): Donor[] => {
    return (rows ?? []).map((d: any, idx: number) => {
      const isAnon = !!(d?.is_anonymous ?? d?.anonymous);

      const name = isAnon
        ? "Anonymous"
        : d?.donor_name ??
          d?.donor?.name ??
          d?.donor?.full_name ??
          d?.name ??
          "Anonymous";

      const amount = toNum(d?.amount ?? d?.donation_amount ?? d?.total);

      const dateRaw = d?.created_at ?? d?.date ?? d?.created;
      const date = dateRaw ? new Date(dateRaw).toLocaleDateString() : "—";

      const donorTypeRaw = String(d?.donor_type ?? "").toLowerCase();
      const type: Donor["type"] =
        donorTypeRaw === "guardian"
          ? "guardian"
          : donorTypeRaw === "good-samaritan" || donorTypeRaw === "good_samaritan"
          ? "good-samaritan"
          : "anonymous";

      const statusRaw = String(d?.status ?? "").toLowerCase();
      const status: Donor["status"] =
        statusRaw === "completed" || statusRaw === "success"
          ? "completed"
          : statusRaw === "failed"
          ? "failed"
          : "pending";

      return {
        id: String(d?.id ?? idx),
        name,
        amount,
        date,
        type,
        status,
      };
    });
  };

  const metrics: CampaignMetrics = campaignMetrics ?? {
    goal: 0,
    raised: 0,
    academicSessions: 0,
    status: "under-review",
    academicYear: "—",
  };

  const filteredDonors = donors.filter((donor) => {
    if (activeTab === "all") return true;
    if (activeTab === "guardians") return donor.type === "guardian";
    if (activeTab === "good-samaritans") return donor.type === "good-samaritan";
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredDonors.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + itemsPerPage);

  const donorCounts = {
    guardians: donors.filter((d) => d.type === "guardian").length,
    "good-samaritans": donors.filter((d) => d.type === "good-samaritan").length,
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const [ov, mine] = await Promise.all([getCampaignOverview(), listMyCampaigns()]);

        const results: CampaignListItem[] =
          (mine as any)?.results ?? (mine as any)?.raw?.results ?? [];

        const current = pickCurrentCampaign(results);
        const campaignId = current?.id ?? null;

        setCurrentCampaignId(campaignId);

        const goal = toNum(current?.goal);
        const totalRaised =
          toNum((ov as any)?.overall_stats?.total_amount_raised) ||
          toNum((ov as any)?.current_campaign?.amount_raised) ||
          toNum((ov as any)?.current_campaign?.raised_amount) ||
          toNum((ov as any)?.current_campaign?.amount);

        const academicSessions = toNum((ov as any)?.overall_stats?.total_academic_sessions);

        const status = mapStatus(current?.status ?? (current?.accepted ? "active" : "under-review"));
        const academicYear = String(current?.academic_session ?? "—");

        setCampaignMetrics({
          goal: goal || 0,
          raised: totalRaised,
          academicSessions,
          status,
          academicYear,
        });

        if (campaignId) {
          const donationRes = await listDonationsByCampaign(campaignId);
          const donationRows = (donationRes as any)?.results ?? donationRes ?? [];
          setDonors(mapDonationRows(donationRows));
        } else {
          setDonors([]);
        }
      } catch (e) {
        console.error("Campaign overview load failed", e);
        setCampaignMetrics(null);
        setDonors([]);
        setCurrentCampaignId(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-[#272635]">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="text-[#272635] text-[24px] sm:text-[28px] font-['Neue_Montreal:Regular',_sans-serif]">
          Campaign
        </div>

        <button
          onClick={() => router.push("/student/dashboard/campaign/create")}
          className="inline-flex items-center justify-center gap-2 text-[#272635] text-[14px] sm:text-[16px] hover:bg-black/5 px-3 py-2 rounded-[10px] transition-colors self-start sm:self-auto"
        >
          <span>Create Campaign</span>
          <span className="relative size-5">
            <img alt="Arrow" className="absolute inset-0 size-full" src={imgArrow} />
            <span className="absolute inset-1/4">
              <img alt="Arrow Detail" className="absolute inset-0 size-full" src={imgArrow1} />
            </span>
            <span className="absolute bottom-[34.38%] left-[34.38%] right-1/4 top-1/4">
              <img alt="Arrow Detail 2" className="absolute inset-0 size-full" src={imgArrow2} />
            </span>
          </span>
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 xl:gap-10 items-start mb-10">
        <div className="shrink-0 w-full xl:w-auto">
          <div className="text-[#272635] text-[16px] sm:text-[18px] uppercase">overview of campaigns</div>
          <div className="mt-2 text-[14px] sm:text-[16px] text-[rgba(39,38,53,0.5)] w-full xl:w-[277px] leading-[24px]">
            This is the performance of all campaign created for you over the period of your academics
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
          <div className="relative rounded-[12px] p-4 border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[#272635] text-[14px] uppercase">campaign goal</div>
              <div className="bg-yellow-100 px-2 py-1 rounded-full text-[#272635] text-[10px]">
                {metrics.status === "active"
                  ? "Active"
                  : metrics.status === "completed"
                  ? "Completed"
                  : metrics.status === "paused"
                  ? "Paused"
                  : "Under review"}
              </div>
            </div>

            <div className="mt-2 text-[#272635] text-[24px] sm:text-[28px] break-words">
              ${metrics.goal.toLocaleString()}
            </div>

            <button className="mt-3 flex items-center gap-2 text-[#198754] text-[12px]">
              <span>View Status</span>
              <img alt="Arrow" className="size-4" src={imgArrow} />
            </button>
          </div>

          <div className="relative rounded-[12px] p-4 border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] min-w-0">
            <div className="flex items-center gap-2">
              <img alt="Users" className="size-8" src={imgUsers} />
              <div className="text-[#272635] text-[14px] uppercase">overall campaigns</div>
            </div>

            <div className="mt-2 text-[#272635] text-[24px] sm:text-[28px] break-words">
              ${metrics.raised.toLocaleString()}
            </div>

            <div className="mt-2 flex items-center gap-2 text-[#272635] text-[12px] flex-wrap">
              <img alt="Calendar" className="size-4" src="/svg/icons/calendar.svg" />
              <span>{metrics.academicSessions} Academic year</span>
            </div>

            <button
              className="mt-3 flex items-center gap-2 text-[#198754] text-[12px]"
              onClick={() => {
                if (!currentCampaignId) return;
                router.push(`/student/dashboard/campaign/${currentCampaignId}`);
              }}
            >
              <span>View</span>
              <img alt="Arrow" className="size-4" src={imgArrow} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div className="w-full lg:w-[508px] min-w-0">
          <div className="text-[#272635] text-[16px] sm:text-[18px] uppercase">history of donors</div>
          <div className="mt-2 text-[14px] sm:text-[16px] text-[rgba(39,38,53,0.5)] leading-[24px]">
            This is the performance of all campaign created for you over the period of your academics
          </div>
        </div>

        <div className="flex gap-2 items-center text-[#272635] text-[12px] self-start lg:self-auto">
          <span>Current</span>
          <img alt="Caret Down" className="size-4" src="/svg/icons/dropdown-arrow.svg" />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 items-center mb-6">
        <Tab
          active={activeTab === "all"}
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
          label="All donors"
        />
        <Tab
          active={activeTab === "guardians"}
          onClick={() => {
            setActiveTab("guardians");
            setCurrentPage(1);
          }}
          label="Guardians"
          count={donorCounts.guardians}
        />
        <Tab
          active={activeTab === "good-samaritans"}
          onClick={() => {
            setActiveTab("good-samaritans");
            setCurrentPage(1);
          }}
          label="Good samaritans"
          count={donorCounts["good-samaritans"]}
        />
      </div>

      <div className="lg:hidden space-y-3">
        {paginatedDonors.length === 0 ? (
          <div className="rounded-[12px] border border-[rgba(39,38,53,0.1)] px-6 py-14 text-center">
            <div className="text-[14px] font-medium text-[rgba(39,38,53,0.75)]">No donors to show</div>
            <div className="mt-1 text-[12px] text-[rgba(39,38,53,0.55)] leading-5">
              Once donations start coming in, they will appear here.
            </div>
          </div>
        ) : (
          paginatedDonors.map((donor) => (
            <div
              key={donor.id}
              className="rounded-[12px] border border-[rgba(39,38,53,0.1)] p-4 bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[14px] text-[#272635] font-medium break-words">
                    {donor.name}
                  </div>
                  <div className="mt-1 text-[12px] text-[rgba(39,38,53,0.5)]">{donor.date}</div>
                </div>

                <div className="text-[14px] text-[#272635] shrink-0">
                  ${donor.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        )}

        <div className="flex items-center justify-end pt-2">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`min-h-[32px] min-w-[32px] rounded-[8px] grid place-items-center transition-colors ${
                currentPage === 1
                  ? "bg-[rgba(39,38,53,0.1)] cursor-not-allowed"
                  : "bg-white hover:bg-[rgba(39,38,53,0.05)] border border-[rgba(39,38,53,0.1)]"
              }`}
            >
              <img alt="Prev" className="size-5" src={imgCaretLeft} />
            </button>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`min-h-[32px] min-w-[32px] rounded-[8px] grid place-items-center transition-colors ${
                currentPage === totalPages
                  ? "bg-[rgba(39,38,53,0.1)] cursor-not-allowed"
                  : "bg-white hover:bg-[rgba(39,38,53,0.05)] border border-[rgba(39,38,53,0.1)]"
              }`}
            >
              <img alt="Next" className="size-5" src={imgCaretRight} />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block rounded-[12px] border border-[rgba(39,38,53,0.1)] overflow-hidden">
        <div className="flex border-b border-[rgba(39,38,53,0.1)] text-[12px] uppercase text-[#272635]">
          <div className="w-[279px] px-4 py-3">Names</div>
          <div className="w-[240px] px-4 py-3">Donation</div>
          <div className="w-[240px] px-4 py-3">Date</div>
        </div>

        {paginatedDonors.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="text-[14px] font-medium text-[rgba(39,38,53,0.75)]">No donors to show</div>
            <div className="mt-1 text-[12px] text-[rgba(39,38,53,0.55)] leading-5">
              Once donations start coming in, they will appear here.
            </div>
          </div>
        ) : (
          <div>
            {paginatedDonors.map((donor, idx) => (
              <div
                key={donor.id}
                className={`flex ${idx < paginatedDonors.length - 1 ? "border-b border-[rgba(39,38,53,0.1)]" : ""}`}
              >
                <div className="w-[279px] px-4 py-3 text-[14px] text-[#272635]">{donor.name}</div>
                <div className="w-[240px] px-4 py-3 text-[14px] text-[#272635]">
                  ${donor.amount.toFixed(2)}
                </div>
                <div className="w-[240px] px-4 py-3 text-[14px] text-[#272635]">{donor.date}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end px-4 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`min-h-[32px] min-w-[32px] rounded-[8px] grid place-items-center transition-colors ${
                currentPage === 1
                  ? "bg-[rgba(39,38,53,0.1)] cursor-not-allowed"
                  : "bg-white hover:bg-[rgba(39,38,53,0.05)] border border-[rgba(39,38,53,0.1)]"
              }`}
            >
              <img alt="Prev" className="size-5" src={imgCaretLeft} />
            </button>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`min-h-[32px] min-w-[32px] rounded-[8px] grid place-items-center transition-colors ${
                currentPage === totalPages
                  ? "bg-[rgba(39,38,53,0.1)] cursor-not-allowed"
                  : "bg-white hover:bg-[rgba(39,38,53,0.05)] border border-[rgba(39,38,53,0.1)]"
              }`}
            >
              <img alt="Next" className="size-5" src={imgCaretRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[14px] sm:text-[16px] pb-2 border-b-2 transition-colors ${
        active ? "text-[#198754] border-[#198754]" : "text-[rgba(39,38,53,0.5)] border-transparent"
      }`}
    >
      <span className="inline-flex items-center gap-2 flex-wrap">
        {label}
        {typeof count === "number" ? (
          <span className="bg-[rgba(39,38,53,0.1)] px-2 py-1 rounded-full text-[10px] text-[#272635]">
            {count}
          </span>
        ) : null}
      </span>
    </button>
  );
}