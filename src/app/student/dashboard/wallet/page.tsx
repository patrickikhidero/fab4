"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, Landmark } from "lucide-react";

import { getCampaignOverview } from "@/lib/student/campaign";
import { listMyFundsRequests, type FundsRequest } from "@/lib/student/funds";
import {
  listWithdrawalMethods,
  type WithdrawalMethod,
} from "@/lib/student/wallet";

type TabKey = "all" | "accepted" | "rejected";

type RequestRow = {
  id: string;
  purpose: string;
  deadline: string;
  fees: string;
  date: string;
  status: "Pending" | "Accepted" | "Rejected";
};

type BankInfo =
  | null
  | {
      bankName: string;
      accountName: string;
      accountMasked: string;
    };

function formatDate(v?: string) {
  if (!v) return "-";
  const d = new Date(v);
  if (!Number.isNaN(d.getTime())) {
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  }
  return v;
}

function toNum(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function formatPurpose(value?: string | null) {
  const raw = (value ?? "").trim();
  if (!raw) return "-";

  const cleaned = raw.replace(/_/g, " ").toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function mapStatus(s: FundsRequest["status"]): RequestRow["status"] {
  if (s === "ACCEPTED") return "Accepted";
  if (s === "REJECTED") return "Rejected";
  return "Pending";
}

function mapFundsToRow(r: FundsRequest): RequestRow {
  return {
    id: String(r.id),
    purpose: formatPurpose(r.purpose),
    deadline: formatDate(r.deadline),
    fees: `${(r.currency || "").toUpperCase()} ${toNum(
      r.amount
    ).toLocaleString()}`,
    date: formatDate(r.requested_date || r.created_at),
    status: mapStatus(r.status),
  };
}

function maskAccountNumber(acct?: string | null) {
  const s = (acct ?? "").trim();
  if (!s) return "xxxx";
  return `xx${s.slice(-4)}`;
}

function pickBestMethod(methods: WithdrawalMethod[]) {
  if (!methods.length) return null;
  return methods.find((m) => m.is_default) ?? methods[0];
}

function methodToBankInfo(m: WithdrawalMethod): BankInfo {
  if (!m) return null;

  if (m.payment_type === "bank_transfer") {
    return {
      bankName: m.bank_name ?? "Bank",
      accountName: m.account_name ?? "-",
      accountMasked: maskAccountNumber(m.account_number),
    };
  }

  if (m.payment_type === "mobile_money") {
    return {
      bankName: m.preferred_provider ?? "Mobile Money",
      accountName: `Country: ${m.country_code ?? "-"}`,
      accountMasked: m.currency ?? "-",
    };
  }

  return null;
}

export default function WalletPage() {
  const router = useRouter();

  const [tab, setTab] = useState<TabKey>("all");
  const [walletBalance, setWalletBalance] = useState(0);
  const [bankInfo, setBankInfo] = useState<BankInfo>(null);
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const [ov, mine, methodsRes] = await Promise.all([
          getCampaignOverview().catch(() => null),
          listMyFundsRequests({ limit: 200 }).catch(() => null),
          listWithdrawalMethods({ limit: 50 }).catch(() => null),
        ]);

        setWalletBalance(
          toNum(ov?.overall_stats?.total_amount_raised) || 0
        );

        const results = mine?.results ?? [];
        setRows(results.map(mapFundsToRow));

        const methods = methodsRes?.results ?? [];
        const best = pickBestMethod(methods);
        setBankInfo(best ? methodToBankInfo(best) : null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const filteredRows = useMemo(() => {
    if (tab === "all") return rows;
    if (tab === "accepted")
      return rows.filter((r) => r.status === "Accepted");
    return rows.filter((r) => r.status === "Rejected");
  }, [rows, tab]);

  return (
    <div className="glass rounded-[18px] sm:rounded-[24px] p-4 sm:p-6 lg:p-10 min-h-[640px] lg:min-h-[760px] min-w-0">
      <Header
        onRequestFunds={() =>
          router.push("/student/dashboard/wallet/request-funds")
        }
      />

      <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <WalletBalanceCard amount={walletBalance} />
        <BankCard
          bankInfo={bankInfo}
          onAddOrChange={() =>
            router.push("/student/dashboard/wallet/add-bank")
          }
        />
      </div>

      <div className="mt-8 sm:mt-10 min-w-0">
        <Tabs tab={tab} setTab={setTab} counts={countTabs(rows)} />

        {/* Mobile cards */}
        <div className="mt-4 lg:hidden">
          {loading ? (
            <div className="rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white px-4 py-10 text-[13px] text-[rgba(39,38,53,0.6)]">
              Loading...
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white">
              <EmptyState />
            </div>
          ) : (
            <RequestsMobileList rows={filteredRows} />
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block mt-4 rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white overflow-hidden">
          <TableHeader />

          {loading ? (
            <div className="px-6 py-14 text-[13px] text-[rgba(39,38,53,0.6)]">
              Loading...
            </div>
          ) : filteredRows.length === 0 ? (
            <EmptyState />
          ) : (
            <RequestsTable rows={filteredRows} />
          )}
        </div>

        <PaginationArrows />
      </div>

      <FooterLinks />
    </div>
  );
}

/* ---------------- UI Components ---------------- */

function Header({ onRequestFunds }: { onRequestFunds: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
      <div className="min-w-0">
        <div className="text-[22px] sm:text-[24px] font-medium text-[var(--color-primary-text)]">
          Funds Request
        </div>

        <div className="mt-2 text-[11px] sm:text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.6)]">
          Wallet & Bank
        </div>

        <p className="mt-2 max-w-[420px] text-[13px] text-[rgba(39,38,53,0.55)] leading-5">
          This is the total of the funds raised which can be accessed in order to pay for your fees.
        </p>
      </div>

      <button
        onClick={onRequestFunds}
        className="flex items-center justify-center gap-2 h-10 px-4 rounded-[12px] bg-white border border-[rgba(39,38,53,0.08)] hover:bg-[rgba(39,38,53,0.03)] transition w-full sm:w-auto shrink-0"
      >
        <span className="text-[13px]">Request for Funds</span>
        <span className="text-[16px]">↗</span>
      </button>
    </div>
  );
}

function WalletBalanceCard({ amount }: { amount: number }) {
  return (
    <div className="h-[150px] rounded-[16px] bg-[var(--color-primary)] text-white px-5 sm:px-6 py-5 flex flex-col justify-between shadow-[0px_10px_30px_-8px_rgba(0,0,0,0.2)] min-w-0">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-[10px] bg-white/15 flex items-center justify-center shrink-0">
          <Wallet size={18} />
        </div>
        <div className="text-[12px] uppercase tracking-wide opacity-80">
          Wallet Balance
        </div>
      </div>

      <div className="text-[26px] sm:text-[30px] font-medium break-words">
        ${amount.toLocaleString()}
      </div>
    </div>
  );
}

function BankCard({
  bankInfo,
  onAddOrChange,
}: {
  bankInfo: BankInfo;
  onAddOrChange: () => void;
}) {
  if (!bankInfo) {
    return (
      <div className="h-[150px] rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white px-5 sm:px-6 py-5 flex flex-col justify-between shadow-[0px_10px_30px_-8px_rgba(39,38,53,0.08)] min-w-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-[10px] bg-[rgba(39,38,53,0.05)] flex items-center justify-center shrink-0">
            <Landmark size={18} />
          </div>
          <div className="text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.6)]">
            Bank
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] text-[rgba(39,38,53,0.6)]">-</span>
          <button
            onClick={onAddOrChange}
            className="text-[13px] text-[rgba(39,38,53,0.7)] underline underline-offset-4 shrink-0"
          >
            Add Bank +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[150px] rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white px-5 sm:px-6 py-5 flex flex-col justify-between shadow-[0px_10px_30px_-8px_rgba(39,38,53,0.08)] min-w-0">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-[10px] bg-[rgba(39,38,53,0.05)] flex items-center justify-center shrink-0">
          <Landmark size={18} />
        </div>
        <div className="text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.6)]">
          Bank
        </div>
      </div>

      <div className="min-w-0">
        <div className="text-[15px] font-medium break-words">
          {bankInfo.bankName}
        </div>
        <div className="text-[12px] text-[rgba(39,38,53,0.6)] break-words">
          {bankInfo.accountName}
        </div>
        <div className="text-[12px] text-[rgba(39,38,53,0.6)] break-words">
          {bankInfo.accountMasked}
        </div>
      </div>

      <div className="flex gap-4 text-[12px]">
        <button
          onClick={onAddOrChange}
          className="underline underline-offset-4 text-[rgba(39,38,53,0.6)]"
        >
          Change
        </button>
      </div>
    </div>
  );
}

function Tabs({
  tab,
  setTab,
  counts,
}: {
  tab: TabKey;
  setTab: (t: TabKey) => void;
  counts: { accepted: number; rejected: number };
}) {
  return (
    <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center gap-6 text-[13px] min-w-max pr-2">
        <TabButton active={tab === "all"} onClick={() => setTab("all")}>
          All requests
        </TabButton>
        <TabButton active={tab === "accepted"} onClick={() => setTab("accepted")}>
          Accepted <span className="ml-1 opacity-60">{counts.accepted}</span>
        </TabButton>
        <TabButton active={tab === "rejected"} onClick={() => setTab("rejected")}>
          Rejected <span className="ml-1 opacity-60">{counts.rejected}</span>
        </TabButton>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative pb-2 whitespace-nowrap",
        active ? "text-[var(--color-primary-text)]" : "text-[rgba(39,38,53,0.5)]",
      ].join(" ")}
    >
      {children}
      {active && <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#198754]" />}
    </button>
  );
}

function TableHeader() {
  return (
    <div className="grid grid-cols-5 gap-4 px-6 py-4 text-[12px] text-[rgba(39,38,53,0.55)] border-b border-[rgba(39,38,53,0.08)]">
      <div className="tracking-[0.02em]">Purpose</div>
      <div className="tracking-[0.02em]">Deadline</div>
      <div>Fees</div>
      <div>Date</div>
      <div>Status</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-14 flex flex-col items-center justify-center text-center">
      <div className="mt-4 text-[14px] font-medium text-[rgba(39,38,53,0.75)]">
        No request to show
      </div>
      <div className="mt-1 text-[12px] text-[rgba(39,38,53,0.55)] max-w-[380px] leading-5">
        Use the “Request for Funds” button top right to request for funds to pay your fees.
      </div>
    </div>
  );
}

function RequestsTable({ rows }: { rows: RequestRow[] }) {
  return (
    <div className="divide-y divide-[rgba(39,38,53,0.06)]">
      {rows.map((r) => (
        <div
          key={r.id}
          className="grid grid-cols-5 gap-4 px-6 py-4 text-[13px] text-[rgba(39,38,53,0.75)]"
        >
          <div className="pr-2">
            <span className="inline-flex items-center rounded-full bg-white border border-[rgba(39,38,53,0.08)] px-3 py-1 text-[12px]">
              {r.purpose}
            </span>
          </div>
          <div className="pl-1">{r.deadline}</div>
          <div>{r.fees}</div>
          <div>{r.date}</div>
          <div>{r.status}</div>
        </div>
      ))}
    </div>
  );
}

function RequestsMobileList({ rows }: { rows: RequestRow[] }) {
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div
          key={r.id}
          className="rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-center rounded-full bg-white border border-[rgba(39,38,53,0.08)] px-3 py-1 text-[12px] text-[rgba(39,38,53,0.75)]">
              {r.purpose}
            </span>

            <StatusBadge status={r.status} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 text-[12px]">
            <InfoPair label="Deadline" value={r.deadline} />
            <InfoPair label="Fees" value={r.fees} />
            <InfoPair label="Date" value={r.date} />
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[rgba(39,38,53,0.5)] tracking-[0.02em]">{label}</div>
      <div className="mt-1.5 text-[rgba(39,38,53,0.8)] break-words">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: RequestRow["status"] }) {
  const cls =
    status === "Accepted"
      ? "bg-[#eaf6ef] text-[#198754]"
      : status === "Rejected"
        ? "bg-[#fdecec] text-[#c0392b]"
        : "bg-[rgba(39,38,53,0.08)] text-[rgba(39,38,53,0.7)]";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${cls}`}>
      {status}
    </span>
  );
}

function PaginationArrows() {
  return (
    <div className="mt-4 flex justify-center lg:justify-end gap-2">
      <button className="h-9 w-9 rounded-[10px] border border-[rgba(39,38,53,0.08)] bg-white/60 grid place-items-center">
        ‹
      </button>
      <button className="h-9 w-9 rounded-[10px] border border-[rgba(39,38,53,0.08)] bg-white/60 grid place-items-center">
        ›
      </button>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="mt-10 flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-2 text-[12px] text-[rgba(39,38,53,0.5)]">
      <span>Terms</span>
      <span>Legal</span>
      <span>Privacy policy</span>
      <span>Cookie policy</span>
    </div>
  );
}

function countTabs(rows: RequestRow[]) {
  return {
    accepted: rows.filter((r) => r.status === "Accepted").length,
    rejected: rows.filter((r) => r.status === "Rejected").length,
  };
}