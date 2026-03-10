"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authenticate } from "@/lib/api/auth";
import { getMe } from "@/lib/api/users";
import { setAuthTokens } from "@/lib/auth/storage";

export default function AuthenticatePage() {
  const params = useParams();
  const router = useRouter();

  const [state, setState] = useState<"loading" | "error">("loading");
  const [message, setMessage] = useState("Authenticating your login link...");

  useEffect(() => {
    const run = async () => {
      const rawKey = params?.key;
      const key = Array.isArray(rawKey) ? rawKey[0] : rawKey;

      if (!key) {
        setState("error");
        setMessage("Invalid authentication link.");
        return;
      }

      try {
        const authRes = await authenticate(key);

        if (!authRes?.access || !authRes?.refresh) {
          throw new Error("Missing authentication tokens.");
        }

        setAuthTokens({
          access: authRes.access,
          refresh: authRes.refresh,
          user: authRes.user,
        });

        const me = await getMe();

        setAuthTokens({
          access: authRes.access,
          refresh: authRes.refresh,
          user: me,
        });

        router.replace("/student/dashboard");
      } catch (err: any) {
        console.error("Authentication failed:", err);

        const msg =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "This login link is invalid or has expired.";

        setState("error");
        setMessage(msg);
      }
    };

    run();
  }, [params, router]);

  return (
    <div className="min-h-screen bg-[#eceee4] flex items-center justify-center px-4">
      <div className="w-full max-w-[460px] rounded-[24px] bg-white p-8 shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.12)] text-center">
        {state === "loading" ? (
          <>
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-[#273125] border-t-transparent animate-spin" />
            <h1 className="mt-6 text-[24px] font-medium text-[#272635]">
              Signing you in
            </h1>
            <p className="mt-2 text-[14px] text-[rgba(39,38,53,0.6)]">
              {message}
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 text-xl">
              !
            </div>

            <h1 className="mt-6 text-[24px] font-medium text-[#272635]">
              Authentication failed
            </h1>

            <p className="mt-2 text-[14px] text-[rgba(39,38,53,0.6)]">
              {message}
            </p>

            <button
              onClick={() => router.replace("/login")}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-[12px] bg-[#273125] px-5 text-white"
            >
              Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
}