
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  BookOpen,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { saveToken } from "@/lib/api";

export default function GoogleSuccessPage() {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (started.current) return;

    started.current = true;

    async function completeGoogleLogin() {
      try {
        const response = await fetch("/api/auth/exchange", {
          method: "POST",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success || !result.token) {
          throw new Error(
            result.message || "Google authentication failed."
          );
        }

        saveToken(result.token);

        const params = new URLSearchParams(
          window.location.search
        );

        const callbackUrl = params.get("callbackUrl");

        const safeUrl =
          callbackUrl &&
          callbackUrl.startsWith("/") &&
          !callbackUrl.startsWith("//")
            ? callbackUrl
            : "/";

        router.replace(safeUrl);
        router.refresh();
      } catch (err) {
        console.error("Google Login Error:", err);
        setError(err.message || "Unable to complete Google login.");
      }
    }

    completeGoogleLogin();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F7F2] px-4">
      <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#14532D] text-[#D4A853]">
          <BookOpen size={34} />
        </div>

        <h1 className="mb-3 text-2xl font-black text-[#14251B]">
          {error ? "Authentication Failed" : "Completing Google Login"}
        </h1>

        {error ? (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle size={28} />
            </div>

            <p className="mb-6 text-sm leading-6 text-gray-500">
              {error}
            </p>

            <Link
              href="/login"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#14532D] px-6 font-bold text-white hover:bg-[#0D3B24]"
            >
              <RefreshCw size={18} />
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <Loader2
              size={36}
              className="mx-auto mb-5 animate-spin text-[#14532D]"
            />

            <p className="text-sm text-gray-500">
              Please wait while we complete your Google authentication.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
