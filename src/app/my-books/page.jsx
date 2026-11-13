
export const metadata = {
  title: "My Books | BookNook",
  description: "Manage the books you added to BookNook.",
};

export default function MyBooksPage() {
  return (
    <main className="min-h-screen bg-[#F7F5EF] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
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

        <div className="rounded-2xl border border-[#E8E2D5] bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#14532D]">
            Your Book Collection
          </h2>

          <p className="mt-3 text-gray-500">
            Your added books will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}
