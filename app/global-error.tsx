'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error);
  }, [error]);
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 font-sans">
        <div className="max-w-md space-y-4 rounded-3xl bg-white p-8 shadow-2xl border border-red-100 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Fatal Layout Error!</h2>
          <p className="text-sm text-gray-500">
            A critical error occurred while rendering the application layout.
          </p>
          <button
            onClick={() => reset()}
            className="mt-4 w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-200"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
