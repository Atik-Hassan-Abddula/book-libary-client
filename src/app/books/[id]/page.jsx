
import { Suspense } from "react";
import BookDetailsContent from "./book-details-content";
import { Loader2 } from "lucide-react";

function BookDetailsLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <Loader2
          className="mx-auto animate-spin text-primary"
          size={40}
        />
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
