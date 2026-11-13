
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
} from "lucide-react";

import { API_URL } from "@/lib/api";

export default function BookDetailsContent() {
  const params = useParams();
  const id = params.id;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-primary"
            size={45}
          />
          <p className="mt-4 text-base-content/60">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !book) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
          <AlertCircle
            className="mx-auto mb-4 text-error"
            size={45}
          />

          <h2 className="text-2xl font-bold">
            Book Not Found
          </h2>

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

  const image = book.imageUrl || book.image;
  const availableQuantity = Number(book.availableQuantity ?? 0);

  return (
    <section className="min-h-screen bg-base-200/40 px-4 py-12 md:px-8">
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
          <div className="flex min-h-[400px] items-center justify-center bg-base-200 p-8 md:min-h-[600px]">
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
              <h2 className="mb-3 text-lg font-bold">
                About This Book
              </h2>

              <p className="whitespace-pre-line leading-8 text-base-content/65">
                {book.description ||
                  "No description available for this book."}
              </p>
            </div>

            {/* Book Information */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-base-200 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                  <Package size={17} />
                  Total Copies
                </div>

                <p className="text-2xl font-bold">
                  {book.quantity ?? 0}
                </p>
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
            {book.createdAt && (
              <div className="mt-6 flex items-center gap-2 text-sm text-base-content/50">
                <CalendarDays size={17} />
                Added on{" "}
                {new Date(book.createdAt).toLocaleDateString()}
              </div>
            )}

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
