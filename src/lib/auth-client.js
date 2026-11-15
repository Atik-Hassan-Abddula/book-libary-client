
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_AUTH_URL ||
    "https://book-libary-client.vercel.app",
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient;
