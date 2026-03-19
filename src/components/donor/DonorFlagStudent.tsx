"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface DonorFlagStudentProps {
  studentId: number;
}

export function DonorFlagStudent({ studentId }: DonorFlagStudentProps) {
  const router = useRouter();
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    router.push(`/donor/students/${studentId}/flag-submitted`);
  };

  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-[rgba(39,38,53,0.06)] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex items-center gap-1 text-[12px] text-[rgba(39,38,53,0.72)]"
        >
          <span>English</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-[520px]">
          <div className="flex items-start gap-3">
            <Link
              href={`/donor/students/${studentId}`}
              className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f2f3ec] text-[#272635]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <h1 className="text-[28px] text-[#272635]">Flag This Student</h1>
              <p className="mt-2 text-[13px] leading-6 text-[rgba(39,38,53,0.45)]">
                Provide us with information to back your intentions. This wouldn&apos;t
                stop up from disabling the student from your account but enables
                us improve security and trust.
              </p>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-[rgba(39,38,53,0.08)]" />

          <div className="mt-5">
            <label className="block text-[13px] text-[#272635]">
              Why do you want to stop supporting this student?
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note"
              rows={3}
              className="mt-3 w-full rounded-[10px] border border-[rgba(39,38,53,0.08)] bg-white px-4 py-3 text-[14px] text-[#272635] outline-none placeholder:text-[rgba(39,38,53,0.35)]"
            />
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-[13px] text-[#272635]"
            >
              Send Response
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-[rgba(39,38,53,0.5)] lg:justify-end">
          <button type="button">Terms</button>
          <button type="button">Legal</button>
          <button type="button">Privacy policy</button>
          <button type="button">Cookie policy</button>
        </div>
      </div>
    </div>
  );
}