
import { Suspense } from "react";
import localFont from "next/font/local";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/navbar";
import Fotter from "@/components/fotter";

import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: {
    default: "BookNook | Your Online Library",
    template: "%s | BookNook",
  },
  description:
    "Discover, explore, borrow, and share your favorite books with BookNook, your online library.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense
          fallback={
            <div className="h-20 w-full bg-[#F7F5EF]" />
          }
        >
          <Navbar />
        </Suspense>

        <main className="flex-1">
          {children}
        </main>

        <Fotter />

        {/* React Toastify */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
