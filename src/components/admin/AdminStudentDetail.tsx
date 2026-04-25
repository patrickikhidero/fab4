"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  getStudent,
  getStudentDocuments,
  verifyDocument,
  getStudentCampaigns,
  reviewCampaign,
  getStudentFundsRequests,
  updateFundsRequest,
  type AdminStudentProfile,
  type StudentDocument,
  type AdminCampaign,
  type AdminFundsRequest,
  type PaginatedResponse,
} from "@/lib/admin/adminService";
import { useToast } from "@/components/ui/toast/ToastProvider";

type Tab = "profile" | "documents" | "campaigns" | "funds";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700",
    VERIFIED: "bg-green-50 text-green-700",
    FLAGGED: "bg-red-50 text-red-600",
    APPROVED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-600",
    COMPLETED: "bg-blue-50 text-blue-700",
    DRAFTED: "bg-gray-50 text-gray-600",
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

// ── Document Verification Modal ───────────────────────────────────────────────

function VerifyDocModal({
  studentId,
  doc,
  onClose,
  onSaved,
}: {
  studentId: number;
  doc: StudentDocument;
  onClose: () => void;
  onSaved: (docId: number, status: string) => void;
}) {
  const { showToast } = useToast();
  const [status, setStatus] = useState<"PENDING" | "VERIFIED" | "FLAGGED">(
    (doc.verification?.status as any) ?? "PENDING"
  );
  const [notes, setNotes] = useState(doc.verification?.notes ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    try {
      setSaving(true);
      await verifyDocument(studentId, doc.id, { status, notes });
      showToast("success", "Document status updated.", "Saved");
      onSaved(doc.id, status);
      onClose();
    } catch {
      showToast("error", "Failed to update document status.", "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[440px] rounded-[20px] bg-white p-6 shadow-xl">
        <h3 className="text-[16px] font-medium text-[#272635]">Verify Document</h3>
        <p className="mt-1 text-[12px] text-[rgba(39,38,53,0.5)]">
          {doc.document_type || `Document #${doc.id}`}
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-[12px] text-[rgba(39,38,53,0.6)]">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="input-field w-full text-[13px]"
            >
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="FLAGGED">Flagged for Follow-up</option>
            </select>
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
              placeholder="Add notes..."
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
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Campaign Review Modal ─────────────────────────────────────────────────────

function ReviewCampaignModal({
  studentId,
  campaign,
  onClose,
  onSaved,
}: {
  studentId: number;
  campaign: AdminCampaign;
  onClose: () => void;
  onSaved: (campaignId: number, accepted: boolean) => void;
}) {
  const { showToast } = useToast();
  const [accepted, setAccepted] = useState(campaign.accepted);
  const [notes, setNotes] = useState(campaign.review_notes ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    try {
      setSaving(true);
      await reviewCampaign(studentId, campaign.id, { accepted, notes });
      showToast("success", "Campaign review saved.", "Saved");
      onSaved(campaign.id, accepted);
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

// ── Tab Content ───────────────────────────────────────────────────────────────

function ProfileTab({ student }: { student: AdminStudentProfile }) {
  const fields: [string, string | undefined | null][] = [
    ["First Name", student.first_name],
    ["Last Name", student.last_name],
    ["Email", student.email],
    ["Phone", student.phone_number],
    ["Institution", student.institution],
    ["Course", student.course],
    ["Level", student.level],
    ["Student Entry", student.student_entry],
    ["Verified", student.is_verified ? "Yes" : "No"],
    ["Joined", new Date(student.created_at).toLocaleDateString()],
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(([label, value]) => (
        <div key={label}>
          <div className="text-[11px] text-[rgba(39,38,53,0.5)] mb-0.5">{label}</div>
          <div className="text-[14px] text-[#272635]">{value || "—"}</div>
        </div>
      ))}
    </div>
  );
}

function DocumentsTab({
  studentId,
  docs,
  onDocUpdate,
}: {
  studentId: number;
  docs: StudentDocument[];
  onDocUpdate: (docId: number, status: string) => void;
}) {
  const [verifyingDoc, setVerifyingDoc] = useState<StudentDocument | null>(null);

  if (docs.length === 0)
    return <p className="text-[13px] text-[rgba(39,38,53,0.5)]">No documents.</p>;

  return (
    <>
      <div className="space-y-3">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between gap-4 rounded-[12px] border border-[rgba(39,38,53,0.08)] px-4 py-3"
          >
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-[#272635]">
                {doc.document_type || `Document #${doc.id}`}
              </div>
              <div className="mt-1">
                <StatusBadge status={doc.verification?.status ?? "PENDING"} />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {doc.file && (
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-[8px] border border-[rgba(39,38,53,0.1)] text-[#272635]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={() => setVerifyingDoc(doc)}
                className="h-8 px-3 rounded-[8px] bg-[#273125] text-white text-[12px]"
              >
                Verify
              </button>
            </div>
          </div>
        ))}
      </div>
      {verifyingDoc && (
        <VerifyDocModal
          studentId={studentId}
          doc={verifyingDoc}
          onClose={() => setVerifyingDoc(null)}
          onSaved={onDocUpdate}
        />
      )}
    </>
  );
}

function CampaignsTab({
  studentId,
  campaigns,
  onCampaignUpdate,
}: {
  studentId: number;
  campaigns: AdminCampaign[];
  onCampaignUpdate: (id: number, accepted: boolean) => void;
}) {
  const [reviewing, setReviewing] = useState<AdminCampaign | null>(null);

  if (campaigns.length === 0)
    return <p className="text-[13px] text-[rgba(39,38,53,0.5)]">No campaigns.</p>;

  return (
    <>
      <div className="space-y-3">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="rounded-[12px] border border-[rgba(39,38,53,0.08)] px-4 py-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[14px] font-medium text-[#272635] truncate">{c.name}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <StatusBadge
                    status={c.accepted ? "APPROVED" : c.drafted ? "DRAFTED" : "PENDING"}
                  />
                  {c.percentage !== undefined && (
                    <span className="text-[11px] text-[rgba(39,38,53,0.5)]">
                      {c.percentage.toFixed(0)}% funded
                    </span>
                  )}
                </div>
                {c.review_notes && (
                  <p className="mt-1 text-[12px] text-[rgba(39,38,53,0.5)]">Note: {c.review_notes}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setReviewing(c)}
                className="shrink-0 h-8 px-3 rounded-[8px] bg-[#273125] text-white text-[12px]"
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
      {reviewing && (
        <ReviewCampaignModal
          studentId={studentId}
          campaign={reviewing}
          onClose={() => setReviewing(null)}
          onSaved={onCampaignUpdate}
        />
      )}
    </>
  );
}

function FundsRequestsTab({
  studentId,
  requests,
  onUpdate,
}: {
  studentId: number;
  requests: AdminFundsRequest[];
  onUpdate: (id: number, status: string) => void;
}) {
  const { showToast } = useToast();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const STATUSES = ["PENDING", "APPROVED", "REJECTED", "COMPLETED"];

  async function changeStatus(req: AdminFundsRequest, newStatus: string) {
    try {
      setUpdatingId(req.id);
      await updateFundsRequest(studentId, req.id, { status: newStatus });
      showToast("success", "Status updated.", "Saved");
      onUpdate(req.id, newStatus);
    } catch {
      showToast("error", "Failed to update status.", "Error");
    } finally {
      setUpdatingId(null);
    }
  }

  if (requests.length === 0)
    return <p className="text-[13px] text-[rgba(39,38,53,0.5)]">No funds requests.</p>;

  return (
    <div className="space-y-3">
      {requests.map((r) => (
        <div
          key={r.id}
          className="flex items-center justify-between gap-4 rounded-[12px] border border-[rgba(39,38,53,0.08)] px-4 py-3"
        >
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#272635]">
              {r.currency ?? ""} {r.amount ?? "—"}
            </div>
            {r.description && (
              <div className="mt-0.5 text-[12px] text-[rgba(39,38,53,0.5)] truncate">
                {r.description}
              </div>
            )}
            <div className="mt-1">
              <StatusBadge status={r.status} />
            </div>
          </div>
          <select
            value={r.status}
            disabled={updatingId === r.id}
            onChange={(e) => changeStatus(r, e.target.value)}
            className="input-field h-[36px] min-w-[130px] text-[12px] shrink-0 disabled:opacity-60"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function AdminStudentDetail({ id }: { id: number }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [student, setStudent] = useState<AdminStudentProfile | null>(null);
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>([]);
  const [fundsRequests, setFundsRequests] = useState<AdminFundsRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);
        const s = await getStudent(id);
        setStudent(s);
      } catch {
        setError("Failed to load student.");
      } finally {
        setLoading(false);
      }
    }
    loadStudent();
  }, [id]);

  async function loadTab(tab: Tab) {
    if (tab === "profile" || !student) return;
    try {
      setTabLoading(true);
      if (tab === "documents") {
        const data = await getStudentDocuments(id);
        setDocuments(
          Array.isArray(data) ? data : (data as PaginatedResponse<StudentDocument>).results ?? []
        );
      } else if (tab === "campaigns") {
        const data = await getStudentCampaigns(id);
        setCampaigns(data.results ?? []);
      } else if (tab === "funds") {
        const data = await getStudentFundsRequests(id);
        setFundsRequests(data.results ?? []);
      }
    } catch {
      showToast("error", "Failed to load data.", "Error");
    } finally {
      setTabLoading(false);
    }
  }

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    loadTab(tab);
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "documents", label: "Documents" },
    { key: "campaigns", label: "Campaigns" },
    { key: "funds", label: "Funds Requests" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 rounded-full border-2 border-[#273125] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="py-16 text-center">
        <p className="text-[13px] text-red-600">{error ?? "Student not found."}</p>
        <button
          onClick={() => router.push("/admin/students")}
          className="mt-4 text-[13px] text-[rgba(39,38,53,0.6)] underline"
        >
          Back to students
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => router.push("/admin/students")}
        className="mb-6 flex items-center gap-2 text-[13px] text-[rgba(39,38,53,0.6)] hover:text-[#272635]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to students
      </button>

      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#272635]">
          {student.first_name} {student.last_name}
        </h1>
        <p className="mt-1 text-[13px] text-[rgba(39,38,53,0.5)]">{student.email}</p>
      </div>

      <div className="mb-6 flex gap-1 border-b border-[rgba(39,38,53,0.08)]">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => handleTabChange(t.key)}
            className={`px-4 py-2.5 text-[13px] transition-colors relative ${
              activeTab === t.key
                ? "text-[#272635] font-medium"
                : "text-[rgba(39,38,53,0.5)] hover:text-[#272635]"
            }`}
          >
            {t.label}
            {activeTab === t.key && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#273125]" />
            )}
          </button>
        ))}
      </div>

      {tabLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 rounded-full border-2 border-[#273125] border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {activeTab === "profile" && <ProfileTab student={student} />}
          {activeTab === "documents" && (
            <DocumentsTab
              studentId={id}
              docs={documents}
              onDocUpdate={(docId, status) =>
                setDocuments((prev) =>
                  prev.map((d) =>
                    d.id === docId
                      ? { ...d, verification: { ...d.verification, status: status as any } }
                      : d
                  )
                )
              }
            />
          )}
          {activeTab === "campaigns" && (
            <CampaignsTab
              studentId={id}
              campaigns={campaigns}
              onCampaignUpdate={(cid, accepted) =>
                setCampaigns((prev) =>
                  prev.map((c) => (c.id === cid ? { ...c, accepted } : c))
                )
              }
            />
          )}
          {activeTab === "funds" && (
            <FundsRequestsTab
              studentId={id}
              requests={fundsRequests}
              onUpdate={(rid, status) =>
                setFundsRequests((prev) =>
                  prev.map((r) => (r.id === rid ? { ...r, status } : r))
                )
              }
            />
          )}
        </>
      )}
    </div>
  );
}
