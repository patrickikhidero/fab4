"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudents, type AdminStudentProfile } from "@/lib/admin/adminService";

function VerifiedBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
        verified ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
      }`}
    >
      {verified ? "Verified" : "Pending"}
    </span>
  );
}

export function AdminStudentsList() {
  const router = useRouter();

  const [students, setStudents] = useState<AdminStudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [verificationFilter, setVerificationFilter] = useState<"" | "true" | "false">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const res = await getStudents({
        verification_status:
          verificationFilter === "" ? undefined : verificationFilter === "true",
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      });
      setStudents(res.results ?? []);
    } catch {
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleFilter(e: React.FormEvent) {
    e.preventDefault();
    load();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#272635]">Students</h1>
        <p className="mt-1 text-[13px] text-[rgba(39,38,53,0.5)]">
          Manage and verify student profiles
        </p>
      </div>

      <form onSubmit={handleFilter} className="mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[rgba(39,38,53,0.6)]">Verification status</label>
          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value as "" | "true" | "false")}
            className="input-field h-[40px] min-w-[160px] text-[13px]"
          >
            <option value="">All</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
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

        <button
          type="submit"
          className="h-[40px] px-5 rounded-[10px] bg-[#273125] text-white text-[13px]"
        >
          Filter
        </button>

        <button
          type="button"
          onClick={() => {
            setVerificationFilter("");
            setStartDate("");
            setEndDate("");
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
        <div className="rounded-[12px] bg-red-50 px-4 py-3 text-[13px] text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="py-16 text-center text-[13px] text-[rgba(39,38,53,0.5)]">
          No students found.
        </div>
      )}

      {!loading && !error && students.length > 0 && (
        <div className="overflow-x-auto rounded-[16px] border border-[rgba(39,38,53,0.08)]">
          <table className="w-full text-[13px] text-[#272635]">
            <thead>
              <tr className="border-b border-[rgba(39,38,53,0.08)] bg-[#f9faf7]">
                {["Name", "Email", "Institution", "Course", "Status", "Joined"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-[rgba(39,38,53,0.6)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => router.push(`/admin/students/${s.id}`)}
                  className="border-b border-[rgba(39,38,53,0.06)] hover:bg-[#f9faf7] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-medium">
                    {s.first_name} {s.last_name}
                  </td>
                  <td className="px-4 py-3 text-[rgba(39,38,53,0.7)]">{s.email}</td>
                  <td className="px-4 py-3 text-[rgba(39,38,53,0.7)]">{s.institution || "—"}</td>
                  <td className="px-4 py-3 text-[rgba(39,38,53,0.7)]">{s.course || "—"}</td>
                  <td className="px-4 py-3">
                    <VerifiedBadge verified={s.is_verified} />
                  </td>
                  <td className="px-4 py-3 text-[rgba(39,38,53,0.7)]">
                    {new Date(s.created_at).toLocaleDateString()}
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
