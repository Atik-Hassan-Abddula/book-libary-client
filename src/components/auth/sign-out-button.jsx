
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed!");
      }

      toast.success("Logged out successfully!");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign Out Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] px-4 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-[#D4A853] hover:text-[#14251B] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <LogOut size={18} />
      )}

      <span>{loading ? "Signing Out..." : "Sign Out"}</span>
    </button>
  );
}
