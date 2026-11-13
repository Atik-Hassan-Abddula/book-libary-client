
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import {
  UserRound,
  Mail,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-emerald-800" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <ShieldCheck className="mb-4 h-14 w-14 text-emerald-800" />

        <h1 className="text-2xl font-bold text-[#14532D]">
          Please Sign In
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          You need to login to view your profile.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-6 rounded-xl bg-[#14532D] px-6 py-3 font-semibold text-white transition hover:bg-[#D4A853] hover:text-[#14251B]"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7F2] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#14532D] transition hover:text-[#D4A853]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Profile Header */}
        <div className="overflow-hidden rounded-[28px] border border-white bg-white shadow-xl shadow-emerald-900/5">

          <div className="relative h-44 bg-gradient-to-r from-[#103D29] via-[#14532D] to-[#1B6940]">
            <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -right-4 -top-16 h-48 w-48 rounded-full border border-white/10" />

            <div className="absolute bottom-5 left-7 flex items-center gap-2 text-white">
              <BookOpen size={21} className="text-[#D4A853]" />
              <span className="font-bold tracking-wide">
                BookNook Member
              </span>
            </div>
          </div>

          {/* User Avatar */}
          <div className="relative px-6 pb-8 sm:px-10">

            <div className="-mt-16 mb-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-[6px] border-white bg-emerald-100 shadow-lg">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-5xl font-black text-[#14532D]">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-3xl font-black text-[#14251B]">
                  {user.name || "BookNook User"}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Welcome to your personal reading space.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800">
                <ShieldCheck size={15} />
                Member Account
              </span>
            </div>

            {/* User Information */}
            <div className="mt-9">
              <h2 className="mb-5 text-lg font-bold text-[#14532D]">
                Account Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-gray-100 bg-[#FAFBF9] p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                    <UserRound size={20} />
                  </div>

                  <p className="text-xs font-semibold text-gray-400">
                    FULL NAME
                  </p>

                  <p className="mt-2 break-words font-bold text-gray-800">
                    {user.name || "Not available"}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-[#FAFBF9] p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    <Mail size={20} />
                  </div>

                  <p className="text-xs font-semibold text-gray-400">
                    EMAIL ADDRESS
                  </p>

                  <p className="mt-2 break-all font-bold text-gray-800">
                    {user.email || "Not available"}
                  </p>
                </div>

              </div>
            </div>

            {/* Account Details */}
            <div className="mt-6 rounded-2xl border border-gray-100 bg-[#FAFBF9] p-5">
              <h3 className="mb-3 font-bold text-[#14532D]">
                Account Details
              </h3>

              <div className="flex items-center justify-between gap-3 border-b border-gray-200 py-3">
                <span className="text-sm text-gray-500">
                  Email Verified
                </span>

                <span className={`text-xs font-bold ${
                  user.emailVerified
                    ? "text-emerald-700"
                    : "text-amber-700"
                }`}>
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-sm text-gray-500">
                  Account ID
                </span>

                <span className="max-w-[55%] break-all text-right text-xs font-medium text-gray-700">
                  {user.id}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
