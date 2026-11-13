import SignupForm from "@/components/auth/signup-form";

export const metadata = {
  title: "BookNook | Sign Up",
  description: "Create your BookNook account.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-12">
      <SignupForm />
    </main>
  );
}