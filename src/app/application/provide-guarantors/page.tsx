import { ApplicationStepper } from "@/components/application/ApplicationStepper";

export default function ProvideGuarantorsPage() {
  return (
    <div className="w-full max-w-[760px]">
      <div className="rounded-[16px] bg-white px-10 py-10 shadow-sm border border-[var(--color-border)]">
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

        <div className="mt-10 text-sm text-[var(--color-muted)]">
          Provide Guarantors page UI 
        </div>
      </div>
    </div>
  );
}
