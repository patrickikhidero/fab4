"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  Info,
  CalendarDays,
  Plus,
  RefreshCcw,
} from "lucide-react";

import { createFundsRequest } from "@/lib/student/funds";

type PurposeOption = { value: string; label: string };
type ToastType = "success" | "error" | "info";

function safeErrMessage(err: any) {
  return (
    err?.response?.data?.detail ||
    err?.response?.data?.message ||
    (typeof err?.response?.data === "string" ? err.response.data : null) ||
    err?.message ||
    "Something went wrong."
  );
}

function Toast({
  open,
  type,
  title,
  message,
  onClose,
}: {
  open: boolean;
  type: ToastType;
  title: string;
  message?: string;
  onClose: () => void;
}) {
  if (!open) return null;

  const bg =
    type === "success"
      ? "bg-[#198754]"
      : type === "error"
        ? "bg-red-600"
        : "bg-[#272635]";

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div
        className={`w-[360px] max-w-[calc(100vw-32px)] ${bg} text-white rounded-[12px] shadow-lg p-4`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="font-semibold text-sm">{title}</div>
            {message ? (
              <div className="text-xs opacity-90 mt-1 leading-[1.4]">
                {message}
              </div>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="text-white/90 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RequestFundsPage() {
  const router = useRouter();

  const purposeOptions: PurposeOption[] = useMemo(
    () => [
      { value: "ACCOMMODATION", label: "Accommodation" },
      { value: "TUITION", label: "Tuition" },
      { value: "BOOKS", label: "Books" },
      { value: "PROJECT", label: "Project" },
      { value: "TRANSPORT", label: "Transport" },
    ],
    [],
  );

  const [purposeMode, setPurposeMode] = useState<"list" | "custom">("list");
  const [purpose, setPurpose] = useState<string>("");
  const [customPurpose, setCustomPurpose] = useState<string>("");

  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [deadline, setDeadline] = useState<string>("");
  const [note, setNote] = useState<string>("");

  // FX preview is UI-only
  const [fxToKES, setFxToKES] = useState<number>(129.0);

  const selectedPurposeLabel =
    purposeMode === "custom"
      ? customPurpose.trim() || "Purpose for the request"
      : purpose
        ? purposeOptions.find((p) => p.value === purpose)?.label ??
          "Select the purpose of this request"
        : "Select the purpose of this request";

  const resolvedPurposeEnum =
    purposeMode === "custom"
      ? (customPurpose.trim().toUpperCase().replace(/\s+/g, "_") || "")
      : purpose;

  const amountNum = Number(amount || 0);
  const kesPreview =
    Number.isFinite(amountNum) && amountNum > 0
      ? (amountNum * fxToKES).toLocaleString()
      : "0.00";

  const canSubmit =
    !!resolvedPurposeEnum &&
    Number.isFinite(amountNum) &&
    amountNum > 0 &&
    !!deadline;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("success");
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (type: ToastType, title: string, message?: string) => {
    setToastType(type);
    setToastTitle(title);
    setToastMessage(message ?? "");
    setToastOpen(true);
    window.setTimeout(() => setToastOpen(false), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // backend expects purpose: ["ACCOMMODATION"], etc
      const payload = {
        amount: amountNum.toFixed(2), // safe for backend that expects strings
        currency: currency.trim() || "USD",
        purpose: [resolvedPurposeEnum],
        deadline, // YYYY-MM-DD
        description: note.trim() || "—",
      };

      await createFundsRequest(payload);

      showToast("success", "Request sent", "Your funds request was submitted.");
      router.push("/student/dashboard/wallet?toast=request_sent");
    } catch (err: any) {
      showToast("error", "Request failed", safeErrMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.10)] p-8">
          {/* top-right language */}
          <div className="flex items-center justify-end mb-6">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#f9faf7]">
              <span className="text-[14px] text-[#272635]">English</span>
              <ChevronDown className="size-4 text-[rgba(39,38,53,0.6)]" />
            </button>
          </div>

          {/* header */}
          <div className="flex items-start gap-4 pb-5 border-b border-[rgba(39,38,53,0.10)]">
            <button
              onClick={() => router.push("/student/dashboard/wallet")}
              className="size-10 rounded-full bg-[#eceee4] grid place-items-center hover:bg-[#dfe2d6] transition"
              aria-label="Back"
            >
              <ArrowLeft className="size-4 text-[#272635]" />
            </button>

            <div className="flex-1">
              <div className="text-[24px] text-[#272635]">Request for Funds</div>
              <div className="text-[16px] text-[rgba(39,38,53,0.5)] mt-1">
                Clearly provide details to help us understand and process your
                fund request.
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="max-w-[560px] mx-auto space-y-4">
              {/* Purpose */}
              <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">
                  Select the purpose of this request
                </div>

                {purposeMode === "list" ? (
                  <>
                    <div className="relative">
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="w-full h-12 px-4 pr-10 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                      >
                        <option value="" disabled>
                          Select the purpose of this request
                        </option>
                        {purposeOptions.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="size-4 text-[rgba(39,38,53,0.45)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <button
                      type="button"
                      onClick={() => setPurposeMode("custom")}
                      className="mt-3 inline-flex items-center gap-2 text-[12px] text-[#198754] underline"
                    >
                      <Plus className="size-4" />
                      Not in the list? Add miscellaneous
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <input
                        value={customPurpose}
                        onChange={(e) => setCustomPurpose(e.target.value)}
                        placeholder="Purpose for the request"
                        className="flex-1 h-12 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          // UI only
                        }}
                        className="h-12 px-5 rounded-[10px] bg-[#eceee4] hover:bg-[#dfe2d6] transition text-[14px] text-[#272635]"
                      >
                        Add
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPurposeMode("list")}
                      className="mt-3 inline-flex items-center gap-2 text-[12px] text-[#198754] underline"
                    >
                      Select from a list
                    </button>

                    {customPurpose.trim() ? (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)]">
                        <span className="text-[12px] text-[#272635]">
                          {customPurpose.trim()}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCustomPurpose("")}
                          className="text-[12px] text-[rgba(39,38,53,0.6)] hover:text-[#272635]"
                          aria-label="Remove purpose"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              {/* Amount */}
              <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[14px] text-[rgba(39,38,53,0.7)]">
                    How much do you need?
                  </div>
                  <button
                    type="button"
                    onClick={() => setFxToKES((v) => v)} // UI-only
                    className="inline-flex items-center gap-2 text-[12px] text-[rgba(39,38,53,0.55)]"
                    aria-label="Refresh rate"
                  >
                    <RefreshCcw className="size-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputMode="decimal"
                    placeholder="$ 0.00"
                    className="flex-1 h-12 px-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                  />

                  <div className="h-12 px-4 rounded-[999px] bg-white border border-[rgba(39,38,53,0.10)] inline-flex items-center gap-2">
                    <span className="text-[14px] text-[#272635]">{currency}</span>
                    <ChevronDown className="size-4 text-[rgba(39,38,53,0.45)]" />
                  </div>

                  <div className="text-[14px] text-[rgba(39,38,53,0.6)] whitespace-nowrap flex items-center gap-2">
                    <span>KES {kesPreview}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-start gap-2 text-[12px] text-[rgba(39,38,53,0.55)]">
                  <Info className="size-4 mt-[1px]" />
                  <span>
                    Conversion preview is informational and will be finalized
                    during processing.
                  </span>
                </div>
              </div>

              {/* Deadline */}
              <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">
                  What’s the deadline for this payment?
                </div>

                <div className="relative">
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full h-12 px-4 pr-10 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635]"
                  />
                  <CalendarDays className="size-4 text-[rgba(39,38,53,0.45)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Note */}
              <div className="bg-[#f9faf7] rounded-[12px] p-5 border border-[rgba(39,38,53,0.08)]">
                <div className="text-[14px] text-[rgba(39,38,53,0.7)] mb-2">
                  Provide more information to help us process your request
                </div>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note"
                  className="w-full min-h-[120px] p-4 rounded-[10px] bg-white border border-[rgba(39,38,53,0.10)] outline-none text-[14px] text-[#272635] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/student/dashboard/wallet")}
                  className="text-[14px] text-[#272635] underline"
                  disabled={isSubmitting}
                >
                  Cancel Request
                </button>

                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className={`h-12 px-5 rounded-[10px] text-[14px] text-white transition ${
                    canSubmit && !isSubmitting
                      ? "bg-[#273125] hover:bg-[#1a2119]"
                      : "bg-[#6c757d] cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>

              <div className="text-center text-[12px] text-[rgba(39,38,53,0.45)] pt-2">
                Purpose: {selectedPurposeLabel}
              </div>
            </div>
          </form>

          <Toast
            open={toastOpen}
            type={toastType}
            title={toastTitle}
            message={toastMessage}
            onClose={() => setToastOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}