"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, Share2, CheckCircle2 } from "lucide-react";

import { getCampaignOverview, listMyCampaigns } from "@/lib/student/campaign";
import { listDonationsByCampaign } from "@/lib/student/donations";

type TabKey = "comments" | "documents";

type CampaignListItem = {
  id: number;
  goal?: number | string | null;
  amount?: number | string | null;
  raised_amount?: number | string | null;
  amount_raised?: number | string | null;
  academic_session?: string | null;
  status?: string | null;
  accepted?: boolean;
  drafted?: boolean;
};

type DonorRow = { id: string; name: string; amount: number };

type DocRow = { id: string; name: string; size: string };

function toNum(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function mapStatus(raw: any): "active" | "under-review" | "completed" | "paused" {
  const s = String(raw ?? "").toLowerCase();
  if (s.includes("pause")) return "paused";
  if (s.includes("complete") || s.includes("achieved")) return "completed";
  if (s.includes("active") || s.includes("accept")) return "active";
  return "under-review";
}

export default function CampaignDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = Number((params as any)?.id);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("comments");

  const [campaign, setCampaign] = useState<CampaignListItem | null>(null);
  const [goal, setGoal] = useState(0);
  const [raisedSoFar, setRaisedSoFar] = useState(0);
  const [status, setStatus] = useState<"active" | "under-review" | "completed" | "paused">("under-review");
  const [academicSession, setAcademicSession] = useState("—");

  const [donors, setDonors] = useState<DonorRow[]>([]);
  // ✅ Placeholder docs space (endpoint later)
  const [docs] = useState<DocRow[]>([
    { id: "doc-1", name: "Tech design requirements.pdf", size: "200 KB" },
    { id: "doc-2", name: "Tech design requirements.pdf", size: "200 KB" },
  ]);

  const comments = useMemo(
    () => [
      {
        id: "c1",
        name: "Katherine Moss",
        time: "Thursday 11:40am",
        text: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
      },
      {
        id: "c2",
        name: "Katherine Moss",
        time: "Thursday 11:40am",
        text: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
      },
    ],
    [],
  );

  const progress = useMemo(() => {
    if (!goal) return 0;
    return Math.max(0, Math.min(100, Math.round((raisedSoFar / goal) * 100)));
  }, [raisedSoFar, goal]);

  const statusLabel = useMemo(() => {
    if (status === "active") return "Active";
    if (status === "completed") return "Completed";
    if (status === "paused") return "Paused";
    return "Under review";
  }, [status]);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const mine = await listMyCampaigns();
        const results: CampaignListItem[] = (mine as any)?.results ?? [];
        const found = results.find((c) => c.id === campaignId) ?? null;

        setCampaign(found);
        setGoal(toNum(found?.goal));
        setAcademicSession(String(found?.academic_session ?? "—"));
        setStatus(mapStatus(found?.status ?? (found?.accepted ? "active" : "under-review")));

        const [ov, donationRes] = await Promise.all([
          getCampaignOverview(),
          listDonationsByCampaign(campaignId),
        ]);

        // keep consistent with your existing overview usage:
        const totalRaised = toNum((ov as any)?.overall_stats?.total_amount_raised);
        setRaisedSoFar(totalRaised);

        const rows = (donationRes as any)?.results ?? donationRes ?? [];
        const mapped: DonorRow[] = (rows ?? []).slice(0, 6).map((d: any, idx: number) => {
          const isAnon = !!(d?.is_anonymous ?? d?.anonymous);
          const name = isAnon ? "Anonymous" : (d?.donor_name ?? d?.donor?.name ?? d?.name ?? "Anonymous");
          const amount = toNum(d?.amount ?? d?.donation_amount ?? d?.total);
          return { id: String(d?.id ?? idx), name, amount };
        });

        setDonors(mapped);
      } catch (e) {
        console.error("Campaign detail load failed", e);
      } finally {
        setLoading(false);
      }
    };

    if (Number.isFinite(campaignId)) run();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200" />
            <div>
              <div className="h-5 w-64 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-40 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="rounded-[16px] overflow-hidden border border-[rgba(39,38,53,0.08)] bg-white">
              <div className="h-[260px] bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="mt-1 h-3 w-24 rounded bg-gray-200" />
                  </div>
                </div>
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-40 w-full rounded-[16px] bg-gray-200" />
            <div className="h-40 w-full rounded-[16px] bg-gray-200" />
            <div className="h-24 w-full rounded-[16px] bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  const title = `Academic Support for ${academicSession} session`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/student/dashboard/campaign")}
            className="h-9 w-9 rounded-full border border-[rgba(39,38,53,0.12)] grid place-items-center hover:bg-black/5 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 text-[#272635]" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <div className="text-[#272635] text-[18px] font-medium">{title}</div>
              <span className="px-2 py-1 rounded-full text-[10px] bg-[#eaf6ef] text-[#198754]">
                {statusLabel}
              </span>
            </div>
            <div className="text-[12px] text-[rgba(39,38,53,0.55)]">
              This campaign is managed by <span className="text-[#198754]">FabFour</span>
            </div>
          </div>
        </div>

        <button className="text-[12px] text-[#272635] inline-flex items-center gap-2 hover:underline">
          <span>Share Campaign</span>
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* LEFT */}
        <div>
          <div className="rounded-[16px] overflow-hidden border border-[rgba(39,38,53,0.08)] bg-white">
            {/* Cover image placeholder */}
            <div className="h-[260px] bg-[#dfe7d6] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#dfe7d6] to-[#cfe0d1]" />
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),transparent_55%)]" />

              {/* tiny badge */}
              <div className="absolute left-6 top-6 h-9 w-9 rounded-full bg-white/80 backdrop-blur grid place-items-center border border-white/40">
                <span className="text-[#198754] text-[14px]">✳</span>
              </div>

              {/* avatar bubble */}
              <div className="absolute left-6 bottom-[-22px] h-11 w-11 rounded-full bg-white border border-[rgba(39,38,53,0.12)] grid place-items-center">
                <div className="h-9 w-9 rounded-full bg-[#eceee4]" />
              </div>
            </div>

            <div className="px-6 pt-8 pb-6">
              {/* Student info */}
              <div className="mb-4">
                <div className="text-[#272635] text-[14px] font-medium">Mollie Hall</div>
                <div className="text-[11px] text-[rgba(39,38,53,0.55)]">100L student</div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] border border-[rgba(39,38,53,0.12)] text-[#272635] bg-white">
                    University of Nigeria Nsukka
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] border border-[rgba(39,38,53,0.12)] text-[#272635] bg-white">
                    Chemical Eng
                  </span>
                </div>
              </div>

              {/* About */}
              <div className="mb-5">
                <div className="text-[10px] uppercase text-[rgba(39,38,53,0.55)] mb-2">About this campaign</div>
                <div className="text-[12px] leading-5 text-[rgba(39,38,53,0.75)] max-w-[520px]">
                  I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy,
                  and Webflow development.
                </div>
                <button className="mt-2 text-[12px] text-[#198754] inline-flex items-center gap-2 hover:underline">
                  <span>Update</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-[rgba(39,38,53,0.08)]">
                <button
                  onClick={() => setActiveTab("comments")}
                  className={[
                    "text-[12px] pb-3",
                    activeTab === "comments"
                      ? "text-[#272635] border-b-2 border-[#272635]"
                      : "text-[rgba(39,38,53,0.55)]",
                  ].join(" ")}
                >
                  Comments
                </button>

                <button
                  onClick={() => setActiveTab("documents")}
                  className={[
                    "text-[12px] pb-3 inline-flex items-center gap-2",
                    activeTab === "documents"
                      ? "text-[#272635] border-b-2 border-[#272635]"
                      : "text-[rgba(39,38,53,0.55)]",
                  ].join(" ")}
                >
                  <span>Supporting document</span>
                  <span className="h-5 min-w-5 px-2 rounded-full bg-[rgba(39,38,53,0.08)] text-[10px] text-[#272635] grid place-items-center">
                    {docs.length}
                  </span>
                </button>
              </div>

              {/* Tab content */}
              {activeTab === "comments" ? (
                <div className="pt-5 space-y-4">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#eceee4]" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-[12px] text-[#272635] font-medium">{c.name}</div>
                          <div className="text-[10px] text-[rgba(39,38,53,0.45)]">{c.time}</div>
                        </div>

                        <div className="mt-2 inline-block max-w-[520px] rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-[#f9faf7] px-4 py-3 text-[12px] text-[rgba(39,38,53,0.75)] leading-5">
                          {c.text}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="text-[12px] text-[rgba(39,38,53,0.6)] inline-flex items-center gap-2 hover:underline">
                    <span>Report student</span>
                  </button>
                </div>
              ) : (
                <div className="pt-5 space-y-3">
                  {docs.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-[10px] bg-[#f2f4ef] grid place-items-center border border-[rgba(39,38,53,0.08)]">
                          <FileText className="h-4 w-4 text-[rgba(39,38,53,0.65)]" />
                        </div>
                        <div>
                          <div className="text-[12px] text-[#272635]">{d.name}</div>
                          <div className="text-[10px] text-[rgba(39,38,53,0.5)]">{d.size}</div>
                        </div>
                      </div>

                      <button className="text-[12px] text-[#272635] inline-flex items-center gap-2 hover:underline">
                        <span>View</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white p-5 h-fit">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase text-[rgba(39,38,53,0.5)]">Raised so far</div>
              <div className="text-[#272635] text-[22px] font-medium mt-1">
                ${raisedSoFar.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="h-10 w-10 rounded-full border border-[rgba(39,38,53,0.12)] grid place-items-center">
              <span className="text-[11px] text-[#272635]">{progress}%</span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-[rgba(39,38,53,0.55)] space-y-1">
            <div className="flex items-center justify-between">
              <span>Campaign goal</span>
              <span className="text-[#272635]">
                +${goal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Donations</span>
              <span className="text-[#272635]">{donors.length}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-[10px] uppercase text-[rgba(39,38,53,0.5)] mb-2">Breakdown of the goal</div>
            <div className="flex flex-col gap-2">
              {["Accommodation", "Tuition Fees", "Books and Learning Materials"].map((x) => (
                <span
                  key={x}
                  className="px-3 py-2 rounded-full border border-[rgba(39,38,53,0.12)] text-[11px] text-[#272635] w-fit bg-white"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          <button className="mt-4 w-full h-10 rounded-[10px] bg-[#198754] text-white text-[12px] font-medium hover:opacity-95 transition-opacity">
            Donate Now
          </button>

          <div className="mt-5">
            <div className="text-[10px] uppercase text-[rgba(39,38,53,0.5)] mb-2">Recent donors</div>

            <div className="space-y-2">
              {(donors.length
                ? donors
                : [
                    { id: "p1", name: "Anonymous", amount: 50.5 },
                    { id: "p2", name: "Anonymous", amount: 50.5 },
                    { id: "p3", name: "Anonymous", amount: 50.5 },
                    { id: "p4", name: "Anonymous", amount: 50.5 },
                  ]
              )
                .slice(0, 6)
                .map((d) => (
                  <div key={d.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#198754]" />
                      <span className="text-[12px] text-[rgba(39,38,53,0.75)]">{d.name}</span>
                    </div>
                    <span className="text-[12px] text-[rgba(39,38,53,0.75)]">${d.amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>

            <button className="mt-4 w-full text-center text-[12px] text-[#198754] inline-flex items-center justify-center gap-2 hover:underline">
              <span>See All Donors</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}