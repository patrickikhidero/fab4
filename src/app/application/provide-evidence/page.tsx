"use client";

import { ApplicationStepper } from "@/components/application/ApplicationStepper";
import { useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";

export default function ProvideEvidencePage() {
  const [applicationType, setApplicationType] = useState<"new" | "returning">(
    "new"
  );

  return (
    <div className="w-full max-w-[760px]">
      {/* Main card (single) */}
      <div className="rounded-[16px] bg-white px-10 py-10 shadow-sm border border-[var(--color-border)]">
        {/* Top header */}
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
            English <span className="opacity-60">▾</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">
          {/* Section 1: Apply type */}
          <section className="rounded-2xl bg-black/[0.03] border border-[var(--color-border)] p-6">
            <div className="text-xs text-[var(--color-primary-text)]">
              How are you applying to the FabFour Foundation?
            </div>

            <div className="mt-3 flex gap-4">
              <ApplyPill
                label="Newly Admitted"
                active={applicationType === "new"}
                onClick={() => setApplicationType("new")}
              />
              <ApplyPill
                label="Returning Student"
                active={applicationType === "returning"}
                onClick={() => setApplicationType("returning")}
              />
            </div>
          </section>

          {/* Section 2: Intending High Institution */}
          <section className="rounded-2xl bg-black/[0.03] border border-[var(--color-border)] p-6">
            <div className="text-sm font-medium text-[var(--color-primary-text)]">
              Intending High Institution
            </div>
            <div className="mt-1 text-[11px] text-[var(--color-muted)]">
              Provide complete information about your admission
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <Label>Which school admitted you?</Label>
                <div className="relative">
                  <input
                    className="input-field w-full pr-10"
                    placeholder="Select High Institution"
                  />
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>What course were you offered?</Label>
                  <input
                    className="input-field w-full"
                    placeholder="Ex. Bio Chemical Engineering"
                  />
                </div>

                <div>
                  <Label>What’s your course duration?</Label>
                  <div className="relative">
                    <input
                      className="input-field w-full pr-10"
                      placeholder="Select timeline"
                      readOnly
                    />
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Country</Label>
                  <div className="relative">
                    <input
                      className="input-field w-full pr-10"
                      placeholder="Select Country"
                      readOnly
                    />
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                    />
                  </div>
                </div>

                <div>
                  <Label>State</Label>
                  <div className="relative">
                    <input
                      className="input-field w-full pr-10"
                      placeholder="Select State"
                      readOnly
                    />
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Attach Supporting Documents */}
          <section className="rounded-2xl bg-black/[0.03] border border-[var(--color-border)] p-6">
            <div className="text-sm font-medium text-[var(--color-primary-text)]">
              Attach Supporting Documents
            </div>
            <div className="mt-1 text-[11px] text-[var(--color-muted)]">
              Provide complete information about your admission
            </div>

            <div className="mt-5 space-y-6">
              <DocBlock
                title="Upload a original copy of your admission offer letter"
                desc="We recommend a minimum of 1000 word document showcasing why we should consider. See example"
                linkText="here"
              />

              <DocBlock
                title="Provide a personal statement describing why you’re fit for the FabFour Academic Scholarship"
                desc="We recommend a minimum of 1000 word document showcasing why we should consider. See example"
                linkText="here"
              />
            </div>
          </section>

          {/* Bottom actions */}
          <div className="mt-10 flex items-center justify-end gap-6">
            <button
              type="button"
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary-text)]"
            >
              Save To Continue Later
            </button>

            <button type="button" className="btn-primary h-[44px] px-7 rounded-lg">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small UI parts ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-[11px] text-[var(--color-primary-text)]">
      {children}
    </div>
  );
}

function ApplyPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 min-w-[170px] px-4 rounded-xl border text-xs flex items-center justify-between gap-4
        ${
          active
            ? "border-[var(--color-primary-text)] bg-white"
            : "border-[var(--color-border)] bg-white/70 text-[var(--color-muted)]"
        }`}
    >
      <span className={active ? "text-[var(--color-primary-text)]" : ""}>
        {label}
      </span>

      <span
        className={`grid place-items-center h-4 w-4 rounded-[4px] border
          ${
            active
              ? "bg-[var(--color-primary-text)] border-[var(--color-primary-text)]"
              : "bg-transparent border-[var(--color-border)]"
          }`}
      >
        {active ? <Check size={12} className="text-white" /> : null}
      </span>
    </button>
  );
}

function DocBlock({
  title,
  desc,
  linkText,
}: {
  title: string;
  desc: string;
  linkText: string;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-[var(--color-primary-text)]">
        {title}
      </div>

      <div className="mt-2 text-[11px] leading-5 text-[var(--color-muted)]">
        {desc}{" "}
        <a
          href="#"
          className="text-[var(--color-accent)] underline underline-offset-2"
          onClick={(e) => e.preventDefault()}
        >
          {linkText}
        </a>
      </div>

      <button
        type="button"
        className="mt-3 inline-flex items-center gap-2 text-[11px] text-[var(--color-primary-text)]"
      >
        <Plus size={14} className="text-[var(--color-muted)]" />
        <span className="underline underline-offset-2">
          Attach Personal Statement
        </span>
      </button>

      <div className="mt-4 h-px w-full bg-[var(--color-border)]" />
    </div>
  );
}