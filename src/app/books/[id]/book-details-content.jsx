"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  User,
  Package,
  CalendarDays,
  Loader2,
  AlertCircle,
  Clock,
  BookMarked,
} from "lucide-react";

import { toast } from "react-toastify";
import { API_URL } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function BookDetailsContent() {
  const params = useParams();
  const id = params.id;

  // Authentication
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const user = session?.user;

  // States
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borrowDays, setBorrowDays] = useState("7");
  const [borrowing, setBorrowing] = useState(false);

  // Fetch Book Details
  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/books/${id}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Book not found");
        }

        setBook(result.data);
      } catch (err) {
        console.error("Book Details Error:", err);
        setError(err.message || "Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Book Information
  const availableQuantity = Number(book?.availableQuantity ?? 0);
  const totalQuantity = Number(book?.quantity ?? 0);
  const image = book?.imageUrl || book?.image;

  // Format Date
  const formatDate = (dateValue) => {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle Borrow Book
  const handleBorrow = async () => {
    if (sessionLoading) {
      toast.info("Please wait. Checking your account...");
      return;
    }

    if (!user?.email) {
      toast.error("Please login before borrowing a book.");
      return;
    }

    if (!book?._id) {
      toast.error("Book information is missing.");
      return;
    }

    if (availableQuantity <= 0) {
      toast.error("This book is currently unavailable.");
      return;
    }

    try {
      setBorrowing(true);

      const response = await fetch(`${API_URL}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: id,
          userName: user.name || "BookNook User",
          userEmail: user.email,
          borrowDays: Number(borrowDays),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            `Borrow request failed. Server status: ${response.status}`,
        );
      }

      // Update Available Quantity
      setBook((previousBook) => ({
        ...previousBook,
        availableQuantity: Math.max(
          0,
          Number(previousBook.availableQuantity ?? 0) - 1,
        ),
      }));

      toast.success("Book borrowed successfully!");
    } catch (err) {
      console.error("Borrow Error:", err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setBorrowing(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-primary" size={45} />
          <p className="mt-4 text-base-content/60">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !book) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto mb-4 text-error" size={45} />

          <h2 className="text-2xl font-bold">Book Not Found</h2>

          <p className="mt-3 text-base-content/60">
            {error || "Sorry, this book could not be found."}
          </p>

          <Link
            href="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-content"
          >
            <ArrowLeft size={18} />
            Back to All Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-200/40 px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-medium text-base-content/60 transition hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to All Books
        </Link>

        {/* Details Card */}
        <div className="grid overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm md:grid-cols-2">
          {/* Book Image */}
          <div className="flex min-h-[350px] items-center justify-center bg-base-200 p-6 sm:p-8 md:min-h-[600px]">
            {image ? (
              <img
                src={image}
                alt={book.title || "Book cover"}
                className="max-h-[500px] w-full rounded-xl object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-base-content/40">
                <BookOpen size={90} />
                <p>No Image Available</p>
              </div>
            )}
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <span className="mb-5 w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {book.category || "Others"}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-base-content md:text-4xl">
              {book.title}
            </h1>

            {/* Author */}
            <div className="mt-5 flex items-center gap-3 text-base-content/60">
              <User size={20} className="text-primary" />

              <span>
                Written by{" "}
                <strong className="text-base-content">
                  {book.author || "Unknown Author"}
                </strong>
              </span>
            </div>

            <div className="my-8 h-px bg-base-300" />

            {/* Description */}
            <div>
              <h2 className="mb-3 text-lg font-bold">About This Book</h2>

              <p className="whitespace-pre-line leading-8 text-base-content/65">
                {book.description || "No description available for this book."}
              </p>
            </div>

            {/* Book Information */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-base-200 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                  <Package size={17} />
                  Total Copies
                </div>

                <p className="text-2xl font-bold">{totalQuantity}</p>
              </div>

              <div className="rounded-xl bg-base-200 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                  <BookOpen size={17} />
                  Available
                </div>

                <p className="text-2xl font-bold text-primary">
                  {availableQuantity}
                </p>
              </div>
            </div>

            {/* Date Added */}
            <div className="mt-6 flex items-center gap-2 text-sm text-base-content/50">
              <CalendarDays size={17} />
              Added on {formatDate(book.createdAt)}
            </div>

            {/* Availability Status */}
            <div className="mt-7">
              {availableQuantity > 0 ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
                  <span className="size-2 rounded-full bg-success" />
                  Available for Borrowing
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-error/10 px-4 py-2 text-sm font-semibold text-error">
                  <span className="size-2 rounded-full bg-error" />
                  Currently Not Available
                </span>
              )}
            </div>

            {/* Borrow Section */}
            <div className="mt-7 rounded-2xl border border-base-300 bg-base-200/60 p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <BookMarked size={21} className="text-primary" />
                Borrow This Book
              </h2>

              <label
                htmlFor="borrowDays"
                className="mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <Clock size={16} />
                Select Borrow Duration
              </label>

              <select
                id="borrowDays"
                value={borrowDays}
                onChange={(e) => setBorrowDays(e.target.value)}
                disabled={borrowing || availableQuantity <= 0}
                className="select select-bordered w-full bg-base-100"
              >
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="21">21 Days</option>
                <option value="30">30 Days</option>
              </select>

              {/* Authentication Status */}
              {sessionLoading ? (
                <p className="mt-3 flex items-center gap-2 text-sm text-base-content/60">
                  <Loader2 size={15} className="animate-spin" />
                  Checking your account...
                </p>
              ) : !user ? (
                <p className="mt-3 text-sm text-warning">
                  Please{" "}
                  <Link href="/sign-in" className="font-bold underline">
                    Login
                  </Link>{" "}
                  to borrow this book.
                </p>
              ) : (
                <p className="mt-3 text-sm text-success">
                  Logged in as {user.email}
                </p>
              )}

              {/* Borrow Button */}

              <button
                type="button"
                onClick={handleBorrow}
                disabled={borrowing || availableQuantity <= 0 || sessionLoading}
                className="group relative mt-5 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {/* Hover Shine Effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-3">
                  {borrowing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Borrowing Your Book...
                    </>
                  ) : availableQuantity <= 0 ? (
                    <>
                      <BookOpen size={20} />
                      Currently Unavailable
                    </>
                  ) : (
                    <>
                      <BookMarked
                        size={21}
                        className="text-amber-300 transition-transform duration-300 group-hover:rotate-[-10deg] group-hover:scale-110"
                      />
                      Borrow This Book
                      <ArrowLeft
                        size={19}
                        className="rotate-180 text-amber-300 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </span>
              </button>

              {user && (
                <Link
                  href="/my-borrows"
                  className="mt-4 block text-center text-sm font-semibold text-primary hover:underline"
                >
                  View My Borrowed Books →
                </Link>
              )}
            </div>

            {/* Explore More */}
            <Link
              href="/books"
              className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-content"
            >
              <ArrowLeft size={18} />
              Explore More Books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
