
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Loader2,
} from "lucide-react";
import { API_URL } from "@/lib/api";

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/books?limit=6`);

        if (!response.ok) {
          throw new Error("Failed to load books");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Could not load books"
          );
        }

        setBooks(result.data || []);
      } catch (err) {
        console.error("New arrivals error:", err);
        setError("Unable to load new arrivals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="bg-base-100 px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Fresh From Our Library
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-base-content md:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-xl text-base-content/60">
              Discover the latest additions to our growing book collection.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <BookOpen size={20} />
            Latest 6 Books
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-error/20 bg-error/5 p-6 text-center">
            <p className="text-error">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && books.length === 0 && (
          <div className="rounded-xl border border-base-300 p-10 text-center">
            <BookOpen
              className="mx-auto mb-3 text-base-content/40"
              size={40}
            />

            <h3 className="text-xl font-semibold">
              No Books Yet
            </h3>

            <p className="mt-2 text-base-content/60">
              New books will appear here when they are added.
            </p>
          </div>
        )}

        {/* Book Cards */}
        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Book Image */}
                <div className="relative h-64 overflow-hidden bg-base-200">
                  {book.imageUrl || book.image ? (
                    <Image
                      src={book.imageUrl || book.image}
                      alt={book.title || "Book cover"}
                      width={400}
                      height={500}
                      unoptimized
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen
                        size={60}
                        className="text-base-content/30"
                      />
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-[#14532D] px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {book.category || "Others"}
                  </span>
                </div>

                {/* Book Information */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-bold text-base-content">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-base-content/60">
                    By {book.author || "Unknown Author"}
                  </p>

                  <div className="mt-5 border-t border-base-300 pt-4">
                    <Link
                      href={`/books/${book._id}`}
                      className="group/btn flex w-full items-center justify-center gap-2 rounded-lg bg-[#14532D] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-green-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4A853] hover:text-[#14251B] hover:shadow-lg"
                    >
                      View Details

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* See All Books Button */}
        <div className="mt-10 text-center">
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#14532D] bg-[#14532D] px-8 py-3.5 font-semibold text-white shadow-md shadow-green-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#14251B] hover:shadow-lg"
          >
            See All Books

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
