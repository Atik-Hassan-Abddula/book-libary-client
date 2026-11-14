
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-8xl font-extrabold text-green-700">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-900">
        BookNook Page Not Found
      </h2>

      <p className="mt-3 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        Back to Home
      </Link>
    </main>
  );
}
