
import Link from "next/link";
import {
  BookOpen,
  Home,
  SearchX,
  Library,
  ArrowLeft,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#071A12] px-5 py-16">

      {/* Background Effects */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-green-400/20 blur-[100px]" />

      {/* Floating Icons */}
      <div className="pointer-events-none absolute left-[10%] top-[18%] hidden rotate-[-18deg] text-emerald-400/20 sm:block">
        <BookOpen size={75} />
      </div>

      <div className="pointer-events-none absolute bottom-[15%] right-[12%] hidden rotate-[15deg] text-emerald-400/20 sm:block">
        <Library size={85} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 shadow-lg">
          <SearchX size={40} strokeWidth={1.5} />
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="select-none bg-gradient-to-b from-emerald-300 via-green-400 to-emerald-700 bg-clip-text text-[130px] font-black leading-none tracking-tighter text-transparent sm:text-[190px]">
            404
          </h1>

          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-40 w-72 rounded-full bg-emerald-500/20 blur-[90px]" />
          </div>
        </div>

        {/* Message */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-emerald-400">
            Lost Between The Pages
          </p>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Oops! This Page Is Missing
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
            Looks like this book has gone missing from our library.
            The page you are looking for might have been moved,
            deleted, or never existed.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 font-bold text-[#071A12] shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400"
          >
            <Home size={19} />
            Back to Home
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-400/10"
          >
            <ArrowLeft size={19} />
            Explore Books
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-16 flex items-center justify-center gap-2 text-sm text-gray-500">
          <BookOpen size={17} className="text-emerald-500" />
          <span>BookNook — Every Book Has A Story.</span>
        </div>

      </div>
    </main>
  );
}
