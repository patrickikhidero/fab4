"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { FooterLinks } from "@/components/shared/FooterLinks";

export default function StudentSignupPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      showToast("warning", "Please enter your email address.", "Missing email");
      return;
    }

    try {
      setLoading(true);

      await signup({
        email: email.trim(),
        user_type: "STUDENT",
      });

      showToast(
        "success",
        `If your email exists, a student signup link has been sent to ${email.trim()}. Please check your email.`,
        "Signup link sent"
      );
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to send signup link";

      showToast("error", msg, "Unable to continue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--color-surface)]">
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <Image
          src="/assets/auth/rays.png"
          alt=""
          fill
          priority
          className="object-cover opacity-45 mix-blend-soft-light"
        />
      </div>

      <div className="pointer-events-none absolute left-0 top-24 hidden lg:block z-[5]">
        <Image
          src="/assets/auth/left_hand.svg"
          alt=""
          width={100}
          height={100}
          className="h-auto w-[100px] object-contain xl:w-[120px]"
          priority
        />
      </div>

      <div className="pointer-events-none absolute bottom-24 right-0 hidden lg:block z-[5]">
        <Image
          src="/assets/auth/right_hand.svg"
          alt=""
          width={100}
          height={100}
          className="h-auto w-[100px] object-contain xl:w-[120px]"
          priority
        />
      </div>

      <div className="relative z-[10] min-h-screen pb-[120px] md:pb-[96px]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-6 sm:pt-8 lg:pt-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center">
              <Image
                src="/assets/logo.jpg"
                alt="FabFour Logo"
                width={120}
                height={40}
                priority
                className="h-auto w-[100px] sm:w-[120px] object-contain"
              />
            </div>

            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[var(--color-muted)] shrink-0">
              English <span className="opacity-60">▾</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:gap-12 pt-8 sm:pt-10 md:pt-12 lg:pt-14 md:grid-cols-2">
            <div className="w-full min-w-0">
              <div className="mt-4 sm:mt-8 md:mt-16 lg:mt-24">
                <h1 className="text-[30px] sm:text-[34px] lg:text-[38px] leading-[1.12] font-medium text-[var(--color-primary-text)] max-w-[560px]">
                  Student Sign Up
                </h1>

                <p className="mt-4 max-w-[420px] text-sm leading-6 text-[var(--color-muted)]">
                  Create your student account to start your fundraising journey,
                  manage your profile, and access support for your education.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 sm:mt-10 w-full max-w-[700px]"
                >
                  <label className="mb-2 block text-xs text-[var(--color-primary-text)]">
                    Email Address
                  </label>

                  <div className="relative grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-x-12 lg:gap-x-20 items-start">
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className="input-field w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full h-[52px] sm:h-[56px] disabled:opacity-60"
                      >
                        {loading ? "Sending link..." : "Continue"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-10 h-px w-full bg-[var(--color-border)]" />

                  <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[var(--color-muted)]">
                    <span className="text-[var(--color-muted)]">
                      Already have an account?
                    </span>

                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 hover:text-[var(--color-primary-text)]"
                    >
                      <span>Login</span>
                      <span>↗</span>
                    </Link>

                    <span className="hidden sm:inline opacity-40">|</span>

                    <Link
                      href="/donor/signup"
                      className="inline-flex items-center gap-2 hover:text-[var(--color-primary-text)]"
                    >
                      <span>Sign Up as Donor</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            <div className="hidden md:flex items-start justify-center">
              <div className="relative w-[260px] lg:w-[300px] mt-4 lg:mt-8">
                <div className="glass overflow-hidden rounded-[18px]">
                  <div className="relative h-[260px] lg:h-[300px] w-full">
                    <Image
                      src="/assets/auth/student.png"
                      alt=""
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="glass absolute -left-8 lg:-left-12 top-6 lg:top-8 w-[180px] lg:w-[200px] rounded-xl px-3 py-2 text-[11px]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-[var(--color-primary-text)] truncate">
                      Bamba Toure
                    </div>
                    <span className="text-[var(--color-muted)] shrink-0">›</span>
                  </div>

                  <div className="text-[var(--color-muted)]">Raise</div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="font-medium text-[var(--color-primary-text)] shrink-0">
                      $350.00
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 min-w-0">
                      <span className="rounded-full bg-black/5 px-2 py-1 text-[10px]">
                        Tuition
                      </span>
                      <span className="rounded-full bg-black/5 px-2 py-1 text-[10px]">
                        Clothing materials
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass absolute -right-4 lg:-right-8 bottom-8 lg:bottom-10 w-[160px] lg:w-[175px] rounded-xl px-3 py-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] shrink-0">
                      ✓
                    </span>
                    <div className="font-medium truncate">Anonymous</div>
                  </div>
                  <div className="mt-1 font-medium">$350.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 w-screen bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 min-h-[64px] py-3 md:h-[64px] flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-[var(--color-muted)]">
            <div className="text-center md:text-left">
              © 2024 FabFour Foundation. All rights reserved.
            </div>
            <FooterLinks className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-1" />
          </div>
        </footer>
      </div>
    </div>
  );
}