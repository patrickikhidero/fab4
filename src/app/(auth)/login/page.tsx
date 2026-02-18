"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background rays */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <Image
          src="/assets/auth/rays.png"
          alt=""
          fill
          priority
          className="object-cover opacity-45 mix-blend-soft-light"
        />
      </div>

      {/* Hands */}
      <div className="pointer-events-none absolute left-0 top-30 hidden md:block z-[5]">
        <Image
          src="/assets/auth/left_hand.svg"
          alt=""
          width={100}
          height={100}
          className="h-auto w-[100px] object-contain"
          priority
        />
      </div>

      <div className="pointer-events-none absolute bottom-30 right-0 hidden md:block z-[5]">
        <Image
          src="/assets/auth/right_hand.svg"
          alt=""
          width={100}
          height={100}
          className="h-auto w-[100px] object-contain"
          priority
        />
      </div>

      {/* Page wrapper */}
      <div className="relative z-[10] min-h-screen pb-[84px]">
        {/* Header */}
        <div className="mx-auto max-w-[1440px] px-6 pt-10">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold tracking-wide text-[var(--color-primary-text)] opacity-60">
              LOGO
            </div>

            <div className="flex items-center gap-1 text-xs text-[var(--color-muted)]">
              English <span className="opacity-60">▾</span>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="grid items-start gap-12 pt-14 md:grid-cols-2">
            {/* Left side */}
            <div className="w-full">
              <div className="mt-12 md:mt-30">
                <h1 className="text-[38px] leading-[1.12] font-medium text-[var(--color-primary-text)]">
                  Login to your account
                </h1>

                <p className="mt-4 max-w-[420px] text-sm leading-6 text-[var(--color-muted)]">
                  Africa’s trusted social fundraising platform to support smart
                  minds through tertiary education.
                </p>

                {/* Form column width reduced */}
                <form className="mt-10 w-full max-w-[700px]">
                    <label className="mb-2 block text-xs text-[var(--color-primary-text)]">
                      Email Address
                    </label>
                    <div className="relative grid grid-cols-2 gap-x-20 gap-y-4 items-start">
                      {/* LEFT SIDE */}
                      <div className="space-y-4">
                        <div>

                          <input
                            type="email"
                            placeholder="example@email.com"
                            className="input-field w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn-primary w-full h-[56px]"
                        >
                          Continue
                        </button>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="space-y-4">
                        <button
                          type="button"
                          className="btn-secondary w-full flex items-center justify-center gap-2 h-[56px]"
                        >
                          <GoogleIcon />
                          <span>Sign in with Google</span>
                        </button>

                        <button
                          type="button"
                          className="btn-secondary w-full flex items-center justify-center gap-2 h-[56px]"
                        >
                          <AppleIcon />
                          <span>Sign in with Apple ID</span>
                        </button>
                      </div>

                    {/* OR — FLOATING CENTER */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-medium text-[var(--color-primary-text)] shadow-sm">
                        OR
                      </div>
                    </div>
                  </div>

                  {/* bottom divider */}
                  <div className="mt-10 h-px w-full bg-[var(--color-border)]" />

                  {/* signup */}
                  <div className="pt-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-primary-text)]"
                    >
                      <span>Sign Up As a Donor</span>
                      <span>↗</span>
                    </button>
                  </div>
                </form>

              </div>
            </div>

            {/* Right side image card*/}
            <div className="hidden md:flex items-start justify-center">
              <div className="relative w-[300px] mt-8">
                <div className="glass overflow-hidden rounded-[18px]">
                  <div className="relative h-[300px] w-full">
                    <Image
                      src="/assets/auth/student.png"
                      alt=""
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Top badge - layout fixed (amount + chips on same row) */}
                <div className="glass absolute -left-12 top-8 w-[200px] rounded-xl px-3 py-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-[var(--color-primary-text)]">
                      Bamba Toure
                    </div>
                    <span className="text-[var(--color-muted)]">›</span>
                  </div>

                  <div className="text-[var(--color-muted)]">Rais</div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="font-medium text-[var(--color-primary-text)]">
                      $350.00
                    </div>

                    <div className="flex flex-wrap justify-end gap-2">
                      <span className="rounded-full bg-black/5 px-2 py-1 text-[10px] text-[var(--color-primary-text)]">
                        Tuition
                      </span>
                      <span className="rounded-full bg-black/5 px-2 py-1 text-[10px] text-[var(--color-primary-text)]">
                        Clothing materials
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom badge */}
                <div className="glass absolute -right-8 bottom-10 w-[175px] rounded-xl px-3 py-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] text-[var(--color-primary-text)]">
                      ✓
                    </span>
                    <div className="font-medium text-[var(--color-primary-text)]">
                      Anonymous
                    </div>
                  </div>
                  <div className="mt-1 font-medium text-[var(--color-primary-text)]">
                    $350.50
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-bleed footer */}
        <footer className="absolute bottom-0 left-0 w-screen bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1440px] px-6 h-[64px] flex items-center justify-between text-xs text-[var(--color-muted)]">
            <div>© 2024 FabFour Foundation. All rights reserved.</div>

            <div className="flex items-center gap-6">
              <span>Terms</span>
              <span>Legal</span>
              <span>Privacy policy</span>
              <span>Cookie policy</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* Real icons (your previous paths were truncated, so nothing rendered) */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.824 32.477 29.277 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.98 6.053 29.764 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.651-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.574 4.819C14.655 15.108 18.959 12 24 12c3.059 0 5.842 1.154 7.955 3.045l5.657-5.657C34.98 6.053 29.764 4 24 4c-7.682 0-14.354 4.327-17.694 10.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.657 0 10.767-2.165 14.647-5.694l-6.765-5.726C29.86 34.794 27.06 36 24 36c-5.217 0-9.588-3.317-11.292-7.946l-6.525 5.025C9.496 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.06 12.06 0 0 1-4.421 5.58l6.765 5.726C36.882 40.007 44 35 44 24c0-1.341-.138-2.651-.389-3.917z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.7 2.3c-.9.1-2 .7-2.6 1.5-.6.7-1.1 1.9-.9 3.1 1 0 2-.6 2.7-1.4.6-.8 1.1-1.9.8-3.2zM20.4 17.1c-.4.9-.6 1.3-1.1 2.1-.7 1.1-1.7 2.5-2.9 2.5-1.1 0-1.4-.7-2.9-.7s-1.9.7-3 .7c-1.2 0-2.1-1.3-2.8-2.4-1.6-2.3-2.9-6.5-1.2-9.3.8-1.4 2.3-2.3 3.9-2.3 1.2 0 2.4.8 3 .8.6 0 2-.9 3.4-.8.6 0 2.3.2 3.4 1.7-2.9 1.6-2.4 5.9.2 7z"
      />
    </svg>
  );
}
