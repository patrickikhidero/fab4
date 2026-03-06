"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { getStoredUser, getUserIdFromToken } from "@/lib/auth/storage";
import { getStudentProfile, type StudentProfileResponse } from "@/lib/student/application";

type TabKey = "profile" | "academics" | "notification" | "security";

function Tab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative text-[12px] leading-[16px] px-1 pb-3 whitespace-nowrap shrink-0",
        active ? "text-[#272635]" : "text-[rgba(39,38,53,0.45)]",
      ].join(" ")}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#198754]" />
      )}
    </button>
  );
}

function Input({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="text-[12px] text-[#272635] leading-[16px]">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 px-3 rounded-[8px] bg-[#eef0e6] border border-[rgba(39,38,53,0.06)] outline-none text-[13px] text-[#272635] min-w-0"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="text-[12px] text-[#272635] leading-[16px]">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 px-3 rounded-[8px] bg-[#eef0e6] border border-[rgba(39,38,53,0.06)] outline-none text-[13px] text-[#272635] min-w-0"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={[
        "h-[18px] w-[32px] rounded-full relative border transition-colors shrink-0",
        checked
          ? "bg-[#198754] border-[#198754]"
          : "bg-[#eef0e6] border-[rgba(39,38,53,0.12)]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-all",
          checked ? "left-[16px]" : "left-[2px]",
        ].join(" ")}
      />
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const [tab, setTab] = useState<TabKey>("profile");
  const [loading, setLoading] = useState(true);

  // Profile tab fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  // Academics tab fields
  const [institutionName, setInstitutionName] = useState("University of Lagos");
  const [courseOfStudy, setCourseOfStudy] = useState("Bio Chemical Engineering");
  const [academicCountry, setAcademicCountry] = useState("Nigeria");
  const [academicState, setAcademicState] = useState("Lagos");

  // Notification tab toggles
  const [donationsInApp, setDonationsInApp] = useState(true);
  const [donationsEmail, setDonationsEmail] = useState(true);
  const [donationsSms, setDonationsSms] = useState(false);

  const [campaignsInApp, setCampaignsInApp] = useState(true);
  const [campaignsEmail, setCampaignsEmail] = useState(false);
  const [campaignsSms, setCampaignsSms] = useState(false);

  const [fundReqInApp, setFundReqInApp] = useState(false);
  const [fundReqEmail, setFundReqEmail] = useState(false);
  const [fundReqSms, setFundReqSms] = useState(false);

  // Security tab toggles
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const stored = getStoredUser();
        let userId: number | null = stored?.id ?? null;
        if (!userId) userId = getUserIdFromToken();
        if (!userId) userId = 224;

        const p: StudentProfileResponse | null = await getStudentProfile(userId);

        setFirstName((p as any)?.first_name ?? stored?.first_name ?? "");
        setLastName((p as any)?.last_name ?? stored?.last_name ?? "");
        setEmail((p as any)?.email ?? stored?.email ?? "");
        setPhone((p as any)?.phone_number ?? "");
        setCountry((p as any)?.country ?? "");
        setState((p as any)?.state ?? "");
        setAddress((p as any)?.residential_address ?? "");
      } catch {
        const stored = getStoredUser();
        setFirstName(stored?.first_name ?? "");
        setLastName(stored?.last_name ?? "");
        setEmail(stored?.email ?? "");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const subtitle =
    "Clearly provide details to help us understand and process your fund request.";

  const cardClass =
    "bg-[#f9faf7] rounded-[12px] p-4 border border-[rgba(39,38,53,0.06)]";

  return (
    <div className="w-full flex justify-center min-w-0">
      <div className="w-full max-w-[860px] min-w-0">
        {/* header row */}
        <div className="mt-4 sm:mt-6 flex items-start gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-8 w-8 rounded-full bg-[#eef0e6] grid place-items-center shrink-0"
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4 text-[#272635]" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="text-[14px] text-[#272635] leading-[20px] font-medium">
              My Account
            </div>
            <div className="text-[12px] text-[rgba(39,38,53,0.45)] leading-[16px] break-words">
              {subtitle}
            </div>
          </div>
        </div>

        {/* tabs row + Update Profile */}
        <div className="mt-5 border-b border-[rgba(39,38,53,0.08)]">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center gap-6 min-w-max pr-2">
                <Tab active={tab === "profile"} label="Profile" onClick={() => setTab("profile")} />
                <Tab active={tab === "academics"} label="Academics" onClick={() => setTab("academics")} />
                <Tab
                  active={tab === "notification"}
                  label="Notification"
                  onClick={() => setTab("notification")}
                />
                <Tab active={tab === "security"} label="Security" onClick={() => setTab("security")} />
              </div>
            </div>

            <button
              type="button"
              className="mb-2 text-[12px] text-[rgba(39,38,53,0.6)] inline-flex items-center gap-2 self-start sm:self-auto shrink-0"
            >
              <span className="opacity-70">✎</span>
              <span>Update Profile</span>
            </button>
          </div>
        </div>

        {/* body */}
        <div className="mt-6 min-w-0">
          {loading ? (
            <div className="text-[#272635] text-[14px]">Loading...</div>
          ) : (
            <>
              {/* PROFILE */}
              {tab === "profile" && (
                <div className="flex flex-col gap-6">
                  {/* Personal Information */}
                  <div className={cardClass}>
                    <div className="text-[12px] text-[#272635] font-medium">
                      Personal Information
                    </div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      Please kindly provide legitimate information about yourself across social media
                      and government systems.
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="First Name" value={firstName} onChange={setFirstName} />
                      <Input label="Last Name" value={lastName} onChange={setLastName} />
                    </div>

                    <div className="mt-3 text-[11px] text-[rgba(39,38,53,0.45)]">
                      Use the name on your government issued ID card
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Email Address" value={email} onChange={setEmail} />
                      <Input label="Phone Number" value={phone} onChange={setPhone} />
                    </div>
                  </div>

                  {/* Where to find you */}
                  <div className={cardClass}>
                    <div className="text-[12px] text-[#272635] font-medium">Where to find you</div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      Help us identify you in case it’s necessary
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Country of Origin"
                        value={country}
                        onChange={setCountry}
                        options={["Nigeria", "Kenya", "Ghana"]}
                      />
                      <Select
                        label="State"
                        value={state}
                        onChange={setState}
                        options={["Lagos", "Abuja", "Kaduna"]}
                      />
                    </div>

                    <div className="mt-4">
                      <Input
                        label="Residential Address"
                        value={address}
                        onChange={setAddress}
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  {/* Identify Yourself */}
                  <div className={[cardClass, "flex items-center justify-between gap-4"].join(" ")}>
                    <div className="min-w-0">
                      <div className="text-[12px] text-[#272635] font-medium">Identify Yourself</div>
                      <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)]">
                        Your profile has been verified
                      </div>
                    </div>

                    <div className="h-5 w-9 rounded-full bg-[#eef0e6] relative shrink-0">
                      <div className="absolute right-[2px] top-[2px] h-4 w-4 rounded-full bg-[#198754]" />
                    </div>
                  </div>
                </div>
              )}

              {/* ACADEMICS */}
              {tab === "academics" && (
                <div className="flex flex-col gap-6">
                  <div className={cardClass}>
                    <div className="text-[12px] text-[#272635] font-medium">High Institution</div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      Provide complete information about your admission
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Name of high institution"
                        value={institutionName}
                        onChange={setInstitutionName}
                      />
                      <Input
                        label="Course of study"
                        value={courseOfStudy}
                        onChange={setCourseOfStudy}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Country"
                        value={academicCountry}
                        onChange={setAcademicCountry}
                        options={["Nigeria", "Kenya", "Ghana"]}
                      />
                      <Select
                        label="State"
                        value={academicState}
                        onChange={setAcademicState}
                        options={["Lagos", "Abuja", "Kaduna"]}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATION */}
              {tab === "notification" && (
                <div className="flex flex-col gap-6">
                  <div className={cardClass}>
                    <div className="text-[12px] text-[#272635] font-medium">
                      Notification Settings
                    </div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      We may still send you important notifications about your account outside of your
                      notification settings.
                    </div>

                    <div className="mt-4 space-y-4">
                      {/* Donations */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                        <div className="min-w-0">
                          <div className="text-[12px] text-[#272635] font-medium">Donations</div>
                          <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                            These are notifications for comments on your posts and replies to your
                            comments.
                          </div>
                        </div>

                        <div className="shrink-0 w-full sm:w-[140px] space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">In-app</div>
                            <Toggle
                              checked={donationsInApp}
                              onChange={setDonationsInApp}
                              ariaLabel="Toggle donations in-app"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">Email</div>
                            <Toggle
                              checked={donationsEmail}
                              onChange={setDonationsEmail}
                              ariaLabel="Toggle donations email"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">SMS</div>
                            <Toggle
                              checked={donationsSms}
                              onChange={setDonationsSms}
                              ariaLabel="Toggle donations sms"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-[rgba(39,38,53,0.08)]" />

                      {/* Campaigns */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                        <div className="min-w-0">
                          <div className="text-[12px] text-[#272635] font-medium">Campaigns</div>
                          <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                            These are notifications for when someone tags you in a comment, post or
                            story.
                          </div>
                        </div>

                        <div className="shrink-0 w-full sm:w-[140px] space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">In-app</div>
                            <Toggle
                              checked={campaignsInApp}
                              onChange={setCampaignsInApp}
                              ariaLabel="Toggle campaigns in-app"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">Email</div>
                            <Toggle
                              checked={campaignsEmail}
                              onChange={setCampaignsEmail}
                              ariaLabel="Toggle campaigns email"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">SMS</div>
                            <Toggle
                              checked={campaignsSms}
                              onChange={setCampaignsSms}
                              ariaLabel="Toggle campaigns sms"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-[rgba(39,38,53,0.08)]" />

                      {/* Fund request */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                        <div className="min-w-0">
                          <div className="text-[12px] text-[#272635] font-medium">Fund request</div>
                          <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                            These are notifications to remind you of updates you might have missed.
                          </div>
                        </div>

                        <div className="shrink-0 w-full sm:w-[140px] space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">In-app</div>
                            <Toggle
                              checked={fundReqInApp}
                              onChange={setFundReqInApp}
                              ariaLabel="Toggle fund request in-app"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">Email</div>
                            <Toggle
                              checked={fundReqEmail}
                              onChange={setFundReqEmail}
                              ariaLabel="Toggle fund request email"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">SMS</div>
                            <Toggle
                              checked={fundReqSms}
                              onChange={setFundReqSms}
                              ariaLabel="Toggle fund request sms"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY */}
              {tab === "security" && (
                <div className="flex flex-col gap-6">
                  <div className={cardClass}>
                    <div className="text-[12px] text-[#272635] font-medium">
                      Password Reset Request
                    </div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      We may still send you important notifications about your account outside of your
                      notification settings.
                    </div>

                    {/* red notice box */}
                    <div className="mt-4 rounded-[10px] border border-[rgba(220,53,69,0.25)] bg-[rgba(220,53,69,0.06)] px-3 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-2 min-w-0">
                        <div className="mt-[2px] h-4 w-4 rounded-full border border-[rgba(220,53,69,0.45)] text-[10px] text-[#dc3545] grid place-items-center shrink-0">
                          !
                        </div>
                        <div className="text-[11px] text-[rgba(39,38,53,0.6)] leading-[16px]">
                          To keep your account safe use the button below to send a password change
                          request and we’ll send you a confirmation link to the email linked to this
                          account.
                        </div>
                      </div>

                      <button
                        type="button"
                        className="shrink-0 text-[11px] text-[#272635] inline-flex items-center gap-2 self-start sm:self-auto"
                      >
                        <span>Request Password Change</span>
                        <span className="text-[#dc3545]">↗</span>
                      </button>
                    </div>

                    {/* Two-Factor authentication row */}
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[12px] text-[#272635] font-medium">
                          Two-Factor authentication
                        </div>
                        <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)]">
                          This is the email linked to your account
                        </div>
                      </div>

                      <Toggle
                        checked={twoFaEnabled}
                        onChange={setTwoFaEnabled}
                        ariaLabel="Toggle two factor authentication"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}