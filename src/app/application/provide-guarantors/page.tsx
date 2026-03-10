"use client";

import { ApplicationStepper } from "@/components/application/ApplicationStepper";
import { useState } from "react";
import { Plus, ChevronUp } from "lucide-react";

export default function ProvideGuarantorsPage() {
  const [guarantors, setGuarantors] = useState([{}]);

  return (
    <div className="w-full max-w-[760px]">
      <div className="rounded-[16px] bg-white px-10 py-10 shadow-sm border border-[var(--color-border)]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-medium text-[var(--color-primary-text)]">
              Apply to become a FabFour
            </h1>
            <p className="mt-2 max-w-[520px] text-xs leading-5 text-[var(--color-muted)]">
              Africa’s trusted social fundraising platform to support smart minds
              through tertiary education.
            </p>

            <ApplicationStepper />
          </div>

          <div className="text-xs text-[var(--color-muted)] flex items-center gap-1">
            English ▾
          </div>
        </div>

        {/* Guarantor Card */}
        <div className="mt-8 rounded-2xl bg-[#fafafa] p-8 border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-primary-text)]">
                Provide Guarantors
              </h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                For a better chance we recommend a minimum of 2 guarantors.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-xs text-red-500">Delete</button>
              <ChevronUp size={16} className="opacity-50" />
            </div>
          </div>

          <div className="mt-6 text-xs text-[var(--color-muted)]">
            Guarantor
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="text-xs">First Name</label>
              <input className="input-field mt-2 w-full" />
            </div>

            <div>
              <label className="text-xs">Last Name</label>
              <input className="input-field mt-2 w-full" />
            </div>
          </div>

          <div className="text-[10px] text-[var(--color-muted)] mt-1">
            Use the name on your government issued ID card
          </div>

          {/* Email + phone */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs">Email Address</label>
              <input className="input-field mt-2 w-full" />
            </div>

            <div>
              <label className="text-xs">Phone Number</label>
              <div className="flex mt-2">
                <div className="flex items-center px-3 border border-[var(--color-border)] rounded-l-lg bg-white text-xs">
                  🇺🇸 +1
                </div>
                <input className="input-field rounded-l-none w-full" />
              </div>
            </div>
          </div>

          {/* Country + state */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs">Country</label>
              <select className="input-field mt-2 w-full">
                <option>Select High Institution</option>
              </select>
            </div>

            <div>
              <label className="text-xs">State</label>
              <select className="input-field mt-2 w-full">
                <option>Select State</option>
              </select>
            </div>
          </div>

          {/* Attestation */}
          <div className="mt-6">
            <div className="text-xs">Attestation Letter</div>

            <button className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--color-primary-text)]">
              <Plus size={14} />
              Attach attestation letter
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 h-px bg-[var(--color-border)]" />

          {/* Add another */}
          <div className="flex justify-end mt-4">
            <button className="inline-flex items-center gap-2 text-xs text-[var(--color-primary-text)]">
              <Plus size={14} />
              Add Another Guarantor
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-end gap-6 mt-8">
          <button className="text-xs text-[var(--color-muted)] underline">
            Save To Continue Later
          </button>

          <button className="btn-primary px-6">Submit Request</button>
        </div>
      </div>
    </div>
  );
}