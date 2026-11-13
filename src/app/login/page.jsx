import SigninForm from "@/components/auth/signin-form";

export const metadata = {
  title: "BookNook | Sign In",
  description: "Sign in to your BookNook account.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-12">
      <SigninForm />
    </main>
  );
}