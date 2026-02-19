import { ApplicationStepper } from "@/components/application/ApplicationStepper";

export default function TellUsAboutYourselfPage() {
  return (
    <div className="w-full max-w-[760px]">
      {/* top card */}
      <div className="rounded-[16px] bg-white px-10 py-10 shadow-sm border border-[var(--color-border)]">
        {/* header row */}
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

        {/* content */}
        <div className="mt-8 space-y-6">
          {/* Personal Information */}
          <section className="rounded-xl bg-black/[0.02] border border-[var(--color-border)] p-5">
            <div className="text-xs font-medium text-[var(--color-primary-text)]">
              Personal Information
            </div>
            <div className="mt-1 text-[11px] text-[var(--color-muted)]">
              Please identify yourself using legal information about yourself across social media and government systems.
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="First Name" placeholder="Koulibaly" />
              <Field label="Last Name" placeholder="Kofi" />
              <Field label="Email Address" placeholder="example@gmail.com" />
              <Field label="Phone Number" placeholder="+1 874950345" />
              <Field label="Date of Birth" placeholder="Pick a date" />
            </div>
          </section>

          {/* Where to find you */}
          <section className="rounded-xl bg-black/[0.02] border border-[var(--color-border)] p-5">
            <div className="text-xs font-medium text-[var(--color-primary-text)]">
              Where to find you
            </div>
            <div className="mt-1 text-[11px] text-[var(--color-muted)]">
              Help us identify your location, it’s necessary
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SelectField label="Country of Origin" placeholder="Select Country" />
              <SelectField label="State" placeholder="Select State" />
              <Field label="Residential Address" placeholder="example@gmail.com" full />
            </div>
          </section>

          {/* Identify Yourself */}
          <section className="rounded-xl bg-black/[0.02] border border-[var(--color-border)] p-5">
            <div className="text-xs font-medium text-[var(--color-primary-text)]">
              Identify Yourself
            </div>
            <div className="mt-1 text-[11px] text-[var(--color-muted)]">
              For a better chance we recommend a minimum of 2 guarantors.
            </div>

            <div className="mt-4">
              <SelectField label="Select Means Of Identification" placeholder="Select High Institution" />
            </div>
          </section>

          {/* bottom actions */}
          <div className="mt-6 flex items-center justify-end gap-4">
            <button className="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary-text)]">
              Save To Continue Later
            </button>
            <button className="btn-primary h-[40px] px-6 rounded-lg">
              Continue
            </button>
          </div>
        </div>

        {/* footer links inside card */}
        <div className="mt-10 flex items-center justify-end gap-4 text-[10px] text-[var(--color-muted)]">
          <span>Terms</span>
          <span>Legal</span>
          <span>Privacy policy</span>
          <span>Cookie policy</span>
        </div>
      </div>
    </div>
  );
}

/* small UI helpers (match your existing input/button styles) */
function Field({
  label,
  placeholder,
  full,
}: {
  label: string;
  placeholder: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="mb-2 text-[11px] text-[var(--color-primary-text)]">
        {label}
      </div>
      <input className="input-field w-full h-[44px]" placeholder={placeholder} />
    </div>
  );
}

function SelectField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <div className="mb-2 text-[11px] text-[var(--color-primary-text)]">
        {label}
      </div>
      <select className="input-field w-full h-[44px]">
        <option>{placeholder}</option>
      </select>
    </div>
  );
}
