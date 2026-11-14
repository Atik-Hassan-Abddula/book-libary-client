
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  BookOpen,
  Plus,
  Eye,
  Trash2,
  Loader2,
  AlertCircle,
  X,
  Library,
  RefreshCw,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getToken,
  getCurrentUser,
  apiRequest,
} from "@/lib/api";

export default function MyBooksContent() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // =====================================
  // CHECK JWT AUTHENTICATION
  // =====================================

  useEffect(() => {
    let active = true;

    const checkUser = async () => {
      try {
        if (!getToken()) {
          if (active) {
            setUser(null);
          }
          return;
        }

        const result = await getCurrentUser();

        if (active) {
          setUser(result.user || null);
        }
      } catch (err) {
        console.error("Authentication Error:", err);

        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    };

    checkUser();

    return () => {
      active = false;
    };
  }, []);

  // =====================================
  // FETCH MY BOOKS
  // =====================================

  const fetchMyBooks = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError("");

      const result = await apiRequest("/my-books");

      const myBooks = Array.isArray(result.books)
        ? result.books
        : [];

      setBooks(myBooks);
    } catch (err) {
      console.error("Fetch My Books Error:", err);

      setError(err.message || "Failed to load your books.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    fetchMyBooks();
  }, [authLoading, user, fetchMyBooks]);

  // =====================================
  // DELETE BOOK
  // =====================================

  const handleDeleteBook = async () => {
    if (!selectedBook || !user) return;

    const bookId = selectedBook._id;

    try {
      setDeletingId(bookId);

      const result = await apiRequest(`/books/${bookId}`, {
        method: "DELETE",
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to delete book.");
      }

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== bookId)
      );

      setSelectedBook(null);

      toast.success("Book deleted successfully!");
    } catch (err) {
      console.error("Delete Book Error:", err);

      toast.error(err.message || "Failed to delete book.");
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // AUTHENTICATION LOADING
  // =====================================

  if (authLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F5EF] px-4">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-[#14532D]"
            size={42}
          />

          <p className="mt-4 font-semibold text-[#14532D]">
            Verifying your account...
          </p>
        </div>
      </main>
    );
  }

  // =====================================
  // NOT LOGGED IN
  // =====================================

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F5EF] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#E8E2D5] bg-white p-8 text-center shadow-sm">
          <BookOpen
            className="mx-auto text-[#D4A853]"
            size={48}
          />

          <h1 className="mt-5 text-2xl font-black text-[#14532D]">
            Login Required
          </h1>

          <p className="mt-3 text-gray-500">
            Please login to view and manage your books.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-[#14532D] px-6 py-3 font-bold text-white transition hover:bg-[#0F3D22]"
          >
            Login Now
          </Link>
        </div>
      </main>
    );
  }

  // =====================================
  // BOOKS LOADING
  // =====================================

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F5EF] px-4">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-[#14532D]"
            size={42}
          />

          <p className="mt-4 font-semibold text-[#14532D]">
            Loading your books...
          </p>
        </div>
      </main>
    );
  }

  // =====================================
  // ERROR STATE
  // =====================================

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F5EF] px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <AlertCircle
            className="mx-auto text-red-500"
            size={45}
          />

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchMyBooks}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#14532D] px-5 py-3 font-bold text-white transition hover:bg-[#0F3D22]"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =====================================
  // MAIN UI
  // =====================================

  return (
    <main className="min-h-screen bg-[#F7F5EF] px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-6xl">

        {/* PAGE HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#D4A853]">
              Your Collection
            </p>

            <h1 className="mt-3 text-3xl font-black text-[#14532D] sm:text-4xl">
              My Books
            </h1>

            <p className="mt-3 text-gray-600">
              Manage all the books you have added to BookNook.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14532D] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#0F3D22]"
          >
            <Plus size={19} />
            Add New Book
          </Link>
        </div>

        {/* STATISTICS */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E8E2D5] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-[#14532D]/10 p-3">
                <Library
                  className="text-[#14532D]"
                  size={25}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Books Added
                </p>

                <p className="mt-1 text-3xl font-black text-[#14532D]">
                  {books.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8E2D5] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-[#D4A853]/15 p-3">
                <BookOpen
                  className="text-[#B58A36]"
                  size={25}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Available Books
                </p>

                <p className="mt-1 text-3xl font-black text-[#14532D]">
                  {books.reduce(
                    (total, book) =>
                      total + Number(book.availableQuantity || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}

        {books.length === 0 ? (
          <div className="rounded-2xl border border-[#E8E2D5] bg-white px-6 py-16 text-center shadow-sm">
            <BookOpen
              className="mx-auto text-[#D4A853]"
              size={55}
              strokeWidth={1.5}
            />

            <h2 className="mt-5 text-xl font-bold text-[#14532D]">
              Your Collection Is Empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven't added any books yet. Start building your personal
              library today!
            </p>

            <Link
              href="/add-book"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#14532D] px-6 py-3 font-bold text-white transition hover:bg-[#0F3D22]"
            >
              <Plus size={18} />
              Add Your First Book
            </Link>
          </div>
        ) : (
          /* BOOK GRID */

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#E8E2D5] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* BOOK IMAGE */}

                <div className="relative h-64 overflow-hidden bg-[#E8E2D5]">
                  {book.image || book.imageUrl ? (
                    <Image
                      src={book.image || book.imageUrl}
                      alt={book.title || "Book cover"}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen
                        size={55}
                        className="text-[#14532D]/40"
                      />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-[#14532D] px-3 py-1 text-xs font-bold text-white">
                    {book.category || "Others"}
                  </span>
                </div>

                {/* BOOK INFORMATION */}

                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-[#14532D]">
                    {book.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    By {book.author}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E8E2D5] pt-4 text-sm">
                    <div>
                      <p className="text-gray-500">
                        Total Quantity
                      </p>

                      <p className="mt-1 font-bold text-[#14532D]">
                        {book.quantity ?? 0}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500">
                        Available
                      </p>

                      <p className="mt-1 font-bold text-green-700">
                        {book.availableQuantity ?? 0}
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      href={`/books/${book._id}`}
                      className="flex items-center justify-center gap-2 rounded-xl border border-[#14532D] px-3 py-3 text-sm font-bold text-[#14532D] transition hover:bg-[#14532D] hover:text-white"
                    >
                      <Eye size={17} />
                      Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSelectedBook(book)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-bold text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}

      {selectedBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          onClick={() => {
            if (!deletingId) setSelectedBook(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2
                  className="text-red-600"
                  size={24}
                />
              </div>

              <button
                type="button"
                disabled={Boolean(deletingId)}
                onClick={() => setSelectedBook(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                aria-label="Close confirmation"
              >
                <X size={21} />
              </button>
            </div>

            <h2
              id="delete-modal-title"
              className="mt-5 text-xl font-black text-gray-900"
            >
              Delete This Book?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-800">
                "{selectedBook.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={Boolean(deletingId)}
                onClick={() => setSelectedBook(null)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteBook}
                disabled={Boolean(deletingId)}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === selectedBook._id ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
