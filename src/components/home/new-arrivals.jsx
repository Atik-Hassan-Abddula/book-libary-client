
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

import {
  ArrowRight,
  BookOpen,
  Loader2,
} from "lucide-react";

import { API_URL } from "@/lib/api";

// =====================================
// BOOK CARDS ANIMATION
// =====================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// =====================================
// NEW ARRIVALS COMPONENT
// =====================================

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // FETCH BOOKS FROM BACKEND
  // =====================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/books?limit=6`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load books (${response.status})`
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Could not load books."
          );
        }

        // Backend returns { success: true, books: [] }
        const latestBooks = Array.isArray(result.books)
          ? result.books.slice(0, 6)
          : [];

        setBooks(latestBooks);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("New arrivals error:", err);

        setError(
          "Unable to load new arrivals. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, []);

  // =====================================
  // RETRY FETCH
  // =====================================

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/books?limit=6`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load books.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Could not load books."
        );
      }

      setBooks(
        Array.isArray(result.books)
          ? result.books.slice(0, 6)
          : []
      );
    } catch (err) {
      console.error("Retry error:", err);
      setError(
        "Unable to load new arrivals. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // RENDER
  // =====================================

  return (
    <section className="bg-base-100 px-4 py-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
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
        </motion.div>

        {/* Loading */}

        {loading && (
          <div className="flex min-h-64 items-center justify-center">
            <Loader2
              className="animate-spin text-primary"
              size={40}
            />
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-xl border border-error/20 bg-error/5 p-6 text-center">
            <p className="text-error">{error}</p>

            <button
              onClick={handleRetry}
              className="mt-4 rounded-lg bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D4A853] hover:text-[#14251B]"
            >
              Try Again
            </button>
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

        {/* Animated Book Cards */}

        {!loading && !error && books.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {books.map((book) => (
              <motion.article
                key={book._id}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.25 },
                }}
                className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Book Image */}

                <div className="relative h-64 overflow-hidden bg-base-200">
                  {book.imageUrl || book.image ? (
                    <motion.div
                      className="h-full w-full"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={book.imageUrl || book.image}
                        alt={book.title || "Book cover"}
                        width={400}
                        height={500}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
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
                    {/* View Details Button */}

                    <motion.div
                      whileHover={{
                        scale: 1.03,
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <Link
                        href={`/books/${book._id}`}
                        className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#14532D] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-green-900/10 transition-all duration-300 hover:bg-[#D4A853] hover:text-[#14251B] hover:shadow-lg"
                      >
                        <span className="relative z-10">
                          View Details
                        </span>

                        <motion.span
                          className="relative z-10"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ArrowRight size={17} />
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* See All Books Button */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              href="/books"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-[#14532D] bg-[#14532D] px-8 py-3.5 font-semibold text-white shadow-md shadow-green-900/10 transition-all duration-300 hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#14251B] hover:shadow-lg"
            >
              See All Books

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
