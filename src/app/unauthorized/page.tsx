import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-rose-600">403 - Forbidden</h1>
        <p className="text-slate-600">You do not have permission to view this role dashboard.</p>
        <Link href="/login" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md text-sm">
          Switch Account
        </Link>
      </div>
    </div>
  );
}