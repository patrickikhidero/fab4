"use client";

import React, { useEffect, useMemo, useState } from "react";
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
        "relative text-[12px] leading-[16px] px-1 pb-3",
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
    <div className="flex flex-col gap-2">
      <div className="text-[12px] text-[#272635] leading-[16px]">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 px-3 rounded-[8px] bg-[#eef0e6] border border-[rgba(39,38,53,0.06)] outline-none text-[13px] text-[#272635]"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[12px] text-[#272635] leading-[16px]">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 px-3 rounded-[8px] bg-[#eef0e6] border border-[rgba(39,38,53,0.06)] outline-none text-[13px] text-[#272635]"
      >
        <option value="">Select</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Kenya">Kenya</option>
        <option value="Ghana">Ghana</option>
      </select>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const [tab, setTab] = useState<TabKey>("profile");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfileResponse | null>(null);

  // fields shown in screenshot (keep minimal)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const stored = getStoredUser();
        let userId: number | null = stored?.id ?? null;
        if (!userId) userId = getUserIdFromToken();
        if (!userId) userId = 224;

        const p = await getStudentProfile(userId);
        setProfile(p ?? null);

        setFirstName((p as any)?.first_name ?? stored?.first_name ?? "");
        setLastName((p as any)?.last_name ?? stored?.last_name ?? "");
        setEmail((p as any)?.email ?? stored?.email ?? "");
        setPhone((p as any)?.phone_number ?? "");
        setCountry((p as any)?.country ?? "");
        setState((p as any)?.state ?? "");
        setAddress((p as any)?.residential_address ?? "");
      } catch {
        // keep whatever we have from storage
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

  const showProfileUI = tab === "profile";

  return (
    <div className="w-full flex justify-center">
      {/* match screenshot: centered inner content */}
      <div className="w-full max-w-[860px]">

        {/* header row */}
        <div className="mt-6 flex items-start gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-8 w-8 rounded-full bg-[#eef0e6] grid place-items-center"
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4 text-[#272635]" />
          </button>

          <div className="flex flex-col">
            <div className="text-[14px] text-[#272635] leading-[20px] font-medium">
              My Account
            </div>
            <div className="text-[12px] text-[rgba(39,38,53,0.45)] leading-[16px]">
              {subtitle}
            </div>
          </div>
        </div>

        {/* tabs row + Update Profile */}
        <div className="mt-5 flex items-center justify-between border-b border-[rgba(39,38,53,0.08)]">
          <div className="flex items-center gap-6">
            <Tab active={tab === "profile"} label="Profile" onClick={() => setTab("profile")} />
            <Tab active={tab === "academics"} label="Academics" onClick={() => setTab("academics")} />
            <Tab
              active={tab === "notification"}
              label="Notification"
              onClick={() => setTab("notification")}
            />
            <Tab active={tab === "security"} label="Security" onClick={() => setTab("security")} />
          </div>

          <button
            type="button"
            className="mb-2 text-[12px] text-[rgba(39,38,53,0.6)] inline-flex items-center gap-2"
          >
            <span className="opacity-70">✎</span>
            <span>Update Profile</span>
          </button>
        </div>

        {/* body */}
        <div className="mt-6">
          {loading ? (
            <div className="text-[#272635] text-[14px]">Loading...</div>
          ) : (
            <>
              {/* Only build Profile tab now (as per screenshot) */}
              {showProfileUI ? (
                <div className="flex flex-col gap-6">
                  {/* Personal Information */}
                  <div className="bg-[#f9faf7] rounded-[12px] p-4 border border-[rgba(39,38,53,0.06)]">
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
                  <div className="bg-[#f9faf7] rounded-[12px] p-4 border border-[rgba(39,38,53,0.06)]">
                    <div className="text-[12px] text-[#272635] font-medium">Where to find you</div>
                    <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)] leading-[16px]">
                      Help us identify you in case it’s necessary
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select label="Country of Origin" value={country} onChange={setCountry} />
                      <Select label="State" value={state} onChange={setState} />
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
                  <div className="bg-[#f9faf7] rounded-[12px] p-4 border border-[rgba(39,38,53,0.06)] flex items-center justify-between">
                    <div>
                      <div className="text-[12px] text-[#272635] font-medium">Identify Yourself</div>
                      <div className="mt-1 text-[11px] text-[rgba(39,38,53,0.45)]">
                        Your profile has been verified
                      </div>
                    </div>

                    {/* simple toggle indicator like screenshot */}
                    <div className="h-5 w-9 rounded-full bg-[#eef0e6] relative">
                      <div className="absolute right-[2px] top-[2px] h-4 w-4 rounded-full bg-[#198754]" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-[#272635] text-[14px]">
                  {/* Tabs not requested to build now */}
                  Coming soon.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}