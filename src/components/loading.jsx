
"use client";

import { BookOpen, Sparkles } from "lucide-react";

export default function Loading({
  message = "Turning pages, finding stories...",
}) {
  return (
    <div className="flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden bg-[#F7F5EF] px-4">

      {/* Animated Book Logo */}
      <div className="relative flex h-36 w-36 items-center justify-center">

        {/* Outer Glow */}
        <div className="absolute inset-2 animate-pulse rounded-full bg-[#D4A853]/20 blur-2xl" />

        {/* Orbit */}
        <div className="absolute inset-3 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-[#D4A853]/60" />

        {/* Floating Sparkles */}
        <Sparkles
          size={20}
          className="absolute right-5 top-3 animate-pulse text-[#D4A853]"
        />

        <Sparkles
          size={15}
          className="absolute bottom-5 left-3 animate-bounce text-[#14532D]"
        />

        {/* Book */}
        <div className="relative z-10 flex h-20 w-20 animate-[bounce_2s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-[#14532D] text-white shadow-2xl shadow-[#14532D]/30">

          <BookOpen
            size={42}
            strokeWidth={1.7}
            className="animate-pulse"
          />

          {/* Book Shine */}
          <div className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#D4A853] shadow-lg shadow-[#D4A853]/50" />
        </div>

        {/* Floating Dots */}
        <span className="absolute left-1/2 top-0 h-2 w-2 animate-bounce rounded-full bg-[#D4A853]" />
        <span className="absolute bottom-0 right-5 h-2 w-2 animate-pulse rounded-full bg-[#14532D]" />
      </div>

      {/* Brand */}
      <div className="mt-3 text-center">
        <h1 className="text-3xl font-black tracking-tight text-[#14532D]">
          Book<span className="text-[#D4A853]">Nook</span>
        </h1>

        <p className="mt-2 text-[10px] font-bold tracking-[0.35em] text-gray-400">
          YOUR ONLINE LIBRARY
        </p>
      </div>

      {/* Loading Message */}
      <div className="mt-8 flex items-center gap-2">
        <p className="text-sm font-semibold text-[#14532D]">
          {message}
        </p>

        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4A853]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4A853] [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4A853] [animation-delay:300ms]" />
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="relative mt-6 h-1.5 w-52 overflow-hidden rounded-full bg-[#14532D]/10">
        <div className="absolute h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#14532D] via-[#D4A853] to-[#14532D]" />
      </div>

      <p className="mt-4 text-xs font-medium text-gray-400">
        Every great story starts here.
      </p>

      <style jsx>{`
        @keyframes loading {
          0% {
            left: -35%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
