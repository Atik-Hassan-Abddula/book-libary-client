
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

export default function ExtraSections() {
  return (
    <>
      {/* How Borrowing Works */}
      <section className="bg-base-200/50 px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {borrowingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-base-300 bg-base-100 p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={27} />
                    </div>

                    <span className="text-3xl font-black text-base-content/10">
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

          <div className="mt-10 text-center">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-semibold text-primary-content transition hover:opacity-90"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="bg-base-100 px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
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
              className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3"
            >
              Browse All Books
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href="/books"
                  className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-lg"
                >
                  <div
                    className={`mb-6 flex size-14 items-center justify-center rounded-xl ${category.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-base-content">
                    {category.name}
                  </h3>

                  <p className="mb-5 text-sm leading-6 text-base-content/60">
                    {category.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl bg-primary/5 p-8 text-center sm:flex-row sm:justify-center">
            <CheckCircle2 className="text-primary" size={25} />
            <p className="font-medium text-base-content">
              Every great reading journey starts with one book.
            </p>
            <BookMarked className="hidden text-primary sm:block" size={25} />
          </div>
        </div>
      </section>
    </>
  );
}
