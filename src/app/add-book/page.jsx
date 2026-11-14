
import AddBookForm from "@/components/books/AddBookForm";
import AuthGuard from "@/components/shared/auth-guard";

export const metadata = {
  title: "Add Book | BookNook",
  description:
    "Add a new book to the BookNook online library.",
};

export default function AddBookPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#F7F5EF] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          {/* Page Heading */}
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-[#D4A853]/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#14532D]">
              Share Your Knowledge
            </span>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-[#14532D] sm:text-5xl">
              Add a New Book
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Every book has a story. Add your favorite book
              to BookNook and share its knowledge with readers.
            </p>
          </div>

          {/* Add Book Form */}
          <AddBookForm />

          <p className="mt-8 text-center text-sm text-gray-400">
            BookNook — Your Online Library
          </p>
        </div>
      </main>
    </AuthGuard>
  );
}
