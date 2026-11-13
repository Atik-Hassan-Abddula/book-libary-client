
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/books`);

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Could not load books");
        }

        setBooks(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-200/40 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-base-content">
            Explore All Books
          </h1>
          <p className="mt-3 text-base-content/60">
            Discover your next favorite book from our library.
          </p>
        </div>

        {books.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold">No Books Found</h2>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-64 bg-base-200">
                  {book.imageUrl || book.image ? (
                    <Image
                      src={book.imageUrl || book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen size={50} className="opacity-40" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <span className="badge badge-primary badge-outline mb-3">
                    {book.category || "Others"}
                  </span>

                  <h2 className="line-clamp-1 text-xl font-bold">
                    {book.title}
                  </h2>

                  <p className="mt-2 text-sm text-base-content/60">
                    By {book.author}
                  </p>

                  <Link
                    href={`/books/${book._id}`}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3"
                  >
                    View Details <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
