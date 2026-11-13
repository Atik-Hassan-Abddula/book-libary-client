
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

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

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function BookDetailsContent() {
  const params = useParams();
  const id = params.id;

  // Authentication
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[70vh] items-center justify-center"
      >
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-primary" size={45} />
          <p className="mt-4 text-base-content/60">
            Loading book details...
          </p>
        </div>
      </motion.div>
    );
  }

  // Error State
  if (error || !book) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex min-h-[70vh] items-center justify-center px-4"
      >
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
      </motion.div>
    );
  }

  return (
    <section className="min-h-screen overflow-hidden bg-base-200/40 px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/books"
            className="mb-8 inline-flex items-center gap-2 font-medium text-base-content/60 transition hover:text-primary"
          >
            <ArrowLeft size={18} />
            Back to All Books
          </Link>
        </motion.div>

        {/* Details Card */}
        <div className="grid overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm md:grid-cols-2">

          {/* Book Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex min-h-[350px] items-center justify-center bg-base-200 p-6 sm:p-8 md:min-h-[600px]"
          >
            {image ? (
              <motion.img
                src={image}
                alt={book.title || "Book cover"}
                className="max-h-[500px] w-full rounded-xl object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                whileHover={{ scale: 1.035 }}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-base-content/40">
                <BookOpen size={90} />
                <p>No Image Available</p>
              </div>
            )}
          </motion.div>

          {/* Book Information */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col justify-center p-6 sm:p-10"
          >

            {/* Category */}
            <motion.span
              variants={itemVariant}
              className="mb-5 w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
            >
              {book.category || "Others"}
            </motion.span>

            {/* Title */}
            <motion.h1
              variants={itemVariant}
              className="text-3xl font-bold leading-tight text-base-content md:text-4xl"
            >
              {book.title}
            </motion.h1>

            {/* Author */}
            <motion.div
              variants={itemVariant}
              className="mt-5 flex items-center gap-3 text-base-content/60"
            >
              <User size={20} className="text-primary" />

              <span>
                Written by{" "}
                <strong className="text-base-content">
                  {book.author || "Unknown Author"}
                </strong>
              </span>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="my-8 h-px bg-base-300"
            />

            {/* Description */}
            <motion.div variants={itemVariant}>
              <h2 className="mb-3 text-lg font-bold">
                About This Book
              </h2>

              <p className="whitespace-pre-line leading-8 text-base-content/65">
                {book.description ||
                  "No description available for this book."}
              </p>
            </motion.div>

            {/* Book Information Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <motion.div
                variants={itemVariant}
                whileHover={{ y: -5, scale: 1.02 }}
                className="rounded-xl bg-base-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                  <Package size={17} />
                  Total Copies
                </div>

                <p className="text-2xl font-bold">
                  {totalQuantity}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariant}
                whileHover={{ y: -5, scale: 1.02 }}
                className="rounded-xl bg-base-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                  <BookOpen size={17} />
                  Available
                </div>

                <p className="text-2xl font-bold text-primary">
                  {availableQuantity}
                </p>
              </motion.div>
            </motion.div>

            {/* Date Added */}
            <motion.div
              variants={itemVariant}
              className="mt-6 flex items-center gap-2 text-sm text-base-content/50"
            >
              <CalendarDays size={17} />
              Added on {formatDate(book.createdAt)}
            </motion.div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariant}
              className="mt-7"
            >
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
            </motion.div>

            {/* Borrow Section */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-7 rounded-2xl border border-base-300 bg-base-200/60 p-5"
            >
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
                  <Link
                    href="/sign-in"
                    className="font-bold underline"
                  >
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
              <motion.button
                type="button"
                onClick={handleBorrow}
                disabled={
                  borrowing ||
                  availableQuantity <= 0 ||
                  sessionLoading
                }
                whileHover={
                  !borrowing && availableQuantity > 0
                    ? { scale: 1.025, y: -3 }
                    : {}
                }
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 18,
                }}
                className="group relative mt-5 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/30 disabled:cursor-not-allowed disabled:opacity-50"
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
              </motion.button>

              {/* My Borrowed Books */}
              {user && (
                <motion.div
                  whileHover={{ y: -2 }}
                  className="mt-4 text-center"
                >
                  <Link
                    href="/my-borrows"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    View My Borrowed Books →
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Explore More */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="mt-7"
            >
              <Link
                href="/books"
                className="flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-content"
              >
                <ArrowLeft size={18} />
                Explore More Books
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
