
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    // 1. Verify Better Auth session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login with Google first.",
        },
        { status: 401 }
      );
    }

    // 2. Verify email
    if (session.user.emailVerified !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email first.",
        },
        { status: 403 }
      );
    }

    // 3. Environment variables
    const exchangeSecret = process.env.AUTH_EXCHANGE_SECRET;

    const backendUrl = (
      process.env.BACKEND_API_URL ||
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000"
    ).replace(/\/+$/, "");

    if (!exchangeSecret) {
      console.error("AUTH_EXCHANGE_SECRET is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Server authentication configuration is missing.",
        },
        { status: 500 }
      );
    }

    // 4. Exchange Better Auth session for Express JWT
    const response = await fetch(
      `${backendUrl}/auth/google-exchange`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-exchange-secret": exchangeSecret,
        },
        body: JSON.stringify({
          name: session.user.name || "BookNook User",
          email: session.user.email,
          image: session.user.image || "",
          emailVerified: session.user.emailVerified === true,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Backend Google Exchange Error:", result);

      return NextResponse.json(
        {
          success: false,
          message:
            result.message ||
            "Google authentication exchange failed.",
        },
        { status: response.status }
      );
    }

    // 5. Validate backend token
    if (!result.success || !result.token) {
      return NextResponse.json(
        {
          success: false,
          message: "Backend authentication token was not received.",
        },
        { status: 500 }
      );
    }

    // 6. Return token
    return NextResponse.json(
      {
        success: true,
        message: "Google login successful.",
        token: result.token,
        user: result.user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Google Exchange Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Google authentication failed.",
      },
      { status: 500 }
    );
  }
}
