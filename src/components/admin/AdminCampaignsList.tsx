"use client";

import { useEffect, useState } from "react";
import {
  getCampaigns,
  reviewCampaign,
  type AdminCampaign,
} from "@/lib/admin/adminService";
import { useToast } from "@/components/ui/toast/ToastProvider";

function CampaignStatusBadge({ campaign }: { campaign: AdminCampaign }) {
  if (campaign.drafted)
    return (
      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-gray-50 text-gray-600">
        Draft
      </span>
    );
  if (campaign.accepted)
    return (
      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-green-50 text-green-700">
        Accepted
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-yellow-50 text-yellow-700">
      Pending Review
    </span>
  );
}

function ReviewModal({
  campaign,
  onClose,
  onSaved,
}: {
  campaign: AdminCampaign;
  onClose: () => void;
  onSaved: (id: number, accepted: boolean, notes: string) => void;
}) {
  const { showToast } = useToast();
  const [accepted, setAccepted] = useState(campaign.accepted);
  const [notes, setNotes] = useState(campaign.review_notes ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!campaign.student) return;
    try {
      setSaving(true);
      await reviewCampaign(campaign.student, campaign.id, { accepted, notes });
      showToast("success", "Campaign review saved.", "Saved");
      onSaved(campaign.id, accepted, notes);
      onClose();
    } catch {
      showToast("error", "Failed to save review.", "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[440px] rounded-[20px] bg-white p-6 shadow-xl">
        <h3 className="text-[16px] font-medium text-[#272635]">Review Campaign</h3>
        <p className="mt-1 text-[12px] text-[rgba(39,38,53,0.5)] truncate">{campaign.name}</p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-[12px] text-[rgba(39,38,53,0.6)]">Decision</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAccepted(true)}
                className={`flex-1 h-[38px] rounded-[10px] text-[13px] border ${
                  accepted
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "border-[rgba(39,38,53,0.1)] text-[#272635]"
                }`}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => setAccepted(false)}
                className={`flex-1 h-[38px] rounded-[10px] text-[13px] border ${
                  !accepted
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "border-[rgba(39,38,53,0.1)] text-[#272635]"
                }`}
              >
                Reject
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12px] text-[rgba(39,38,53,0.6)]">
              Notes (optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field w-full resize-none text-[13px]"
              placeholder="Add review notes..."
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[42px] rounded-[10px] border border-[rgba(39,38,53,0.1)] text-[13px] text-[#272635]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex-1 h-[42px] rounded-[10px] bg-[#273125] text-white text-[13px] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminCampaignsList() {
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<AdminCampaign | null>(null);

  const [draftedFilter, setDraftedFilter] = useState<"" | "true" | "false">("");
  const [acceptedFilter, setAcceptedFilter] = useState<"" | "true" | "false">("");
  const [session, setSession] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const res = await getCampaigns({
        drafted: draftedFilter === "" ? undefined : draftedFilter === "true",
        accepted: acceptedFilter === "" ? undefined : acceptedFilter === "true",
        academic_session: session || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      });
      setCampaigns(res.results ?? []);
    } catch {
      setError("Failed to load campaigns.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#272635]">Campaigns</h1>
        <p className="mt-1 text-[13px] text-[rgba(39,38,53,0.5)]">
          Review and manage student campaigns
        </p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); load(); }}
        className="mb-6 flex flex-wrap gap-3 items-end"
      >
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[rgba(39,38,53,0.6)]">Status</label>
          <select
            value={acceptedFilter}
            onChange={(e) => setAcceptedFilter(e.target.value as any)}
            className="input-field h-[40px] min-w-[140px] text-[13px]"
          >
            <option value="">All</option>
            <option value="true">Accepted</option>
            <option value="false">Not accepted</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[rgba(39,38,53,0.6)]">Draft</label>
          <select
            value={draftedFilter}
            onChange={(e) => setDraftedFilter(e.target.value as any)}
            className="input-field h-[40px] min-w-[120px] text-[13px]"
          >
            <option value="">All</option>
            <option value="true">Draft</option>
            <option value="false">Published</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[rgba(39,38,53,0.6)]">Session</label>
          <input
            type="text"
            placeholder="e.g. 2024/2025"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="input-field h-[40px] min-w-[130px] text-[13px]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[rgba(39,38,53,0.6)]">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-field h-[40px] text-[13px]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[rgba(39,38,53,0.6)]">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field h-[40px] text-[13px]"
          />
        </div>

        <button type="submit" className="h-[40px] px-5 rounded-[10px] bg-[#273125] text-white text-[13px]">
          Filter
        </button>
        <button
          type="button"
          onClick={() => {
            setAcceptedFilter(""); setDraftedFilter(""); setSession("");
            setStartDate(""); setEndDate(""); setTimeout(load, 0);
          }}
          className="h-[40px] px-5 rounded-[10px] border border-[rgba(39,38,53,0.1)] text-[13px] text-[#272635]"
        >
          Reset
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 rounded-full border-2 border-[#273125] border-t-transparent animate-spin" />
        </div>
      )}
      {error && (
        <div className="rounded-[12px] bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</div>
      )}
      {!loading && !error && campaigns.length === 0 && (
        <div className="py-16 text-center text-[13px] text-[rgba(39,38,53,0.5)]">No campaigns found.</div>
      )}

      {!loading && !error && campaigns.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-[#f9faf7] p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <div className="text-[14px] font-medium text-[#272635] truncate">{c.name}</div>
                  <div className="text-[11px] text-[rgba(39,38,53,0.5)] mt-0.5">
                    Student #{c.student}
                  </div>
                </div>
                <CampaignStatusBadge campaign={c} />
              </div>

              {c.goal !== undefined && (
                <div className="mb-2 text-[12px] text-[rgba(39,38,53,0.6)]">
                  Goal: {c.currency ?? ""} {c.goal.toLocaleString()}
                  {c.percentage !== undefined && (
                    <span className="ml-2">({c.percentage.toFixed(0)}% funded)</span>
                  )}
                </div>
              )}

              {c.academic_session && (
                <div className="mb-2 text-[12px] text-[rgba(39,38,53,0.5)]">
                  Session: {c.academic_session}
                </div>
              )}

              {c.review_notes && (
                <div className="mb-3 text-[12px] text-[rgba(39,38,53,0.5)] line-clamp-2">
                  Note: {c.review_notes}
                </div>
              )}

              <div className="flex items-center justify-between gap-2 mt-3">
                <span className="text-[11px] text-[rgba(39,38,53,0.4)]">
                  {new Date(c.created_at).toLocaleDateString()}
                </span>
                <button
                  type="button"
                  onClick={() => setReviewing(c)}
                  className="h-8 px-3 rounded-[8px] bg-[#273125] text-white text-[12px]"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {reviewing && (
        <ReviewModal
          campaign={reviewing}
          onClose={() => setReviewing(null)}
          onSaved={(id, accepted, notes) => {
            setCampaigns((prev) =>
              prev.map((c) => (c.id === id ? { ...c, accepted, review_notes: notes } : c))
            );
          }}
        />
      )}
    </div>
  );
}
