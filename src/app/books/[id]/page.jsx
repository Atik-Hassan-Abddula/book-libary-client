
import { Suspense } from "react";
import BookDetailsContent from "./book-details-content";

function BookDetailsLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="mt-4 text-base-content/60">
          Loading book details...
        </p>
      </div>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense fallback={<BookDetailsLoading />}>
      <BookDetailsContent />
    </Suspense>
  );
}
