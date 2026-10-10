"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-rose-600 font-bold">Client Notice: {error?.message}</h2>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-rose-600 text-white rounded">Retry</button>
    </div>
  );
}
