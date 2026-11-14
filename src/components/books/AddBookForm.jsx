
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookPlus,
  LoaderCircle,
  ImagePlus,
  UserRound,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getToken,
  getCurrentUser,
  apiRequest,
} from "@/lib/api";

const initialFormData = {
  title: "",
  author: "",
  category: "Fiction",
  imageUrl: "",
  description: "",
  quantity: "1",
};

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function AddBookForm() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =====================================
  // VERIFY USER WITH JWT
  // =====================================

  useEffect(() => {
    let active = true;

    const verifyUser = async () => {
      try {
        const token = getToken();

        if (!token) {
          if (active) setUser(null);
          return;
        }

        const result = await getCurrentUser();

        if (active && result.success && result.user) {
          setUser(result.user);
        } else {
          if (active) setUser(null);
        }
      } catch (error) {
        console.error("Add Book Authentication Error:", error);

        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setIsPending(false);
        }
      }
    };

    verifyUser();

    return () => {
      active = false;
    };
  }, []);

  // =====================================
  // HANDLE INPUT CHANGE
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================
  // SUBMIT BOOK
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !getToken()) {
      toast.warning("Please login to add a book.");
      router.push("/login");
      return;
    }

    if (isSubmitting) return;

    if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 1
    ) {
      toast.error("Total copies must be at least 1.");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.category.trim() ||
      !formData.imageUrl.trim() ||
      !formData.description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Backend expects "image", not "imageUrl"
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category.trim(),
        image: formData.imageUrl.trim(),
        description: formData.description.trim(),
        quantity: Number(formData.quantity),
      };

      // JWT Bearer Token is automatically included
      const result = await apiRequest("/books", {
        method: "POST",
        body: JSON.stringify(bookData),
      });

      if (!result.success) {
        throw new Error(
          result.message || "Unable to add the book."
        );
      }

      toast.success("Book added successfully!");

      setFormData(initialFormData);

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Add Book Error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================================
  // STYLES
  // =====================================

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#14532D] focus:ring-4 focus:ring-[#14532D]/10";

  const labelClass =
    "text-sm font-bold text-[#14251B]";

  // =====================================
  // LOADING
  // =====================================

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoaderCircle
          size={42}
          className="animate-spin text-[#14532D]"
        />
      </div>
    );
  }

  // =====================================
  // LOGIN REQUIRED
  // =====================================

  if (!user) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-[#D4A853]/40 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#14532D]/10 text-[#14532D]">
          <UserRound size={32} />
        </div>

        <h2 className="mt-5 text-2xl font-extrabold text-[#14532D]">
          Login Required
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Please login to your BookNook account before adding
          a new book to the library.
        </p>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-6 rounded-xl bg-[#14532D] px-7 py-3 font-bold text-white transition hover:bg-[#D4A853] hover:text-[#14251B]"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // =====================================
  // ADD BOOK FORM
  // =====================================

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-[#14532D]/5"
    >
      {/* Form Header */}

      <div className="bg-[#14532D] px-6 py-7 text-white sm:px-9">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <BookPlus size={30} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl">
              Book Information
            </h2>

            <p className="mt-1 text-sm text-white/70">
              Add a new book to your library collection.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-7 p-5 sm:p-9">

        {/* Basic Information */}

        <section>
          <div className="mb-5 flex items-center gap-2">
            <BookOpen size={19} className="text-[#14532D]" />

            <h3 className="font-bold text-[#14532D]">
              Basic Information
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className={labelClass}>
                Book Title *
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className={inputClass}
                maxLength={150}
                required
              />
            </div>

            <div>
              <label htmlFor="author" className={labelClass}>
                Author Name *
              </label>

              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={inputClass}
                maxLength={100}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className={labelClass}>
                Book Category *
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className={labelClass}>
                Total Copies *
              </label>

              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter total copies"
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        {/* Image */}

        <section>
          <div className="mb-5 flex items-center gap-2">
            <ImagePlus size={19} className="text-[#14532D]" />

            <h3 className="font-bold text-[#14532D]">
              Book Cover
            </h3>
          </div>

          <label htmlFor="imageUrl" className={labelClass}>
            Book Image URL *
          </label>

          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
            className={inputClass}
            required
          />

          {formData.imageUrl && (
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-gray-100 bg-[#F7F5EF] p-3">
              <img
                src={formData.imageUrl}
                alt="Book cover preview"
                className="h-24 w-20 rounded-lg object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div>
                <p className="text-sm font-bold text-[#14532D]">
                  Image Preview
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Your book cover preview.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Description */}

        <section>
          <label htmlFor="description" className={labelClass}>
            Book Description *
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description about this book..."
            rows={5}
            maxLength={1500}
            className={`${inputClass} resize-y`}
            required
          />

          <p className="mt-2 text-right text-xs text-gray-400">
            {formData.description.length}/1500
          </p>
        </section>

        {/* User Information */}

        <section className="rounded-2xl border border-[#D4A853]/30 bg-[#F7F5EF] p-5">
          <div className="mb-4 flex items-center gap-2">
            <UserRound size={19} className="text-[#14532D]" />

            <h3 className="font-bold text-[#14532D]">
              Added By
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Your Name</label>

              <input
                type="text"
                value={user.name || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-gray-100`}
              />
            </div>

            <div>
              <label className={labelClass}>Your Email</label>

              <input
                type="email"
                value={user.email || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-gray-100`}
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#14532D] px-6 py-4 font-bold text-white shadow-lg shadow-[#14532D]/15 transition duration-300 hover:bg-[#D4A853] hover:text-[#14251B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={21} className="animate-spin" />
              Saving Book...
            </>
          ) : (
            <>
              <CheckCircle2 size={21} />
              Add Book to Library
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          * Please complete all required fields before submitting.
        </p>
      </div>
    </form>
  );
}
