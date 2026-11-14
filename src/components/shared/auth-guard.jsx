
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getToken, getCurrentUser } from "@/lib/api";

export default function AuthGuard({ children }) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    const verifyUser = async () => {
      if (!getToken()) {
        router.replace("/login");
        return;
      }

      try {
        const result = await getCurrentUser();

        if (!result.success || !result.user) {
          router.replace("/login");
          return;
        }

        if (active) {
          setAuthorized(true);
        }
      } catch (error) {
        console.error("Route Authentication Error:", error);
        router.replace("/login");
      }
    };

    verifyUser();

    return () => {
      active = false;
    };
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={40}
            className="mx-auto animate-spin text-[#14532D]"
          />
          <p className="mt-4 text-gray-500">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  return children;
}
