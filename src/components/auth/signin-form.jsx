
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  BookOpen,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  ArrowRight,
  Library,
  BookMarked,
  Mail,
  ShieldCheck,
  UserRound,
  X,
  BookCopy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

export default function SigninForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Email Sign In
  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Google login failed.");
        setGoogleLoading(false);
      }
    } catch (err) {
      setError(err.message || "Google login failed.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F7F2] px-4 py-8 sm:px-6 lg:py-12">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-200/40 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-200/40 blur-[100px]" />

      <div className="pointer-events-none absolute right-[12%] top-[15%] h-24 w-24 rounded-full border border-emerald-200/50" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_30px_100px_rgba(20,83,45,0.13)] lg:grid-cols-[0.95fr_1.05fr]">

        {/* ================= LEFT BRANDING PANEL ================= */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#103D29] p-10 text-white lg:flex xl:p-14">

          {/* Decorative Background */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="absolute right-12 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#D4A853]/10 blur-[80px]" />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A853] text-[#14251B] shadow-xl shadow-black/20">
              <BookOpen size={30} strokeWidth={2.2} />
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight">
                BookNook
              </h2>

              <p className="text-[10px] font-semibold tracking-[0.28em] text-emerald-100/60">
                YOUR READING SPACE
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 my-12">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-2 text-xs font-bold tracking-wide text-[#E9C77E]">
              <Sparkles size={14} />
              WELCOME BACK, READER
            </div>

            <h1 className="max-w-lg text-4xl font-black leading-[1.2] tracking-tight xl:text-5xl">
              Your Next
              <span className="block text-[#D4A853]">
                Great Story Awaits.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-8 text-emerald-100/70 xl:text-base">
              Pick up where you left off. Explore your
              library, discover new stories and continue
              your reading adventure with BookNook.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 space-y-4">

              <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:border-[#D4A853]/40 hover:bg-white/[0.10]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4A853]/15 text-[#D4A853] transition-transform group-hover:scale-110">
                  <Library size={23} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Your Personal Library
                  </h3>

                  <p className="mt-1 text-xs text-emerald-100/55">
                    All your favorite books in one place.
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:border-[#D4A853]/40 hover:bg-white/[0.10]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4A853]/15 text-[#D4A853] transition-transform group-hover:scale-110">
                  <BookMarked size={23} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Continue Reading
                  </h3>

                  <p className="mt-1 text-xs text-emerald-100/55">
                    Every page brings a new discovery.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Footer */}
          <div className="relative z-10 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#D4A853]">
                  "Reading is a journey, not a destination."
                </p>

                <p className="mt-2 text-[10px] tracking-wide text-emerald-100/40">
                  © 2026 BOOKNOOK. ALL RIGHTS RESERVED.
                </p>
              </div>

              <BookCopy
                size={32}
                className="text-white/20"
              />
            </div>
          </div>

        </section>

        {/* ================= RIGHT SIGN IN PANEL ================= */}
        <Card className="w-full border-0 bg-white p-0 shadow-none">

          <CardHeader className="space-y-4 px-6 pb-5 pt-8 sm:px-10 sm:pt-12 lg:px-12">

            {/* Mobile Brand */}
            <div className="mb-3 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14532D] text-[#D4A853] shadow-lg">
                <BookOpen size={26} />
              </div>

              <div>
                <h2 className="text-xl font-black text-[#14532D]">
                  BookNook
                </h2>

                <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400">
                  YOUR READING SPACE
                </p>
              </div>
            </div>

            {/* Welcome Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-[10px] font-extrabold tracking-[0.12em] text-emerald-800">
              <Sparkles size={13} />
              WELCOME BACK
            </div>

            {/* Heading */}
            <div>
              <CardTitle className="text-3xl font-black tracking-tight text-[#14251B] sm:text-4xl">
                Sign In
                <span className="text-[#D4A853]">.</span>
              </CardTitle>

              <CardDescription className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                Welcome back to your reading space.
                Sign in and continue your journey.
              </CardDescription>
            </div>

          </CardHeader>

          <CardContent className="px-6 pb-9 sm:px-10 lg:px-12 lg:pb-12">

            <form onSubmit={handleSignin} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold tracking-wide text-[#263C2E]"
                >
                  EMAIL ADDRESS
                </Label>

                <div className="group relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-700"
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    required
                    autoComplete="email"
                    className="h-12 rounded-xl border-gray-200 bg-[#FAFBF9] pl-11 pr-4 text-sm transition-all placeholder:text-gray-400 focus-visible:border-emerald-700 focus-visible:ring-4 focus-visible:ring-emerald-700/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-bold tracking-wide text-[#263C2E]"
                  >
                    PASSWORD
                  </Label>
                </div>

                <div className="group relative">
                  <ShieldCheck
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-700"
                  />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    required
                    autoComplete="current-password"
                    className="h-12 rounded-xl border-gray-200 bg-[#FAFBF9] pl-11 pr-12 text-sm transition-all placeholder:text-gray-400 focus-visible:border-emerald-700 focus-visible:ring-4 focus-visible:ring-emerald-700/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-emerald-800"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-gray-400">
                  Enter the password associated with your account.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm text-red-600"
                >
                  <X
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <p>{error}</p>
                </div>
              )}

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={loading || googleLoading}
                className="group h-12 w-full rounded-xl bg-gradient-to-r from-[#14532D] to-[#0D3B24] text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#D4A853] hover:to-[#C4973D] hover:text-[#14251B] hover:shadow-amber-700/20 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

            </form>

            {/* Separator */}
            <div className="my-6 flex items-center gap-4">
              <Separator className="flex-1 bg-gray-200" />

              <span className="whitespace-nowrap text-[10px] font-bold tracking-[0.15em] text-gray-400">
                OR CONTINUE WITH
              </span>

              <Separator className="flex-1 bg-gray-200" />
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              disabled={loading || googleLoading}
              className="h-12 w-full rounded-xl border-gray-200 bg-white font-bold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 disabled:opacity-60"
              onClick={handleGoogleSignin}
            >
              {googleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting to Google...
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 48 48"
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />

                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 37.97 46.98 31.89 46.98 24.55z"
                    />

                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
                    />

                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>

                  Continue with Google
                </>
              )}
            </Button>

            {/* Signup Link */}
            <p className="mt-7 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-extrabold text-emerald-800 transition-colors hover:text-[#D4A853] hover:underline"
              >
                Create Account
              </Link>
            </p>

            {/* Bottom Note */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-5">
              <ShieldCheck
                size={14}
                className="text-emerald-700"
              />

              <p className="text-center text-[10px] font-medium text-gray-400">
                Your reading journey is safe with BookNook.
              </p>
            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}
