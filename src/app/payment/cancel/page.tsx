import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 border rounded-xl text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          ✕
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Payment Cancelled</h1>
        <p className="text-sm text-slate-600">
          The transaction was cancelled. Your request remains in standard priority.
        </p>
        <Link
          href="/recipient"
          className="inline-block bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-900"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}