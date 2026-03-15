"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { getStoredUser, setAuthTokens } from "@/lib/auth/storage";
import { getMe, updateUser, type MeResponse } from "@/lib/api/users";

type TabKey = "profile" | "academics" | "notification" | "security";

const NOT_AVAILABLE = "Not available";

function safeText(v?: string | null) {
  const s = (v ?? "").trim();
  return s || NOT_AVAILABLE;
}

function cleanForInput(v: string) {
  return v === NOT_AVAILABLE ? "" : v;
}

function cleanForPayload(v: string) {
  const s = v.trim();
  if (!s || s === NOT_AVAILABLE) return null;
  return s;
}

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
        className="h-10 px-3 rounded-[8px] bg-[#eef0e6] border border-[rgba(39,38,53,0.06)] outline-none text-[13px] text-[#272635] min-w-0 placeholder:text-[rgba(39,38,53,0.38)]"
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
        <option value="">{NOT_AVAILABLE}</option>
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
  const [saving, setSaving] = useState(false);
  const [me, setMe] = useState<MeResponse | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  const [institutionName, setInstitutionName] = useState("");
  const [courseOfStudy, setCourseOfStudy] = useState("");
  const [academicCountry, setAcademicCountry] = useState("");
  const [academicState, setAcademicState] = useState("");

  const [donationsInApp, setDonationsInApp] = useState(true);
  const [donationsEmail, setDonationsEmail] = useState(true);
  const [donationsSms, setDonationsSms] = useState(false);

  const [campaignsInApp, setCampaignsInApp] = useState(true);
  const [campaignsEmail, setCampaignsEmail] = useState(false);
  const [campaignsSms, setCampaignsSms] = useState(false);

  const [fundReqInApp, setFundReqInApp] = useState(false);
  const [fundReqEmail, setFundReqEmail] = useState(false);
  const [fundReqSms, setFundReqSms] = useState(false);

  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setStatus(null);

        const meRes = await getMe();
        setMe(meRes);

        setAuthTokens({ user: meRes });

        setFirstName(safeText(meRes.first_name));
        setLastName(safeText(meRes.last_name));
        setEmail(safeText(meRes.email));
        setPhone(safeText(meRes.student_profile?.phone_number));
        setCountry(safeText(meRes.student_profile?.country));
        setState(safeText(meRes.student_profile?.state));
        setAddress(safeText(meRes.student_profile?.residential_address));

        setInstitutionName(safeText(meRes.student_profile?.institution));
        setCourseOfStudy(safeText(meRes.student_profile?.course));
        setAcademicCountry(safeText(meRes.student_profile?.course_country));
        setAcademicState(safeText(meRes.student_profile?.course_state));

        setTwoFaEnabled(!!meRes.mfa_enabled);
      } catch (err: any) {
        const stored = getStoredUser() as any;

        setFirstName(safeText(stored?.first_name));
        setLastName(safeText(stored?.last_name));
        setEmail(safeText(stored?.email));
        setPhone(safeText(stored?.student_profile?.phone_number));
        setCountry(safeText(stored?.student_profile?.country));
        setState(safeText(stored?.student_profile?.state));
        setAddress(safeText(stored?.student_profile?.residential_address));

        setInstitutionName(safeText(stored?.student_profile?.institution));
        setCourseOfStudy(safeText(stored?.student_profile?.course));
        setAcademicCountry(safeText(stored?.student_profile?.course_country));
        setAcademicState(safeText(stored?.student_profile?.course_state));

        setTwoFaEnabled(!!stored?.mfa_enabled);

        setStatus({
          type: "error",
          message: "We could not refresh your account details. Showing saved data instead.",
        });
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

  const userId = useMemo(() => {
    return Number(me?.id || (getStoredUser() as any)?.id || 0);
  }, [me]);

  const handleUpdateProfile = async () => {
    if (!userId) {
      setStatus({
        type: "error",
        message: "User ID is not available for update.",
      });
      return;
    }

    try {
      setSaving(true);
      setStatus(null);

      await updateUser(userId, {
        first_name: cleanForPayload(firstName),
        last_name: cleanForPayload(lastName),
        email: cleanForPayload(email),
        student_profile: {
          phone_number: cleanForPayload(phone),
          country: cleanForPayload(country),
          state: cleanForPayload(state),
          residential_address: cleanForPayload(address),
          institution: cleanForPayload(institutionName),
          course: cleanForPayload(courseOfStudy),
          course_country: cleanForPayload(academicCountry),
          course_state: cleanForPayload(academicState),
        },
      });

      const refreshed = await getMe();
      setMe(refreshed);
      setAuthTokens({ user: refreshed });

      setFirstName(safeText(refreshed.first_name));
      setLastName(safeText(refreshed.last_name));
      setEmail(safeText(refreshed.email));
      setPhone(safeText(refreshed.student_profile?.phone_number));
      setCountry(safeText(refreshed.student_profile?.country));
      setState(safeText(refreshed.student_profile?.state));
      setAddress(safeText(refreshed.student_profile?.residential_address));
      setInstitutionName(safeText(refreshed.student_profile?.institution));
      setCourseOfStudy(safeText(refreshed.student_profile?.course));
      setAcademicCountry(safeText(refreshed.student_profile?.course_country));
      setAcademicState(safeText(refreshed.student_profile?.course_state));

      setStatus({
        type: "success",
        message: "Profile updated successfully.",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message:
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const identifyText = me?.student_profile
    ? me?.student_profile?.is_verified
      ? "Your profile has been verified"
      : "Your profile is under review"
    : NOT_AVAILABLE;

  return (
    <div className="w-full flex justify-center min-w-0">
      <div className="w-full max-w-[860px] min-w-0">
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

        <div className="mt-5 border-b border-[rgba(39,38,53,0.08)]">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center gap-6 min-w-max pr-2">
                <Tab active={tab === "profile"} label="Profile" onClick={() => setTab("profile")} />
                <Tab active={tab === "academics"} label="Academics" onClick={() => setTab("academics")} />
                <Tab active={tab === "notification"} label="Notification" onClick={() => setTab("notification")} />
                <Tab active={tab === "security"} label="Security" onClick={() => setTab("security")} />
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpdateProfile}
              disabled={saving || loading || tab === "notification" || tab === "security"}
              className="mb-2 text-[12px] text-[rgba(39,38,53,0.6)] inline-flex items-center gap-2 self-start sm:self-auto shrink-0 disabled:opacity-50"
            >
              <span className="opacity-70">✎</span>
              <span>{saving ? "Updating..." : "Update Profile"}</span>
            </button>
          </div>
        </div>

        {status && (
          <div
            className={[
              "mt-4 rounded-[10px] px-3 py-3 text-[12px] leading-[18px]",
              status.type === "success"
                ? "bg-[rgba(25,135,84,0.08)] border border-[rgba(25,135,84,0.2)] text-[#198754]"
                : "bg-[rgba(220,53,69,0.06)] border border-[rgba(220,53,69,0.2)] text-[#dc3545]",
            ].join(" ")}
          >
            {status.message}
          </div>
        )}

        <div className="mt-6 min-w-0">
          {loading ? (
            <div className="text-[#272635] text-[14px]">Loading...</div>
          ) : (
            <>
              {tab === "profile" && (
                <div className="flex flex-col gap-6">
                  <div className={cardClass}>
                    <div className="text-[12px] text-[#272635] font-medium">
                      Personal Information
                    </div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      Please kindly provide legitimate information about yourself across social media
                      and government systems.
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        value={cleanForInput(firstName)}
                        placeholder={NOT_AVAILABLE}
                        onChange={setFirstName}
                      />
                      <Input
                        label="Last Name"
                        value={cleanForInput(lastName)}
                        placeholder={NOT_AVAILABLE}
                        onChange={setLastName}
                      />
                    </div>

                    <div className="mt-3 text-[11px] text-[rgba(39,38,53,0.45)]">
                      Use the name on your government issued ID card
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Email Address"
                        value={cleanForInput(email)}
                        placeholder={NOT_AVAILABLE}
                        onChange={setEmail}
                      />
                      <Input
                        label="Phone Number"
                        value={cleanForInput(phone)}
                        placeholder={NOT_AVAILABLE}
                        onChange={setPhone}
                      />
                    </div>
                  </div>

                  <div className={cardClass}>
                    <div className="text-[12px] text-[#272635] font-medium">Where to find you</div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      Help us identify you in case it’s necessary
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Country of Origin"
                        value={cleanForInput(country)}
                        onChange={setCountry}
                        options={["Nigeria", "Kenya", "Ghana"]}
                      />
                      <Select
                        label="State"
                        value={cleanForInput(state)}
                        onChange={setState}
                        options={["Lagos", "Abuja", "Kaduna"]}
                      />
                    </div>

                    <div className="mt-4">
                      <Input
                        label="Residential Address"
                        value={cleanForInput(address)}
                        placeholder={NOT_AVAILABLE}
                        onChange={setAddress}
                      />
                    </div>
                  </div>

                  <div className={[cardClass, "flex items-center justify-between gap-4"].join(" ")}>
                    <div className="min-w-0">
                      <div className="text-[12px] text-[#272635] font-medium">Identify Yourself</div>
                      <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)]">
                        {identifyText}
                      </div>
                    </div>

                    <div
                      className={[
                        "h-5 w-9 rounded-full relative shrink-0",
                        me?.student_profile?.is_verified ? "bg-[#eef0e6]" : "bg-[#eef0e6]",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "absolute top-[2px] h-4 w-4 rounded-full",
                          me?.student_profile?.is_verified
                            ? "right-[2px] bg-[#198754]"
                            : "left-[2px] bg-[rgba(39,38,53,0.25)]",
                        ].join(" ")}
                      />
                    </div>
                  </div>
                </div>
              )}

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
                        value={cleanForInput(institutionName)}
                        placeholder={NOT_AVAILABLE}
                        onChange={setInstitutionName}
                      />
                      <Input
                        label="Course of study"
                        value={cleanForInput(courseOfStudy)}
                        placeholder={NOT_AVAILABLE}
                        onChange={setCourseOfStudy}
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Country"
                        value={cleanForInput(academicCountry)}
                        onChange={setAcademicCountry}
                        options={["Nigeria", "Kenya", "Ghana"]}
                      />
                      <Select
                        label="State"
                        value={cleanForInput(academicState)}
                        onChange={setAcademicState}
                        options={["Lagos", "Abuja", "Kaduna"]}
                      />
                    </div>
                  </div>
                </div>
              )}

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
                            <Toggle checked={donationsInApp} onChange={setDonationsInApp} ariaLabel="Toggle donations in-app" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">Email</div>
                            <Toggle checked={donationsEmail} onChange={setDonationsEmail} ariaLabel="Toggle donations email" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">SMS</div>
                            <Toggle checked={donationsSms} onChange={setDonationsSms} ariaLabel="Toggle donations sms" />
                          </div>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-[rgba(39,38,53,0.08)]" />

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
                            <Toggle checked={campaignsInApp} onChange={setCampaignsInApp} ariaLabel="Toggle campaigns in-app" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">Email</div>
                            <Toggle checked={campaignsEmail} onChange={setCampaignsEmail} ariaLabel="Toggle campaigns email" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">SMS</div>
                            <Toggle checked={campaignsSms} onChange={setCampaignsSms} ariaLabel="Toggle campaigns sms" />
                          </div>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-[rgba(39,38,53,0.08)]" />

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
                            <Toggle checked={fundReqInApp} onChange={setFundReqInApp} ariaLabel="Toggle fund request in-app" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">Email</div>
                            <Toggle checked={fundReqEmail} onChange={setFundReqEmail} ariaLabel="Toggle fund request email" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-[11px] text-[#272635]">SMS</div>
                            <Toggle checked={fundReqSms} onChange={setFundReqSms} ariaLabel="Toggle fund request sms" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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