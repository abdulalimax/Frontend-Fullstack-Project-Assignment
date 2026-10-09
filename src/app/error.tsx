"use client";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
        <p className="text-sm text-slate-500">An unexpected system error occurred.</p>
        <button
          onClick={() => reset()}
          className="bg-rose-600 text-white px-4 py-2 rounded-md font-medium text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}