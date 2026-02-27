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

  // ---- API state
  const [loadingList, setLoadingList] = useState(false);
  const [loadingThread, setLoadingThread] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rawConversations, setRawConversations] = useState<ApiConversation[]>(
    [],
  );
  const [rawMessages, setRawMessages] = useState<ApiMessage[]>([]);

  // load conversations
  React.useEffect(() => {
    const run = async () => {
      try {
        setError(null);
        setLoadingList(true);

        const purpose: any = mapFilterToApiPurpose(filter);

        let items = await listConversations({ purpose });

        console.log(items)

        // client-side filter by academic_session
        items = items.filter((c: any) => {
          const s = (c.academic_session ?? "").trim();
          return !session ? true : s === session;
        });

        // newest first
        items.sort((a: any, b:any) => {
          const at = new Date(a.updated_at ?? a.created_at ?? 0).getTime();
          const bt = new Date(b.updated_at ?? b.created_at ?? 0).getTime();
          return bt - at;
        });

        setRawConversations(items);

        // pick default active
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
        setActiveId(null);
        setRawMessages([]);
      } finally {
        setLoadingList(false);
      }
    };

    run();
  }, [filter, session]);

  // load thread
  React.useEffect(() => {
    const run = async () => {
      if (!activeId) return;

      try {
        setError(null);
        setLoadingThread(true);

        const data = await getConversation(activeId);

        const msgs: ApiMessage[] = Array.isArray((data as any)?.messages)
          ? (data as any).messages
          : [];

        // old -> new
        msgs.sort((a, b) => {
          const at = new Date(a.created_at ?? a.updated_at ?? 0).getTime();
          const bt = new Date(b.created_at ?? b.updated_at ?? 0).getTime();
          return at - bt;
        });

        setRawMessages(msgs);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load messages");
        setRawMessages([]);
      } finally {
        setLoadingThread(false);
      }
    };

    run();
  }, [activeId]);

  const list: ConversationListItem[] = useMemo(() => {
    const me = getCurrentUserId();

    return rawConversations.map((c) => {
      const isMeCreator = me ? c.creator?.id === me : false;
      const other = isMeCreator ? c.receiver : c.creator;

      const last = c.last_message;
      const preview = last?.text?.trim()
        ? last.text.trim()
        : c.messages_count && c.messages_count > 0
          ? "View messages..."
          : "No messages yet";

      const timeLabel = formatTimeLabel(c.updated_at ?? c.created_at);

      const role: Role =
        (other?.email ?? "").toLowerCase().includes("admin") ||
        (safeName(other) ?? "").toLowerCase().includes("admin")
          ? "Admin"
          : c.purpose === "DONORS"
            ? "Donor"
            : "User";

      return {
        id: String(c.id),
        name: safeName(other),
        role,
        preview,
        timeLabel,
      };
    });
  }, [rawConversations]);

  const active = list.find((x) => x.id === activeId) ?? null;

  const messages: Message[] = useMemo(() => {
    const me = getCurrentUserId();

    return rawMessages.map((m) => {
      const isMe = me ? m.sender?.id === me : false;
      const file = (m.attachments ?? [])?.[0]?.file ?? null;

      return {
        id: String(m.id),
        sender: isMe ? "me" : "them",
        text: m.text ?? undefined,
        fileName: file ? file.split("/").pop() ?? "attachment" : undefined,
        timeLabel: formatTimeLabel(m.created_at ?? m.updated_at),
      };
    });
  }, [rawMessages]);

  const filteredList = useMemo(() => list, [list]);

  const onPickConversation = (id: string) => {
    setActiveId(id);
    setMenuOpen(false);
    setConfirmClearOpen(false);
    setConfirmEndOpen(false);
    router.push("/student/dashboard/conversations");
  };

  const onStartNew = () => router.push("/student/dashboard/conversations/new");

  const onSend = async () => {
    if (!activeId) return;
    if (!composer.trim() && !attachedFile) return;

    try {
      setError(null);

      // text only for now
      await sendConversationMessage(activeId, { text: composer.trim() });

      setComposer("");
      setAttachedFile(null);

      // refresh thread
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
      setError(e?.message ?? "Failed to send message");
    }
  };

  const onAttachPick = (file: File | null) => setAttachedFile(file);

  const clearMessages = async () => {
    if (!activeId) return;
    await clearConversationMessages(activeId);
    setRawMessages([]);
  };

  const endConversationFn = async () => {
    if (!activeId) return;
    await endConversationApi(activeId);

    // refresh list (keep same filter+session logic)
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

    // pick new active if the old one vanished
    setActiveId((prev) => {
      const stillExists = prev && items.some((x) => String(x.id) === prev);
      return stillExists ? prev : items[0] ? String(items[0].id) : null;
    });

    // close modal/menu states
    setMenuOpen(false);
    setConfirmEndOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="text-[#272635] text-[28px] font-medium">
          Conversations
        </div>

        <button
          onClick={onStartNew}
          className="text-[13px] text-[#272635] underline underline-offset-4"
        >
          + Start new conversation
        </button>
      </div>

      {/* Errors */}
      {error ? (
        <div className="mt-4 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      {/* Session + Filter */}
      <div className="mt-5 flex items-center gap-3">
        <Dropdown
          value={session}
          onChange={setSession}
          options={sessions}
          widthClass="w-[140px]"
        />
        <Dropdown
          value={filterLabel(filter)}
          onChange={(v) => setFilter(unlabelFilter(v))}
          options={["All", "Campaign", "Fund request", "Donors", "Complaint"]}
          widthClass="w-[120px]"
        />
      </div>

      {/* Two column layout */}
      <div className="mt-6 grid grid-cols-[320px_1fr] gap-6 min-h-[560px]">
        {/* Left list */}
        <div className="rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white overflow-hidden">
          {loadingList ? (
            <div className="p-6 text-[13px] text-[rgba(39,38,53,0.6)]">
              Loading conversations...
            </div>
          ) : filteredList.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-[14px] font-medium text-[rgba(39,38,53,0.75)]">
                Conversations Empty
              </div>
              <div className="mt-2 text-[12px] text-[rgba(39,38,53,0.55)]">
                You can start a conversation only with your account manager.
              </div>
              <button
                onClick={onStartNew}
                className="mt-6 h-10 px-4 rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-white text-[13px]"
              >
                Start new conversation
              </button>
            </div>
          ) : (
            filteredList.map((c) => (
              <button
                key={c.id}
                onClick={() => onPickConversation(c.id)}
                className={[
                  "w-full text-left px-5 py-4 border-b border-[rgba(39,38,53,0.06)]",
                  activeId === c.id
                    ? "bg-[rgba(39,38,53,0.03)]"
                    : "hover:bg-[rgba(39,38,53,0.02)]",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <AvatarInitial name={c.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[13px] font-medium text-[#272635] truncate">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-[rgba(39,38,53,0.45)] whitespace-nowrap">
                        {c.timeLabel}
                      </div>
                    </div>
                    <div className="text-[11px] text-[rgba(39,38,53,0.45)]">
                      {c.role}
                    </div>
                    <div className="mt-1 text-[12px] text-[rgba(39,38,53,0.6)] truncate">
                      {c.preview}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Right thread */}
        <div className="rounded-[16px] border border-[rgba(39,38,53,0.08)] bg-white flex flex-col overflow-hidden">
          {!active ? (
            <div className="flex-1 flex items-center justify-center text-[13px] text-[rgba(39,38,53,0.6)]">
              Select a conversation
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="px-6 py-4 border-b border-[rgba(39,38,53,0.08)] flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium text-[#272635]">
                    {active.name}
                  </div>
                  <div className="text-[12px] text-[rgba(39,38,53,0.5)]">
                    {active.role}
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="h-9 w-9 rounded-[10px] hover:bg-[rgba(39,38,53,0.04)] grid place-items-center"
                    aria-label="menu"
                  >
                    <span className="text-[18px] leading-none text-[rgba(39,38,53,0.7)]">
                      ⋮
                    </span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-[180px] rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-white shadow-[0px_12px_28px_-12px_rgba(39,38,53,0.25)] overflow-hidden z-20">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          setConfirmClearOpen(true);
                        }}
                        className="w-full text-left px-4 py-3 text-[13px] hover:bg-[rgba(39,38,53,0.03)]"
                      >
                        Clear messages
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          setConfirmEndOpen(true);
                        }}
                        className="w-full text-left px-4 py-3 text-[13px] text-red-600 hover:bg-[rgba(39,38,53,0.03)]"
                      >
                        End conversation
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {loadingThread ? (
                  <div className="text-[13px] text-[rgba(39,38,53,0.6)]">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-[13px] text-[rgba(39,38,53,0.6)]">
                    No messages yet.
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={
                        m.sender === "me"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div className="max-w-[560px]">
                        <div className="text-[10px] text-[rgba(39,38,53,0.45)] mb-1">
                          {m.sender === "me" ? "You" : active.name}{" "}
                          <span className="ml-2">{m.timeLabel}</span>
                        </div>

                        {m.fileName ? (
                          <div
                            className={[
                              "px-4 py-3 rounded-[14px] text-[13px]",
                              m.sender === "me"
                                ? "bg-[#198754] text-white"
                                : "bg-[rgba(39,38,53,0.05)] text-[#272635]",
                            ].join(" ")}
                          >
                            <div className="inline-flex items-center gap-2">
                              <span className="text-[16px]">📄</span>
                              <span className="underline underline-offset-4">
                                {m.fileName}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={[
                              "px-4 py-3 rounded-[14px] text-[13px] leading-5",
                              m.sender === "me"
                                ? "bg-[#198754] text-white"
                                : "bg-[rgba(39,38,53,0.05)] text-[#272635]",
                            ].join(" ")}
                          >
                            {m.text}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Composer */}
              <div className="border-t border-[rgba(39,38,53,0.08)] px-6 py-4">
                <div className="rounded-[14px] border border-[rgba(39,38,53,0.08)] px-4 py-3 flex items-center gap-3">
                  <input
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    placeholder="Add a note"
                    className="flex-1 bg-transparent outline-none text-[13px] text-[#272635]"
                  />

                  <label className="cursor-pointer text-[rgba(39,38,53,0.6)]">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        onAttachPick(e.target.files?.[0] ?? null)
                      }
                    />
                    <span className="text-[18px]">📎</span>
                  </label>

                  <button
                    onClick={onSend}
                    className="h-9 w-9 rounded-full bg-[#272635] text-white grid place-items-center"
                    aria-label="send"
                  >
                    ↑
                  </button>
                </div>

                {attachedFile ? (
                  <div className="mt-2 text-[12px] text-[rgba(39,38,53,0.6)]">
                    Attached:{" "}
                    <span className="font-medium text-[#272635]">
                      {attachedFile.name}
                    </span>{" "}
                    <button
                      className="ml-2 underline underline-offset-4"
                      onClick={() => setAttachedFile(null)}
                    >
                      remove
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Confirm Clear */}
      {confirmClearOpen && (
        <ConfirmModal
          title="Are you sure about this?"
          subtitle="Just so you know, we cannot recover your messages once you clear this conversation."
          cancelText="Cancel"
          confirmText="Clear conversation"
          confirmVariant="danger"
          onCancel={() => setConfirmClearOpen(false)}
          onConfirm={async () => {
            setConfirmClearOpen(false);
            try {
              setError(null);
              await clearMessages();
            } catch (e: any) {
              setError(e?.message ?? "Failed to clear messages");
            }
          }}
        />
      )}

      {/* Confirm End */}
      {confirmEndOpen && (
        <ConfirmModal
          title="Are you sure about this?"
          subtitle="Ending this conversation will close the thread and you can no longer send messages."
          cancelText="Cancel"
          confirmText="End conversation"
          confirmVariant="danger"
          onCancel={() => setConfirmEndOpen(false)}
          onConfirm={async () => {
            setConfirmEndOpen(false);
            try {
              setError(null);
              await endConversationFn();
            } catch (e: any) {
              setError(e?.message ?? "Failed to end conversation");
            }
          }}
        />
      )}
    </div>
  );
}

function Dropdown({
  value,
  onChange,
  options,
  widthClass,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  widthClass?: string;
}) {
  return (
    <div className={["relative", widthClass ?? ""].join(" ")}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 px-3 pr-8 rounded-[10px] border border-[rgba(39,38,53,0.08)] bg-white text-[13px] text-[#272635] outline-none appearance-none w-full"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(39,38,53,0.6)]">
        ▾
      </span>
    </div>
  );
}

function AvatarInitial({ name }: { name: string }) {
  const initial = (name?.trim()?.[0] ?? "U").toUpperCase();
  return (
    <div className="h-9 w-9 rounded-full bg-[rgba(39,38,53,0.08)] grid place-items-center text-[13px] font-medium text-[#272635]">
      {initial}
    </div>
  );
}

function ConfirmModal({
  title,
  subtitle,
  cancelText,
  confirmText,
  confirmVariant,
  onCancel,
  onConfirm,
}: {
  title: string;
  subtitle: string;
  cancelText: string;
  confirmText: string;
  confirmVariant?: "danger" | "primary";
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/20 z-50 grid place-items-center p-4">
      <div className="w-full max-w-[420px] rounded-[16px] bg-white border border-[rgba(39,38,53,0.08)] shadow-[0px_22px_50px_-25px_rgba(39,38,53,0.35)] p-8">
        <div className="text-[16px] font-medium text-[#272635]">{title}</div>
        <div className="mt-3 text-[13px] text-[rgba(39,38,53,0.6)] leading-5">
          {subtitle}
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <button onClick={onCancel} className="text-[13px] text-[#272635]">
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={[
              "px-4 py-2 rounded-[10px] text-[13px] text-white",
              confirmVariant === "danger" ? "bg-red-500" : "bg-[#272635]",
            ].join(" ")}
          >
            {confirmText}
          </button>
        </div>
      </div>
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