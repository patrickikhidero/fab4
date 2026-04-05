"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { DonorSidebar } from "@/components/donor/DonorSidebar";
import {
  getStoredUser,
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "@/lib/auth/storage";
import { patchUserWithPhoto } from "@/lib/api/users";
import { useToast } from "@/components/ui/toast/ToastProvider";

type DonorSection = "campaigns" | "students";

type StoredUser = {
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  avatar?: string | null;
  photo?: string | null;
  user_type?: string | null;
};

export default function DonorProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeSection, setActiveSection] = useState<DonorSection>("campaigns");
  const [user, setUser] = useState<StoredUser | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = getStoredUser() as StoredUser | null;
    if (!stored) {
      router.replace("/login");
      return;
    }
    setUser(stored);
    setFirstName(stored.first_name?.trim() || "");
    setLastName(stored.last_name?.trim() || "");
  }, [router]);

  const userData = useMemo(() => {
    const first = user?.first_name?.trim() || "";
    const last = user?.last_name?.trim() || "";
    const fullName = `${first} ${last}`.trim();

    return {
      name: fullName || "Donor",
      email: user?.email || "",
      avatar: user?.photo || user?.profile_image || user?.avatar || "",
    };
  }, [user]);

  const currentPhoto = user?.photo || user?.profile_image || user?.avatar || "";

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  const hasChanges =
    firstName.trim() !== (user?.first_name?.trim() || "") ||
    lastName.trim() !== (user?.last_name?.trim() || "") ||
    photoFile !== null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      showToast("warning", "First name and last name are required.", "Missing fields");
      return;
    }

    if (!user?.id) {
      showToast("error", "Session expired. Please log in again.", "Error");
      router.replace("/login");
      return;
    }

    try {
      setSaving(true);

      const updated = await patchUserWithPhoto(user.id, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        user_type: "DONOR",
        ...(photoFile ? { photoFile } : {}),
      });

      setAuthTokens({
        access: getAccessToken() || undefined,
        refresh: getRefreshToken() || undefined,
        user: updated,
      });

      setUser(updated as StoredUser);
      setPhotoFile(null);
      setPhotoPreview(null);
      showToast("success", "Profile updated successfully.", "Saved");
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.errors?.[0]?.detail ||
        err?.message ||
        "Failed to update profile.";
      showToast("error", msg, "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#1f1f1f]">
      <div className="flex min-h-screen">
        <DonorSidebar
          userData={userData}
          activeSection={activeSection}
          onNavigationChange={setActiveSection}
        />

        <section className="flex-1 min-w-0 bg-[#efefe9] pt-[76px] lg:pt-7 px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="mx-auto max-w-[720px] pb-8">
            <div className="rounded-[24px] bg-white border border-[rgba(39,38,53,0.06)] px-6 py-8 lg:px-10 lg:py-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              <h1 className="text-[28px] font-medium text-[#272635]">
                My Account
              </h1>
              <p className="mt-1 text-[14px] text-[rgba(39,38,53,0.55)]">
                Manage your donor profile information.
              </p>

              <form onSubmit={handleSave} className="mt-8 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div
                      className="h-[80px] w-[80px] rounded-full bg-[#d9d9d9] bg-cover bg-center bg-no-repeat border-2 border-[rgba(39,38,53,0.08)]"
                      style={{
                        backgroundImage: `url('${photoPreview || currentPhoto || ""}')`,
                      }}
                    >
                      {!photoPreview && !currentPhoto && (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#e8e8e2] text-[24px] font-medium text-[rgba(39,38,53,0.4)]">
                          {(firstName?.[0] || "D").toUpperCase()}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 grid h-[28px] w-[28px] place-items-center rounded-full bg-[#273125] text-white shadow-md hover:bg-[#1e261d] transition-colors"
                    >
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#272635]">Profile Photo</p>
                    <p className="mt-0.5 text-[12px] text-[rgba(39,38,53,0.45)]">
                      Click the camera icon to upload a new photo
                    </p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-medium text-[#272635]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="h-[48px] w-full rounded-[12px] border border-[rgba(39,38,53,0.12)] bg-[#f7f7f4] px-4 text-[14px] text-[rgba(39,38,53,0.5)] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[13px] font-medium text-[#272635]">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={saving}
                      placeholder="Enter your first name"
                      className="h-[48px] w-full rounded-[12px] border border-[rgba(39,38,53,0.12)] bg-white px-4 text-[14px] text-[#272635] outline-none transition-colors focus:border-[#198754]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[13px] font-medium text-[#272635]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={saving}
                      placeholder="Enter your last name"
                      className="h-[48px] w-full rounded-[12px] border border-[rgba(39,38,53,0.12)] bg-white px-4 text-[14px] text-[#272635] outline-none transition-colors focus:border-[#198754]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={saving || !hasChanges}
                    className="inline-flex h-[48px] items-center justify-center rounded-[12px] bg-[#273125] px-8 text-[14px] font-medium text-white transition-opacity disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  {!hasChanges && (
                    <span className="text-[13px] text-[rgba(39,38,53,0.45)]">
                      No changes to save
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
