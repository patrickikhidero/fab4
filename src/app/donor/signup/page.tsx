"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signup } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { FooterLinks } from "@/components/shared/FooterLinks";

export default function DonorLoginPage() {
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
        user_type: "DONOR",
      });

      showToast(
        "success",
        `If your email exists, a donor login link has been sent to ${email.trim()}. Please check your email.`,
        "Login link sent"
      );
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to send login link";

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
        <div className="relative">
          <Image
            src="/assets/auth/left_hand.svg"
            alt=""
            width={100}
            height={100}
            className="h-auto w-[100px] object-contain xl:w-[120px]"
            priority
          />
          <svg
            className="absolute -bottom-6 xl:-bottom-7 left-[63px] xl:left-[77px] w-7 xl:w-8 h-auto"
            viewBox="0 0 32 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M16 28C16 28 2 18.5 2 9.5C2 5.36 5.36 2 9.5 2C11.74 2 13.75 2.99 15.14 4.57L16 5.56L16.86 4.57C18.25 2.99 20.26 2 22.5 2C26.64 2 30 5.36 30 9.5C30 18.5 16 28 16 28Z"
              fill="#d1ef7c"
              stroke="#d1ef7c"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-24 right-0 hidden lg:block z-[5]">
        <div className="relative">
          <svg
            className="absolute top-[60px] xl:top-[78px] left-0 xl:left-0 w-7 xl:w-8 h-auto"
            viewBox="0 0 32 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M16 28C16 28 2 18.5 2 9.5C2 5.36 5.36 2 9.5 2C11.74 2 13.75 2.99 15.14 4.57L16 5.56L16.86 4.57C18.25 2.99 20.26 2 22.5 2C26.64 2 30 5.36 30 9.5C30 18.5 16 28 16 28Z"
              fill="#d1ef7c"
              stroke="#d1ef7c"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <Image
            src="/assets/auth/right_hand.svg"
            alt=""
            width={100}
            height={100}
            className="h-auto w-[100px] object-contain xl:w-[120px]"
            priority
          />
        </div>
      </div>

      <div className="relative z-[10] min-h-screen pb-[120px] md:pb-[96px]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-6 sm:pt-8 lg:pt-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center">
              <Image
                src="/assets/fabfour-logo-.png"
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
                  Donor Sign Up
                </h1>

                <p className="mt-4 max-w-[420px] text-sm leading-6 text-[var(--color-muted)]">
                  Access your donor account to support students, track giving,
                  and manage your contributions.
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
                      href="/student/signup"
                      className="inline-flex items-center gap-2 hover:text-[var(--color-primary-text)]"
                    >
                      <span>Sign Up as Student</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            <div className="hidden md:flex items-start justify-center py-6 lg:py-8">
              <div className="relative w-[280px] lg:w-[320px]">
                <div className="glass overflow-hidden rounded-[22px]">
                  <div className="relative h-[380px] lg:h-[440px] w-full">
                    <Image
                      src="/assets/auth/student.png"
                      alt=""
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <div className="glass absolute -left-10 lg:-left-14 top-8 lg:top-10 w-[190px] lg:w-[210px] rounded-2xl px-3 py-2.5 text-[11px]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-[var(--color-primary-text)] truncate">
                      Bamba Toure
                    </div>
                    <span className="text-[var(--color-muted)] opacity-60 shrink-0 text-[10px]">↗</span>
                  </div>

                  <div className="text-[var(--color-muted)] text-[10px]">Raising</div>

                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <div className="font-medium text-[var(--color-primary-text)] shrink-0">
                      $50.50
                    </div>

                    <div className="flex flex-wrap justify-end gap-1 min-w-0">
                      <span className="rounded-full bg-black/5 px-2 py-0.5 text-[9px]">
                        Tuition
                      </span>
                      <span className="rounded-full bg-black/5 px-2 py-0.5 text-[9px]">
                        Learning materials
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass absolute -right-6 lg:-right-10 bottom-10 lg:bottom-14 w-[155px] lg:w-[170px] rounded-2xl px-3 py-2.5 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4ade80] text-white text-[10px] font-bold shrink-0">
                      ✓
                    </span>
                    <div className="font-medium truncate">Anonymous</div>
                  </div>
                  <div className="mt-1 font-medium">$50.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-0 left-0 w-screen bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 min-h-[64px] py-3 md:h-[64px] flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-[var(--color-muted)]">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} FabFour Foundation. All rights reserved.
            </div>
            <FooterLinks className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-1" />
          </div>
        </footer>
      </div>
    </div>
  );
}

