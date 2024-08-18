"use client";


import { Link } from "@/components/Link";
import { Button } from "flowbite-react";
import { AlertCircleIcon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 flex max-w-md flex-col items-center justify-center space-y-6 text-center">
        <AlertCircleIcon className="h-20 w-20 text-red-500" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Oops, something went wrong!
        </h1>
        <p className="font-bold text-gray-800 dark:text-gray-100">{error.message}</p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          We apologize for the inconvenience. Please try again later or contact
          our support team if the issue persists.
        </p>
        <div className="flex gap-4">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-red-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            href="/"
          >
            Go back to homepage
          </Link>
          <Button
            color="light"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
