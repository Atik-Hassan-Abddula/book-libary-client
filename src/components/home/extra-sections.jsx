
import Link from "next/link";
import {
  BookOpen,
  Search,
  ClipboardList,
  CalendarCheck,
  RotateCcw,
  FlaskConical,
  Landmark,
  Baby,
  Library,
  BookMarked,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const borrowingSteps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Books",
    description:
      "Browse our library and discover books that match your interests.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Borrow a Book",
    description:
      "Choose your favorite book and submit your borrowing request.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Enjoy Reading",
    description:
      "Take your time, enjoy reading, and remember your return date.",
  },
  {
    number: "04",
    icon: RotateCcw,
    title: "Return the Book",
    description:
      "Return your borrowed book on time so another reader can enjoy it.",
  },
];

const categories = [
  {
    name: "Fiction",
    description: "Stories, novels and imagination.",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Science",
    description: "Discover science and technology.",
    icon: FlaskConical,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    name: "History",
    description: "Explore the past and its stories.",
    icon: Landmark,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    name: "Kids",
    description: "Fun and learning for young readers.",
    icon: Baby,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    name: "Others",
    description: "Explore something different.",
    icon: Library,
    color: "bg-purple-500/10 text-purple-500",
  },
];

const primaryButton =
  "group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#14532D] bg-[#14532D] px-7 py-3.5 font-semibold text-white shadow-md shadow-green-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#14251B] hover:shadow-lg";

export default function ExtraSections() {
  return (
    <>
      {/* How Borrowing Works */}
      <section className="bg-base-200/50 px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-2 text-sm font-semibold text-[#A77925]">
              Simple & Easy
            </span>

            <h2 className="text-3xl font-bold text-base-content md:text-4xl">
              How Borrowing Works
            </h2>

            <p className="mt-4 leading-7 text-base-content/60">
              Getting your next favorite book is easy. Follow these four
              simple steps and start your reading journey with BookNook.
            </p>
          </div>

          {/* Borrowing Steps */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {borrowingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-base-300 bg-base-100 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4A853]/60 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-xl bg-[#14532D]/10 text-[#14532D] transition-all duration-300 group-hover:bg-[#D4A853] group-hover:text-[#14251B]">
                      <Icon size={27} />
                    </div>

                    <span className="text-3xl font-black text-base-content/10 transition-colors group-hover:text-[#D4A853]/40">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-base-content">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-7 text-base-content/60">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Start Exploring Button */}
          <div className="mt-10 text-center">
            <Link href="/books" className={primaryButton}>
              Start Exploring
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="bg-base-100 px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="mb-3 inline-block rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-2 text-sm font-semibold text-[#A77925]">
                Find Your Interest
              </span>

              <h2 className="text-3xl font-bold text-base-content md:text-4xl">
                Explore Categories
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-base-content/60">
                From exciting fiction to fascinating science, find books
                for every curiosity and every reader.
              </p>
            </div>

            <Link
              href="/books"
              className="group inline-flex items-center gap-2 font-semibold text-[#14532D] transition-colors hover:text-[#B58A38]"
            >
              Browse All Books
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href="/books"
                  className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4A853]/60 hover:shadow-lg"
                >
                  <div
                    className={`mb-6 flex size-14 items-center justify-center rounded-xl ${category.color} transition-all duration-300 group-hover:bg-[#D4A853] group-hover:text-[#14251B]`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-base-content">
                    {category.name}
                  </h3>

                  <p className="mb-5 text-sm leading-6 text-base-content/60">
                    {category.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#14532D] transition-colors group-hover:text-[#B58A38]">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Highlight */}
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-[#D4A853]/20 bg-[#14532D]/5 p-8 text-center sm:flex-row sm:justify-center">
            <CheckCircle2 className="shrink-0 text-[#14532D]" size={25} />

            <p className="font-medium text-base-content">
              Every great reading journey starts with one book.
            </p>

            <BookMarked
              className="hidden shrink-0 text-[#B58A38] sm:block"
              size={25}
            />
          </div>
        </div>
      </section>
    </>
  );
}
