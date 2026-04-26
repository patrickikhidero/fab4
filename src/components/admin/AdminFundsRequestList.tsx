"use client";

import { useEffect, useState } from "react";
import { getFundsRequests, updateFundsRequest, type AdminFundsRequest } from "@/lib/admin/adminService";
import { useToast } from "@/components/ui/toast/ToastProvider";

const STATUSES = ["PENDING", "APPROVED", "REJECTED", "COMPLETED"];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700",
    APPROVED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-600",
    COMPLETED: "bg-blue-50 text-blue-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
        colors[status] ?? "bg-gray-50 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export function AdminFundsRequestList() {
  const { showToast } = useToast();

  const [requests, setRequests] = useState<AdminFundsRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const res = await getFundsRequests({
        status: statusFilter || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      });
      setRequests(res.results ?? []);
    } catch {
      setError("Failed to load funds requests.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function changeStatus(req: AdminFundsRequest, newStatus: string) {
    if (!req.student) return;
    try {
      setUpdatingId(req.id);
      await updateFundsRequest(req.student, req.id, { status: newStatus });
      showToast("success", "Status updated.", "Saved");
      setRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: newStatus } : r))
      );
    } catch {
      showToast("error", "Failed to update status.", "Error");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#272635]">Funds Requests</h1>
        <p className="mt-1 text-[13px] text-[rgba(39,38,53,0.5)]">
          Manage student fund disbursement requests
        </p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); load(); }}
        className="mb-6 flex flex-wrap gap-3 items-end"
      >
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[rgba(39,38,53,0.6)]">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field h-[40px] min-w-[140px] text-[13px]"
          >
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
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
            setStatusFilter(""); setStartDate(""); setEndDate("");
            setTimeout(load, 0);
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
      {!loading && !error && requests.length === 0 && (
        <div className="py-16 text-center text-[13px] text-[rgba(39,38,53,0.5)]">No funds requests found.</div>
      )}

      {!loading && !error && requests.length > 0 && (
        <div className="overflow-x-auto rounded-[16px] border border-[rgba(39,38,53,0.08)]">
          <table className="w-full text-[13px] text-[#272635]">
            <thead>
              <tr className="border-b border-[rgba(39,38,53,0.08)] bg-[#f9faf7]">
                {["Student ID", "Amount", "Description", "Status", "Date", "Update"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-[rgba(39,38,53,0.6)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[rgba(39,38,53,0.06)] hover:bg-[#f9faf7] transition-colors"
                >
                  <td className="px-4 py-3 text-[rgba(39,38,53,0.7)]">#{r.student ?? "—"}</td>
                  <td className="px-4 py-3 font-medium">
                    {r.currency ?? ""} {r.amount ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-[rgba(39,38,53,0.6)] max-w-[200px] truncate">
                    {r.description || "—"}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 text-[rgba(39,38,53,0.6)]">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      disabled={updatingId === r.id}
                      onChange={(e) => changeStatus(r, e.target.value)}
                      className="input-field h-[34px] min-w-[120px] text-[12px] disabled:opacity-60"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
