
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Fotter from "@/components/fotter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Fotter />
      </body>
    </html>
  );
}
