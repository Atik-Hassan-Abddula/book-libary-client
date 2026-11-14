
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  LoaderCircle,
  RotateCcw,
  BookMarked,
  ArrowRight,
  Clock3,
  LibraryBig,
  RefreshCw,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getToken,
  getCurrentUser,
  apiRequest,
} from "@/lib/api";

export default function MyBorrowsPage() {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  // =====================================
  // VERIFY AUTHENTICATION
  // =====================================

  useEffect(() => {
    let active = true;

    const verifyUser = async () => {
      try {
        if (!getToken()) {
          if (active) setUser(null);
          return;
        }

        const result = await getCurrentUser();

        if (active && result.success && result.user) {
          setUser(result.user);
        } else if (active) {
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication Error:", error);

        if (active) setUser(null);
      } finally {
        if (active) setIsPending(false);
      }
    };

    verifyUser();

    return () => {
      active = false;
    };
  }, []);

  // =====================================
  // FETCH BORROWED BOOKS
  // =====================================

  const fetchBorrowedBooks = useCallback(async () => {
    if (!user?.email) return;

    try {
      setLoading(true);

      const result = await apiRequest("/my-borrows");

      if (!result.success) {
        throw new Error(
          result.message || "Failed to load borrowed books."
        );
      }

      setBorrowedBooks(
        result.data || result.borrows || []
      );
    } catch (error) {
      console.error("Fetch Borrowed Books Error:", error);

      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  // =====================================
  // LOAD BORROWED BOOKS
  // =====================================

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setBorrowedBooks([]);
      setLoading(false);
      return;
    }

    fetchBorrowedBooks();
  }, [user, isPending, fetchBorrowedBooks]);

  // =====================================
  // RETURN BOOK
  // =====================================

  const handleReturn = async (borrowId) => {
    if (!user?.email) {
      toast.error("Please login first.");
      return;
    }

    try {
      setReturningId(borrowId);

      const result = await apiRequest(
        `/borrow/${borrowId}/return`,
        {
          method: "PATCH",
        }
      );

      if (!result.success) {
        throw new Error(
          result.message || "Could not return this book."
        );
      }

      setBorrowedBooks((previous) =>
        previous.filter((book) => book._id !== borrowId)
      );

      toast.success("Book returned successfully!");
    } catch (error) {
      console.error("Return Book Error:", error);

      toast.error(error.message || "Failed to return book.");
    } finally {
      setReturningId(null);
    }
  };

  // =====================================
  // DATE FORMATTER
  // =====================================

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================
  // AUTHENTICATION LOADING
  // =====================================

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-[#14532D]" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Checking your account...
          </p>
        </div>
      </main>
    );
  }

  // =====================================
  // LOGIN REQUIRED
  // =====================================

  if (!user) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#F7F5EF] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-[#E8E2D5] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D4A853]/20">
            <BookOpen className="h-10 w-10 text-[#14532D]" />
          </div>

          <h1 className="mt-6 text-2xl font-black text-[#14532D]">
            Login Required
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            Please login to your BookNook account to see your borrowed books.
          </p>

          <Link
            href="/login"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#14532D] px-6 py-3 font-semibold text-white transition hover:bg-[#103F25]"
          >
            Login Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  // =====================================
  // PAGE UI
  // =====================================

  return (
    <main className="min-h-screen bg-[#F7F5EF] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D4A853]/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#14532D]">
              <BookMarked size={15} />
              Your Reading Journey
            </span>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-[#14532D] sm:text-5xl">
              My Borrows
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Keep track of your borrowed books, check return dates,
              and manage your reading journey.
            </p>
          </div>

          <button
            onClick={fetchBorrowedBooks}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#14532D]/20 bg-white px-5 py-3 text-sm font-semibold text-[#14532D] transition hover:bg-[#14532D] hover:text-white disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* STATISTICS */}

        <div className="mb-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E8E2D5] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Currently Borrowed
                </p>

                <p className="mt-3 text-4xl font-black text-[#14532D]">
                  {borrowedBooks.length}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Active borrowed books
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14532D]/10">
                <LibraryBig size={27} className="text-[#14532D]" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8E2D5] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Your Account
                </p>

                <p className="mt-3 max-w-[220px] truncate text-lg font-bold text-[#14532D]">
                  {user.name || "BookNook Reader"}
                </p>

                <p className="mt-2 max-w-[220px] truncate text-xs text-gray-400">
                  {user.email}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A853]/20">
                <BookOpen size={27} className="text-[#14532D]" />
              </div>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}

        {loading ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-[#E8E2D5] bg-white">
            <LoaderCircle className="h-12 w-12 animate-spin text-[#14532D]" />

            <p className="mt-5 font-semibold text-[#14532D]">
              Loading Your Borrowed Books
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Please wait while we prepare your library...
            </p>
          </div>
        ) : borrowedBooks.length === 0 ? (

          /* EMPTY STATE */

          <div className="rounded-3xl border border-[#E8E2D5] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#D4A853]/20">
              <BookOpen size={45} className="text-[#14532D]" />
            </div>

            <h2 className="mt-7 text-2xl font-black text-[#14532D]">
              No Borrowed Books Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
              You haven't borrowed any books yet. Explore our library
              and find your next favorite story.
            </p>

            <Link
              href="/books"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#14532D] px-7 py-3 font-semibold text-white transition hover:bg-[#103F25]"
            >
              Explore Books
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (

          /* BORROWED BOOKS GRID */

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#14532D]">
                Your Borrowed Collection
              </h2>

              <span className="rounded-full bg-[#14532D]/10 px-4 py-2 text-xs font-bold text-[#14532D]">
                {borrowedBooks.length} Books
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {borrowedBooks.map((book) => {
                // Backend field: dueDate
                const isOverdue =
                  book.dueDate &&
                  new Date(book.dueDate).getTime() <
                    new Date().setHours(0, 0, 0, 0);

                // Backend field: bookImage
                const imageSrc =
                  book.bookImage ||
                  book.image ||
                  book.imageUrl ||
                  book.book?.image ||
                  book.book?.imageUrl ||
                  "";

                // Backend field: bookTitle
                const bookTitle =
                  book.bookTitle ||
                  book.title ||
                  book.book?.title ||
                  "Borrowed Book";

                const bookAuthor =
                  book.author ||
                  book.book?.author ||
                  "Unknown Author";

                const bookCategory =
                  book.category ||
                  book.book?.category ||
                  "Book";

                return (
                  <article
                    key={book._id}
                    className="group overflow-hidden rounded-2xl border border-[#E8E2D5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* BOOK IMAGE */}

                    <div className="relative h-64 overflow-hidden bg-[#F0EDE4]">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={bookTitle}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";

                            const fallback =
                              event.currentTarget.parentElement.querySelector(
                                ".book-image-fallback"
                              );

                            if (fallback) {
                              fallback.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}

                      <div
                        className="book-image-fallback absolute inset-0 items-center justify-center"
                        style={{
                          display: imageSrc ? "none" : "flex",
                        }}
                      >
                        <BookOpen
                          size={55}
                          className="text-[#14532D]"
                        />
                      </div>

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-[#14532D] shadow-sm">
                        {bookCategory}
                      </span>
                    </div>

                    {/* BOOK INFORMATION */}

                    <div className="p-5">
                      <h3 className="line-clamp-1 text-xl font-black text-[#14532D]">
                        {bookTitle}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        By {bookAuthor}
                      </p>

                      {/* DATE INFORMATION */}

                      <div className="mt-5 space-y-3 rounded-xl bg-[#F7F5EF] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
                            <CalendarDays size={15} />
                            Borrowed
                          </span>

                          <span className="text-xs font-bold text-[#14532D]">
                            {formatDate(book.borrowedAt)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 text-xs font-medium text-gray-500">
                            <Clock3 size={15} />
                            Return Date
                          </span>

                          <span
                            className={`text-xs font-bold ${
                              isOverdue
                                ? "text-red-600"
                                : "text-[#14532D]"
                            }`}
                          >
                            {formatDate(book.dueDate)}
                          </span>
                        </div>
                      </div>

                      {/* STATUS */}

                      <div className="mt-4">
                        {isOverdue ? (
                          <span className="inline-flex rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600">
                            Overdue
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                            Currently Borrowed
                          </span>
                        )}
                      </div>

                      {/* RETURN BUTTON */}

                      <button
                        onClick={() => handleReturn(book._id)}
                        disabled={returningId === book._id}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#14532D] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#103F25] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {returningId === book._id ? (
                          <>
                            <LoaderCircle
                              size={18}
                              className="animate-spin"
                            />
                            Returning Book...
                          </>
                        ) : (
                          <>
                            <RotateCcw size={18} />
                            Return Book
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
