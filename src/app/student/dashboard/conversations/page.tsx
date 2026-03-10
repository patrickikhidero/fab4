"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserId } from "@/lib/auth/storage";
import {
  listConversations,
  getConversation,
  sendConversationMessage,
  clearConversationMessages,
  endConversation as endConversationApi,
  type ApiConversation,
  type ApiMessage,
  type ApiUser,
} from "@/lib/student/conversations";

type Role = "Donor" | "Admin" | "Guardian" | "Sponsor" | "User";

type FilterKey = "all" | "campaign" | "fund-request" | "donors" | "complaint";

type ConversationListItem = {
  id: string;
  name: string;
  role: Role;
  preview: string;
  timeLabel: string;
};

type Message = {
  id: string;
  sender: "me" | "them";
  text?: string;
  fileName?: string;
  timeLabel: string;
};

function safeName(u?: ApiUser | null) {
  const n = (u?.first_name ?? "").trim();
  if (n) return n;
  const e = (u?.email ?? "").trim();
  return e || "User";
}

function formatTimeLabel(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  const now = new Date();

  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  if (sameDay) {
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function mapFilterToApiPurpose(filter: FilterKey): string | undefined {
  if (filter === "campaign") return "CAMPAIGN";
  if (filter === "fund-request") return "FUND_REQUEST";
  if (filter === "donors") return "DONORS";
  if (filter === "complaint") return "COMPLAINT";
  return undefined;
}

export default function ConversationsPage() {
  const router = useRouter();

  const sessions = ["2025/2026", "2024/2025", "2023/2024", "2022/2023"];
  const [session, setSession] = useState(sessions[0]);
  const [filter, setFilter] = useState<FilterKey>("all");

  const [activeId, setActiveId] = useState<string | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [confirmEndOpen, setConfirmEndOpen] = useState(false);

  const [composer, setComposer] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingThread, setLoadingThread] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rawConversations, setRawConversations] = useState<ApiConversation[]>([]);
  const [rawMessages, setRawMessages] = useState<ApiMessage[]>([]);

  /* ---------------- LOAD CONVERSATIONS ---------------- */

  React.useEffect(() => {
    const run = async () => {
      try {
        setError(null);
        setLoadingList(true);

        const purpose: any = mapFilterToApiPurpose(filter);

        let items = await listConversations({ purpose });

        items = items.filter((c: any) => {
          const s = (c.academic_session ?? "").trim();
          return !session ? true : s === session;
        });

        items.sort((a: any, b: any) => {
          const at = new Date(a.updated_at ?? a.created_at ?? 0).getTime();
          const bt = new Date(b.updated_at ?? b.created_at ?? 0).getTime();
          return bt - at;
        });

        setRawConversations(items);

        if (!items.length) {
          setActiveId(null);
          setRawMessages([]);
          return;
        }

        setActiveId((prev) => {
          const stillExists = prev && items.some((x) => String(x.id) === prev);
          return stillExists ? prev : String(items[0].id);
        });
      } catch (e: any) {
        setError(e?.message ?? "Failed to load conversations");
        setRawConversations([]);
      } finally {
        setLoadingList(false);
      }
    };

    run();
  }, [filter, session]);

  /* ---------------- LOAD THREAD ---------------- */

  React.useEffect(() => {
    const run = async () => {
      if (!activeId) return;

      try {
        setLoadingThread(true);

        const data = await getConversation(activeId);

        const msgs: ApiMessage[] = Array.isArray((data as any)?.messages)
          ? (data as any).messages
          : [];

        msgs.sort((a, b) => {
          const at = new Date(a.created_at ?? a.updated_at ?? 0).getTime();
          const bt = new Date(b.created_at ?? b.updated_at ?? 0).getTime();
          return at - bt;
        });

        setRawMessages(msgs);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load messages");
      } finally {
        setLoadingThread(false);
      }
    };

    run();
  }, [activeId]);

  /* ---------------- MAP LIST ---------------- */

  const list: ConversationListItem[] = useMemo(() => {
    const me = getCurrentUserId();

    return rawConversations.map((c) => {
      const isMeCreator = me ? c.creator?.id === me : false;
      const other = isMeCreator ? c.receiver : c.creator;

      const last = c.last_message;

      const preview = last?.text?.trim()
        ? last.text.trim()
        : "No messages yet";

      const role: Role =
        (other?.email ?? "").toLowerCase().includes("admin")
          ? "Admin"
          : c.purpose === "DONORS"
          ? "Donor"
          : "User";

      return {
        id: String(c.id),
        name: safeName(other),
        role,
        preview,
        timeLabel: formatTimeLabel(c.updated_at ?? c.created_at),
      };
    });
  }, [rawConversations]);

  const active = list.find((x) => x.id === activeId) ?? null;

  /* ---------------- MAP MESSAGES ---------------- */

  const messages: Message[] = useMemo(() => {
    const me = getCurrentUserId();

    return rawMessages.map((m) => {
      const isMe = me ? m.sender?.id === me : false;

      return {
        id: String(m.id),
        sender: isMe ? "me" : "them",
        text: m.text ?? undefined,
        timeLabel: formatTimeLabel(m.created_at),
      };
    });
  }, [rawMessages]);

  /* ---------------- SEND MESSAGE ---------------- */

  const onSend = async () => {
    if (!activeId) return;
    if (!composer.trim()) return;

    try {
      await sendConversationMessage(activeId, { text: composer.trim() });

      setComposer("");

      const data = await getConversation(activeId);
      setRawMessages(data.messages ?? []);
    } catch (e: any) {
      setError(e?.message ?? "Failed to send message");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-[#272635] text-[26px] font-medium">
          Conversations
        </div>

        <button
          onClick={() => router.push("/student/dashboard/conversations/new")}
          className="text-[13px] text-[#272635] underline"
        >
          + Start new conversation
        </button>
      </div>

      {/* FILTERS */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Dropdown
          value={session}
          onChange={setSession}
          options={sessions}
        />

        <Dropdown
          value={filterLabel(filter)}
          onChange={(v) => setFilter(unlabelFilter(v))}
          options={["All", "Campaign", "Fund request", "Donors", "Complaint"]}
        />
      </div>

      {/* MAIN GRID */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

        {/* LEFT LIST */}
        <div
          className={[
            "rounded-[16px] glass bg-white overflow-hidden",
            activeId ? "hidden lg:block" : "block",
          ].join(" ")}
        >
          {list.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className="w-full text-left px-5 py-4 glass"
            >
              <div className="flex gap-3">
                <AvatarInitial name={c.name} />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div className="text-[13px] font-medium truncate">
                      {c.name}
                    </div>

                    <div className="text-[11px] opacity-60">
                      {c.timeLabel}
                    </div>
                  </div>

                  <div className="text-[11px] opacity-60">{c.role}</div>

                  <div className="text-[12px] opacity-70 truncate">
                    {c.preview}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* THREAD */}
        <div
          className={[
            "rounded-[16px] bg-white flex flex-col overflow-hidden",
            !activeId ? "hidden lg:flex" : "flex",
          ].join(" ")}
        >
          {!active ? (
            <div className="flex-1 grid place-items-center text-[13px] opacity-60">
              Select a conversation
            </div>
          ) : (
            <>
              {/* THREAD HEADER */}
              <div className="px-4 lg:px-6 py-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => setActiveId(null)}
                    className="lg:hidden h-8 w-8 rounded-full hover:bg-gray-100 grid place-items-center"
                  >
                    ←
                  </button>

                  <div>
                    <div className="text-[13px] font-medium">
                      {active.name}
                    </div>
                    <div className="text-[12px] opacity-60">
                      {active.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={m.sender === "me" ? "flex justify-end" : "flex"}
                  >
                    <div className="max-w-[85%] lg:max-w-[560px]">
                      <div className="text-[10px] opacity-50 mb-1">
                        {m.sender === "me" ? "You" : active.name}
                        <span className="ml-2">{m.timeLabel}</span>
                      </div>

                      <div
                        className={[
                          "px-4 py-3 rounded-[14px] text-[13px]",
                          m.sender === "me"
                            ? "bg-[#198754] text-white"
                            : "bg-gray-100",
                        ].join(" ")}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* COMPOSER */}
              <div className="glass px-4 lg:px-6 py-4">
                <div className="flex gap-3 glass rounded-[14px] px-4 py-3">
                  <input
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    placeholder="Add a note"
                    className="flex-1 outline-none text-[13px]"
                  />

                  <button
                    onClick={onSend}
                    className="h-9 w-9 rounded-full bg-[#272635] text-white grid place-items-center"
                  >
                    ↑
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Dropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 px-3 rounded-[10px] glass bg-white text-[13px]"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function AvatarInitial({ name }: { name: string }) {
  const initial = (name?.[0] ?? "U").toUpperCase();

  return (
    <div className="h-9 w-9 rounded-full bg-gray-200 grid place-items-center text-[13px] font-medium">
      {initial}
    </div>
  );
}

function filterLabel(f: FilterKey) {
  if (f === "campaign") return "Campaign";
  if (f === "fund-request") return "Fund request";
  if (f === "donors") return "Donors";
  if (f === "complaint") return "Complaint";
  return "All";
}

function unlabelFilter(v: string): FilterKey {
  const s = v.toLowerCase();
  if (s.includes("campaign")) return "campaign";
  if (s.includes("fund")) return "fund-request";
  if (s.includes("donor")) return "donors";
  if (s.includes("complaint")) return "complaint";
  return "all";
}