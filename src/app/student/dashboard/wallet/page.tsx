

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCampaignOverview } from "@/lib/student/campaign";
import { listMyFundsRequests, type FundsRequest } from "@/lib/student/funds";

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

const BANK_STORAGE_KEY = "student_bank_info_v1";

function formatDate(isoOrDate?: string) {
  if (!isoOrDate) return "-";
  // ISO or YYYY-MM-DD
  const d = new Date(isoOrDate);
  if (!Number.isNaN(d.getTime())) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    return `${dd}/${mm}/${yy}`;
  }
  // fallback if Date parsing fails
  const [y, m, dd] = isoOrDate.split("-");
  if (y && m && dd) return `${dd}/${m}/${y}`;
  return isoOrDate;
}

function toNum(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function mapStatus(s: FundsRequest["status"]): RequestRow["status"] {
  if (s === "ACCEPTED") return "Accepted";
  if (s === "REJECTED") return "Rejected";
  return "Pending";
}

function mapFundsToRow(r: FundsRequest): RequestRow {
  const amount = toNum(r.amount);
  return {
    id: String(r.id),
    purpose: r.purpose?.[0] ?? "-",
    deadline: formatDate(r.deadline),
    fees: `${(r.currency || "").toUpperCase()} ${amount.toLocaleString()}`,
    date: formatDate(r.requested_date || r.created_at),
    status: mapStatus(r.status),
  };
}

export default function WalletPage() {
  const router = useRouter();

  const [tab, setTab] = useState<TabKey>("all");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [bankInfo, setBankInfo] = useState<BankInfo>(null);
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // bank (local only for now)
    try {
      const raw = localStorage.getItem(BANK_STORAGE_KEY);
      setBankInfo(raw ? (JSON.parse(raw) as BankInfo) : null);
    } catch {
      setBankInfo(null);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        // Wallet balance: no dedicated wallet endpoint shown in your docs,
        // so we derive from campaign overview for now.
        const [ov, mine] = await Promise.all([
          getCampaignOverview().catch(() => null),
          listMyFundsRequests({ limit: 200 }).catch(() => null),
        ]);

        console.log(mine)

        const bal =
          toNum(ov?.overall_stats.total_amount_raised) ||
          0;

        setWalletBalance(bal);

        const results = mine?.results ?? [];
        console.log(results)
        setRows(results.map(mapFundsToRow));
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const filteredRows = useMemo(() => {
    if (tab === "all") return rows;
    if (tab === "accepted") return rows.filter((r) => r.status === "Accepted");
    return rows.filter((r) => r.status === "Rejected");
  }, [rows, tab]);

  return (
    <div className="glass rounded-[24px] p-10 min-h-[760px]">
      <Header
        onRequestFunds={() => router.push("/student/dashboard/wallet/request-funds")}
      />

      <div className="mt-8 flex items-start justify-between gap-6">
        <WalletBalanceCard amount={walletBalance} />
        <BankCard
          bankInfo={bankInfo}
          onAddOrChange={() => router.push("/student/dashboard/wallet/add-bank")}
        />
      </div>

      <div className="mt-8">
        <Tabs tab={tab} setTab={setTab} counts={countTabs(rows)} />

        <div className="mt-4 rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white/60">
          <TableHeader />

          {loading ? (
            <div className="px-6 py-14 text-[13px] text-[rgba(39,38,53,0.6)]">Loading...</div>
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

function Header({ onRequestFunds }: { onRequestFunds: () => void }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="text-[24px] font-medium text-[var(--color-primary-text)]">
          Funds Request
        </div>
        <div className="mt-2 text-[12px] uppercase tracking-wide text-[rgba(39,38,53,0.6)]">
          Wallet & Bank
        </div>
        <p className="mt-2 max-w-[420px] text-[13px] text-[rgba(39,38,53,0.55)] leading-5">
          This is the total of the funds raised which can be accessed in order to pay for your fees.
        </p>
      </div>

      <button
        onClick={onRequestFunds}
        className="btn-secondary flex items-center gap-2 h-10 px-4 rounded-[12px]"
      >
        <span className="text-[13px]">Request for Funds</span>
        <span aria-hidden className="text-[16px]">↗</span>
      </button>
    </div>
  );
}

function WalletBalanceCard({ amount }: { amount: number }) {
  return (
    <div className="w-[240px] rounded-[16px] bg-[var(--color-primary)] text-white px-5 py-4">
      <div className="text-[11px] opacity-80">WALLET BALANCE</div>
      <div className="mt-2 text-[28px] font-medium">${amount.toLocaleString()}</div>
    </div>
  );
}

function BankCard({
  bankInfo,
  onAddOrChange,
}: {
  bankInfo: any;
  onAddOrChange: () => void;
}) {
  if (!bankInfo) {
    return (
      <div className="w-[280px] rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white/70 px-5 py-4">
        <div className="text-[12px] text-[rgba(39,38,53,0.6)]">-</div>
        <button
          onClick={onAddOrChange}
          className="mt-6 text-[13px] text-[rgba(39,38,53,0.55)] underline underline-offset-4"
        >
          Add Bank <span className="ml-1">+</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-[280px] rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white/70 px-5 py-4">
      <div className="text-[12px] uppercase text-[rgba(39,38,53,0.55)]">Bank</div>
      <div className="mt-2 text-[14px] font-medium text-[var(--color-primary-text)]">
        {bankInfo.bankName}
      </div>
      <div className="mt-1 text-[12px] text-[rgba(39,38,53,0.6)]">{bankInfo.accountName}</div>
      <div className="mt-1 text-[12px] text-[rgba(39,38,53,0.6)]">{bankInfo.accountMasked}</div>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={onAddOrChange}
          className="text-[12px] text-[rgba(39,38,53,0.55)] underline underline-offset-4"
        >
          Change
        </button>
        <button
          onClick={onAddOrChange}
          className="text-[12px] text-[rgba(39,38,53,0.55)] underline underline-offset-4"
        >
          +
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
    <div className="flex items-center gap-6 text-[13px]">
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
        "relative pb-2",
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
      <div>Purpose</div>
      <div>Deadline</div>
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
          <div>
            <span className="inline-flex items-center rounded-full bg-white border border-[rgba(39,38,53,0.08)] px-3 py-1 text-[12px]">
              {r.purpose}
            </span>
          </div>
          <div>{r.deadline}</div>
          <div>{r.fees}</div>
          <div>{r.date}</div>
          <div>{r.status}</div>
        </div>
      ))}
    </div>
  );
}

function PaginationArrows() {
  return (
    <div className="mt-4 flex justify-end gap-2">
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
    <div className="mt-10 flex justify-end gap-6 text-[12px] text-[rgba(39,38,53,0.5)]">
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