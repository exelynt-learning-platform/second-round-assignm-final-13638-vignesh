'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error('Client Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-zinc-950">
      <div className="max-w-md space-y-4 rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900 border border-red-100 dark:border-red-900/30">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 text-red-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50">Something went wrong!</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          An unexpected error occurred in the application interface.
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-200 dark:shadow-none"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
