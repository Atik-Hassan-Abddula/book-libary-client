
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

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Email Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Get Form Data
    const formDataObject = new FormData(e.currentTarget);

    // Convert FormData to JavaScript Object
    const userData = Object.fromEntries(
      formDataObject.entries()
    );

    // Destructure User Information
    const { name, email, image, password } = userData;

    // Password Validation
    if (!/[A-Z]/.test(password)) {
      setError(
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError(
        "Password must contain at least one lowercase letter."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    if (password.length > 128) {
      setError(
        "Password cannot exceed 128 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
        callbackURL: "/",
      });

      if (error) {
        setError(
          error.message || "Registration failed."
        );
        return;
      }

      console.log("Signup successful:", data);

      router.push("/");
      router.refresh();

    } catch (err) {
      console.error("Signup Error:", err);

      setError(
        err.message || "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setError(
          error.message || "Google signup failed."
        );
        setGoogleLoading(false);
      }

    } catch (err) {
      console.error("Google Signup Error:", err);

      setError(
        err.message || "Google signup failed."
      );

      setGoogleLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border shadow-xl">

      {/* Header */}
      <CardHeader className="space-y-3 text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <BookOpen size={30} />
        </div>

        <CardTitle className="text-3xl font-bold">
          Create Account
        </CardTitle>

        <CardDescription>
          Join BookNook and explore your favorite books.
        </CardDescription>

      </CardHeader>

      <CardContent>

        {/* Signup Form */}
        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >

          {/* Name */}
          <div className="space-y-2">

            <Label htmlFor="name">
              Full Name
            </Label>

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}
          <div className="space-y-2">

            <Label htmlFor="email">
              Email Address
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Profile Image */}
          <div className="space-y-2">

            <Label htmlFor="image">
              Photo URL
            </Label>

            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={formData.image}
              onChange={handleChange}
            />

          </div>

          {/* Password */}
          <div className="space-y-2">

            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">

              <Input
                id="password"
                name="password"
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="pr-11"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-emerald-700"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            <p className="text-xs text-muted-foreground">
              Minimum 8 characters, including uppercase
              and lowercase letters.
            </p>

          </div>

          {/* Error Message */}
          {error && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Signup Button */}
          <Button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-emerald-600 text-white hover:bg-[#D4A853] hover:text-[#14251B]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

        </form>

        {/* Separator */}
        <div className="my-5 flex items-center gap-3">

          <Separator className="flex-1" />

          <span className="text-xs text-muted-foreground">
            OR
          </span>

          <Separator className="flex-1" />

        </div>

        {/* Google Signup */}
        <Button
          type="button"
          variant="outline"
          disabled={loading || googleLoading}
          className="w-full"
          onClick={handleGoogleSignup}
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

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">

          Already have an account?{" "}

          <Link
            href="/login"
            className="font-semibold text-emerald-700 hover:text-[#D4A853] hover:underline"
          >
            Sign In
          </Link>

        </p>

      </CardContent>
    </Card>
  );
}
