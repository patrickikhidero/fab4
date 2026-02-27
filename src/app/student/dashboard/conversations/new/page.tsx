
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createConversation,
  getConversationsWithUser,
  sendConversationMessage,
  type ConversationPurpose,
  type ApiConversation,
} from "@/lib/student/conversations";

type Person = { id: string; name: string };

function mapReasonToPurpose(reason: string): Exclude<ConversationPurpose, "all"> {
  const r = reason.toLowerCase();
  if (r.includes("campaign")) return "CAMPAIGN";
  if (r.includes("fund")) return "FUND_REQUEST";
  if (r.includes("complaint")) return "COMPLAINT";
  // choose a default that your backend accepts.
  // If backend does NOT accept "DONORS", change this to one of the allowed enums or remove "Other" from UI.
  return "DONORS";
}

// if your backend requires academic_session, set it here (or compute current).
function defaultAcademicSession() {
  return "2025/2026";
}

export default function StartConversationPage() {
  const router = useRouter();

  // TODO: replace this with real API list (account manager)
  const people: Person[] = useMemo(
    () => [
      { id: "1", name: "Katey Winfred" },
      { id: "2", name: "Katherine Moss" },
      { id: "3", name: "Lukmon Williams" },
    ],
    [],
  );

  const reasons = useMemo(() => ["Campaign", "Fund request", "Complaint", "Other"], []);

  const [to, setTo] = useState<Person | null>(people[0] ?? null);
  const [reason, setReason] = useState<string>(reasons[0]);
  const [message, setMessage] = useState<string>("");

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSend = async () => {
    if (!to?.id) {
      setError("Please select a recipient.");
      return;
    }
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    try {
      setError(null);
      setSending(true);

      const receiverId = Number(to.id);
      if (!Number.isFinite(receiverId) || receiverId <= 0) {
        setError("Invalid recipient.");
        return;
      }

      const purpose = mapReasonToPurpose(reason);

      // 1) Try to reuse existing conversation with this user
      const existing = await getConversationsWithUser({ user_id: receiverId });
      const existingItems: ApiConversation[] = Array.isArray(existing) ? existing : [];
      const activeExisting = existingItems.find((c) => c.is_active) ?? existingItems[0] ?? null;

      let conversationId: number | null = activeExisting?.id ?? null;

      // 2) If none exists, create
      if (!conversationId) {
        const created = await createConversation({
          receiver_id: receiverId,
          purpose,
          academic_session: defaultAcademicSession(),
        });
        conversationId = created?.id ?? null;
      }

      if (!conversationId) {
        setError("Could not create conversation.");
        return;
      }

      // 3) Send first message
      await sendConversationMessage(conversationId, { text: message.trim() });

      // 4) Navigate back to conversations list
      // (Your ConversationsPage will auto-pick latest; if you later add a query param, you can open specific thread.)
      router.push("/student/dashboard/conversations");
    } catch (e: any) {
      setError(e?.message ?? "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/student/dashboard/conversations")}
          className="h-9 w-9 rounded-full border border-[rgba(39,38,53,0.08)] bg-white grid place-items-center hover:bg-[rgba(39,38,53,0.03)]"
          aria-label="back"
          disabled={sending}
        >
          ‹
        </button>

        <div className="text-[18px] font-medium text-[#272635]">Start a conversation</div>
      </div>

      {/* Error */}
      {error ? (
        <div className="mt-5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-8 space-y-6">
        {/* To */}
        <div>
          <div className="text-[12px] text-[rgba(39,38,53,0.6)]">To</div>
          <div className="mt-2">
            <select
              value={to?.id ?? ""}
              onChange={(e) => setTo(people.find((p) => p.id === e.target.value) ?? null)}
              className="w-full h-12 px-4 rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-white text-[13px] text-[#272635] outline-none"
              disabled={sending}
            >
              {people.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reason */}
        <div>
          <div className="text-[12px] text-[rgba(39,38,53,0.6)]">
            Tell us why you’re sending this message
          </div>
          <div className="mt-2">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-12 px-4 rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-white text-[13px] text-[#272635] outline-none"
              disabled={sending}
            >
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <div className="text-[12px] text-[rgba(39,38,53,0.6)]">Your message</div>
          <div className="mt-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note"
              className="w-full min-h-[120px] px-4 py-3 rounded-[12px] border border-[rgba(39,38,53,0.08)] bg-white text-[13px] text-[#272635] outline-none resize-none"
              disabled={sending}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            onClick={() => router.push("/student/dashboard/conversations")}
            className="text-[13px] text-[#272635]"
            disabled={sending}
          >
            Cancel
          </button>

          <button
            onClick={onSend}
            className="h-10 px-5 rounded-[10px] bg-[#272635] text-white text-[13px] disabled:opacity-60"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
}