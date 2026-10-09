import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-rose-600">404</h1>
        <p className="text-lg text-slate-700 font-semibold">Page Not Found</p>
        <Link href="/" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md text-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
}